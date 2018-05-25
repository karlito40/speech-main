import Logo from '../../sprites/Logo';
import OnboadingForm from '../../forms/OnboadingForm';

export default () => (
  <div className="presentational-scene">
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
      <OnboadingForm />
    </div>
  </div>
);
