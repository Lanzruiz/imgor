// Constants
import * as cartTypes from '../constants/cart';
// Api
import Api from '../api';

export const createCart = (cart) => ({
  type: cartTypes.CREATE_CART,
  payload: cart,
});

export const updateCart = () => ({ type: cartTypes.UPDATE_CART });

export const deleteCart = () => ({ type: cartTypes.DELETE_CART });

export const createCartRequest = () => (dispatch) => {
  Api.createCart()
    .then(({ status, data }) => {
      if (status === 200) {
        dispatch(createCart(data.cart));
      }
      if (status === 404) {
        // TODO: Add error handler!
        // dispatch();
      }
    })
    .catch((err) => {
      // TODO: Add error handler!
      // dispatch();
    })
};
