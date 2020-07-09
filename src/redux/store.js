import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import user from './user';
import characters, { getCharactersAction } from './characters';

const rootReducer = combineReducers({
  user,
  characters,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default function generateStore() {
  const store = createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(thunk))
  );
  getCharactersAction()(store.dispatch, store.getState);
  return store;
}
