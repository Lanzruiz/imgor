// Constants
import * as weeksTypes from '../constants/weeks';

const initialState = {
  selectedWeekId: 0,
  weeksCounter: 0,
  weeks: [],
};

export default function(state = initialState, action) {
  const { type, payload } = action;
  switch(type) {
    case weeksTypes.INCREMENT_WEEKS_COUNTER: {
      const counter = state.weeksCounter + 1;
      if (counter <= weeksTypes.maxWeekCount) {
        return {
          ...state,
          weeks: createWeeksArray(counter),
          weeksCounter: counter,
        };
      }
      return state;
    }

    case weeksTypes.DECREMENT_WEEKS_COUNTER: {
      const counter = state.weeksCounter - 1;
      if (counter < 0) {
        return state;
      }
      return {
        ...state,
        weeks: createWeeksArray(counter),
        weeksCounter: counter,
        selectedWeekId: (state.selectedWeekId > counter) ? 0 : state.selectedWeekId,
      };
    }

    case weeksTypes.SET_WEEKS_COUNTER: {
      if (state.weeksCounter === payload) {
        return state;
      }
      if (payload === 0) {
        return {
          ...state,
          ...initialState,
        };
      }
      return {
        ...state,
        weeks: createWeeksArray(payload),
        weeksCounter: payload,
      };
    }

    case weeksTypes.SET_ONLY_WEEKS: {
      if (state.weeksCounter === payload) {
        return state;
      }
      return {
        ...state,
        weeks: createWeeksArray(payload),
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

    case weeksTypes.SET_WEEK_PRICE: {
      const weeks = [...state.weeks];
      weeks[state.selectedWeekId].price = payload;
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

function createWeeksArray(counter) {
  const weeksArr = [];
  while(weeksArr.length < counter) {
    const id = weeksArr.length + 1;
    weeksArr.push({ id, customize_id: null });
  }
  return weeksArr;
}
