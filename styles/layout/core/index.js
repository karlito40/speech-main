import css from 'styled-jsx/css';
import normalize from './normalize';
import base from './base';
import helpers from './helpers';
import sidebar from './sidebar';
import form from './form';
import header from './header';
import sprites from './sprites';
import main from './main';

const core = css`
  @import 'fonts/lato';
  @import 'fonts/flaticon';
`;

export {
  core,
  normalize,
  base,
  helpers,
  main,
  sidebar,
  form,
  header,
  sprites
};
