import axios from 'axios';
import { ucFirst } from '../lib/string';

const routes = [
  { method: 'POST', path: '/user', as: 'user' }
];

let actions = {};
let reducers = {};

routes.forEach(({ method, path, as }) => {
  const actionMethodName = method.toLowerCase() + ucFirst(as);
  const typeRoot = method.toUpperCase() + '_' + as.toUpperCase();

  actions[actionMethodName] = (data) => (dispatch) => {
    dispatch({ type: `${typeRoot}_INIT` });
    return axios({
        method: method.toLowerCase(),
        url: '/api' + path,
        data: data
      })
      .then(response => {
        return dispatch({ type: `${typeRoot}_SUCCEEDED`, user: response.data.data });
      })
      .catch(function (error) {
        dispatch({ type: `${typeRoot}_FAILED`, error: error });
        throw error;
      });
  }

  reducers[`${as}IsLoading`] = (state = false, action) => {
    switch (action.type) {
      case `${typeRoot}_FAILED`:
      case `${typeRoot}_SUCCEEDED`:
        return false;
      case `${typeRoot}_INIT`:
        return true;

      default:
        return state;
    }
  }

});

export { actions, reducers };
