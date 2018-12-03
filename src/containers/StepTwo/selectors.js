// Modules
import { createSelector } from 'reselect';
import moment from 'moment';
// Constants
import { daysInWeek } from '../../constants/weeks';
import { weekly_camp } from '../StepOne/index';

function stepTwoSelector(state) {
  return state.stepTwo;
}

function stepTwoData(state) {
  return state.stepTwo.data;
}

function isWeeklyCampSelector(state) {
  return state.stepOne.group === weekly_camp;
}

function weeksCounterSelector(state) {
  return state.weeks.weeks.length;
}

export const stepTwoDataSelector = createSelector(
  stepTwoData,
  isWeeklyCampSelector,
  weeksCounterSelector,
  function(data, isWeeklyCamp, weeksCounter) {
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
  weeksCounterSelector,
  isWeeklyCampSelector,
  function(stepTwo, weeksCounter, isWeeklyCamp) {
    if (isWeeklyCamp && weeksCounter > 1) {
      const { selectedDate } = stepTwo;
      const stringFormat = 'YYYY-MM-DD';
      selectedDate.capacity_end_date = (
        moment(selectedDate.capacity_end_date, stringFormat)
          .add(daysInWeek * (weeksCounter - 1), 'days')
          .format(stringFormat)
      );
    }
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

export const stepTwoCampDaysLengthSelector = createSelector(
  stepTwoSelector,
  function(stepTwo) {
    return stepTwo.stepTwoCampDaysLength;
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
