import React from 'react';
import AccountLayout from '../../components/layouts/AccountLayout';
import ProfileForm from '../../components/forms/profile/ProfileForm';
import ProfilePhotoForm from '../../components/forms/profile/ProfilePhotoForm';
import ProfileDescriptionForm from '../../components/forms/profile/ProfileDescriptionForm';
import { redirect } from '../../lib/route';

export default class Complete extends AccountLayout {
  maxMenu = 0;
  state = { iMenu: 0 };

  nextMenu = () => {
    this.toMenu(this.state.iMenu + 1);
  }

  toMenu = (i) => {
    if(i > this.maxMenu) {
      this.maxMenu = i;
    }

    this.setState({ iMenu: i });
  };

  completeHandler = () => {
    redirect(null, '/member');
  }

  renderBody() {
    const { iMenu } = this.state;

    const propsForm = { onSave: this.nextMenu, inputTheme: '' };

    const formMap = {};
    formMap[0] = <ProfileForm {...propsForm} />
    formMap[1] = <ProfilePhotoForm {...propsForm} />
    formMap[2] = <ProfileDescriptionForm inputTheme="" onSave={this.completeHandler} />

    const menuMap = [ 'Moi', 'Photos', 'Précision'];

    return (
      <React.Fragment>
        <div className="scene scene-1">
          <ul className="menu">
            {menuMap.map((text, i) =>
              <li className="menu-item" key={i}>
                <a className={`menu-link ${this.maxMenu >= i && 'is-activeable'}`} onClick={(e) => {
                  e.preventDefault();
                  if(i <= this.maxMenu) {
                    this.toMenu(i);
                  }
                }}>
                  {text}
                </a>
              </li>
            )}
          </ul>

          <div className="form-wrapper">
            {formMap[iMenu]}
          </div>
        </div>

        <style jsx>{`
          .scene-1 { min-height: calc(100vh - 169px); display: flex; align-items: center; justify-content: center; flex-direction: column; }
          .menu { margin-bottom: 40px; justify-content: center; }
          .form-wrapper { width: 340px; }
        `}</style>

      </React.Fragment>
    );
  }

}
