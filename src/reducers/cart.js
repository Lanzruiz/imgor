// Constants
import * as cartTypes from '../constants/cart';

const initialState = {
  address: null,
  id: null,
  created: null,
  updated: null,
  first_name: null,
  last_name: null,
  email: null,
  contact_number: null,
  status: 1,
  push_status: 0,
  dob: null,
  price_total: 0,
  representative_id: null,
  representative_email: null,
  representative_data: null,
  analytic_data: null,
  newsletter_signup: null,
  locked: null,
  test_transaction: null,
  tracking_code: null,
  transactions: [],
  participants: [],
  quantity: 0,
  coupon_code: null,
  coupon_data: null,
  order_trace: null,
  total_discount: 0
};

const cart = (state = initialState, action = {}) => {
  const { type, payload } = action;
  switch(type) {
    case cartTypes.CREATE_CART: {
      return {
        ...state,
        ...payload,
      };
    }
    default: {
      return state;
    }
  }
}

export default cart;
