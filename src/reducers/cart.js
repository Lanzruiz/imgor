// Modules
import assign from 'lodash/assign';
import isEqual from 'lodash/isEqual';
// Constants
import * as cartTypes from '../constants/cart';

const initialState = {
  id: null,
  stepThreeProductId: null,
  stepSixUnnacompaniedProductId: null,
  stepSixDepartingProductId: null,
  stepSixArrivalProductId: null,
};

export default function(state = initialState, action) {
  const { type, payload } = action;
  switch(type) {
    case cartTypes.CREATE_CART: {
      return assign({}, state, payload);
    }

    case cartTypes.UPDATE_CART: {
      if (isEqual(state, payload)) {
        return state;
      }
      return assign({}, state, payload);
    }

    default: {
      return state;
    }
  }
}
