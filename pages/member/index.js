import React from 'react';
import AccountLayout from '../../components/layouts/AccountLayout';
import InfiniteScroll from 'react-infinite-scroller';
import { actions as actionsApi } from '../../store/api';
import { connect } from 'react-redux';

export class Index extends AccountLayout {
  static async getInitialProps(props) {
    const propsLayout = await super.getInitialProps(props);
    if(!propsLayout.hasProfileCompleted) {
      return propsLayout;
    }

    const { reduxStore, req } = props;
    const { profileApp } = reduxStore.getState();
    const isServer = !!req;

    if(isServer && req.cookies.token) {
      await reduxStore.dispatch(actionsApi.getForProfiles({
        _params: { id: profileApp.id },
        _isServer: isServer,
        _token: req.cookies.token
      }));
    }

    return propsLayout;
  }

  load = (page) => {
    const { id } = this.props.profileApp;
    if(id) {
      this.props.onLoad({
        _params: { id },
        _query: { page: page + 1 }
      });
    }
  }

  renderBody() {
    const { forProfiles } = this.props;
    const profiles = forProfiles ? forProfiles.data : [];
    const hasMore = forProfiles && forProfiles.hasMore;

    return (
      <InfiniteScroll
        pageStart={0}
        loadMore={this.load}
        hasMore={hasMore}
        loader={<div key={0} className="loader">Loading ...</div>}
        useWindow={true}
      >
          {profiles.map((profile, i) =>
            <div
              key={profile.id}
              style={{height: 150, borderBottom: '1px solid black' }}
            >
              <b>{i}</b>
              {JSON.stringify(profile)}
            </div>
          )}
      </InfiniteScroll>
    );
  }

}

const mapStateToProps = ({forProfiles, profileApp}) => {
  return {
    forProfiles,
    profileApp
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onLoad: (data) => dispatch(actionsApi.getForProfiles(data))
  };
};


export default connect(mapStateToProps, mapDispatchToProps)(Index)
