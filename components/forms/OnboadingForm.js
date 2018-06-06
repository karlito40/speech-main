import { Component } from 'react';
import { Button } from '../controls';
import { reduxForm } from 'redux-form';
import Form, { IsIn, IsDate } from '../../lib/validator';
import Modal from '../Modal';
import { Field } from "../controls";
import UserForm from "./UserForm";

const genders = [
  { label: 'Homme', val: 'M' },
  { label: 'Femme', val: 'W' }
];


class OnboardingForm extends Component {
  state = { showUserForm: false };

  showValues = (values) => console.log('submit', values);
  toggleActive = () => this.setState({showUserForm: !this.state.showUserForm});
  closeUserForm = () => this.setState({showUserForm: false});
  
  render() {
    const { handleSubmit } = this.props;
    return (
      <>
        <Modal
          active={this.state.showUserForm}
          onClose={this.toggleActive}>
          <UserForm onUserCreated={this.closeUserForm}/>
        </Modal>
        <form className="form-onboarding" onSubmit={handleSubmit(this.showValues)}>
          <button onClick={this.toggleActive}>CLICK</button>

          <Field
            className="full-width"
            label="Je suis"
            name="gender"
            ico="user-avatar"
            type="select"
            values={genders}
          />

          <Field
            className="full-width"
            label="Je cherche"
            name="forGender"
            ico="white-t-shirt"
            type="select"
            values={genders}
          />

          <Field
            className="full-width"
            label="Je suis née le"
            name="birthDate"
            type="date"
            ico="wristwatch"
          />

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
      </>

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
