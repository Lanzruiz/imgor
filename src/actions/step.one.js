// Constants
import * as stepOneTypes from '../constants/step.one';
// Api
import Api from '../api';

export const getCatalogGroup = ({ step }) => (dispatch) => {
  Api.req({
    apiCall: () => Api.getCatalogGroup({ step }),
    res200: data => dispatch(stepOneGetCatalogGroup(data)),
    res404: () => console.log('Api.getCatalogGroup() => Error 404'), // TODO: Add error handler
    reject: err => console.log(err), // TODO: Add error handler
  });
};

function stepOneGetCatalogGroup(group) {
  return {
    type: stepOneTypes.STEP_ONE_GET_CATALOG_GROUP,
    payload: group,
  };
}
