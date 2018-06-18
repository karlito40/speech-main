import css from 'styled-jsx/css';

export default css`
  @import 'core/index';

  .txt-center { text-align: center; }
  .txt-left { text-align: left; }
  .txt-right { text-align: right; }
  .txt-danger { color: $colorNotif; }

  .counter { background-color: $colorNotif; border-radius: 50%; color: white; padding: 2px; display: table-cell; text-align: center; vertical-align: middle; min-width: 18px; min-height: 18px;}
  .full-width { width: 100%; }
  .block { display: block; }

  .horiz-center { display: flex; justify-content: center; }
  .pointer { cursor: pointer; }
  .ico-close { width: 22px; height: 22px; background: url('/static/img/icos/multiply.svg'); }

  .wrapper { max-width: $desktopMainWidth; margin: 0 auto; padding: 0 20px; box-sizing: border-box; }

  .columns {
    & { display: flex; }
    &.full-width .column { flex: 1 };
    .column {
      & { margin-left: 40px; }
      &:first-child { margin-left: 0 }
      &.is-small { flex: 0 0 320px; }
    }
  }

  .module {
    & { border-top: 1px solid $colorDeepBlack; padding-top: 10px; padding-bottom: 30px; }

    .module-label { font-size: $font18pt; }
    .module-header { margin-bottom: 20px; }
  }

  @each $name, $value in $fonts {
    &.is-#{$name} {
      font-size: $value;
    }
  }

  .is-round { border-radius: 5px; }

  .menu {
    & { display: flex; padding: 0; }

    a {
      & { cursor: pointer; border: 0; display: block; position: relative; color: $colorDarkGrey; font-style: italic; }
      &.is-active, &.is-activeable { color: $colorDeepBlack; font-style: normal; }
      &:after { content: ''; display: block; position: absolute; bottom: -2px; height: 2px; background: $colorDeepBlack; width: 0; transition: 0.2s all; }
      &:hover:after { width: 100%; }
    }

    .menu-item {
      & { margin-left: 25px; }
      &:first-child { margin-left: 0; }
    }

  }

`;
