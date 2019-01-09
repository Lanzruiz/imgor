// Modules
import assign from 'lodash/assign';
// Constants
import * as stepThreeTypes from '../constants/step.three';
import { stepsEnum } from '../constants/steps';
// Api
import Api from '../api';
// Actions
import { updateCart } from './cart';
import { saveTrainingId, setSecondaryProgramId } from './training';
import { setStepsCounter } from './steps';

export function getCatalogCampsLevelsRequest(args) {
  return function(dispatch) {
    Api.req({
      apiCall: Api.getCatalogCampsLevels,
      res200: data => dispatch( getCatalogCampsLevels(data), ),
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
      res200: (data) => dispatch( postCartCartIdParticipantIdProduct(data), ),
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

export function stepThreeDeleteProduct({ cartId, participantId, productId }) {
  return function(dispatch) {
    Api.req({
      apiCall: Api.deleteCartCartIdParticipantParticipantIdProductId,
      res200: ({ cart }) => {
        dispatch( updateCart(assign({}, cart, { stepThreeProductId: null })), );
      },
      res404: console.log,
      reject: console.error,
      apiCallParams: { cartId, participantId, productId },
    });
  }
};

export function stepThreeSetProductToTheCart({ campId, cartId, participantId, type = 'camp' }) {
  return function(dispatch) {
    dispatch( stepThreeSetSecondaryPrograms({ id: null, secondary_programs: [] }), );
    dispatch( setSecondaryProgramId(null), );
    Api.getCatalogCampCampId(campId)
      .then(data => data.data.results[0])
      .then(product => Api.postCartCartIdParticipantIdProduct({ cartId, participantId, product, quantity: 1, productId: product.id, type }))
      .then(data => data.data)
      .then(({ cart, participant_product_id }) => {
        dispatch( updateCart(assign({}, cart, { stepThreeProductId: participant_product_id })), );
        dispatch( saveTrainingId(campId), );
        dispatch( setStepsCounter(stepsEnum.four), );
      })
      .catch(console.error)
  }
}

export function stepThreeDeleteProductFromCartAndSetNew({ campId, cartId, participantId, productId }) {
  return function(dispatch) {
    dispatch( setStepsCounter(stepsEnum.three), );
    dispatch( stepThreeSetSecondaryPrograms({ id: null, secondary_programs: [] }), );
    dispatch( setSecondaryProgramId(null), );
    Api.req({
      apiCall: Api.deleteCartCartIdParticipantParticipantIdProductId,
      res200: ({ cart }) => {
        dispatch( updateCart(assign({}, cart, { stepThreeProductId: null })), );
        dispatch( stepThreeSetProductToTheCart({ campId, cartId, participantId, type: 'camp' }), );
        dispatch( setStepsCounter(stepsEnum.four), );
      },
      res404: console.log,
      reject: console.error,
      apiCallParams: { cartId, participantId, productId },
    });
  }
}

export function stepThreeDiscardCardWithSecondProgram() {
  return function(dispatch) {
    dispatch( setStepsCounter(stepsEnum.three), );
    dispatch( stepThreeSetSecondaryPrograms({ id: null, secondary_programs: [] }), );
    dispatch( setSecondaryProgramId(null), );
  }
}

export function stepThreeDeleteProductFromCartAndDiscardCard({ campId, cartId, participantId, productId }) {
  return function(dispatch) {
    dispatch( setStepsCounter(stepsEnum.three), );
    dispatch( stepThreeSetSecondaryPrograms({ id: null, secondary_programs: [] }), );
    dispatch( setSecondaryProgramId(null), );
    
    Api.req({
      apiCall: Api.deleteCartCartIdParticipantParticipantIdProductId,
      res200: ({ cart }) => {
        dispatch( updateCart(assign({}, cart, { stepThreeProductId: null })), );
        dispatch( saveTrainingId(null), );
      },
      res404: console.log,
      reject: console.error,
      apiCallParams: { cartId, participantId, productId },
    });
  }
}
