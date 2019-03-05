// Modules
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import thunk from 'redux-thunk';
//import { persistStore, persistReducer } from 'redux-persist';
//import localForage from 'localforage';
import { createBrowserHistory } from 'history';
import { routerMiddleware } from 'connected-react-router';
import { gtmReduxMiddleware } from '../helpers/GTMService';
// Reducers
import rootReducer from '../reducers';

// export const history = createBrowserHistory();

// const configureStore = (persistKey) => {
//   const persistConfig = {
//     key: persistKey || 'root',
//     storage: localForage,
//   };
//   const persistedReducer = persistReducer(persistConfig, rootReducer(history));
//   const store = createStore(persistedReducer, {}, composeWithDevTools(
//     applyMiddleware(thunk, routerMiddleware(history)),
//   ));
//   const persistor = persistStore(store);
//   return { store, persistor };
// }

// export default configureStore;

  export const history = createBrowserHistory();

  const store = createStore(rootReducer(history), composeWithDevTools(
    applyMiddleware(thunk, routerMiddleware(history), gtmReduxMiddleware),
  ));

  export default store;