import css from 'styled-jsx/css';

export default css`
  @import 'core/index';
  @import 'core/animations/opacity';

  .sidebar-app {
    .form-connexion-container {
      & { margin-left: 55px; margin-right: 55px; margin-top: 55px; }
      form { margin-bottom: 13px; }
      .form-group { margin-bottom: 19px; }

      button { color: $colorWhiteSmoke; padding: 3px 0; }
      .link {
        & { color: #555; cursor: pointer; transition: 0.2s all; display: block; position: relative; }
        &:after { content: ''; display: block; position: absolute; bottom: -2px; height: 2px; background: #555; width: 100%; transition: 0.2s all; }

        &:hover {
          & { color: $colorWhiteSmoke; }
          &:after { width: 0%; background: $colorWhiteSmoke;}
        }

      }

    }
  }

  .footer-app {
    & { font-size: $font20pt; padding: 11px 20px; }
    @include mobile { text-align: center; }
    a, span {
      & { margin-right: 15px; border: 0; }
      &:last-child { margin-right: 0; }
    }
    span { color: $colorLightBlack; }
    a {
      & { text-decoration: none; color: $colorDarkGrey }
      &:hover { text-decoration: underline; }
    }
  }
`;
