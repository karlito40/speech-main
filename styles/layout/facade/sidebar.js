import css from 'styled-jsx/css';

export default css`
  @import 'core/index';

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

    .m-rtl { opacity: 0; transform: translateX(35px); transition: 0.6s all 0.22s; }
    &.show .m-rtl { opacity: 1; transform: translateX(0); }
  }
`;
