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
}

function getCatalogGear(catalogGear) {
  return {
    type: stepFiveTypes.GET_CATALOG_GEAR,
    payload: catalogGear,
  };
}
