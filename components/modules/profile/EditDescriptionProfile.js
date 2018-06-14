import BaseModule from '../BaseModule';
import ProfileDescriptionForm from '../../forms/profile/ProfileDescriptionForm';

export default class EditDescriptionProfile extends BaseModule {
  renderHeader() {
    return (
      <div className="module-label">Ma description</div>
    );
  }

  renderBody() {
    return <ProfileDescriptionForm/>
  }
}
