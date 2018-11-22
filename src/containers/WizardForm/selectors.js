// Modules
import { createSelector } from 'reselect';
// Selectors
import { stepOnePriceSelector, weeksCounterSelector, stepOneGroupSelector } from '../StepOne/selectors';
// Constants
import { weekly_camp } from '../StepOne';

export const totalPriceSelector = createSelector(
  stepOnePriceSelector,
  weeksCounterSelector,
  stepOneGroupSelector,
  function(stepOnePrice, weeksCounter, stepOneGroup) {
    const stepOneComputedPrice = (
      (stepOneGroup === weekly_camp)
        ? stepOnePrice * weeksCounter
        : stepOnePrice
    );
    return stepOneComputedPrice;
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
