// Constants
import * as cartTypes from '../constants/cart';
// Api
import Api from '../api';

export function updateCart(cart) {
  return {
    type: cartTypes.UPDATE_CART,
    payload: cart,
  };
};

export function deleteCart() {
  return {
    type: cartTypes.DELETE_CART,
  };
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

export function purchaseRequest(args) {
  return function(dispatch) {
    Api.req({
      res200: (data) => {
        dispatch( updateCart(data.cart), );

        if (window && args.cartId) {
          window.location = `${args.shopifyUrl}?order=${args.cartId}`;
        }

        // Api.req({
        //   res200: (data) => {
        //     console.log(data);
        //     dispatch( updateCart(data.cart), );
        //   },
        //   res404: () => { console.log('Api.putCartCartId => 404'); },
        //   reject: console.error,
        //   apiCall: Api.putCartCartId,
        //   apiCallParams: {
        //     cartId: args.cartId,
        //     first_name: args.guardianFirstName,
        //     last_name: args.guardianLastName,
        //     email: args.guardianEmail,
        //     contact_number: args.guardianPhone,
        //   },
        // });

      },
      res404: () => console.log('purchaseRequest => 404'),
      reject: () => {},
      apiCall: Api.putCartCartIdParticipantParticipantId,
      apiCallParams: args,
    });
  }
}