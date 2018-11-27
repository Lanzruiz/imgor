// Modules
import { createSelector } from 'reselect';
import { formValueSelector } from 'redux-form';
// Constants
import { weekly_camp } from './index';

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
  }
)

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
  function(weeks) {
    return weeks.weeks;
  }
);

export const isWeeklyCampSelector = createSelector(
  stepOneGroupSelector,
  function(group) {
    return group === weekly_camp;
  }
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