// Constants
import * as cartTypes from '../constants/cart';
// Api
import Api from '../api';

export const updateCart = () => ({ type: cartTypes.UPDATE_CART });

export const deleteCart = () => ({ type: cartTypes.DELETE_CART });

export const createCartRequest = () => (dispatch) => {
  return Api.req({
    apiCall: Api.createCart,
    res200: (data) => dispatch(createCart(data.cart)),
    res404: () => console.log('404'), // TODO: Add error handler!
    reject: (err) => console.log(err), // TODO: Add error handler!
  });
};

function createCart(cart) {
  return {
    type: cartTypes.CREATE_CART,
    payload: cart,
  };
}