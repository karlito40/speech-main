import { Component } from 'react';
import { Field, Button } from '../../controls';
import { reduxForm } from 'redux-form';
import Form, { IsEmail, MinLength, Required, validateChange } from '../../../lib/validator';
import { handleServerError } from '../../../lib/error';
import { connect } from 'react-redux';
import { actions as actionsApi } from '../../../store/api';
import { debounce } from "lodash";

class ProfileForm extends Component {
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
    const { pseudoError, cityError, headerError, contentError } = this.state;

    return (
      <form className="form-profile">
        <Field
          className="txt-input full-width"
          label="Mon pseudo..."
          name="pseudo"
          error={pseudoError}
          onChange= { validateChange.bind(this, {
            name: 'pseudo',
            validator: MinLength(3),
            onValidate: this.saveField
          }) }
        />

        <Field
          className="txt-input full-width"
          label="Ma ville..."
          name="city"
          error={cityError}
          onChange= { validateChange.bind(this, {
            name: 'city',
            validator: Required(),
            onValidate: this.saveField
          }) }
        />

        <Field
          className="txt-input full-width"
          label="Accroche..."
          name="headline"
          type="textarea"
          error={headerError}
          onChange= { validateChange.bind(this, {
            name: 'headline',
            validator: Required(),
            onValidate: this.saveField
          }) }
        />

        <Field
          className="txt-input full-width"
          label="Mon histoire..."
          name="content"
          type="textarea"
          error={contentError}
          onChange= { validateChange.bind(this, {
            name: 'content',
            validator: Required(),
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
    form: 'profileForm',
  })(ProfileForm));
