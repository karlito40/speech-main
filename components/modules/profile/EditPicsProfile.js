import BaseModule from '../BaseModule';
import ProfilePicsForm from '../../forms/profile/ProfilePicsForm';

export default class EditPicsProfile extends BaseModule {
  renderHeader() {
    return (
      <div className="module-label">Mes photos</div>
    );
  }

  renderBody() {
    return <ProfilePicsForm/>
  }
}
