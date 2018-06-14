import { Component } from 'react';
import { Field } from '../../controls';
import { reduxForm } from 'redux-form';
import Form, { validateChange } from '../../../lib/validator';
import { handleServerError } from '../../../lib/error';
import { connect } from 'react-redux';
import { actions as actionsApi } from '../../../store/api';
import { debounce } from "lodash";

class ProfileDescriptionForm extends Component {
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

  render() {
    const { profileAppIsLoading } = this.props;

    return (
      <form className="form-description-profile">
        <Field
          className="txt-input full-width"
          label="Mes films préférés..."
          name="movies"
          onChange= { (e) => this.saveField('movies', e.target.value) }
        />

        <Field
          className="txt-input full-width"
          label="Mes hobbies..."
          name="hobbiers"
          onChange= { (e) => this.saveField('hobbies', e.target.value) }
        />

        <Field
          className="txt-input full-width"
          label="Mon caractère..."
          name="trait"
          onChange= { (e) => this.saveField('trait', e.target.value) }
        />

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
    form: 'profileDescriptionForm',
  })(ProfileDescriptionForm));
