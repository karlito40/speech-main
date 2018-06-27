import React, { Component } from 'react'
import AccountLayout from '../../components/layouts/AccountLayout';
import HeaderProfile from '../../components/modules/profile/HeaderProfile';
import StoryProfile from '../../components/modules/profile/StoryProfile';
import PhotosProfile from '../../components/modules/profile/PhotosProfile';
import { actions as actionsApi } from '../../store/api';
import { connect } from 'react-redux';

class MemberPage extends AccountLayout {
  static async getInitialProps(props) {
    const propsComponent = await super.getInitialProps(props);
    if(!propsComponent.hasProfileCompleted) {
      return propsComponent;
    }

    const { id } = props.query;
    const { reduxStore, req } = props;

    await reduxStore.dispatch(actionsApi.getProfileDisplay({
      _params: { id },
      _req: req
    }));

    return propsComponent;
  }

  renderBody() {
    const { profileDisplay } = this.props;

    return (
      <React.Fragment>
        <HeaderProfile profile={profileDisplay}/>

        <div className="columns full-width">
          <div className="column">
            <StoryProfile profile={profileDisplay}/>
          </div>
          <div className="column is-small">
            <PhotosProfile profile={profileDisplay}/>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = ({profileDisplay}) => {
  return {
    profileDisplay,
  };
};

export default connect(mapStateToProps)(MemberPage);
