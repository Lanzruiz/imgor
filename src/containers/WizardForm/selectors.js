// Modules
import { createSelector } from 'reselect';
// Selectors
import { stepOnePriceSelector, weeksCounterSelector, stepOneGroupSelector } from '../StepOne/selectors';
import { stepSixUnaccompaniedSelector } from '../StepSix/selectors';
// Constants
import { weekly_camp } from '../StepOne';

export const totalPriceSelector = createSelector(
  stepOnePriceSelector,
  weeksCounterSelector,
  stepOneGroupSelector,
  stepSixUnaccompaniedSelector,
  function(stepOnePrice, weeksCounter, stepOneGroup, unaccompanied) {
    const stepOneComputedPrice = (
      (stepOneGroup === weekly_camp)
        ? stepOnePrice * weeksCounter
        : stepOnePrice
    );
    const stepSixComputedPrice = (
      (unaccompanied === 'true')
        ? 50
        : 0
    );
    return stepOneComputedPrice + stepSixComputedPrice;
  }
);

function stepsSelector(state) {
  return state.steps;
}

export const currentStepSelector = createSelector(
  stepsSelector,
  function(steps) {
    return steps.currentStep;
  }
);
