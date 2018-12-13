// Constants
import * as stepFiveTypes from '../constants/step.five';
import { stepsEnum } from '../constants/steps';
// Actions
import { setStepsCounter } from './steps';
// Api
import Api from '../api';

export function getCatalogGearRequest() {
  return function(dispatch) {
    Api.req({
      apiCall: Api.getCatalogGear,
      res200: (data) => {
        dispatch(getCatalogGear(data));
        if (data.results && (data.results.length === 0)) {
          dispatch(
            setStepsCounter(stepsEnum.six),
          );
        }
      },
      res404: () => console.log('Api.getCatalogGear() => 404'), // TODO: Add error handler!
      reject: err => console.log(err), // TODO: Add error handler!
    });
  };
};

function getCatalogGear(catalogGear) {
  return {
    type: stepFiveTypes.GET_CATALOG_GEAR,
    payload: catalogGear,
  };
};

export function stepFiveSetGear(gearId) {
  return {
    type: stepFiveTypes.STEP_FIVE_SET_GEAR,
    payload: gearId,
  };
};

export function stepFiveIncrementSelectedGearQuantity(selectedGearId) {
  return {
    type: stepFiveTypes.STEP_FIVE_INCREMENT_SELECTED_GEAR_QUANTITY,
    payload: selectedGearId,
  };
};

export function stepFiveDecrementSelectedGearQuantity(selectedGearId) {
  return {
    type: stepFiveTypes.STEP_FIVE_DECREMENT_SELECTED_GEAR_QUANTITY,
    payload: selectedGearId,
  };
}

export function stepFiveSetDefaultState() {
  return {
    type: stepFiveTypes.STEP_FIVE_SET_DEFAULT_STATE,
  };
}

export function stepFiveSelectDropdownItem(selectedOptionIdSelectedGearId) {
  return {
    type: stepFiveTypes.STEP_FIVE_SELECT_DROPDOWN_OPTION,
    payload: selectedOptionIdSelectedGearId,
  };
}

function getCatalogGearUpsellNew(data) {
  return {
    type: stepFiveTypes.STEP_SIX_GET_CATALOG_GEAR_UPSELL_NEW,
    payload: data,
  };
}

export function getCatalogGearUpsellNewRequest({ business_type, package_type, sport, gender, boarding, age, start_date }) {
  return function(dispatch) {
    Api.req({
      apiCall: Api.getCatalogGearUpsellNew,
      res200: data => dispatch(getCatalogGearUpsellNew(data)),
      res404: () => console.log('Api.getCatalogGearUpsellNew() => 404'),
      reject: err => console.log(err),
      apiCallParams: {
        business_type,
        package_type,
        sport,
        gender,
        boarding,
        age,
        start_date,
      },
    });
  }
}
