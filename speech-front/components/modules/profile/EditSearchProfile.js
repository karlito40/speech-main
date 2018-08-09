import BaseModule from '../BaseModule';
import ProfileSearchForm from '../../forms/profile/ProfileSearchForm';

export default class EditSearchProfile extends BaseModule {
  renderHeader() {
    return (
      <div className="module-label">Ma recherche</div>
    );
  }

  renderBody() {
    return <ProfileSearchForm/>
  }
}
