// Modules
import { push } from 'connected-react-router';
// Constants
import * as initialSettingsTypes from '../constants/initialSettings';

export function setInitialSettings(initialSettings) {
  console.log(initialSettings);
  return {
    type: initialSettingsTypes.SET_INITIAL_SETTINGS,
    payload: initialSettings,
  };
}

export function redirectToMainPage(initialSettings) {
  return function(dispatch) {
    const { lang, sport, packageType, businessType } = initialSettings;
    if (lang || sport || packageType || businessType) {
      dispatch(setInitialSettings(initialSettings));
      dispatch(push('/'));
    }
  }
}