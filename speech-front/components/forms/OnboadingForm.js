import { Component } from 'react';
import { reduxForm } from 'redux-form';
import Form, { IsIn, IsDate } from '../../lib/validator';
import Modal from '../Modal';
import { Field, Button } from '../controls';
import UserForm from './UserForm';
import { connect } from 'react-redux';
import { setErrorForm } from '../../store/actions';
import moment from "moment";
import { actions as actionsApi } from '../../store/api';
import { getConstraints, getServerError } from '../../lib/error';
import Router from 'next/router';

const genders = [
  { label: 'Homme', val: 'M' },
  { label: 'Femme', val: 'F' }
];

class OnboardingForm extends Component {
  state = { showUserForm: false };

  toggleActive = () => this.setState({ showUserForm: !this.state.showUserForm });
  closeUserForm = () => this.setState({ showUserForm: false });
  showUserForm = () => this.setState({ showUserForm: true });

  onProfileSubmit = (profileForm) => {
    this.profileForm = profileForm;

    if(!this.user) {
      return this.showUserForm();
    }

    this.submitProfile();
  }

  onUserCreated = (user) => {
    this.user = user;

    this.closeUserForm();
    this.submitProfile();
  };

  submitProfile = () => {
    this.profileForm.userId = this.user.id;
    this.profileForm.birthDate = moment(this.profileForm.birthDate, "YYYY-MM-DD");
    this.props.onProfileSubmit(this.profileForm)
      .then(res => Router.push('/member'))
      .catch(data => {
        this.props.onServerFormError(getConstraints(getServerError(data)));
      });
  };

  render() {
    const { handleSubmit } = this.props;

    return (
      <>
        <Modal
          active={this.state.showUserForm}
          onClose={this.closeUserForm}>
          <UserForm onUserCreated={this.onUserCreated}/>
        </Modal>

        <form className="form-onboarding" onSubmit={handleSubmit(this.onProfileSubmit)}>

          <Field
            className="full-width"
            label="Je suis"
            name="gender"
            ico="user-avatar"
            type="select"
            hideLabel={true}
            values={genders}
          />

          <Field
            className="full-width"
            label="Je cherche"
            name="forGender"
            ico="white-t-shirt"
            type="select"
            hideLabel={true}
            values={genders}
          />

          <Field
            className="full-width"
            label="Je suis née le"
            name="birthDate"
            type="date"
            ico="wristwatch"
          />

          <Button className="block full-width btn-primary">
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

const mapStateToProps = ({profileIsLoading}) => {
  return {
    profileIsLoading
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    onServerFormError: (errors) => {
      return dispatch(setErrorForm('onboardingForm', errors));
    },
    onProfileSubmit: (profile) => dispatch(actionsApi.postProfileApp(profile))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)
  (reduxForm({
    form: 'onboardingForm',
    validate: Form({
      gender: [{ constraint: IsIn(['M', 'F']), message: "Champs invalide." }],
      forGender: IsIn(['M', 'F']),
      birthDate: IsDate()
    })
  })(OnboardingForm));
