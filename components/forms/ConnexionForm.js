import { Component } from 'react';
import { Input, Button } from '../controls';

export default class extends Component {

  validate(value, name) {
    console.log('validate', value, name);
  }

  submit() {

  }

  handleLostPassword() {

  }

  render() {
    const { className } = this.props;

    return (
      <div className={`form-connexion-container ${className || ''}`}>
        <form className="form-connexion" method="post" action="/connexion">
          <Input
            className="c-dark-grey full-width size-2"
            label="Email"
            name="email"
            ico="envelope"
            onChange={ this.validate.bind(this) }/>

          <Input
            className="c-dark-grey full-width size-2"
            label="Mot de passe"
            name="password"
            type="password"
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
