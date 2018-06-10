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
`;
