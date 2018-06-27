import BaseModule from '../BaseModule';
import React from 'react';

export default class EditProfile extends BaseModule {
  renderHeader() {
    return (
      <div className="module-label">Mon histoire</div>
    );
  }

  renderBody() {
    const { profile } = this.props;

    return <React.Fragment>
      <h2 className="is-size-24pt">{profile.headline}</h2>
      <div className="profile-content">{profile.content}</div>

      <style jsx>{`
        h2 { margin-bottom: 20px; }
      `}</style>
    </React.Fragment>
  }
}
