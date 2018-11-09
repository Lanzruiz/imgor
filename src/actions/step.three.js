// Constants
import * as stepThreeTypes from '../constants/step.three';
// Api
import Api from '../api';

export function getCatalogCampsLevelsRequest(args) {
  return function(dispatch) {
    Api.req({
      apiCall: Api.getCatalogCampsLevels,
      res200: data => dispatch(getCatalogCampsLevels(data)),
      res404: () => console.log('Api.getCatalogCampsLevels() => 404'),
      reject: err => console.log(err),
      apiCallParams: args,
    });
  }
}

function getCatalogCampsLevels(data) {
  return {
    type: stepThreeTypes.STEP_THREE_GET_CATALOG_CAMPS_LEVELS,
    payload: data,
  };
}
