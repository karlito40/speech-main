import axios from 'axios';
import { ucFirst, replace } from '../lib/string';

const routes = [
  { method: 'GET', path: '/me', as: 'me' },
  { method: 'POST', path: '/user', as: 'user' },
  { method: 'POST', path: '/profile', as: 'profile' }
];

let actions = {};
let reducers = {};

routes.forEach(({ method, path, as }) => {
  const actionMethodName = method.toLowerCase() + ucFirst(as);
  const typeRoot = method.toUpperCase() + '_' + as.toUpperCase();

  actions[actionMethodName] = (data) => (dispatch, getState) => {

    path = (data && data._params) ? replace(path, data._params) : path;
    let token = (data && data._token) ? data._token : null;
    let options = {
      headers: {},
      url: (data && data._isServer)
        ? process.env.API_HOST + path
        : '/api' + path
    };

    delete data._params;
    delete data._token;

    if(!token) {
      const { user } = getState();
      token = user && user.token;
    }

    if(token) {
      options.headers['Authorization'] = `Bearer ${token}`;
    }

    dispatch({ type: `${typeRoot}_INIT` });
    return axios({
      ...{
        method: method.toLowerCase(),
        data: data
      }, ...options})
      .then(response => {
        return dispatch({ type: `${typeRoot}_SUCCEEDED`, data: response.data.data });
      })
      .catch(function (error) {
        dispatch({ type: `${typeRoot}_FAILED`, error: error.response.data });
        throw error.response.data;
      });
  }

  if(!reducers[`${as}IsLoading`]) {
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
  }

});

export { actions, reducers };
