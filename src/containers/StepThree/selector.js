// Modules
import { createSelector } from 'reselect';

export function stepThreeDataSelector(state) {
  return state.stepThree.data;
}

export function stepTreeSelectedIdSelector(state) {
  return state.training.selectedId;
}

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
