import BaseModule from '../BaseModule';

export default class EditProfile extends BaseModule {
  renderHeader() {
    return (
      <div className="module-label">Mon profil</div>
    );
  }

  renderBody() {
    return (
      <div>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin vestibulum metus id libero varius porttitor. Vivamus eleifend, felis eget lacinia vulputate, tellus purus aliquet mauris, non venenatis enim nunc nec dolor. Etiam cursus dui in congue lacinia. Etiam ut bibendum mi, eget lobortis libero.</p>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin vestibulum metus id libero varius porttitor. Vivamus eleifend, felis eget lacinia vulputate, tellus purus aliquet mauris, non venenatis enim nunc nec dolor. Etiam cursus dui in congue lacinia. Etiam ut bibendum mi, eget lobortis libero.</p>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin vestibulum metus id libero varius porttitor. Vivamus eleifend, felis eget lacinia vulputate, tellus purus aliquet mauris, non venenatis enim nunc nec dolor. Etiam cursus dui in congue lacinia. Etiam ut bibendum mi, eget lobortis libero.</p>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin vestibulum metus id libero varius porttitor. Vivamus eleifend, felis eget lacinia vulputate, tellus purus aliquet mauris, non venenatis enim nunc nec dolor. Etiam cursus dui in congue lacinia. Etiam ut bibendum mi, eget lobortis libero.</p>
      </div>
    )
  }
}
