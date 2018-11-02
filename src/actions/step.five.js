// Constants
import * as stepFiveTypes from '../constants/step.five';
// Api
import Api from '../api';

export const getCatalogGearRequest = ({ sport, gender, start_date, end_date }) => (dispatch) => {
  Api.req({
    apiCall: () => Api.getCatalogGear({ sport, gender, start_date, end_date }),
    res200: (data) => dispatch(getCatalogGear(data)),
    res404: () => console.log('Api.getCatalogGear() => 404'),
    reject: err => console.log(err),
  });
}

function getCatalogGear(catalogGear) {
  return {
    type: stepFiveTypes.GET_CATALOG_GEAR,
    payload: catalogGear,
  };
}
