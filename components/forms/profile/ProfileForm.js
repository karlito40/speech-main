import { Component } from 'react';
import { Field, Button } from '../../controls';
import { reduxForm } from 'redux-form';
import Form, { IsEmail, MinLength } from '../../../lib/validator';
import { handleServerError } from '../../../lib/error';
import { connect } from 'react-redux';
import { actions as actionsApi } from '../../../store/api';
import Router from 'next/router';

class ProfileForm extends Component {

  handleConnexion = (form) => {
    
  };

  render() {
    const { className, handleSubmit, tokenIsLoading } = this.props;

    return (
      <div className={`form-connexion-container ${className || ''}`}>
        <form className="form-connexion" onSubmit={handleSubmit(this.handleConnexion)}>
          <Field
            className="c-dark-grey full-width size-2"
            label="Email"
            name="email"
            ico="envelope"
          />

          <Field
            className="c-dark-grey full-width size-2"
            label="Mot de passe"
            name="password"
            type="password"
            ico="locked-padlock"
          />

          {tokenIsLoading
            ? <div className="txt-center">Chargement...</div>
            : (
              <Button className="c-dark-grey outlined block full-width">
                Connexion
              </Button>
            )
          }
        </form>

      </div>
    );
  }

}


const mapStateToProps = ({tokenIsLoading}) => {
  return {
    tokenIsLoading
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onConnexionSubmit: (form) => dispatch(actionsApi.postToken(form))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)
  (reduxForm({
    form: 'connexionForm',
    validate: Form({
      email: IsEmail(),
      password: MinLength(6),
    })
  })(ProfileForm));
