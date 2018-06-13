import BaseModule from '../BaseModule';
import ProfileForm from '../../forms/profile/ProfileForm';

export default class EditProfile extends BaseModule {
  renderHeader() {
    return (
      <div className="module-label">Mon profil</div>
    );
  }

  renderBody() {
    return <ProfileForm/>
  }
}
