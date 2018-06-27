import BaseModule from '../BaseModule';
import React from 'react';

export default class HeaderProfile extends BaseModule {
  renderHeader() {
    const { profile } = this.props;

    return (
      <React.Fragment>
        <div className="columns">
          <div className="column">
            <h2 className="is-size-24pt">{profile.pseudo}</h2>
            <h3 className="is-size-20pt is-color-dark-grey">{profile.city}, {profile.birthDate}</h3>
          </div>

          <div className="column">
            <i className="fi flaticon-speech-bubble"></i>
            <i className="is-active fi flaticon-big-star"></i>
          </div>

          <style jsx>{`
            @import 'core/index';

            h2 { margin-bottom: 5px; }
            .column:first-child { flex: 1; }
            i {
              & { margin-left: 10px; font-size: $font24pt; cursor: pointer; color: $colorDeepBlack; }
              &:hover, &.is-active { color: $colorNotif; }
            }
          `}</style>

        </div>


      </React.Fragment>

    );
  }


}
