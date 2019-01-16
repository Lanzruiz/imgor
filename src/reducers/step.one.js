// Modules
import isEqual from 'lodash/isEqual';
import assign from 'lodash/assign';
import findIndex from 'lodash/findIndex';
import isNumber from 'lodash/isNumber';
import { PURGE } from 'redux-persist';
// Constants
import * as stepOneTypes from '../constants/step.one';
// Helpers
import isStringsEqual from '../helpers/isStringsEqual';

const initialState = {
  lengthProgram: '',
  data: [],
  group: null,
  secondary_group: null,
  tabIndex: 0,
  stepOnePrice: 0,
};

export default function(state = initialState, action) {
  const { type, payload } = action;
  switch(type) {
    case stepOneTypes.STEP_ONE_GET_CATALOG_GROUP: {
      const { results } = payload;
      if (isEqual(state.data, results)) {
        return state;
      }
      return assign({}, state, { data: results });
    }

    case stepOneTypes.STEP_ONE_SELECT_GROUP: {
      const { group, secondary_group } = payload;
      const { data } = state;
      const groupIndex = findIndex(data, groupItem => isStringsEqual(groupItem.name, group));
      const groupItemByIndex = data[groupIndex];
      let secondaryGroupIndex;
      let tabIndex;
      if (groupItemByIndex) {
        secondaryGroupIndex = findIndex(groupItemByIndex.options, option => isStringsEqual(option.name, secondary_group));
      }
      tabIndex = isNumber(secondaryGroupIndex) && (secondaryGroupIndex >=0) ? secondaryGroupIndex + 1 : 0;
      return assign({}, state, { group, secondary_group, tabIndex });
    }

    case stepOneTypes.STEP_ONE_SET_TAB_INDEX: {
      if (isEqual(state.tabIndex, payload)) {
        return state;
      }
      return assign({}, state, { tabIndex: payload });
    }

    case stepOneTypes.STEP_ONE_SET_PRICE: {
      if (isEqual(state.stepOnePrice, payload)) {
        return state;
      }
      return assign({}, state, { stepOnePrice: payload });
    }

    case stepOneTypes.STEP_ONE_SET_CAMP_LENGTH: {
      if (isEqual(state.lengthProgram, payload)) {
        return state;
      }
      return assign({}, state, { lengthProgram: payload });
    }

    case PURGE: {
      return assign({}, initialState);
    }

    default:
      return state;
  }
}
