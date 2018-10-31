// Modules
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import thunk from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist';
import localForage from 'localforage';
// Reducers
import rootReducer from '../reducers';

const persistConfig = {
  key: 'root',
  storage: localForage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const configureStore = () => {
  const store = createStore(persistedReducer, {}, composeWithDevTools(applyMiddleware(thunk)));
  const persistor = persistStore(store);
  return { store, persistor };
}

export default configureStore();
