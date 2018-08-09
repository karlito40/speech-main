import axios from 'axios';
import { ucFirst, placeholder } from '../lib/string';
import { getCookie } from '../lib/cookie';
import { delProperties } from '../lib/object';
import queryString from 'query-string';
import { getStore } from './index';

const routes = [
  { method: 'GET', path: '/me', as: 'me' },
  { method: 'POST', path: '/user', as: ['me', 'user'] },
  { method: 'POST', path: '/profile', as: ['profileApp', 'profile'] },
  { method: 'GET', path: '/profile/:id', as: ['profileDisplay'] },
  { method: 'PUT', path: '/profile/:id', as: ['profileApp'] },
  { method: 'GET', path: '/profile/:id/for', as: ['forProfiles'], listing: true },
  { method: 'POST', path: '/profile/:id/photo', as: ['profilePhotosApp'] },
  { method: 'DELETE', path: '/profile/:id/photo/:photoId', as: ['profilePhotosApp'] },
  { method: 'POST', path: '/token', as: 'token' },
];

let actions = {};
let reducers = {};

function handleRoute({method, path, actionType, listing}) {

  const actionMethodName = method.toLowerCase() + ucFirst(actionType);
  const typeRoot = method.toUpperCase() + '_' + actionType.toUpperCase();

  actions[actionMethodName] = (data = {}, customize = {}) => (dispatch, getState) => {
    const isServer = (data && data._req);
    const realPath = (data && data._params) ? placeholder(path, data._params) : path;
    let token = (data && data._token) ? data._token : null;
    if(!token && isServer) {
      token = data._req.cookies.token;
    }

    if(!token) {
      token = getCookie('token');
    }

    let options = {
      headers: {},
      url: (isServer) ? process.env.API_HOST + realPath : '/api' + realPath,
      ...customize
    };

    if(data && data._query) {
      options.url += '?' + queryString.stringify(data._query);
    }

    delProperties(data, ['_params', '_token', '_query', '_req']);

    if(token) {
      options.headers['Authorization'] = `Bearer ${token}`;
    }

    const form = data.formData || data;
    dispatch({ type: `${typeRoot}_INIT` });
    return axios({
        ...{
          method: method.toLowerCase(),
          data: form
        },
        ...options
      })
      .then(response => {
        return dispatch({
          type: `${typeRoot}_SUCCEEDED`,
          data: (listing) ? response.data : response.data.data
        });
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

export function withSocket(socket) {
  socket.on('api', (res) => {
    return getStore().dispatch({
      type: `${res.eventName.toUpperCase()}_SCK`,
      data: res.data
    });
  });
}

const routesWithAction = [];
routes.forEach(route => {
  const as = (!Array.isArray(route.as)) ? [route.as] : route.as;
  as.forEach(actionType => {
    const routeWithAction = { ...route, actionType };
    routesWithAction.push(routeWithAction);
    handleRoute(routeWithAction);
  });
});

export { actions, reducers, routes, routesWithAction };
