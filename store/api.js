import axios from 'axios';
import { ucFirst, placeholder } from '../lib/string';
import { getCookie } from '../lib/cookie';

const routes = [
  { method: 'GET', path: '/me', as: 'me' },
  { method: 'POST', path: '/user', as: ['me', 'user'] },
  { method: 'POST', path: '/profile', as: ['profileApp', 'profile'] },
  { method: 'PUT', path: '/profile/:id', as: ['profileApp', 'profile'] },
  { method: 'POST', path: '/token', as: 'token' },
];

let actions = {};
let reducers = {};

function handleRoute({method, path, actionType}) {

  const actionMethodName = method.toLowerCase() + ucFirst(actionType);
  const typeRoot = method.toUpperCase() + '_' + actionType.toUpperCase();

  actions[actionMethodName] = (data) => (dispatch, getState) => {
    path = (data && data._params) ? placeholder(path, data._params) : path;
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
      token = getCookie('token');
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

  if(!reducers[`${actionType}IsLoading`]) {
    reducers[`${actionType}IsLoading`] = (state = false, action) => {
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

}

routes.forEach(route => {
  const as = (!Array.isArray(route.as)) ? [route.as] : route.as;
  as.forEach(actionType => handleRoute({ ...route, ...{ actionType } }));
});

export { actions, reducers };
