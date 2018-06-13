import React from 'react';
import AccountLayout from '../../components/layouts/AccountLayout';
import EditProfile from '../../components/modules/profile/EditProfile';


export default class Settings extends AccountLayout {

  renderBody() {
    return (
      <React.Fragment>
        <div className="columns full-width">
          <div className="column">
            <EditProfile/>
          </div>
          <div className="column is-small">
            {/* <EditProfile/> */}
            {/* <EditProfile/> */}
          </div>
        </div>
      </React.Fragment>
    );
  }

}
