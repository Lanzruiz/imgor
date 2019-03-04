// Constants
import * as finalStepTypes from '../constants/final.step';
// Api
import Api from '../api';
import { updateCart } from './cart';

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

export const updateAllProductsForRefundableInfo = (props) => async (dispatch) => {
  const { cartId, refundable } = props;
  
  dispatch({ type: finalStepTypes.FINAL_STEP_REFUNDABLE_LOADING_TRUE });

  await Api.req({
    apiCall: Api.updateCartCartParticipantProductRefundable,
    res200: data => { dispatch(updateCart(data.cart)); },
    res404: () => console.log('Api.getCatalogPositions => 404'), // TODO: write handler for error
    reject: err => console.log(err),
    apiCallParams: {
      cartId,
      refundable,
    },
  });
  
  dispatch({ type: finalStepTypes.FINAL_STEP_REFUNDABLE_LOADING_FALSE });
};

export const recalculateInsurancePrice = () => async (dispatch, getState) => {
  const { cart: { id } } = getState();
  
  await Api.req({
    apiCall: Api.recalculateInsurancePrice,
    res200: data => {
      dispatch({
        type: finalStepTypes.FINAL_STEP_INSURANCE_PRICE_UPDATE,
        payload: Number(data.total_price_difference)
      });
    },
    res404: () => console.log('Api.getCatalogPositions => 404'), // TODO: write handler for error
    reject: err => console.log(err),
    apiCallParams: {
      cartId: id,
    },
  });
};

export function finalStepRefundableUpdate(refundable) {
  return {
    type: finalStepTypes.FINAL_STEP_REFUNDABLE_UPDATE,
    payload: refundable
  };
}

export function finalStepSetDefaultState() {
  return {
    type: finalStepTypes.FINAL_STEP_SET_DEFAULT_STATE,
  };
}
