import { Component } from 'react';
import { Field } from '../../controls';
import { reduxForm } from 'redux-form';
import Form, { IsIn, IsDate, validateChange } from '../../../lib/validator';
import { handleServerError } from '../../../lib/error';
import { connect } from 'react-redux';
import { actions as actionsApi } from '../../../store/api';
import { debounce } from "lodash";

const genders = [
  { label: 'Homme', val: 'M' },
  { label: 'Femme', val: 'F' }
];

class ProfileSearchForm extends Component {
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
    const { genderError, forGenderError, birthDateError } = this.state;

    return (
      <form className="form-profile">

        <Field
          className="txt-input full-width"
          label="Je suis..."
          name="gender"
          type="select"
          values={genders}
          error={genderError}
          onChange= { validateChange.bind(this, {
            name: 'gender',
            validator: IsIn(['M', 'F']),
            onValidate: this.saveField
          }) }
        />

        <Field
          className="txt-input full-width"
          label="Je cherche..."
          name="forGender"
          type="select"
          values={genders}
          error={forGenderError}
          onChange= { validateChange.bind(this, {
            name: 'forGender',
            validator: IsIn(['M', 'F']),
            onValidate: this.saveField
          }) }
        />

        <Field
          className="txt-input full-width"
          label="Je suis née le..."
          name="birthDate"
          type="date"
          error={birthDateError}
          onChange= { validateChange.bind(this, {
            name: 'birthDate',
            validator: IsDate(),
            onValidate: this.saveField
          }) }
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
    form: 'profileSearchForm',
  })(ProfileSearchForm));
