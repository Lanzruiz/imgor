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
        group: args.group,
        secondary_group: args.secondary_group,
      },
    });
  }
};

export function postCartCartIdParticipantIdProductRequest({ cartId, quantity, product, participantId, type, productId }) {
  return function(dispatch) {
    Api.req({
      apiCall: Api.postCartCartIdParticipantIdProduct,
      res200: (data) => dispatch(postCartCartIdParticipantIdProduct(data)),
      res404: () => console.log('Api.postCartCartIdParticipantIdProduct() => 404'),
      reject: err => console.log(err),
      apiCallParams: {
        cartId,
        participantId,
        product,
        quantity,
        productId,
        type,
      },
    });
  }
};

function postCartCartIdParticipantIdProduct(data) {
  return {
    type: stepThreeTypes.STEP_THREE_POST_CART_CART_ID_PARTICIPANT_ID_PRODUCT,
    payload: data,
  };
};

function getCatalogCampsLevels(data) {
  return {
    type: stepThreeTypes.STEP_THREE_GET_CATALOG_CAMPS_LEVELS,
    payload: data,
  };
};

export function stepThreeSetDefaultState() {
  return {
    type: stepThreeTypes.STEP_THREE_SET_DEFAULT_STATE,
  };
};

export function stepThreeSetSecondaryPrograms(secondaryPrograms) {
  return {
    type: stepThreeTypes.STEP_THREE_SET_SECONDARY_PROGRAMS,
    payload: secondaryPrograms,
  };
};

export function stepThreeDeleteProductAndSetProduct({ campId }) {
  return function(dispatch) {
    Api.getCatalogCampCampId(campId)
    .then(data => data.data.results[0])
      .then((data) => { console.log(data); })
      .catch((err) => { console.log(err); })
  }
};
