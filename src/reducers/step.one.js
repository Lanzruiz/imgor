// Modules
import isEqual from 'lodash/isEqual';
// Constants
import * as stepOneTypes from '../constants/step.one';

const initialState = {
  lengthProgram: '5 Week Camps',
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
      console.log('STEP_ONE_GET_CATALOG_GROUP ', payload);
      if (isEqual(state.data, results)) {
        return state;
      }
      return {
        ...state,
        data: results,
      };
    }
    case stepOneTypes.STEP_ONE_SELECT_GROUP: {
      const { group, secondary_group } = payload;
      if (isEqual({ group: state.group, secondary_group: state.secondary_group, payload })) {
        return state;
      }
      return {
        ...state,
        group,
        secondary_group,
      };
    }
    case stepOneTypes.STEP_ONE_SET_TAB_INDEX: {
      if (state.tabIndex === payload) {
        return state;
      }
      return {
        ...state,
        tabIndex: payload,
      };
    }
    case stepOneTypes.STEP_ONE_SET_PRICE: {
      if (state.stepOnePrice === payload) {
        return state;
      }
      return {
        ...state,
        stepOnePrice: payload,
      };
    }
    default:
      return state;
  }
}