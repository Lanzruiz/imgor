// Modules
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
// Containers
import App from './containers/App';
// Store
import { store } from './store';
// Styles
import './index.scss';

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('imgor-root'),
);
