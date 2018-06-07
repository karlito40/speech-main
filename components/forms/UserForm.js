import { Component, Fragment } from 'react';
import { Button } from '../controls';
import { reduxForm } from 'redux-form';
import Form, { IsEmail, MinLength, handleServerError } from '../../lib/validator';
import { Field } from '../controls';
import { connect } from 'react-redux';
import { actions as actionsApi } from '../../store/api';

class UserForm extends Component {
  createUser = (form) => {
    return this.props.onUserSubmit(form)
      .then(res => this.props.onUserCreated && this.props.onUserCreated(res.data))
      .catch(handleServerError);
  };

  render() {
    const { handleSubmit, userIsLoading } = this.props;
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

          {userIsLoading
            ? <div>Chargement...</div>
            :(
            <Button className="block full-width primary">
              Confirmer
            </Button>
          )}

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

const mapStateToProps = ({userIsLoading}) => {
  return {
    userIsLoading
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onUserSubmit: (user) => dispatch(actionsApi.postUser(user))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)
  (reduxForm({
    form: 'userForm',
    validate: Form({
      email: IsEmail(),
      password: MinLength(6),
    })
  })(UserForm));
