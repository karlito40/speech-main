import css from 'styled-jsx/css';

export default css`
  @import 'core/index';

  input {
    & { border: 0; border-bottom: 2px solid $colorDeepBlack; padding: 2px 0px; background: transparent; }
    &:focus { outline: 0; }
  }

  .form-group {
    & { position: relative; }
    &:after { content: ''; display: block; width: 0; height: 2px; position: absolute; bottom: 0; background: $colorHighlight; transition: 0.25s all; }
    label { position: absolute; bottom: 2px; pointer-events: none; transition: 0.30s all; }
    .ico { position: absolute; right: 0; bottom: 2px; pointer-events: none; }
    input { padding-bottom: 4px; }

    &.white-smoke {
      & { color: $colorWhiteSmoke; }
      input { border-bottom: 2px solid $colorWhiteSmoke; }
    }

    &.dark-grey {
      & { color: $colorDarkGrey; }
      input { border-bottom: 2px solid $colorDarkGrey; }
    }

    &.not-empty {
      &:after { width: 100%; background: $colorWhiteSmoke; }
      .ico { color: $colorWhiteSmoke; }
      label { opacity: 0; transform: translateX(25px); }
    }
  }

`;


// export default css`
//   @import 'core/index';
//
//   input { outline: 0; border: 0; border-bottom: 1px solid $colorDeepBlack; padding: 2px 0px; }
//
//   .form-group {
//     & { position: relative; }
//     label { position: absolute; bottom: 2px; pointer-events: none; transition: 0.2s all; }
//     ${'' /* label */}
//     .ico { position: absolute; right: 0; bottom: 2px; }
//
//   }
//
// `;
