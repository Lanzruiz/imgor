// Constants
import * as stepOneTypes from '../constants/step.one';

const initialState = {
  lengthProgram: '1 Week Camps',
};

export default function(state = initialState, action) {
  const { type, payload } = action;
  switch(type) {
    case stepOneTypes.STEP_ONE_GET_CATALOG_GROUP: {
      console.log('STEP_ONE_GET_CATALOG_GROUP ', payload);
      return {
        ...state,
      };
    }
    default:
      return state;
  }
}