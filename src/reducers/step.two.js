// Modules
import isEqual from 'lodash/isEqual';
// Constants
import * as stepTwoTypes from '../constants/step.two';

const initialState = {
  data: [],
  stepTwoStartingPrice: 0,
  selectedDate: {
    capacity_start_date: null,
    capacity_end_date: null,
  },
};

export default function(state = initialState, action) {
  const { type, payload } = action;
  switch(type) {
    case stepTwoTypes.GET_CATALOG_CAMPS_CALENDAR: {
      console.log('GET_CATALOG_CAMPS_CALENDAR ', payload);
      const { results, starting_price } = payload;
      return {
        ...state,
        stepTwoStartingPrice: starting_price,
        data: results,
      };
    }

    case stepTwoTypes.STEP_TWO_SELECT_DATE: {
      if (isEqual(state.selectedDate, payload)) {
        return state;
      }
      return {
        ...state,
        selectedDate: payload,
      }
    }

    case stepTwoTypes.STEP_TWO_SET_DEFAULT_STATE: {
      return {
        ...state,
        ...initialState,
      };
    }

    default:
      return state;
  }
}
