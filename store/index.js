import { createStore, applyMiddleware, combineReducers } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunkMiddleware from 'redux-thunk'
import * as reducers from './reducers';
import { reducer as formReducer } from 'redux-form'
import { reducers as apiReducers } from './api';

export function initializeStore (initialState) {
  return createStore(combineReducers({
    ...reducers,
    ...{ form: formReducer },
    ...apiReducers
  }), initialState, composeWithDevTools(applyMiddleware(thunkMiddleware)))
}
