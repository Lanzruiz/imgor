// Modules
import { createSelector } from 'reselect';
import { formValueSelector } from 'redux-form';
import moment from 'moment';
// Constants
import { weekly_camp } from './index';
// Selectors
import { stepTwoCampDaysLengthSelector, stepTwoStartDateSelector } from '../StepTwo/selectors';

function stateSelector(state) {
  return state;
}

function stepOneSelector(state) {
  return state.stepOne;
}

function weeksSelector(state) {
  return state.weeks;
}

export const stepOneGroupSelector = createSelector(
  stepOneSelector,
  function(stepOne) {
    return stepOne.group;
  }
);

export const stepOneDataSelector = createSelector(
  stepOneSelector,
  function(stepOne) {
    return stepOne.data;
  }
);

export const stepOneTabIndexSelector = createSelector(
  stepOneSelector,
  function(stepOne) {
    return stepOne.tabIndex;
  }
);

export const weeksCounterSelector = createSelector(
  weeksSelector,
  function(weeks) {
    return weeks.weeksCounter;
  },
);

export const stepOneSecondaryGroupSelector = createSelector(
  stepOneSelector,
  function(stepOne) {
    return stepOne.secondary_group;
  }
);

export const stepOnePriceSelector = createSelector(
  stepOneSelector,
  function(stepOne) {
    return stepOne.stepOnePrice;
  }
);

export const weeksItemsSelector = createSelector(
  weeksSelector,
  stepTwoCampDaysLengthSelector,
  stepTwoStartDateSelector,
  function(weeks, weekLength, start) {
    return weeks.weeks.map(function(week, idx) {
      const days = 'days';
      const stringFormat = 'YYYY-MM-DD';
      const startDateAddDays = weekLength * idx;
      const startDate = moment(start, stringFormat).add(startDateAddDays, days).format(stringFormat);
      const endDate = moment(startDate, stringFormat).add(weekLength, days).subtract(1, days).format(stringFormat);
      return Object.assign({}, week, { start_date: startDate, end_date: endDate });
});
  }
);

export const isWeeklyCampSelector = createSelector(
  stepOneGroupSelector,
  function(group) {
    return group === weekly_camp;
  },
);

function stepOneFormValueSelector(state, name, prefix) {
  const selector = formValueSelector('wizard');
  return selector(state, `${name}_${prefix}`);
}

const stepOneFormValuesName = createSelector(
  isWeeklyCampSelector,
  stepOneGroupSelector,
  stepOneSecondaryGroupSelector,
  function(isWeeklyCamp, group, secondaryGroup) {
    const regExp = /\s/g;
    let name = isWeeklyCamp ? group : secondaryGroup;
    if (name) {
      name = name.toLowerCase().replace(regExp, '_');
    }
    return name;
  }
);

export const stepOneAgeSelector = createSelector(
  stateSelector,
  stepOneFormValuesName,
  function(state, name) {
    return stepOneFormValueSelector(state, name, 'age');
  }
);

export const stepOneGenderSelector = createSelector(
  stateSelector,
  stepOneFormValuesName,
  function(state, name) {
    return stepOneFormValueSelector(state, name, 'gender');
  }
);

export const stepOneSleepawaySelector = createSelector(
  stateSelector,
  stepOneFormValuesName,
  function(state, name) {
    return stepOneFormValueSelector(state, name, 'sleepaway');
  }
);

export const stepOneBoardingSelector = createSelector(
  stepOneSleepawaySelector,
  function(sleepaway) {
    switch(sleepaway) {
      case 'Boarding':
        return 'yes';
      case 'Non-Boarding':
        return 'no';
      default:
        console.warn('something wrong with string boarding value!');
        return sleepaway;
    }
  }
);

export const stepOneBoardingBooleanSelector = createSelector(
  stepOneSleepawaySelector,
  function(sleepaway) {
    switch(sleepaway) {
      case 'Boarding':
        return true;
      case 'Non-Boarding':
        return false;
      default:
        console.warn('something wrong with boolean boarding value!');
        return false;
    }
  }
);