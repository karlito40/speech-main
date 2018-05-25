import css from 'styled-jsx/css';

export default css`
  @import 'core/index';
  @import 'core/animations/motion';
  @import 'core/animations/opacity';

  .scene {
    .wrapper { display: flex; align-items: center; justify-content: between; padding: 50px 20px; }
    h2 { font-size: $font36pt; }
    p { font-size: $font24pt; color: $colorDarkGrey;  }
    img { width: 460px; }

    @include mobile {
      & { text-align: center; }
      .wrapper { display: block; }
      p { margin: 35px 0; }
      .screen { width: 80%; margin: 0 auto; }
      img { width: 100%; }
    }
  }

  .scene-1 { margin-bottom: 90px; }

  .presentational-scene {
    & { font-size: $font20pt; max-width: 400px; padding:0 20px; margin: 0 auto; text-align: center; padding-top: 70px; }
    .onboarding-container { animation: 0.3s ease-out motion 0.4s forwards; opacity: 0; transform: translateY(-15px); }
    .brand {
      & { margin-bottom: 60px; animation: 0.1s ease-out 0.3s opacity forwards; opacity: 0; }
      .brand-logo { animation: 0.31s ease 0.55s motion forwards; transform: translateY(-10px); opacity: 0; }
      .brand-title { animation: 0.35s ease 0.85s motion forwards; transform: translateY(-10px); opacity: 0; }
    }
    h1 { font-size: $font24pt; padding-bottom: 5px; }
    p { color: $colorDarkGrey; margin-bottom: 40px; margin-top: 20px; }
  }

  .profile-scene {
    & { background-color: #fafafa; border-top: 1px solid #eaeaea; border-bottom: 1px solid #eaeaea; }
    .info { margin-right: 70px; }

    @include mobile {
      .wrapper { overflow: hidden; padding-bottom: 0px; }
      .info { margin-right: 0; }
      .screen { position: relative; top: 60px; margin-top: -60px; }
      img { margin-left: -5px; width: 100%; }
    }
  }

  .discover-scene {
    .screen { order: 1; margin-left: -27px; margin-right: 70px; }
    .info { order: 2; }

    @include mobile {
      .screen { margin: auto; }
    }
  }

  .scene-4 {
    & { min-height: 300px; display: flex; align-items: center; justify-content: center; text-align: center; flex-direction: column; }
    .ico { font-size: 30px; }
  }
`;
