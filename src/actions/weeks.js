// Constants
import * as weeksTypes from '../constants/weeks';

export const incrementWeeksCounter = () => ({ type: weeksTypes.INCREMENT_WEEKS_COUNTER });

export const decrementWeeksCounter = () => ({ type: weeksTypes.DECREMENT_WEEKS_COUNTER });

export const customizeWeek = (id) => ({
  type: weeksTypes.CUSTOMIZE_WEEK,
  payload: id,
});

export const selectWeek = (id) => ({
  type: weeksTypes.SELECT_WEEK,
  payload: id,
});
