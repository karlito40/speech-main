import { createStore, applyMiddleware, combineReducers } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunkMiddleware from 'redux-thunk'
import * as reducers from './reducers';
import { reducer as formReducer } from 'redux-form'

export function initializeStore (initialState) {
  return createStore(combineReducers({
    ...reducers,
    ...{ form: formReducer }
  }), initialState, composeWithDevTools(applyMiddleware(thunkMiddleware)))
}
