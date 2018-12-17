// Constants
import * as initialSettingsTypes from '../constants/initialSettings';

const initialSettings = {
  businessType: 'Youth Camp',
  packageType: 'Sport',
  sport: 'Soccer',
  lang: 'en',
};

export default function(state = initialSettings, action) {
  const { type, payload } = action;
  switch(type) {
    case initialSettingsTypes.SET_INITIAL_SETTINGS: {
      const { businessType, packageType, sport, lang } = payload;
      return {
        ...state,
        businessType: businessType ? businessType : state.businessType,
        packageType: packageType ? packageType : state.packageType,
        sport: sport ? sport : state.sport,
        lang: lang ? lang : state.lang,
      };
    }
    default: {
      return state;
    }
  }
}
