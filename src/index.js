// Modules
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
// Containers
import App from './containers/App';
// Store
import configStore from './store';
// Styles
import './index.scss';

const { store, persistor } = configStore;

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App
        businessType=""
        sport=""
        lang="en"
      />
    </PersistGate>
  </Provider>,
  document.getElementById('imgor-root'),
);
