import BaseModule from '../BaseModule';

export default class ProfileEssence extends BaseModule {
  renderHeader() {
    const { profile } = this.props;

    return (
      <div className="module-header-min">
        <div className="item">
          <h3 className="is-size-16pt">{profile.pseudo}</h3>
          <h3 className="is-size-16pt is-color-dark-grey">{profile.city}, {profile.birthDate}</h3>
        </div>

        <div className="item">
          <div className="inline-notif">{profile.content.length}</div>
        </div>

        <style jsx>{`
          @import 'core/index';

          .module-header-min { display: flex; align-items: center; }
          h3:last-child { margin-bottom: 0; }
          .item:first-child { flex: 1; }
          .inline-notif { color: white;  background-color: $colorNotif; padding: 0 5px; font-size: 10px; border-radius: 3px; }
        `}</style>
      </div>

    );
  }

  renderBody() {
    const { profile, isAugmented } = this.props;

    const headline = (isAugmented)
      ? <h2 className="is-size-22pt">{profile.headline}</h2>
      : <div className="is-size-20pt">{profile.headline}</div>;

    return <React.Fragment>
      <div className="module-body-profile">
        {headline}
        {isAugmented && <div className="profile-content is-size-18pt">{profile.content}</div>}

      </div>
      <style jsx>{`
        .module-body-profile .profile-content { margin-top: 10px; }
      `}</style>

    </React.Fragment>;
  }
}
