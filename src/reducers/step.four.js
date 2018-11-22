// Modules
import isEqual from 'lodash/isEqual';
// Constants
import * as stepFourTypes from '../constants/step.four';

const initialState = {
  data: [],
  starting_price: 0,
};

export default function(state = initialState, action) {
  const { type, payload } = action;
  switch(type) {
    case stepFourTypes.STEP_FOUR_GET_CATALOG_CAMPS: {
      console.log('STEP_FOUR_GET_CATALOG_CAMPS', payload);
      // const { results } = payload;
      // if (isEqual({ data: state.data }, { data: results })) {
      //   return state;
      // }
      // return {
      //   ...state,
      //   data: results,
      // };
    }
    default:
      return state;
  }
}
