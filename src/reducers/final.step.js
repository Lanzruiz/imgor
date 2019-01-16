// Modules
import isEqual from 'lodash/isEqual';
import { PURGE } from 'redux-persist';
import assign from 'lodash/assign';
// Constants
import * as finalStepTypes from '../constants/final.step';

const initialState = {
  positions: [],
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch(type) {
    case finalStepTypes.FINAL_STEP_GET_CATALOG_POSITIONS: {
      const { positions } = payload;
      if (isEqual(state.positions, positions)) {
        return state;
      }
      return {
        ...state,
        positions: positions.map(({ PositionId, Name }) => ({ position_id: PositionId, name: Name })),
      };
    }

    case finalStepTypes.FINAL_STEP_SET_DEFAULT_STATE: {
      if (isEqual(state, initialState)) {
        return state;
      }
      return {
        ...state,
        ...initialState,
      };
    }

    case PURGE: {
      return assign({}, initialState);
    }

    default: {
      return state;
    }
  }
}
