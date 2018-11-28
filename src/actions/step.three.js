// Constants
import * as stepThreeTypes from '../constants/step.three';
// Api
import Api from '../api';

export function getCatalogCampsLevelsRequest(args) {
  return function(dispatch) {
    console.log('args ', args);
    Api.req({
      apiCall: Api.getCatalogCampsLevels,
      res200: data => dispatch(getCatalogCampsLevels(data)),
      res404: () => console.log('Api.getCatalogCampsLevels() => 404'),
      reject: err => console.log(err),
      apiCallParams: {
        age: args.age,
        sport: args.sport,
        gender: args.gender,
        boarding: args.boarding,
        business_type: args.business_type,
        package_type: args.package_type,
        group: args.group,
        secondary_group: args.secondary_group,
        //length_program: args.length_program,
        start_date: args.start_date,
      },
    });
  }
}

export function postCartCartIdParticipantIdProductRequest({ cartId, id }) {
  return function(dispatch) {
    Api.req({
      apiCall: Api.postCartCartIdParticipantIdProduct,
      res200: (data) => dispatch(postCartCartIdParticipantIdProduct(data)),
      res404: () => console.log('Api.postCartCartIdParticipantIdProduct() => 404'),
      reject: err => console.log(err),
      apiCallParams: {
        cartId,
        id,
      },
    });
  }
}

function postCartCartIdParticipantIdProduct(data) {
  return {
    type: stepThreeTypes.STEP_THREE_POST_CART_CART_ID_PARTICIPANT_ID_PRODUCT,
    payload: data,
  };
}

function getCatalogCampsLevels(data) {
  return {
    type: stepThreeTypes.STEP_THREE_GET_CATALOG_CAMPS_LEVELS,
    payload: data,
  };
}

export function stepThreeSetDefaultState() {
  return {
    type: stepThreeTypes.STEP_THREE_SET_DEFAULT_STATE,
  };
}
