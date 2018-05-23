import css from 'styled-jsx/css';

export default css`
  @import 'core/index';

  .brand {
    & { background-color: black; color: white; display: inline-block; padding: 0 25px; border-radius: 24px; text-decoration: none; border-bottom: 0; }
    .brand-logo{font-size: 24px; margin-right: 8px; line-height: 36px; }
    .brand-title{font-size: 20px; text-transform: uppercase; font-family: 'Delius Unicase', 'Lato'; }

    &.min {
      & { padding: 0 19px; }
      .brand-logo{ font-size: 16px; }
      .brand-title{ font-size: 14px; }
    }
  }
`;
