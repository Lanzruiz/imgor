// Modules
import { createSelector } from 'reselect';
// Selectors
import { weeksWeeksSelector, cartSelector, weeksSelectedWeekIdSelector } from '../StepOne/selectors';

function stepFourSelector(state) {
  return state.stepFour;
}

export const stepFourDataSelector = createSelector(
  stepFourSelector,
  function(stepFour = {}) {
    return stepFour.data;
  }
);

export const stepFourWeekOneDataSelector = createSelector(
  stepFourSelector,
  function(stepFour = {}) {
    return stepFour.week_1_data;
  }
);

export const stepFourWeekTwoDataSelector = createSelector(
  stepFourSelector,
  function(stepFour = {}) {
    return stepFour.week_2_data;
  }
);

export const stepFourWeekThreeDataSelector = createSelector(
  stepFourSelector,
  function(stepFour = {}) {
    return stepFour.week_3_data;
  }
);

export const stepFourWeekFourDataSelector = createSelector(
  stepFourSelector,
  function(stepFour = {}) {
    return stepFour.week_4_data;
  }
);

export const stepFourWeekFiveDataSelector = createSelector(
  stepFourSelector,
  function(stepFour = {}) {
    return stepFour.week_5_data;
  }
);

export const stepFourWeekSixDataSelector = createSelector(
  stepFourSelector,
  function(stepFour = {}) {
    return stepFour.week_6_data;
  }
);

export const stepFourWeekSevenDataSelector = createSelector(
  stepFourSelector,
  function(stepFour = {}) {
    return stepFour.week_7_data;
  }
);

export const stepFourWeekEightDataSelector = createSelector(
  stepFourSelector,
  function(stepFour = {}) {
    return stepFour.week_8_data;
  }
);

export const stepFourWeekNineDataSelector = createSelector(
  stepFourSelector,
  function(stepFour = {}) {
    return stepFour.week_9_data;
  }
);

export const stepFourWeekTenDataSelector = createSelector(
  stepFourSelector,
  function(stepFour = {}) {
    return stepFour.week_10_data;
  }
);

export const stepFourWeekElevenDataSelector = createSelector(
  stepFourSelector,
  function(stepFour = {}) {
    return stepFour.week_11_data;
  }
);

export const stepFourWeekTwelveDataSelector = createSelector(
  stepFourSelector,
  function(stepFour = {}) {
    return stepFour.week_12_data;
  }
);

export const stepFourPriceSelector = createSelector(
  weeksWeeksSelector,
  function(weeks = []) {
    let result = 0;
    weeks.forEach(({ price }) => {
      if (price) {
        result = result + price;
      }
    });
    return result;
  }
);

export const stepFourSecondaryProgramIdSelector = createSelector(
  stepFourSelector,
  function(stepFour = {}) {
    return stepFour.secondaryProgramId;
  }
);

export const stepFourConcentrationProductIdSelector = createSelector(
  cartSelector,
  weeksSelectedWeekIdSelector,
  function(cart = {}, weeksSelectedWeekId = 0) {
    const weekId = weeksSelectedWeekId + 1;
    return cart[`stepFourConcentrationProduct_${weekId}`];
  }
);
