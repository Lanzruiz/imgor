// Modules
import isEqual from 'lodash/isEqual';
import assign from 'lodash/assign';
// Constants
import * as stepThreeTypes from '../constants/step.three';

const initialState = {
  data: [],
  starting_price: 0,
  secondary_programs: [],
  selected_card_with_secondary_programs_id: null,
  participantProductId: null,
};

export default function(state = initialState, action) {
  const { type, payload } = action;
  switch(type) {
    case stepThreeTypes.STEP_THREE_GET_CATALOG_CAMPS_LEVELS: {
      const { results } = payload;
      if (isEqual(state, results)) {
        return state;
      }
      return assign({}, state, {
        data: results,
        secondary_programs: [],
        selected_card_with_secondary_programs_id: null,
      });
    }

    case stepThreeTypes.STEP_THREE_SET_DEFAULT_STATE: {
      return assign({}, state, initialState);
    }

    case stepThreeTypes.STEP_THREE_SET_SECONDARY_PROGRAMS: {
      const { secondary_programs, id } = payload;
      if (isEqual(secondary_programs, state.secondary_programs) && isEqual(id, state.selected_card_with_secondary_programs_id)) {
        return state;
      }
      return assign({}, state, {
        secondary_programs,
        selected_card_with_secondary_programs_id: id,
      });
    }

    case stepThreeTypes.STEP_THREE_POST_CART_CART_ID_PARTICIPANT_ID_PRODUCT: {
      const { participant_product_id } = payload;
      return assign({}, state, { participantProductId: participant_product_id });
    }

    default:
      return state;
  }
}
