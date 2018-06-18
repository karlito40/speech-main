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

  addPhoto = (e) => {
    e.preventDefault();
  }

  render() {
    const { profileAppIsLoading, onSave, handleSubmit } = this.props;

    return (
      <form className="form-pics-profile" onSubmit={handleSubmit(this.onSubmit)}>
        <Button
          className={`btn-primary ${onSave ? 'block full-width outlined' : 'is-basis'}`}
          onClick={this.addPhoto}
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
    onEdit: (data) => dispatch(actionsApi.putProfileApp(data))
  };
};


export default connect(mapStateToProps, mapDispatchToProps)
  (reduxForm({
    form: 'profilePicsForm',
  })(ProfilePicsForm));
