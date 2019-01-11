// Modules
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { Route, Switch } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';
import axios from 'axios';
// Containers
import App from './containers/App';
import InitialComponent from './containers/InitialComponent';
// Store
import configStore, { history } from './store';
// Styles
import './index.scss';

const { store, persistor } = configStore;

const imgorRootContainer = document.getElementById('imgor-root');

const { sport, gender, group, secondary_group, business_type, apiUrl, redirectUrlShopify, urlToNoProps } = imgorRootContainer.dataset;

export const instance = axios.create({
  baseURL: apiUrl || process.env.REACT_APP_API_URL,
});

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={<div>Loading...</div>} persistor={persistor}>
      <ConnectedRouter history={history}>
        <React.Fragment>
          <Switch>
            <Route path="/start" exact component={(args) => {
              return (
                <InitialComponent
                  {...args}
                  sport={sport}
                  gender={gender}
                  group={group}
                  secondaryGroup={secondary_group}
                  businessType={business_type}
                  redirectUrlShopify={redirectUrlShopify}
                  urlToNoProps={urlToNoProps}
                />
              );
            }} />
            <Route path={urlToNoProps || process.env.REACT_APP_REDIRECT_URL_TO_NO_PROPS} exact component={(args) => {
              return (
                <App
                  {...args}
                  redirectUrlShopify={redirectUrlShopify}
                  sport={sport}
                  gender={gender}
                  group={group}
                  secondaryGroup={secondary_group}
                  businessType={business_type}
                  urlToNoProps={urlToNoProps}
                />
              );
            }} />
            <Route path="/" component={(args) => {
              return (
                <InitialComponent
                  {...args}
                  sport={sport}
                  gender={gender}
                  group={group}
                  secondaryGroup={secondary_group}
                  businessType={business_type}
                  redirectUrlShopify={redirectUrlShopify}
                  urlToNoProps={urlToNoProps}
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
