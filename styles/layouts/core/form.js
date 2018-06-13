import css from 'styled-jsx/css';

export default css`
  @import 'core/index';

  @mixin createInputColor($color, $toColor) {
    .body-form-group {
      & { color: $color; }
      &:after { background: $toColor; }
      input, select { border-bottom: 1px solid $color; }
    }

    &.size-2 input { border-bottom: 2px solid $color; }
    &.not-empty .ico { color: $toColor; }
  }

  @mixin createButtonColor($color, $toColor) {
    & { color: white; background: $color; border: 0; position: relative; box-shadow: inset 0 0 0 2px $color; }
    &:hover {
      & { background: transparent; color: $toColor; }
      &:before { border-top-color: $toColor; border-right-color: $toColor; transition: width 0.25s ease-out, height 0.25s ease-out 0.25s; }
      &:after { border-bottom-color: $toColor; border-left-color: $toColor; transition: border-color 0s ease-out 0.5s, width 0.25s ease-out 0.5s, height 0.25s ease-out 0.75s; }
    }
  }

  input.input-sp, select.select-sp, textarea.input-sp {
    & { appearance: none; border-radius: 0; border: 0; border-bottom: 1px solid $colorDeepBlack; padding: 2px 0px; background: transparent; }
    &:focus { outline: 0; }
  }

  .form-group {
    & { position: relative; font-size: $font18pt; }
    .body-form-group {
      & { position: relative; }
      &:after { content: ''; display: block; width: 0; height: 2px; position: absolute; bottom: 0; transition: 0.25s all ease; }
      label { position: absolute; bottom: 2px; pointer-events: none; transition: 0.25s all; }
      .ico { position: absolute; right: 0; bottom: 2px; pointer-events: none; transition: 0.1s color 0.15s;}
      input, select, textarea { padding-bottom: 4px; }
    }

    &.size-2 {
      .body-form-group {
        &:after { height:2px; }
        input { border-bottom: 2px solid $colorDeepBlack; }
      }

    }

    &.full-width {
      & { width: auto; margin-bottom: 20px; }
      input, select, textarea { width: 100%; }
    }

    &.txt-input {
      & { padding-top: 7px; }
      .body-form-group {
        label { font-style: italic; color: $colorDarkGrey; top: 4px; bottom: auto; }
        input, textarea { border: 0; }
        &:after { display: none; }
      }

      &:hover {
        label { color: $colorNotif; }
      }

      &.not-empty {
        .body-form-group {
          label { transform: translateX(0px) translateY(-20px); opacity: 1; font-size:  $font16pt; }
        }
      }
    }

    @include createInputColor($colorDeepBlack, black);

    @each $name, $value in $colors {
      &.c-#{$name} {
        @include createInputColor($value, lighten($value, 40%));
      }
    }

    &.not-empty {
      .body-form-group {
        &:after { width: 100%; }
        label { opacity: 0; transform: translateX(10px); }
      }
    }
  }

  .form-error { margin: 5px 0; }

  button.btn-sp {
    & { box-sizing: border-box; }

    &:focus { outline: 0; }

    &:before,
    &:after { box-sizing: border-box; content: ''; position: absolute; border: 2px solid transparent; width: 0; height: 0; }

    &:before { top: 0; left: 0; }
    &:after { bottom: 0; right: 0; }

    &:hover {
      &:before,
      &:after { width: 100%; height: 100%; }
    }

    @include createButtonColor($colorDeepBlack, $colorDeepBlack);
    &.primary {
      &:before { border: 0; right: 0; width: 100%; left: auto; background-color: $colorDeepBlack;}
      &:after { border: 0; }
      &:hover {
        & { transition: 0.35s background; }
        ${'' /* & { box-shadow: none; } */}
        ${'' /* &:before { border-top-color: transparent; border-right-color: transparent; transition: none; } */}
        &:before { border-top-color: transparent; border-right-color: transparent; transition: 0.35s width ease-out; width: 0; }
        ${'' /* &:after { left: 0; border-bottom-color: $colorDeepBlack; border-left-color: transparent; transition: border-color 0s ease-out, width 0.4s ease-out; } */}
        ${'' /* &:after { border: 0 } */}
      }
    }



    @each $name, $value in $colors {
      &.c-#{$name} {
        @include createButtonColor($value, lighten($value, 40%));
      }
    }

    &.outlined { background: transparent; }
  }


  .react-datepicker-wrapper,
  .react-datepicker__input-container,
  .react-datepicker__input-container input {
    display: block;
    width: 100%;
    outline: 0;
  }
  .react-datepicker__input-container input { border: 0; border-bottom: 1px solid $colorDeepBlack; padding: 2px 0px; background: transparent; }
`;
