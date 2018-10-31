// Constants
import * as weeksTypes from '../constants/weeks';

const initialState = {
  selectedWeekId: 0,
  weeksCounter: 0,
  weeks: [],
};

const maxWeeksCount = 12;

const weeks = (state = initialState, action) => {
  const { type, payload } = action;
  switch(type) {
    case weeksTypes.INCREMENT_WEEKS_COUNTER: {
      const counter = state.weeks.length + 1;
      if (counter <= maxWeeksCount) {
        const weeks = [ ...state.weeks, { id: counter, customize_id: null }];
        return {
          ...state,
          weeks,
          weeksCounter: counter,
        };
      }
      return state;
    }

    case weeksTypes.DECREMENT_WEEKS_COUNTER: {
      const counter = state.weeks.length - 1;
      if (counter < 0) {
        return state;
      }
      const weeks = [...state.weeks];
      weeks.splice(-1, 1);
      return {
        ...state,
        weeks,
        weeksCounter: counter,
        selectedWeekId: (state.selectedWeekId > counter) ? 0 : state.selectedWeekId,
      };
    }

    case weeksTypes.SELECT_WEEK: {
      return {
        ...state,
        selectedWeekId: payload,
      };
    }

    case weeksTypes.CUSTOMIZE_WEEK: {
      const weeks = [...state.weeks];
      weeks[state.selectedWeekId].customize_id = payload;
      return {
        ...state,
        weeks,
      };
    }

    default: {
      return state;
    }
  }
};

export default weeks;
