// Modules
import { createSelector } from 'reselect';
import { formValueSelector, getFormMeta } from 'redux-form';
import find from 'lodash/find';
// Selectors

export const stepOneFormFieldsName = {
  age: 'age',
  gender: 'gender',
  sleepaway: 'sleepaway',
};

export function stateSelector(state = {}) {
  return state;
};

function stepOneSelector(state = {}) {
  return state.stepOne;
};

function weeksSelector(state = {}) {
  return state.weeks;
};

export const stepOneGroupSelector = createSelector(
  stepOneSelector,
  function(stepOne = {}) {
    return stepOne.group;
  },
);

export const stepOneDataSelector = createSelector(
  stepOneSelector,
  function(stepOne = {}) {
    return stepOne.data;
  },
);

export const stepOneTabIndexSelector = createSelector(
  stepOneSelector,
  function(stepOne = {}) {
    return stepOne.tabIndex;
  },
);

export const weeksCounterSelector = createSelector(
  weeksSelector,
  function(weeks = {}) {
    return weeks.weeksCounter;
  },
);

export const weeksSelectedWeekIdSelector = createSelector(
  weeksSelector,
  function(weeks = {}) {
    return weeks.selectedWeekId;
  }
);

export const stepOneSecondaryGroupSelector = createSelector(
  stepOneSelector,
  function(stepOne = {}) {
    return stepOne.secondary_group;
  },
);

export const stepOnePriceSelector = createSelector(
  stepOneSelector,
  function(stepOne = {}) {
    return stepOne.stepOnePrice;
  },
);

export function stepOneFormValueSelector(state = {}, name = '') {
  const selector = formValueSelector('wizard');
  return selector(state, name);
};

export const stepOneFormValuesName = createSelector(
  stepOneGroupSelector,
  stepOneSecondaryGroupSelector,
  function(isWeeklyCamp = false, group = '', secondaryGroup = '') {
    const regExp = /\s/g;
    let name = isWeeklyCamp ? group : secondaryGroup;
    if (name) {
      name = name.toLowerCase().replace(regExp, '_');
    }
    return name;
  },
);

export const stepOneAgeSelector = createSelector(
  stateSelector,
  function(state = {}) {
    return stepOneFormValueSelector(state, stepOneFormFieldsName.age);
  },
);

export const stepOneGenderSelector = createSelector(
  stateSelector,
  function(state = {}) {
    return stepOneFormValueSelector(state, stepOneFormFieldsName.gender);
  },
);

export const stepOneSleepawaySelector = createSelector(
  stateSelector,
  function(state = {}) {
    return stepOneFormValueSelector(state, stepOneFormFieldsName.sleepaway);
  },
);

export const stepOneEmailSelector = createSelector(
  stateSelector,
  function(state = {}) {
    return stepOneFormValueSelector(state, 'email');
  },
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
        console.warn('Something wrong with string boarding value!');
        return sleepaway;
    }
  },
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
        console.warn('Something wrong with boolean boarding value!');
        return false;
    }
  },
);

export function cartSelector(state = {}) {
  return state.cart;
};

export function participantSelector(state = {}) {
  return state.participant;
};

export const cartIdSelector = createSelector(
  cartSelector,
  function(cart = {}) {
    return cart.id;
  },
);

export const participantIdSelector = createSelector(
  participantSelector,
  function(participant = {}) {
    return participant.id;
  },
);

export const stepOneAgeNumberSelector = createSelector(
  stepOneAgeSelector,
  function(age = 0) {
    return parseInt(age);
  },
);

export function formMetaSelector(state = {}) {
  const formMetaSelector = getFormMeta('wizard');
  return formMetaSelector(state);
};

export const hasActiveFieldSelector = createSelector(
  formMetaSelector,
  function(formMeta = {}) {
    const isActive = find(formMeta, 'active');
    return !!isActive;
  },
);

export const cartStepSixUnnacompaniedProductIdSelector = createSelector(
  cartSelector,
  function(cart = {}) {
    return cart.stepSixUnnacompaniedProductId;
  }
);

export const cartStepSixDepartingProductIdSelector = createSelector(
  cartSelector,
  function(cart = {}) {
    return cart.stepSixDepartingProductId;
  }
);

export const cartStepSixArrivalProductIdSelector = createSelector(
  cartSelector,
  function(cart = {}) {
    return cart.stepSixArrivalProductId;
  }
);

export const cartStepThreeProductIdSelector = createSelector(
  cartSelector,
  function(cart = {}) {
    return cart.stepThreeProductId;
  }
);
