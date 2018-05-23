import css from 'styled-jsx/css';

export default css`
  @import 'core/index';

  input {
    & { border: 0; border-bottom: 2px solid $colorDeepBlack; padding: 2px 0px; background: transparent; }
    &:focus { outline: 0; }
  }

  .form-group {
    & { position: relative; }
    &:after { content: ''; display: block; width: 0; height: 2px; position: absolute; bottom: 0; transition: 0.3s all ease-in; }
    label { position: absolute; bottom: 2px; pointer-events: none; transition: 0.25s all; }
    .ico { position: absolute; right: 0; bottom: 2px; pointer-events: none; }
    input { padding-bottom: 4px; }

    &.full-width {
      & { width: auto; }
      input { width: 100%; }
    }

    @each $name, $value in $colors {
      &.c-#{$name} {
        & { color: $value; }
        &:after { background: $value; }
        input { border-bottom: 2px solid $value; }
      }
    }

    &.not-empty {
      &:after { width: 100%; background: $colorWhiteSmoke; }
      .ico { color: $colorWhiteSmoke; }
      label { opacity: 0; transform: translateX(10px); }
    }
  }

  button {
    & { box-sizing: border-box; }
    &:focus { outline: 0; }

    @each $name, $value in $colors {
      &.c-#{$name} {
        & { color: white; background: $value; }
        &.outlined {

          & { border: 0; position: relative; background: transparent; box-shadow: inset 0 0 0 2px $value;}
          &:before,
          &:after { box-sizing: border-box; content: ''; position: absolute; border: 2px solid transparent; width: 0; height: 0; }

          &:before { top: 0; left: 0; }
          &::after { bottom: 0; right: 0; }

          &:hover {
            &:before,
            &:after { width: 100%; height: 100%; }

            &:before { border-top-color: lighten($value, 40%); border-right-color: lighten($value, 40%); transition: width 0.25s ease-out, height 0.25s ease-out 0.25s; }
            &:after { border-bottom-color: lighten($value, 40%); border-left-color: lighten($value, 40%); transition: border-color 0s ease-out 0.5s, width 0.25s ease-out 0.5s, height 0.25s ease-out 0.75s; }
          }




          ${'' /* &:hover,
          &:focus { border: 2px solid transparent; border-bottom: 2px solid lighten($value, 90%); } */}
        }

      }
    }
  }

`;
