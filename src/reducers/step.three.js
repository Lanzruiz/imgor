// Modules
import isEqual from 'lodash/isEqual';
// Constants
import * as stepThreeTypes from '../constants/step.three';

const initialState = {
  data: [],
  starting_price: 0,
  secondary_programs: [],
  selected_card_with_secondary_programs_id: null,
};

export default function(state = initialState, action) {
  const { type, payload } = action;
  switch(type) {
    case stepThreeTypes.STEP_THREE_GET_CATALOG_CAMPS_LEVELS: {
      const { results } = payload;
      if (isEqual({ data: state.data }, { data: results })) {
        return state;
      }
      return {
        ...state,
        data: results,
        secondary_programs: [],
        selected_card_with_secondary_programs_id: null,
      };
    }

    case stepThreeTypes.STEP_THREE_SET_DEFAULT_STATE: {
      return {
        ...state,
        ...initialState,
      };
    }

    case stepThreeTypes.STEP_THREE_SET_SECONDARY_PROGRAMS: {
      const { secondary_programs, id } = payload;
      if (isEqual(secondary_programs, state.secondary_programs) && id === state.selected_card_with_secondary_programs_id) {
        return state;
      }
      return {
        ...state,
        secondary_programs,
        selected_card_with_secondary_programs_id: id,
      };
    }

    default:
      return state;
  }
}
