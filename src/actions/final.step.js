// Constants
import * as finalStepTypes from '../constants/final.step';
// Api
import Api from '../api';

function finalStepGetCatalogPositions(data) {
  return {
    type: finalStepTypes.FINAL_STEP_GET_CATALOG_POSITIONS,
    payload: data,
  };
}

export function finalStepGetCatalogPositionsRequest({ sport, participant }) {
  return function(dispatch) {
    Api.req({
      apiCall: Api.getCatalogPositions,
      res200: data => dispatch(finalStepGetCatalogPositions(data)),
      res404: () => console.log('Api.getCatalogPositions => 404'), // TODO: write handler for error
      reject: err => console.log(err),
      apiCallParams: {
        sport,
        participant,
      },
    });
  }
}

export function finalStepSetDefaultState() {
  return {
    type: finalStepTypes.FINAL_STEP_SET_DEFAULT_STATE,
  };
}
