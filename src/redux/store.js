import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import user, { restoreSessionAction } from './user';
import characters, { getCharactersAction } from './characters';

const rootReducer = combineReducers({
  user,
  characters,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const generateStore = () => {
  let store = createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(thunk))
  );
  getCharactersAction()(store.dispatch, store.getState);
  restoreSessionAction()(store.dispatch);
  return store;
};

export default generateStore;
