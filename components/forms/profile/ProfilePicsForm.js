import { Component } from 'react';
import { Field, Button } from '../../controls';
import { reduxForm } from 'redux-form';
import { handleServerError } from '../../../lib/error';
import { getFieldsComponent } from '../../../lib/form';
import { connect } from 'react-redux';
import { actions as actionsApi } from '../../../store/api';
import { debounce } from "lodash";

class ProfilePicsForm extends Component {
  state = {}

  constructor(props){
    super(props)
    this.saveField = debounce(this.saveField, 150);
  }

  saveField = (name, value) => {
    const { id } = this.props.profileApp;
    const field = { [name]: value };

    this.props.onEdit({
      ...field,
      ...{ _params: { id } }
    });
  }

  onSubmit = (form) => {
    if(this.props.onSave) {
      this.props.onSave();
    }
  }

  fireFileInput = (e) => {
    e.preventDefault();
    if(this.fileNode) {
      this.fileNode.click();
    }

  }

  addPhoto = (e) => {
    const file = e.target.files[0];
    if(!file) {
      return;
    }

    const { id } = this.props.profileApp;

    const formData = new FormData();
    formData.append('image', file);

    this.props.onEdit({
        formData,
        ...{ _params: { id } }
      }, {
        onUploadProgress: progressEvent => {
          console.log('onUploadProgress', progressEvent.loaded / progressEvent.total);
        }
      }
    );

  }

  render() {
    const { profileApp, profileAppIsLoading, onSave, handleSubmit } = this.props;

    return (
      <form className="form-pics-profile" onSubmit={handleSubmit(this.onSubmit)}>
        {profileApp.pics.map((photo, i) => <img key={i} src={`/api${photo.url}`} width="50"/>)}
        <input
          className="hide"
          ref={(node) => this.fileNode = node }
          type="file"
          onChange={this.addPhoto}
        />

        <Button
          className={`btn-primary ${onSave ? 'block full-width outlined' : 'is-basis'}`}
          onClick={this.fireFileInput}
          >
          Ajouter
        </Button>

        {onSave &&
          <Button className="block full-width btn-primary">
            Valider
          </Button>
        }
        <style jsx>{`
          .form-pics-profile :global(button:last-child) { margin-top: 10px; }
        `}</style>
      </form>
    );
  }

}


const mapStateToProps = ({profileAppIsLoading, profileApp}) => {
  return {
    profileAppIsLoading,
    profileApp,
    initialValues: profileApp
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    onEdit: (data, customize) => dispatch(actionsApi.postProfilePicsApp(data, customize))
  };
};


export default connect(mapStateToProps, mapDispatchToProps)
  (reduxForm({
    form: 'profilePicsForm',
  })(ProfilePicsForm));
