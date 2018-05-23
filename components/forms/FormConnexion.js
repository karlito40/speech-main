import { Component } from 'react';
import Input from '../controls/Input';
import Button from '../controls/Button';

export default class extends Component {

  validate(value, name) {
    console.log('validate', value, name);
  }

  submit() {

  }

  handleLostPassword() {

  }

  render() {
    return (
      <div className="form-connexion-container">
        <form className="form-connexion" method="post" action="/connexion">
          <Input
            className="dark-grey"
            label="Email"
            name="email"
            ico="envelope"
            onChange={ this.validate.bind(this) }/>

          <Input
            className="dark-grey"
            label="Mot de passe"
            name="password"
            ico="locked-padlock"
            onChange={ this.validate.bind(this) }/>

          <Button className="lighter-grey outlined" onClick={ this.submit.bind(this) }>
            Connexion
          </Button>
        </form>

        <div className="link txt-center" onClick={ this.handleLostPassword.bind(this) }>Mot de passe perdu</div>
      </div>
    );
  }

}
