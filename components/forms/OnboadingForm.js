import { Component } from 'react';
import { Input, Button } from '../controls';
import { Field, reduxForm } from 'redux-form'
import Form, { IsIn, IsDate } from '../../lib/validator';

const genders = [
  { label: 'Homme', val: 'M' },
  { label: 'Femme', val: 'W' }
];

const renderInput = ({
  input,
  label,
  meta: { touched, error },
  ...custom
}) => (
  <Input
    label={label}
    error={touched && error}
    {...input}
    {...custom}
  />
);

class OnboardingForm extends Component {
  showValues = (values) => console.log('submit', values);

  render() {
    const { handleSubmit } = this.props;
    return (
      <form className="form-onboarding" onSubmit={handleSubmit(this.showValues)}>
        <Field
          className="full-width"
          label="Je suis"
          name="gender"
          ico="user-avatar"
          type="select"
          values={genders}
          component={renderInput}
        />

        <Field
          className="full-width"
          label="Je cherche"
          name="forGender"
          ico="white-t-shirt"
          type="select"
          values={genders}
          component={renderInput}/>

        <Field
          className="full-width"
          label="Je suis née le"
          name="birthDate"
          type="date"
          ico="wristwatch"
          component={renderInput}/>

        <Button className="block full-width primary">
          Créer mon profil
        </Button>

        <style jsx>{`
          @import 'core/index';

          .form-onboarding {
            & { text-align: left; width: 75%; margin: 0 auto; }
            :global(input[type="date"]) { color: white; }
            :global(.not-empty input[type="date"]) { color: $colorDeepBlack; }
            :global(button) { font-size: $font20pt; text-transform: uppercase; padding: 9px 0; }
            :global(.form-group) {
              & { margin-bottom: 20px; }
              :global(.ico) { font-size: 12px; }
            }
          }
        `}</style>

      </form>
    );
  }
}


export default reduxForm({
  form: 'onboardingForm',
  validate: Form({
    gender: [{ constraint: IsIn(['M', 'W']), message: "Champ invalide." }],
    forGender: IsIn(['M', 'W']),
    birthDate: IsDate()
  })
})(OnboardingForm)
