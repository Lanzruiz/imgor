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

export const stepFiveSelectedGearsSelector = createSelector(
  stepFiveSelector,
  function(stepFive) {
    return stepFive.selectedGear;
  }
);

export const stepFivePriceSelector = createSelector(
  stepFiveSelectedGearsSelector,
  function(selectedGear) {
    let resultPrice = 0;
    for (let key in selectedGear) {
      resultPrice = resultPrice + selectedGear[key].price * selectedGear[key].quantity;
    }
    return resultPrice;
  }
);
