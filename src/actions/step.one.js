// Constants
import * as stepOneTypes from '../constants/step.one';
// Api
import Api from '../api';

export function getCatalogCampsGroup({ sport }) {
  return function(dispatch) {
    Api.req({
      apiCall: () => Api.getCatalogCampsGroup({ sport }),
      res200: data => dispatch(stepOneGetCatalogGroup(data)),
      res404: () => console.log('Api.getCatalogCampsGroup() => Error 404'), // TODO: Add error handler
      reject: err => console.log(err), // TODO: Add error handler
    });
  };
};

function stepOneGetCatalogGroup(group) {
  return {
    type: stepOneTypes.STEP_ONE_GET_CATALOG_GROUP,
    payload: group,
  };
}

export function selectGroup(group) {
  return {
    type: stepOneTypes.STEP_ONE_SELECT_GROUP,
    payload: group,
  };
}
