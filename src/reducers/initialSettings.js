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
      console.log('SET_INITIAL_SETTINGS ', payload);
      return {
        ...state,
        ...payload,
      };
    }
    default: {
      return state;
    }
  }
}
