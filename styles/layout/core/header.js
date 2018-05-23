import css from 'styled-jsx/css';

export default css`
  @import 'core/index';
  
  .header-app {
    & { padding: 5px 10px; padding-right: 30px; }

    .navbar {
      & { display: flex; align-items: center; font-size: 15px; }
      .navbar-nav {
        & { margin: 0; margin-left: auto; display: flex; }
        a {
          & { border: 0; display: block; margin-left: 25px; position: relative; }
          &:after { content: ''; display: block; position: absolute; bottom: -2px; height: 2px; background: $colorDeepBlack; width: 0; transition: 0.2s all; }
          &:hover:after { width: 100%; }
        }
      }

    }

  }
`;
