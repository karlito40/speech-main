import { Component } from 'react';
import Input from '../controls/Input';
import Button from '../controls/Button';

export default class extends Component {
  submit() {

  }


  render() {
    return (
      <form className="form-onboarding" method="post">
        <Input
          className="full-width"
          label="Je suis"
          name="my_gender"
          ico="user-avatar"/>

        <Input
          className="full-width"
          label="Je cherche"
          name="search_gender"
          ico="white-t-shirt"/>

        <Input
          className="full-width"
          label="Je suis née le"
          name="birthdate"
          type="date"
          ico="wristwatch"/>

        <Button className="block full-width primary" onClick={ this.submit.bind(this) }>
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
