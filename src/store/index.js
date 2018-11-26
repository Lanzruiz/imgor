// Modules
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import thunk from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist';
import localForage from 'localforage';
import { createBrowserHistory } from 'history';
import { routerMiddleware } from 'connected-react-router';
// Reducers
import rootReducer from '../reducers';

export const history = createBrowserHistory();

const persistConfig = {
  key: 'root',
  storage: localForage,
};

const configureStore = () => {
  const persistedReducer = persistReducer(persistConfig, rootReducer(history));
  const store = createStore(persistedReducer, {}, composeWithDevTools(
    applyMiddleware(thunk, routerMiddleware(history)),
  ));
  const persistor = persistStore(store);
  return { store, persistor };
}

export default configureStore();
