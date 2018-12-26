// Modules
import { createSelector } from 'reselect';
// Selectors
import { stepOnePriceSelector, weeksCounterSelector, stepOneGroupSelector } from '../StepOne/selectors';
import { stepSixPriceSelector } from '../StepSix/selectors';
import { stepFourPriceSelector } from '../StepFour/selectors';
import { stepFivePriceSelector } from '../StepFive/selectors';
// Constants
import { weekly_camp } from '../StepOne';
// Helpers
import isStringsEqual from '../../helpers/isStringsEqual';

export const totalPriceSelector = createSelector(
  stepOnePriceSelector,
  weeksCounterSelector,
  stepOneGroupSelector,
  stepFourPriceSelector,
  stepFivePriceSelector,
  stepSixPriceSelector,
  function(stepOnePrice, weeksCounter, stepOneGroup, stepFourPrice, stepFivePrice, stepSixPrice) {
    const stepOneComputedPrice = (
      isStringsEqual(stepOneGroup, weekly_camp)
        ? stepOnePrice * weeksCounter
        : stepOnePrice
    );
    return stepOneComputedPrice + stepFourPrice + stepFivePrice + stepSixPrice;
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
