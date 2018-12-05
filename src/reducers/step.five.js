// Constants
import * as stepFiveTypes from '../constants/step.five';

const initialState = {
  data: [],
};

export default function(state = initialState, action) {
  const { type, payload } = action;
  switch(type) {
    case stepFiveTypes.GET_CATALOG_GEAR: {
      const { results } = payload;
      console.log('GET_CATALOG_GEAR: ', results)
      return {
        ...state,
        data: results,
      };
    }
    default:
      return state;
  }
}