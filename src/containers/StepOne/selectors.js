// Modules
import { createSelector } from 'reselect';
import { formValueSelector, getFormMeta } from 'redux-form';
import moment from 'moment';
import find from 'lodash/find';
// Selectors
import { stepTwoCampDaysLengthSelector, stepTwoStartDateSelector } from '../StepTwo/selectors';
// Constants
import { weekly_camp } from './index';
import { daysInWeek } from '../../constants/weeks';

export const stepOneFormFieldsName = {
  age: 'age',
  gender: 'gender',
  sleepaway: 'sleepaway',
};

export function stateSelector(state) {
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

export const weeksLengthSelector = createSelector(
  stepTwoCampDaysLengthSelector,
  function(campDaysLength) {
    const daysLength = campDaysLength / daysInWeek;
    return daysLength > 1 ? daysLength : 1;
  }
);

export const weeksWeeksSelector = createSelector(
  weeksSelector,
  function(weeks) {
    return weeks.weeks;
  }
);

export const weeksItemsSelector = createSelector(
  weeksSelector,
  stepTwoStartDateSelector,
  function(weeks, start) {
    return weeks.weeks.map(function(week, idx) {
      const days = 'days';
      const stringFormat = 'YYYY-MM-DD';
      const startDateAddDays = idx * daysInWeek;
      const startDate = moment(start, stringFormat).add(startDateAddDays, days).format(stringFormat);
      const endDate = moment(startDate, stringFormat).add(7, days).subtract(1, days).format(stringFormat);
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

export function stepOneFormValueSelector(state, name, prefix) {
  const selector = formValueSelector('wizard');
  return selector(state, `${name}_${prefix}`);
}

export const stepOneFormValuesName = createSelector(
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
    return stepOneFormValueSelector(state, name, stepOneFormFieldsName.age);
  }
);

export const stepOneGenderSelector = createSelector(
  stateSelector,
  stepOneFormValuesName,
  function(state, name) {
    return stepOneFormValueSelector(state, name, stepOneFormFieldsName.gender);
  }
);

export const stepOneSleepawaySelector = createSelector(
  stateSelector,
  stepOneFormValuesName,
  function(state, name) {
    return stepOneFormValueSelector(state, name, stepOneFormFieldsName.sleepaway);
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

export function cartSelector(state) {
  return state.cart;
};

export function participantSelector(state) {
  return state.participant;
}

export const cartIdSelector = createSelector(
  cartSelector,
  function(cart) {
    return cart.id;
  }
);

export const participantIdSelector = createSelector(
  participantSelector,
  function(participant) {
    return participant.id;
  }
);

export const stepOneAgeNumberSelector = createSelector(
  stepOneAgeSelector,
  function(age) {
    return parseInt(age);
  }
);

export function formMetaSelector(state) {
  const formMetaSelector = getFormMeta('wizard');
  return formMetaSelector(state);
}

export const hasActiveFieldSelector = createSelector(
  formMetaSelector,
  function(formMeta) {
    const isActive = find(formMeta, 'active');
    return !!isActive;
  }
);
