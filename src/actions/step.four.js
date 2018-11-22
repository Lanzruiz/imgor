// Constants
import * as stepFourTypes from '../constants/step.four';
// Api
import Api from '../api';

export function getCatalogCampRequest({ business_type, program_type, sport, age, gender, start_date, end_date }) {
  return function (dispatch) {
    Api.req({
      apiCall: Api.getCatalogCamps,
      res200: (data) => dispatch(getCatalogCamps(data)),
      res404: () => console.log('Api.getCatalogCamps() => 404'),
      reject: err => console.log(err),
      apiCallParams: {
        business_type,
        program_type,
        sport,
        age,
        gender,
        start_date,
        end_date,
      },
    });
  }
}

function getCatalogCamps(data) {
  return {
    type: stepFourTypes.STEP_FOUR_GET_CATALOG_CAMPS,
    payload: data,
  };
}
