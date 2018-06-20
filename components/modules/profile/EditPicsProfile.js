import BaseModule from '../BaseModule';
import ProfilePhotoForm from '../../forms/profile/ProfilePhotoForm';

export default class EditPicsProfile extends BaseModule {
  renderHeader() {
    return (
      <div className="module-label">Mes photos</div>
    );
  }

  renderBody() {
    return <ProfilePhotoForm/>
  }
}
