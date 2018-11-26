// Modules
import { createSelector } from 'reselect';

function initialSettingsSelector(state) {
  return state.initialSettings;
}

export const languageSelelector = createSelector(
  initialSettingsSelector,
  function(initialState) {
    return initialState.lang;
  }
);

export const businessTypeSelector = createSelector(
  initialSettingsSelector,
  function(initialState) {
    return initialState.businessType;
  }
);

export const packageTypeSelector = createSelector(
  initialSettingsSelector,
  function(initialState) {
    return initialState.packageType;
  }
);

export const sportSelector = createSelector(
  initialSettingsSelector,
  function(initialState) {
    return initialState.sport;
  }
);