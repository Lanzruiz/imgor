// Modules
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { Route, Switch } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router'
// Containers
import App from './containers/App';
import InitialComponent from './containers/InitialComponent';
// Store
import configStore, { history } from './store';
// Styles
import './index.scss';

const { store, persistor } = configStore;

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <ConnectedRouter history={history}>
        <div>
          <Switch>
            <Route path="/" exact component={App} />
            <Route path="/start" component={InitialComponent} />
          </Switch>
        </div>
      </ConnectedRouter>
    </PersistGate>
  </Provider>,
  document.getElementById('imgor-root'),
);
