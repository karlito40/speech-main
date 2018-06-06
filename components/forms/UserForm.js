import { Component, Fragment } from 'react';
import { Button } from '../controls';
import { reduxForm } from 'redux-form';
import Form, { IsEmail, MinLength } from '../../lib/validator';
import { Field } from '../controls';
import { connect } from 'react-redux';
import { actions as actionsApi } from '../../store/api';
import { SubmissionError } from 'redux-form';

class UserForm extends Component {
  createUser = (user) => {
    return this.props.onUserSubmit(user)
      .then(res => this.props.onUserCreated && this.props.onUserCreated())
      .catch(error => {
        const errors = error.response.data.error;
        let submissionErr = {};
        for(const error of errors) {
          submissionErr[error.property] = '';
          for(const message of Object.values(error.constraints)) {
            submissionErr[error.property] += message;
          }
        }

        throw new SubmissionError(submissionErr);
      });
  };

  render() {
    const { handleSubmit, errors } = this.props;
    return (
      <Fragment>
        <h2>Inscription</h2>
        <form className="form-user" onSubmit={handleSubmit(this.createUser)}>
          <Field
            className="full-width"
            label="Email"
            name="email"
            ico="envelope"
          />

          <Field
            className="full-width"
            label="Mot de passe"
            name="password"
            type="password"
            ico="locked-padlock"
          />

          <Button className="block full-width primary">
            Confirmer
          </Button>

        </form>
        <style jsx>{`
          .form-user {
            :global(.form-group) { margin-bottom: 25px; }
            :global(button) { text-transform: uppercase; padding: 3px 0; }
          }
        `}</style>
      </Fragment>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onUserSubmit: (user) => dispatch(actionsApi.postUser(user))
  };
};

export default connect(null, mapDispatchToProps)
  (reduxForm({
    form: 'userForm',
    validate: Form({
      email: IsEmail(),
      password: MinLength(6),
    })
  })(UserForm));
