// Modules
import isEqual from 'lodash/isEqual';
import assign from 'lodash/assign';
import { PURGE } from 'redux-persist';
// Constants
import * as stepSixTypes from '../constants/step.six';

const initialState = {
  airlines: [],
  transport: [],
  unaccompanied: null,
  selectedArrivalAirline: null,
  selectedDepartingAirline: null,
  departingData: null,
  arrivalData: null,
  unnacompaniedData: null,
  transportationCartData: null,
  laundryService: null,
};

export default function(state = initialState, action) {
  const { type, payload } = action;
  switch(type) {
    case stepSixTypes.STEP_SIX_GET_CATALOG_TRANSPORT_UNACCOMPANIED: {
      if (isEqual(initialState.unaccompanied, payload)) {
        return state;
      }
      return assign({}, state, { unaccompanied: payload });
    }

    case stepSixTypes.STEP_SIX_GET_CATALOG_AIRLINES: {
      const { airlines } = payload;
      if (isEqual(state.airlines, airlines)) {
        return state;
      }
      return assign({}, state, { airlines });
    }

    case stepSixTypes.STEP_SIX_GET_CATALOG_TRANSPORT: {
      const { results } = payload;
      if (isEqual(state.airlines, results)) {
        return state;
      }
      return assign({}, state, { transport: results });
    }

    case stepSixTypes.STEP_SIX_SET_DEFAULT_STATE: {
      const { airlines, transport } = state;
      if (isEqual(initialState, { airlines, transport })) {
        return state;
      }
      return assign({}, state, initialState);
    }

    case stepSixTypes.STEP_SIX_SET_ARRIVAL_AIRLINES: {
      if (isEqual(state.selectedArrivalAirline, payload)) {
        return state;
      }
      return assign({}, state, { selectedArrivalAirline: payload });
    }

    case stepSixTypes.STEP_SIX_SET_DEPARTING_AIRLINES: {
      if (isEqual(state.selectedDepartingAirline, payload)) {
        return state;
      }
      return assign({}, state, { selectedDepartingAirline: payload });
    }

    case stepSixTypes.STEP_SIX_SET_DEPARTING_DATA: {
      if (isEqual(state.departingData, payload)) {
        return state;
      }
      return assign({}, state, { departingData: payload });
    }

    case stepSixTypes.STEP_SIX_SET_ARRIVAL_DATA: {
      if (isEqual(state.arrivalData, payload)) {
        return state
      }
      return assign({}, state, { arrivalData: payload });
    }

    case stepSixTypes.STEP_SIX_SET_UNNACOMPANIED_DATA: {
      if (isEqual(state.unnacompaniedData, payload)) {
        return state;
      }
      return assign({}, state, { unnacompaniedData: payload });
    }

    case stepSixTypes.STEP_SIX_SELECT_TRANSPORTATION_CARD: {
      if (isEqual(state.transportationId, payload)) {
        return state;
      }
      return assign({}, state, { transportationId: payload });
    }

    case stepSixTypes.STEP_SIX_UNSELECT_TRANSPORTATION_CARD: {
      if (isEqual(state.transportationId, null)) {
        return state;
      }
      return assign({}, state, { transportationId: null, transportationCartData: {} });
    }
  
    case stepSixTypes.STEP_SIX_ADD_TRANSPORTATION_TO_CART: {
      return {
        ...state,
        transportationCartData: {
          ...payload
        }
      }
    }
    
    case stepSixTypes.STEP_SIX_CLEAR_TRANSPORTATION_CART: {
      return {
        ...state,
        transportationCartData: {}
      }
    }

    case stepSixTypes.STEP_SIX_GET_LAUNDRY_SERVICE: {
      return {
        ...state,
        laundryService: {
          startingPrice: payload.starting_price,
          list: payload.results,
        },
      }
    }

    case PURGE: {
      return assign({}, initialState);
    }

    default:
      return state;
  }
}
