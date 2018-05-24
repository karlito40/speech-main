import Logo from '../../sprites/Logo';
import React from 'react';
import OnboadingForm from '../../forms/OnboadingForm';

export default () => (
  <React.Fragment>
    <div className="presentation">
      <Logo/>
      <div className="onboarding-container">
        <div className="site-description ">
          <h1>Séduction par les mots</h1>
          <p>
            Serez vous capable de trouver votre âme soeur
            uniquement à l’aide votre prose ? Prenez votre temps
            et révélez vous l’un l’autre au bon moment.
          </p>
        </div>
        <OnboadingForm/>
      </div>
    </div>

    <style jsx>{`
      @import 'core/index';
      @import 'core/animations/motion';
      @import 'core/animations/opacity';

      .presentation {
        & { font-size: $font20pt; width: 370px; margin: 0 auto; text-align: center; padding-top: 70px; }
        .onboarding-container { animation: 0.3s ease-out motion 0.4s forwards; opacity: 0; transform: translateY(-15px); }
        :global(.brand) {
          & { margin-bottom: 60px; animation: 0.1s ease-out 0.3s opacity forwards; opacity: 0; }
          :global(.brand-logo) { animation: 0.31s ease 0.65s motion forwards; transform: translateY(-10px); opacity: 0; }
          :global(.brand-title) { animation: 0.35s ease 0.95s motion forwards; transform: translateY(-10px); opacity: 0; }
        }
        h1 { font-size: $font24pt; padding-bottom: 5px; }
        p { color: $colorDarkGrey; margin-bottom: 40px; }
      }
    `}</style>
  </React.Fragment>

);
