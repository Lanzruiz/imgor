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

export const stepFiveGearUpsellNewSelector = createSelector(
  stepFiveSelector,
  function(stepFive) {
    return stepFive.gearUpsellNew;
  }
);

export const stepFiveCatalogExcursionsNewSelector = createSelector(
  stepFiveSelector,
  function(stepFive) {
    return stepFive.excursions;
  }
);

export const stepFiveExcursionsItemsPerPageSelector = createSelector(
  stepFiveSelector,
  function(stepFive) {
    return stepFive.excursionsItemsStepCounter;
  }
);

export const stepFiveSelectedExcurcionGearSelector = createSelector(
  stepFiveSelector,
  function(stepFive) {
    return stepFive.selectedExcurcionGear;
  }
);

export const stepFiveExcurcionsPerPageSelector = createSelector(
  stepFiveCatalogExcursionsNewSelector,
  stepFiveExcursionsItemsPerPageSelector,
  function(excursions, perPage) {
    const startIndex = 0;
    return excursions.slice(startIndex, perPage);
  }
);

export const stepFiveShouldRenderExcursionsLoadMoreButtonSelector = createSelector(
  stepFiveCatalogExcursionsNewSelector,
  stepFiveExcursionsItemsPerPageSelector,
  function(data, perPage) {
    const maxItemsCount = data.length;
    return maxItemsCount > perPage;
  }
);

export const stepFiveUpsellNewSelectedProductsSelector = createSelector(
  stepFiveSelector,
  function(stepFive) {
    return stepFive.upsellNewSelectedProducts;
  }
);

export const stepFiveUpsellItemsPerPageSelector = createSelector(
  stepFiveSelector,
  function(stepFive) {
    return stepFive.upsellItemsStepCounter;
  }
);

export const stepFiveUpsellPerPageSelector = createSelector(
  stepFiveGearUpsellNewSelector,
  stepFiveUpsellItemsPerPageSelector,
  function(upsellNew, perPage) {
    const startIndex = 0;
    return upsellNew.slice(startIndex, perPage);
  }
);

export const stepFiveShouldRenderUpsellLoadMoreButtonSelector = createSelector(
  stepFiveGearUpsellNewSelector,
  stepFiveUpsellItemsPerPageSelector,
  function(data, perPage) {
    const maxItemsCount = data.length;
    return maxItemsCount > perPage;
  }
);
