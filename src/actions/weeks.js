// Constants
import * as weeksTypes from '../constants/weeks';

export const incrementWeeksCounter = () => ({ type: weeksTypes.INCREMENT_WEEKS_COUNTER });

export const decrementWeeksCounter = () => ({ type: weeksTypes.DECREMENT_WEEKS_COUNTER });
