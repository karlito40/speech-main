import { Component } from 'react';
import { Field, Button } from '../../controls';
import { reduxForm } from 'redux-form';
import Form, { validateChange, Passed } from '../../../lib/validator';
import { getFieldsComponent } from '../../../lib/form';

import { handleServerError } from '../../../lib/error';
import { connect } from 'react-redux';
import { actions as actionsApi } from '../../../store/api';
import { debounce } from "lodash";

const fieldList = [
  { label: 'Mes films préférés...', name: 'movies', validator: Passed() },
  { label: 'Mes hobbies...', name: 'hobbies', validator: Passed() },
  { label: 'Mon caractère...', name: 'trait', validator: Passed() },
];

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

  onSubmit = (form) => {
    if(this.props.onSave) {
      this.props.onSave();
    }
  }

  render() {
    const { profileAppIsLoading, inputTheme, onSave, handleSubmit } = this.props;

    const useInputTheme = (typeof inputTheme != "undefined") ? inputTheme : 'txt-input';

    const fields = getFieldsComponent(this, fieldList, {
      useDynamicField: onSave ? false : true,
      onValidate: this.saveField,
      props: {
        className: `${useInputTheme} full-width`
      }
    });

    return (
      <form className="form-description-profile" onSubmit={handleSubmit(this.onSubmit)}>
        {fields.map((field, i) =>
          <React.Fragment key={i}>
            {field}
          </React.Fragment>
        )}

        {onSave && <Button className="block full-width btn-primary">
          Valider
        </Button>}

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
