import React from 'react';
import AccountLayout from '../../components/layouts/AccountLayout';
import EditProfile from '../../components/modules/profile/EditProfile';
import EditPicsProfile from '../../components/modules/profile/EditPicsProfile';
import EditDescriptionProfile from '../../components/modules/profile/EditDescriptionProfile';
import EditSearchProfile from '../../components/modules/profile/EditSearchProfile';


export default class Settings extends AccountLayout {

  renderBody() {
    return (
      <React.Fragment>
        <div className="columns full-width">
          <div className="column">
            <EditProfile/>
          </div>
          <div className="column is-small">
            <EditPicsProfile/>
            <EditDescriptionProfile/>
            <EditSearchProfile/>
          </div>
        </div>
      </React.Fragment>
    );
  }

}
