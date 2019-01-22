// Modules
import { createSelector } from 'reselect';
import isNumber from 'lodash/isNumber';

function trainingSelector(state = {}) {
  return state.training;
};

export function stepThreeSelector(state = {}) {
  return state.stepThree;
};

export const stepThreeDataSelector = createSelector(
  stepThreeSelector,
  function(stepThree = {}) {
    return stepThree.data;
  },
);

export const stepTreeSelectedIdSelector = createSelector(
  trainingSelector,
  function(training = {}) {
    return training.selectedId;
  },
);

export const stepThreeSelectedCardWithSecondaryProgramsIdSelector = createSelector(
  stepThreeSelector,
  function(stepThree = {}) {
    return stepThree.selected_card_with_secondary_programs_id;
  },
);

export const stepThreeSecondaryProgramsSelector = createSelector(
  stepThreeSelector,
  function(stepThree = {}) {
    return stepThree.secondary_programs;
  },
);

export const stepThreeHasSecondaryProgram = createSelector(
  stepThreeSelectedCardWithSecondaryProgramsIdSelector,
  stepThreeSecondaryProgramsSelector,
  function(id, secondaryPrograms = []) {
    return (isNumber(id) && (secondaryPrograms.length > 0));
  },
);

export const stepThreeSelectedProductSelector = createSelector(
  trainingSelector,
  function(training = {}) {
    return training.product;
  },
);

export const stepThreeParticipantProductIdSelector = createSelector(
  stepThreeSelector,
  function(stepThree = {}) {
    return stepThree.participantProductId;
  }
);

export const stepThreeSecondaryProgramIdSelector = createSelector(
  trainingSelector,
  function(training = {}) {
    return training.secondaryProgramId;
  },
);
