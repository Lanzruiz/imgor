// Constants
import * as weeksTypes from '../constants/weeks';

const initialState = {
  weeksCounter: 0,
};

const weeks = (state = initialState, action) => {
  const { type } = action;
  switch(type) {
    case weeksTypes.INCREMENT_WEEKS_COUNTER:
      return {
        ...state,
        weeksCounter: state.weeksCounter + 1,
      };
    case weeksTypes.DECREMENT_WEEKS_COUNTER:
      const counter = state.weeksCounter - 1;
      if (counter < 0) {
        return state;
      }
      return {
        ...state,
        weeksCounter: counter,
      };
    default:
      return state;
  }
};

export default weeks;
