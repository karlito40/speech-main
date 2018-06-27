import React from 'react';
import { Button } from '../../controls';
import BaseModule from '../BaseModule';

export default class EditProfile extends BaseModule {
  renderHeader() {
    return (
      <div className="module-label">Mes photos</div>
    );
  }

  renderBody() {
    const { profile } = this.props;

    return <React.Fragment>
      <div className="items">
        <div className="item">
          <img className="avatar" src="/static/img/f-gender-avatar.png"/>
        </div>

        <div className="item">
          <Button className="is-basis c-notif">Révéler</Button>
        </div>
      </div>
      <style jsx>{`
        .avatar { width: 35px; height: 35px; }
        .items { display: flex; align-items: center; }
        .item { margin-right: 15px; }
        .item:first-child { line-height: 1; }
      `}</style>
    </React.Fragment>
  }
}
