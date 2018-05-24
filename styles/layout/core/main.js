import css from 'styled-jsx/css';

export default css`
  @import 'core/index';

  .main-app {
    & { transition: 0.38s all ease-out; position: relative; }
    &.has-sidebar {
      & { padding-right: 320px; }
    }
  }

  .header-app {
    & { padding: 5px 10px; padding-right: 30px; border-top: 3px solid $colorDeepBlack; }

    .navbar {
      & { display: flex; align-items: center; font-size: $font20pt; }
      .navbar-nav {
        & { margin: 0; margin-left: auto; display: flex; }
        a {
          & { border: 0; display: block; margin-left: 25px; display: inline-flex; }
          .nav-label {
            & { display: block; position: relative; }
            &:after { content: ''; display: block; position: absolute; bottom: -2px; height: 2px; background: $colorDeepBlack; width: 0; transition: 0.2s all; }
          }
          &:hover .nav-label:after { width: 100%; }
          .ico { margin-left: 10px; }
        }
      }
    }

    @include mobile {
      & { padding-right: 15px; }
    }

  }

  .sidebar-app {
    & { background-color: $colorDeepBlack; color: $colorDarkGrey; position: fixed; top: 0; right: -320px; bottom: 0; width: 320px; font-size: $font18pt; transition: 0.38s all ease-out; outline: 0; }
    > * { opacity: 0; transform: translateX(35px); transition: 0.6s all 0.22s; }
    &.show {
      & { transform: translateX(-320px); }
      > * { opacity: 1; transform: translateX(0); }
    }

  }
`;
