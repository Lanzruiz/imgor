// Modules
import assign from 'lodash/assign';
import { PURGE } from 'redux-persist';
// Constants
import * as initialSettingsTypes from '../constants/initialSettings';

const initialSettings = {
  businessType: 'Youth Camp',
  packageType: 'Sport',
  sport: 'Soccer',
  lang: 'en',
  gender: '',
};

export default function(state = initialSettings, action) {
  const { type, payload } = action;
  switch(type) {
    case initialSettingsTypes.SET_INITIAL_SETTINGS: {
      const { businessType, gender, group, secondaryGroup, packageType, sport, lang, redirectUrlShopify, lastChanged } = payload;
      const settings = {
        redirectUrlShopify,
        lastChanged,
        sport: sport || state.sport,
        gender: gender || state.gender,
        group: group || state.group,
        secondaryGroup: secondaryGroup || state.secondaryGroup,
        businessType: businessType || state.businessType,
        packageType: packageType || state.packageType,
        lang: lang || state.lang,
      };
      return assign({}, state, settings);
    }

    case PURGE: {
      return assign({}, initialSettings);
    }

    default: {
      return state;
    }
  }
}
