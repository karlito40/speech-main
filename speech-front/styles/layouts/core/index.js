import css from 'styled-jsx/css';
import normalize from './normalize';
import base from './base';
import helpers from './helpers';
import form from './form';
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
  form,
  sprites
};
