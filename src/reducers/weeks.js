// Constants
import * as weeksTypes from '../constants/weeks';

const initialState = {
  selectedWeekId: 0,
  weeksCounter: 0,
  weeks: [],
};

const maxWeeksCount = 12;

export default function(state = initialState, action) {
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

    case weeksTypes.SET_WEEKS_COUNTER: {
      const weeks = [...state.weeks];
      const weeksCounter = weeks.length;
      if (weeksCounter === payload) {
        return state;
      }
      if (weeksCounter > payload) {
        weeks.splice(payload);
      }
      if (weeksCounter < payload) {
        while(weeks.length < payload) {
          const id = weeks.length;
          weeks.push({ id });
        }
      }
      return {
        ...state,
        weeks,
        weeksCounter: payload,
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
