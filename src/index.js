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

const imgorRootContainer = document.getElementById('imgor-root');

const { sport, gender, group, secondary_group, business_type } = imgorRootContainer.dataset;

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <ConnectedRouter history={history}>
        <React.Fragment>
          <Switch>
            <Route path="/" exact component={App} />
            <Route path="/start" component={(args) => {
              return(
                <InitialComponent
                  {...args}
                  sport={sport}
                  gender={gender}
                  group={group}
                  secondaryGroup={secondary_group}
                  businessType={business_type}
                />
              );
            }} />
          </Switch>
        </React.Fragment>
      </ConnectedRouter>
    </PersistGate>
  </Provider>,
  imgorRootContainer,
);
