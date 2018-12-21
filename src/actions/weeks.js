// Constants
import * as weeksTypes from '../constants/weeks';

export function incrementWeeksCounter() {
  return {
    type: weeksTypes.INCREMENT_WEEKS_COUNTER,
  };
};

export function decrementWeeksCounter() {
  return {
    type: weeksTypes.DECREMENT_WEEKS_COUNTER,
  };
};

export function customizeWeek(id) {
  return {
    type: weeksTypes.CUSTOMIZE_WEEK,
    payload: id,
  };
};

export function selectWeek(id) {
  return {
    type: weeksTypes.SELECT_WEEK,
    payload: id,
  };
};

export function setWeeksCounter(count) {
  return {
    type: weeksTypes.SET_WEEKS_COUNTER,
    payload: count,
  };
}

export function setOnlyWeeks(count) {
  return {
    type: weeksTypes.SET_ONLY_WEEKS,
    payload: count,
  };
}

export function setWeekPrice(price) {
  return {
    type: weeksTypes.SET_WEEK_PRICE,
    payload: price,
  };
}

export function removeCustomizedWeek(id) {
  return {
    type: weeksTypes.REMOVE_CUSTOMIZED_WEEK,
    payload: id,
  };
}
