import css from 'styled-jsx/css';
import normalize from './normalize';
import base from './base';
import helpers from './helpers';
import sidebar from './sidebar';
import form from './form';

const core = css`
  @import 'fonts/lato';
  @import 'fonts/flaticon';
`;

export {
  core,
  normalize,
  base,
  helpers,
  sidebar,
  form
};
