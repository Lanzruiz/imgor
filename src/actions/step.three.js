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
      apiCallParams: {
        age: args.age,
        date: args.date,
        sport: args.sport,
        gender: args.gender,
        boarding: args.boarding,
        business_type: args.business_type,
        package_type: args.package_type,
        length_program: args.length_program,
      },
    });
  }
}

function getCatalogCampsLevels(data) {
  return {
    type: stepThreeTypes.STEP_THREE_GET_CATALOG_CAMPS_LEVELS,
    payload: data,
  };
}
