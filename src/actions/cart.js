// Constants
import * as cartTypes from '../constants/cart';
// Api
import Api from '../api';

export function updateCart() {
  return { type: cartTypes.UPDATE_CART };
};

export function deleteCart() {
  return { type: cartTypes.DELETE_CART };
};

export function createCartRequest() {
  return function(dispatch) {
    return Api.req({
      apiCall: Api.createCart,
      res200: (data) => dispatch(createCart(data.cart)),
      res404: () => console.log('Api.createCart() => 404'), // TODO: Add error handler!
      reject: (err) => console.log(err), // TODO: Add error handler!
    });
  };
};

function createCart(cart) {
  return {
    type: cartTypes.CREATE_CART,
    payload: cart,
  };
}