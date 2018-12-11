// Modules
import { createSelector } from 'reselect';
// Selectors
import { stepOnePriceSelector, weeksCounterSelector, stepOneGroupSelector } from '../StepOne/selectors';
import { stepSixUnaccompaniedSelector } from '../StepSix/selectors';
import { stepFourPriceSelector } from '../StepFour/selectors';
import { stepFivePriceSelector } from '../StepFive/selectors';
// Constants
import { weekly_camp } from '../StepOne';

export const totalPriceSelector = createSelector(
  stepOnePriceSelector,
  weeksCounterSelector,
  stepOneGroupSelector,
  stepFourPriceSelector,
  stepFivePriceSelector,
  stepSixUnaccompaniedSelector,
  function(stepOnePrice, weeksCounter, stepOneGroup, stepFourPrice, stepFivePrice, unaccompanied) {
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
    return stepOneComputedPrice + stepFourPrice + stepFivePrice + stepSixComputedPrice;
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
