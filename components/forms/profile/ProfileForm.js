import { Component } from 'react';
import { Field, Button } from '../../controls';
import { reduxForm } from 'redux-form';
import Form, { IsEmail, MinLength, Required, validateChange } from '../../../lib/validator';
import { handleServerError } from '../../../lib/error';
import { getFieldsComponent } from '../../../lib/form';
import { connect } from 'react-redux';
import { actions as actionsApi } from '../../../store/api';
import { debounce } from "lodash";

const fieldList = [
  { label: 'Mon pseudo', name: 'pseudo', validator: MinLength(3) },
  { label: 'Ma ville...', name: 'city', validator: Required() },
  { label: 'Accroche...', name: 'headline', type: 'textarea', validator: Required() },
  { label: 'Mon histoire...', name: 'content', type: 'textarea', validator: Required() },
];

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

  onSubmit = (form) => {
    if(this.props.onSave) {
      const { id } = this.props.profileApp;

      delete form.id;
      this.props.onEdit({
        ...form,
        ...{ _params: { id } }
      }).then(this.props.onSave);
    }
  }

  render() {
    const { profileAppIsLoading, handleSubmit, onSave, inputTheme } = this.props;
    const useInputTheme = (typeof inputTheme != "undefined") ? inputTheme : 'txt-input';

    const fields = getFieldsComponent(this, fieldList, {
      useDynamicField: onSave ? false : true,
      onValidate: this.saveField,
      props: {
        className: `${useInputTheme} full-width`
      }
    });

    return (
      <form className="form-profile" onSubmit={handleSubmit(this.onSubmit)}>
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
};

const mapDispatchToProps = (dispatch) => {
  return {
    onEdit: (data) => dispatch(actionsApi.putProfileApp(data))
  };
};


export default connect(mapStateToProps, mapDispatchToProps)
  (reduxForm({
    form: 'profileForm',
    validate: Form({
      pseudo: MinLength(3),
      city: Required(),
      headline: Required(),
      content: Required()
    })
  })(ProfileForm));
