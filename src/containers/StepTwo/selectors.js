// Modules
import { createSelector } from 'reselect';
import moment from 'moment';
// Constants
import { daysInWeek } from '../../constants/weeks';
import { weekly_camp } from '../StepOne/index';
// Helpers
import isStringsEqual from '../../helpers/isStringsEqual';

function stepTwoSelector(state = {}) {
  return state.stepTwo;
}

function stepTwoData(state = { stepTwo: { data: [] } }) {
  return state.stepTwo.data;
}

function isWeeklyCampSelector(state = { stepOne: { group: '' } }) {
  return isStringsEqual(state.stepOne.group, weekly_camp);
}

function weeksCounterSelector(state = { weeks: { weeks: [] } }) {
  return state.weeks.weeks.length;
}

export const stepTwoDataSelector = createSelector(
  stepTwoData,
  isWeeklyCampSelector,
  weeksCounterSelector,
  function(data = [], isWeeklyCamp = false, weeksCounter = 0) {
    let weeksCount = weeksCounter;
    let result = [];
    const dataCloned = [...data];
    
    if(!isWeeklyCamp) return data;
    
    if(isWeeklyCamp && weeksCounter === 1) return data;
    
    if (isWeeklyCamp) {
      result = findWeeksDurations(dataCloned);
      
      while(weeksCount > 2) {
        result = findWeeksDurations([...result]);
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
  function(stepTwo = {}, weeksCounter = 0, isWeeklyCamp = false) {
    if (isWeeklyCamp && weeksCounter > 1) {
      const { selectedDate = { capacity_start_date: '', capacity_end_date: '' } } = stepTwo;
      if (selectedDate.capacity_start_date && selectedDate.capacity_end_date) {
        const stringFormat = 'YYYY-MM-DD';
        const momentObjStartDate = moment(selectedDate.capacity_start_date, stringFormat);
        const daysToNeedAdd = (daysInWeek * weeksCounter) - 1;
        selectedDate.capacity_end_date = momentObjStartDate.add(daysToNeedAdd, 'days').format(stringFormat);
      }
    }
    return stepTwo.selectedDate;
  }
);

export const stepTwoStartDateSelector = createSelector(
  stepTwoSelectedDateSelector,
  function(selectedDate = {}) {
    return selectedDate.capacity_start_date;
  }
);

export const stepTwoEndDateSelector = createSelector(
  stepTwoSelectedDateSelector,
  function(selectedDate = {}) {
    return selectedDate.capacity_end_date;
  }
);

export const stepTwoCampDaysLengthSelector = createSelector(
  stepTwoSelector,
  function(stepTwo = {}) {
    return stepTwo.stepTwoCampDaysLength;
  }
);

function findWeeksDurations(arr = []) {
  const dateFormat = 'YYYY-MM-DD';
  
  return arr.reduce( (acc, v, i) => {
    if(i === 0){
      acc = [...acc, v];
      return acc;
    }
  
    const computedData = moment(v.capacity_start_date, dateFormat).add(daysInWeek, 'days').format(dateFormat);
    const nextWeek = arr.find(({ capacity_start_date }) => (computedData === capacity_start_date));
    
    if(nextWeek){
      if(nextWeek.program_types.find(v => !v.sold_out)){
        acc = [...acc, v];
      }
    }
    
    return acc;
  }, []);
};
