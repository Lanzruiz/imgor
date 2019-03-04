// Modules
import isEqual from 'lodash/isEqual';
import assign from 'lodash/assign';
import { PURGE } from 'redux-persist';
// Constants
import * as stepThreeTypes from '../constants/step.three';

const initialState = {
  data: [],
  starting_price: 0,
  secondary_programs: [],
  selected_card_with_secondary_programs_id: null,
  participantProductId: null,
  stepThreeWeek_1_data: null,
  stepThreeWeek_2_data: null,
  stepThreeWeek_3_data: null,
  stepThreeWeek_4_data: null,
  stepThreeWeek_5_data: null,
  stepThreeWeek_6_data: null,
  stepThreeWeek_7_data: null,
  stepThreeWeek_8_data: null,
  stepThreeWeek_9_data: null,
  stepThreeWeek_10_data: null,
  stepThreeWeek_11_data: null,
  stepThreeWeek_12_data: null,
};

export default function(state = initialState, action) {
  const { type, payload } = action;
  switch(type) {
    case stepThreeTypes.STEP_THREE_GET_CATALOG_CAMPS_LEVELS: {
      const { results } = payload;
      if (isEqual(state, results)) {
        return state;
      }
      return assign({}, state, { data: results });
    }

    case stepThreeTypes.STEP_THREE_SET_WEEKLY_CATALOG_DATA: {
      const { weekId, data } = payload;
      const currentData = state[`stepThreeWeek_${weekId}_data`]
      if (isEqual(currentData, data)) {
        return state;
      }
      return assign({}, state, { [`stepThreeWeek_${weekId}_data`]: data });
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

    case PURGE: {
      return assign({}, initialState);
    }

    default:
      return state;
  }
}
