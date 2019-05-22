// Modules
import isEqual from 'lodash/isEqual';
import assign from 'lodash/assign';
import concat from 'lodash/concat';
import find from 'lodash/find';
import { PURGE } from 'redux-persist';
// Constants
import * as weeksTypes from '../constants/weeks';
import { emptyConcentrationId } from './step.four';

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
        const weeks = createWeeksArray(counter);
        return assign({}, state, { weeks }, { weeksCounter: counter });
      }
      return state;
    }

    case weeksTypes.DECREMENT_WEEKS_COUNTER: {
      const counter = state.weeksCounter - 1;
      if (counter < 0) {
        return state;
      }
      const selectedWeekId = (state.selectedWeekId > counter) ? 0 : state.selectedWeekId;
      const weeks = createWeeksArray(counter);
      return assign({}, state, { weeks }, { weeksCounter: counter }, { selectedWeekId });
    }

    case weeksTypes.SET_WEEKS_COUNTER: {
      if (isEqual(state.weeksCounter, payload)) {
        return state;
      }
      if (isEqual(payload, 0)) {
        return assign({}, state, { initialState });
      }
      return assign({}, state, { weeks: createWeeksArray(payload) }, { weeksCounter: payload } );
    }

    case weeksTypes.SET_ONLY_WEEKS: {
      if (isEqual(state.weeksCounter, payload)) {
        return state;
      }
      return assign({}, state, { weeks: createWeeksArray(payload) });
    }

    case weeksTypes.SELECT_WEEK: {
      return assign({}, state, { selectedWeekId: payload });
    }

    case weeksTypes.CUSTOMIZE_WEEK: {
      const weeks = concat(state.weeks);
      weeks[payload.weekId || state.selectedWeekId].customize_id = payload.id;
      
      const skipWeeks = weeks.map((v, i) => {
        const week = {...v};
        week.customize_id = null;
        week.price = 0;
        if(i === 0){
          week.customize_id = emptyConcentrationId;
        }
        return week;
      });
      
      if(payload.id === emptyConcentrationId){
        return {
          ...state,
          weeks: skipWeeks
        }
      }
      
      return { ...state, weeks };
    }

    case weeksTypes.REMOVE_CUSTOMIZED_WEEK: {
      const weeks = concat(state.weeks);
      const currentWeek = find(weeks, (v) => v.customize_id === payload || v.id === payload) || {};
      currentWeek.customize_id = null;
      return assign({}, state, { weeks });
    }
    
    case weeksTypes.CLEAN_UP_SELECTED_WEEKS: {
      const weeks = state.weeks.map(v => ({id: v.id, customize_id: null}));
      return assign({}, state, { weeks });
    }

    case weeksTypes.SET_WEEK_PRICE: {
      const weeks = concat(state.weeks);
      weeks[state.selectedWeekId].price = payload;
      return assign({}, state, { weeks });
    }

    case PURGE: {
      return assign({}, initialState);
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
