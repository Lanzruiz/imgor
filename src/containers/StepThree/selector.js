// Modules
import { createSelector } from 'reselect';

function trainingSelector(state) {
  return state.training;
};

function stepThreeSelector(state) {
  return state.stepThree;
};

export const stepThreeDataSelector = createSelector(
  stepThreeSelector,
  function(stepThree) {
    return stepThree.data;
  },
);

export const stepTreeSelectedIdSelector = createSelector(
  trainingSelector,
  function(training) {
    return training.selectedId;
  },
);

export const stepThreeSelectedCardWithSecondaryProgramsIdSelector = createSelector(
  stepThreeSelector,
  function(stepThree) {
    return stepThree.selected_card_with_secondary_programs_id;
  },
);

export const stepThreeSecondaryProgramsSelector = createSelector(
  stepThreeSelector,
  function(stepThree) {
    return stepThree.secondary_programs;
  },
);

export const stepThreeHasSecondaryProgram = createSelector(
  stepThreeSelectedCardWithSecondaryProgramsIdSelector,
  stepThreeSecondaryProgramsSelector,
  function(id, secondaryPrograms) {
    return ((typeof id === 'number') && (secondaryPrograms.length > 0));
  },
);

export const stepThreeSelectedProductSelector = createSelector(
  trainingSelector,
  function(training) {
    return training.product;
  },
);
