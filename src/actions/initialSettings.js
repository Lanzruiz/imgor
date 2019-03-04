// Modules
import { push } from 'connected-react-router';
// Constants
import * as initialSettingsTypes from '../constants/initialSettings';

export function setInitialSettings(initialSettings) {
  return {
    type: initialSettingsTypes.SET_INITIAL_SETTINGS,
    payload: initialSettings,
  };
}

export function updateInitialSettings(settings) {
  
  
  return {
    type: initialSettingsTypes.UPDATE_INITIAL_SETTINGS,
    payload: settings,
  };
}

export function redirectToMainPage(initialSettings) {
  return function(dispatch) {
    const { lang, sport, packageType, businessType, urlToNoProps } = initialSettings;
    if (lang || sport || packageType || businessType) {
      dispatch( setInitialSettings(initialSettings), );
    }
    dispatch( push(urlToNoProps || process.env.REACT_APP_REDIRECT_URL_TO_NO_PROPS), );
  }
}
