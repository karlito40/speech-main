import React from 'react';
import AccountLayout from '../../components/layouts/AccountLayout';
import ProfileEssence from '../../components/modules/profile/ProfileEssence';
import InfiniteScroll from 'react-infinite-scroller';
import { actions as actionsApi } from '../../store/api';
import { connect } from 'react-redux';
import Link from 'next/link';

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

  state = { display: 'min' }

  toggleDisplay = () => {
    const display = (this.state.display == 'min') ? 'large' : 'min';
    this.setState({ display });
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
    const { display } = this.state;

    const profiles = forProfiles ? forProfiles.data : [];
    const hasMore = forProfiles && forProfiles.hasMore;

    return (
      <React.Fragment>
        <div className="toolbar">
          <img src="/static/img/icos/change-display.png" onClick={this.toggleDisplay}/>
        </div>

        <div className={`board board-${display}`}>
          <InfiniteScroll
            pageStart={0}
            loadMore={this.load}
            hasMore={hasMore}
            loader={<div key={0} className="loader">Loading ...</div>}
            useWindow={true}
          >
            {profiles.map((profile, i) =>
              <Link href={`/member/${profile.id}`}>
                <a className="module-link">
                  <ProfileEssence
                    key={profile.id}
                    profile={profile}
                    isAugmented={(display == 'large')}
                  />
                </a>
              </Link>

            )}
          </InfiniteScroll>
        </div>

        <style jsx>{`
          @import 'core/index';

          .toolbar {
            & { display: flex; justify-content: flex-end; margin-bottom: 5px; }
            img { width: 15px; height: 15px; cursor: pointer; }
          }

          .board :global(.module) {
            & { cursor: pointer; }

            &:hover {
              & { border-top: 1px solid $colorNotif; }
              :global(h3:first-child) { color: $colorNotif;  }
            }
           }

           a { border: 0; color: $baseTextColor; }

          .board-min :gloval(> div) { display: flex; flex-wrap: wrap; margin-left: -30px; }
          .board-min .module-link { flex: 1; min-width: calc(33% - 30px); margin-left: 30px; }
        `}</style>
      </React.Fragment>
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
