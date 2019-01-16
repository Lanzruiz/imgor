// Modules
import isEqual from 'lodash/isEqual';
import assign from 'lodash/assign';
import { PURGE } from 'redux-persist';
// Constants
import * as trainingTypes from '../constants/training';

const initialState = {
  selectedId: null,
  product: null,
  secondaryProgramId: null,
};

export default function(state = initialState, action) {
  const { type, payload } = action;
  switch(type) {
    case trainingTypes.SAVE_TRAINING_ID: {
      if (state.selectedId === payload) {
        return state;
      }
      return {
        ...state,
        selectedId: payload,
      };
    }

    case trainingTypes.GET_CATALOG_CAMP_CAMP_ID: {
      const { results } = payload;
      if (isEqual(state.product, results)) {
        return state;
      }
      return {
        ...state,
        product: results,
      };
    }

    case trainingTypes.TRAINING_SET_DEFAULT_STATE: {
      return {
        ...state,
        ...initialState,
      };
    }

    case trainingTypes.SET_SECONDARY_PROGRAM_ID: {
      return {
        ...state,
        secondaryProgramId: payload,
      };
    }

    case PURGE: {
      return assign({}, initialState);
    }

    default:
      return state;
  }
};
