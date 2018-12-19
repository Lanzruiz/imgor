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

export const stepFiveItemsPerPageSelector = createSelector(
  stepFiveSelector,
  function(stepFive) {
    return stepFive.itemsPerPage;
  }
);

export const stepFiveDataPerPageSelector = createSelector(
  stepFiveDataSelector,
  stepFiveItemsPerPageSelector,
  function(data, perPage) {
    const startIndex = 0;
    return data.slice(startIndex, perPage);
  }
);

export const stepFiveShouldRenderLoadMoreButtonSelector = createSelector(
  stepFiveDataSelector,
  stepFiveItemsPerPageSelector,
  function(data, perPage) {
    const maxItemsCount = data.length;
    return maxItemsCount > perPage;
  }
);

export const stepFiveProductsSelector = createSelector(
  stepFiveSelector,
  function(stepFive) {
    return stepFive.products;
  }
);
