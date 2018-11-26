// Modules
import { createSelector } from 'reselect';
import moment from 'moment';
// Selectors
import { weeksCounterSelector, isWeeklyCampSelector } from '../StepOne/selectors';
// Constants
import { daysInWeek } from '../../constants/weeks';

function stepTwoSelector(state) {
  return state.stepTwo;
}

export const stepTwoDataSelector = createSelector(
  stepTwoSelector,
  weeksCounterSelector,
  isWeeklyCampSelector,
  function({ data }, weeksCounter, isWeeklyCamp) {
    let weeksCount = weeksCounter;
    let result = [];
    if (isWeeklyCamp) {
      if (weeksCount === 1) return data;
      result = findWeeksDurations(data);
      while(weeksCount > 1) {
        result = findWeeksDurations(result);
        --weeksCount;
      }
      return result;
    }
    return data;
  }
);

export const stepTwoSelectedDateSelector = createSelector(
  stepTwoSelector,
  function(stepTwo) {
    return stepTwo.selectedDate;
  }
);

export const stepTwoStartDateSelector = createSelector(
  stepTwoSelectedDateSelector,
  function(selectedDate) {
    return selectedDate.capacity_start_date;
  }
);

export const stepTwoEndDateSelector = createSelector(
  stepTwoSelectedDateSelector,
  function(selectedDate) {
    return selectedDate.capacity_end_date;
  }
);

function findWeeksDurations(arr) {
  const result = [];
  const dateFormat = 'YYYY-MM-DD';
  for (let i = 0; i < arr.length; i++) {
    const computedData = moment(arr[i].capacity_start_date, dateFormat).add(daysInWeek, 'days').format(dateFormat);
    const nextWeek = arr.find(({ capacity_start_date }) => (computedData === capacity_start_date));
    if (nextWeek) {
      result.push(arr[i]);
    }
  }
  return result;
}
