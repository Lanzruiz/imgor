// Modules
import { createSelector } from 'reselect';

function trainingSelector(state) {
  return state.training;
}

export function stepThreeDataSelector(state) {
  return state.stepThree.data;
}

export const stepTreeSelectedIdSelector = createSelector(
  trainingSelector,
  function(training) {
    return training.selectedId;
  }
);

export const stepThreeHasSecondaryProgram = createSelector(
  stepThreeDataSelector,
  stepTreeSelectedIdSelector,
  function(data, selectedId) {
    const currentProduct = data.find(function({ id }) {
      return id === selectedId;
    });
    if (currentProduct) {
      return currentProduct.has_secondary_program;
    }
    return false;
  }
);

export const stepThreeSelectedProductSelector = createSelector(
  trainingSelector,
  function(training) {
    console.log('training ', training);
    return training.product;
  }
);
