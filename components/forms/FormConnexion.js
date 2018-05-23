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
            className="c-dark-grey full-width"
            label="Email"
            name="email"
            ico="envelope"
            onChange={ this.validate.bind(this) }/>

          <Input
            className="c-dark-grey full-width"
            label="Mot de passe"
            name="password"
            ico="locked-padlock"
            onChange={ this.validate.bind(this) }/>

          <Button className="c-dark-grey outlined block full-width" onClick={ this.submit.bind(this) }>
            Connexion
          </Button>
        </form>
        
        <div className="horiz-center">
            <div className="link" onClick={ this.handleLostPassword.bind(this) }>Mot de passe perdu</div>
        </div>

      </div>
    );
  }

}
