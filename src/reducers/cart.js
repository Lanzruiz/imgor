// Modules
import assign from 'lodash/assign';
import isEqual from 'lodash/isEqual';
import { PURGE } from 'redux-persist';
// Constants
import * as cartTypes from '../constants/cart';

const initialState = {
  id: null,
  stepThreeProductId: null,
  stepSixUnnacompaniedProductId: null,
  stepSixDepartingProductId: null,
  stepSixArrivalProductId: null,
  stepFourConcentrationProduct_1: null,
  stepFourConcentrationProduct_2: null,
  stepFourConcentrationProduct_3: null,
  stepFourConcentrationProduct_4: null,
  stepFourConcentrationProduct_5: null,
  stepFourConcentrationProduct_6: null,
  stepFourConcentrationProduct_7: null,
  stepFourConcentrationProduct_8: null,
  stepFourConcentrationProduct_9: null,
  stepFourConcentrationProduct_10: null,
  stepFourConcentrationProduct_11: null,
  stepFourConcentrationProduct_12: null,
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

    case PURGE: {
      return assign({}, initialState);
    }

    default: {
      return state;
    }
  }
}
