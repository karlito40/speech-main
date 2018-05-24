import css from 'styled-jsx/css';

export default css`
  @import 'core/index';

  .brand {
    & { display: inline-flex; background-color: black; color: white; padding: 0 25px; border-radius: 24px; text-decoration: none; border-bottom: 0; overflow: hidden; }

    .brand-logo { display: block; font-size: 20px; margin-right: 8px; line-height: 33px; }
    .brand-title { display: block; font-size: 20px; text-transform: uppercase; font-family: 'Delius Unicase', 'Lato'; line-height: 35px; }

    &.min {
      & { padding: 0 19px; }
      .brand-logo{ font-size: 16px; line-height: 27px; }
      .brand-title{ font-size: 14px; line-height: 29px; }
    }
  }
`;
