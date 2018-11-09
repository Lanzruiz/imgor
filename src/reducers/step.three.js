// Constants
import * as stepThreeTypes from '../constants/step.three';

const initialState = {};

export default function(state = initialState, action) {
  const { type, payload } = action;
  switch(type) {
    case stepThreeTypes.STEP_THREE_GET_CATALOG_CAMPS_LEVELS: {
      console.log('STEP_THREE_GET_CATALOG_CAMPS_LEVELS', payload);
      return state;
    }
    default:
      return state;
  }
}
