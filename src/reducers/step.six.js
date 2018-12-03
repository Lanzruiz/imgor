// Modules
import isEqual from 'lodash/isEqual';
// Constants
import * as stepSixTypes from '../constants/step.six';

const initialState = {
  airlines: [],
  transport: [],
};

export default function(state = initialState, action) {
  const { type, payload } = action;
  switch(type) {
    case stepSixTypes.STEP_SIX_GET_CATALOG_AIRLINES: {
      const { airlines } = payload;
      if (isEqual(state.airlines, airlines)) {
        return state;
      }
      return {
        ...state,
        airlines,
      };
    }

    case stepSixTypes.STEP_SIX_GET_CATALOG_TRANSPORT: {
      const { results } = payload;
      if (isEqual(state.airlines, results)) {
        return state;
      }
      return {
        ...state,
        transport: results,
      };
    }

    default:
      return state;
  }
}