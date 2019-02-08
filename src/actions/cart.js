// Constants
import * as cartTypes from '../constants/cart';
// Api
import Api from '../api';

export function updateCart(cart) {
  return (dispatch, getState) => {
    const { form } = getState();
  
    const email = ((form.wizard || {}).values || {}).email || '';
    
    if(window.reactAppUpdate && typeof window.reactAppUpdate === 'function' ){
      window.reactAppUpdate({email: email, cart: cart, price: cart.price_total || 0 });
    }
    
    dispatch({
      type: cartTypes.UPDATE_CART,
      payload: cart,
    });
  }
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

export function purchaseRequest(args, stubData) {
  return function(dispatch) {
    Api.req({
      res200: (data) => {
        dispatch( updateCart(data.cart), );
        
        if(window.reactAppUpdate && typeof window.reactAppUpdate === 'function' ){
          window.reactAppUpdate(data.cart);
        }

        Api.req({
          res200: (data) => {
            dispatch( updateCart(data.cart), );
  
            if(window.reactAppUpdate && typeof window.reactAppUpdate === 'function' ){
              window.reactAppUpdate(data.cart);
            }

            if (window && args.cartId) {
              window.location = `${args.shopifyUrl}?order=${args.cartId}`;
            }
  
            if(window.reactAppUpdate && typeof window.reactAppUpdate === 'function' ){
              window.reactAppUpdate(data.cart);
            }

          },
          res404: () => { console.log('Api.putCartCartId => 404'); },
          reject: console.error,
          apiCall: Api.putCartCartId,
          apiCallParams: {
            ...stubData,
            cartId: args.cartId,
            first_name: args.guardianFirstName,
            last_name: args.guardianLastName,
            email: args.guardianEmail,
            contact_number: args.guardianPhone,
          },
        });

      },
      res404: () => console.log('purchaseRequest => 404'),
      reject: () => {},
      apiCall: Api.putCartCartIdParticipantParticipantId,
      apiCallParams: args,
    });
  }
}
