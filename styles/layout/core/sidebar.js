import css from 'styled-jsx/css';

export default css`
  @import 'core/index';

  .sidebar-app {
    & { background-color: $colorDeepBlack; color: $colorDarkGrey; position: fixed; top: 0; right: -320px; bottom: 0; width: 320px; font-size: 14px; transition: 0.38s all ease-out; }
    &.show { transform: translateX(-320px); }
  }
`;
