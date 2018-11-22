// Modules
import isEqual from 'lodash/isEqual';
// Constants
import * as stepThreeTypes from '../constants/step.three';

const initialState = {
  data: [],
  starting_price: 0,
};

export default function(state = initialState, action) {
  const { type, payload } = action;
  switch(type) {
    case stepThreeTypes.STEP_THREE_GET_CATALOG_CAMPS_LEVELS: {
      console.log('STEP_THREE_GET_CATALOG_CAMPS_LEVELS', payload);
      const { results } = payload;
      if (isEqual({ data: state.data }, { data: results })) {
        return state;
      }
      return {
        ...state,
        data: results,
      };
    }

    case stepThreeTypes.STEP_THREE_SET_DEFAULT_STATE: {
      return {
        ...state,
        ...initialState,
      };
    }

    default:
      return state;
  }
}
