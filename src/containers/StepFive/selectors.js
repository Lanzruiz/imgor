// Modules
import { createSelector } from 'reselect';

function stepFiveSelector(state) {
  return state.stepFive;
}

export const stepFiveDataSelector = createSelector(
  stepFiveSelector,
  function(stepFive) {
    return stepFive.data;
  }
);
