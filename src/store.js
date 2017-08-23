import { createStore, compose, applyMiddleware } from 'redux';
import { persistStore as _persistStore, autoRehydrate } from 'redux-persist';
import thunk from 'redux-thunk';

import reducer from './ducks';

export default function storeFactory() {
  return createStore(
    reducer,
    undefined,
    compose(
      autoRehydrate(),
      applyMiddleware(thunk),
    )
  );
}

export const persistStore = _persistStore;
