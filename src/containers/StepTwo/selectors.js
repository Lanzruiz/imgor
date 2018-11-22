// Modules
import { createSelector } from 'reselect';

function stepTwoSelector(state) {
  return state.stepTwo;
}

export const stepTwoDataSelector = createSelector(
  stepTwoSelector,
  function(stepTwo) {
    return stepTwo.data;
  }
);

export const stepTwoSelectedDateSelector = createSelector(
  stepTwoSelector,
  function(stepTwo) {
    return stepTwo.selectedDate;
  }
);

export const stepTwoStartDateSelector = createSelector(
  stepTwoSelectedDateSelector,
  function(selectedDate) {
    return selectedDate.capacity_start_date;
  }
);

export const stepTwoEndDateSelector = createSelector(
  stepTwoSelectedDateSelector,
  function(selectedDate) {
    return selectedDate.capacity_end_date;
  }
);
