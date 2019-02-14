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

export const updateAllProductsForRefundableInfo = (props) => async (dispatch, getState) => {
  const { cartId, participantId, refundable } = props;
  
  dispatch({ type: finalStepTypes.FINAL_STEP_REFUNDABLE_LOADING_TRUE });
  
  const { cart: { participants } } = getState();
  
  const products = participants.reduce((acc, v) => {
    acc = [...acc, ...v.products];
    return acc;
  }, []);
  
  const jobs = [];
  
  products.forEach(v => {
    jobs.push(
      Api.req({
        apiCall: Api.updateCartCartParticipantProductRefundable,
        res200: data => { dispatch(updateCart(data.cart)); },
        res404: () => console.log('Api.getCatalogPositions => 404'), // TODO: write handler for error
        reject: err => console.log(err),
        apiCallParams: {
          cartId,
          participantId,
          refundable,
          productId: v.id,
          product: {
            ...v
          }
        },
      })
    );
  });
  
  await Promise.all(jobs);
  
  dispatch({ type: finalStepTypes.FINAL_STEP_REFUNDABLE_LOADING_FALSE });
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
