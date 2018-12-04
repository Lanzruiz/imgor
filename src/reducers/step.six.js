// Modules
import isEqual from 'lodash/isEqual';
// Constants
import * as stepSixTypes from '../constants/step.six';

const initialState = {
  airlines: [],
  transport: [],
  selectedArrivalAirline: null,
  selectedDepartingAirline: null,
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

    case stepSixTypes.STEP_SIX_SET_DEFAULT_STATE: {
      if (isEqual(initialState, { airlines: state.airlines, transport: state.transport })) {
        return state;
      }
      return {
        ...state,
        ...initialState,
      };
    }

    case stepSixTypes.STEP_SIX_SET_ARRIVAL_AIRLINES: {
      if (state.selectedArrivalAirline === payload) {
        return state;
      }
      return {
        ...state,
        selectedArrivalAirline: payload,
      };
    }

    case stepSixTypes.STEP_SIX_SET_DEPARTING_AIRLINES: {
      if (state.selectedDepartingAirline === payload) {
        return state;
      }
      return {
        ...state,
        selectedDepartingAirline: payload,
      };
    }

    default:
      return state;
  }
}