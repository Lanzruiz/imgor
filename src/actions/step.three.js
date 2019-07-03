// Modules
import assign from 'lodash/assign';
import isNumber from 'lodash/isNumber';
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
      res200: data => {
        dispatch(getCatalogCampsLevels(data),);
        
      },
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
  return async function(dispatch) {
    dispatch( stepThreeSetSecondaryPrograms({ id: null, secondary_programs: [] }), );
    dispatch( setSecondaryProgramId(null), );
    await Api.getCatalogCampCampId(campId)
      .then(data => data.data.results[0])
      .then(product => Api.postCartCartIdParticipantIdProduct({ cartId, participantId, product, quantity: 1, productId: product.id, type }))
      .then(data => {
        return data.data
      })
      .then(({ cart, participant_product_id }) => {
        dispatch( updateCart(assign({}, cart, { stepThreeProductId: participant_product_id })), );
        dispatch( saveTrainingId(campId), );
        dispatch( setStepsCounter(stepsEnum.four), );
      })
      .catch(console.error)
  }
}

export function stepThreeDiscardCardWithSecondProgram() {
  return function(dispatch) {
    dispatch( setStepsCounter(stepsEnum.three), );
    dispatch( stepThreeSetSecondaryPrograms({ id: null, secondary_programs: [] }), );
    dispatch( setSecondaryProgramId(null), );
  }
}

export function stepThreeDeleteProductFromCartAndDiscardCard({ cartId, participantId, productId }) {
  return async function(dispatch) {
    dispatch( setStepsCounter(stepsEnum.three), );
    dispatch( stepThreeSetSecondaryPrograms({ id: null, secondary_programs: [] }), );
    dispatch( setSecondaryProgramId(null), );

    return await Api.req({
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

export function stepThreeDeleteWeeklyCampProductsFromCartAndDiscardCard({ cartId, participantId, productIds }) {
  return async function(dispatch) {
    dispatch( setStepsCounter(stepsEnum.three), );
    dispatch( stepThreeSetSecondaryPrograms({ id: null, secondary_programs: [] }), );
    dispatch( setSecondaryProgramId(null), );

    return await Promise.all(
      productIds.map((productId) => {
        if ( isNumber(productId) ) {
          return (
            Api.deleteCartCartIdParticipantParticipantIdProductId({ cartId, participantId, productId })
              .then(res => res.data)
          );
        } else {
          return Promise.resolve(null);
        }
      })
    )
      .then((data) => {
        const computedCart = {};
        let cart;
        data.forEach((item, idx) => {
          const weekId = idx + 1;
          if (item) {
            cart = item.cart;
          }
          if (weekId === 1) {
            assign(computedCart, { stepThreeProductId: null });
          }
          assign(computedCart, { [`stepOneSelectedProductWeek_${weekId}`]: null });
        });
        dispatch( updateCart( assign({}, cart, computedCart) ) );
        dispatch( saveTrainingId(null), );
      })
      .catch(console.error);
  }
}

function stepThreeSetWeeklyCatalogData({ weekId, data }) {
  return {
    type: stepThreeTypes.STEP_THREE_SET_WEEKLY_CATALOG_DATA,
    payload: { weekId, data },
  };
}

export function stepThreeAddWeeklyCampToTheCart(data) {
  return async function(dispatch) {
    dispatch( stepThreeSetSecondaryPrograms({ id: null, secondary_programs: [] }), );
    dispatch( setSecondaryProgramId(null), );
  
    for(let index in data) {
      const { cartId, participantId, campId, weekId } = data[index];
      
      await Api.getCatalogCampCampId(campId)
      .then(data => data.data.results[0])
      .then(async (product) => await Api.postCartCartIdParticipantIdProduct({ cartId, participantId, product, quantity: 1, productId: product.id, type: 'camp' }))
      .then(data => {
        return data.data
      })
      .then(({ cart, participant_product_id }) => {
        dispatch(updateCart(assign({}, cart, {
          [`stepOneSelectedProductWeek_${weekId}`]: participant_product_id,
          stepThreeProductId: participant_product_id
        })));
        if (String(weekId) === String(1)) {
          dispatch( saveTrainingId(campId), );
        }
      })
    }
  
    dispatch( setStepsCounter(stepsEnum.four) );
  }
}

export function stepThreeGetWeeklyCatalogCamps(args) {
  return function(dispatch) {
    Api.req({
      res200: (data) => {
        dispatch( stepThreeSetWeeklyCatalogData({ weekId: args.weekId, data: data.results }) );
      },
      res404: () => console.log('stepThreeGetWeeklyCatalogCamps() => 404'),
      reject: console.error,
      apiCall: Api.getCatalogCampsLevels,
      apiCallParams: {
        sport: args.sport,
        business_type: args.businessType,
        package_type: args.packageType,
        gender: args.gender,
        boarding: args.boarding,
        group: args.group,
        secondary_group: args.secondaryGroup,
        age: args.age,
        date: args.startDate,
      },
    });
  }
}
