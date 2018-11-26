// Modules
import { createSelector } from 'reselect';
// Constants
import { weekly_camp } from './index';

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
