// Modules
import { PURGE } from 'redux-persist';
// Constants
import * as stepZeroTypes from '../constants/step.zero';

const initialState = {
  data: {},
  loading: false,
  minAge: 8,
  maxAge: 18,
  genders: ['Male', 'Female']
};

const reducer = {
  [stepZeroTypes.STEP_ZERO_LOADING_CATALOG]: (state) => {
    return {
      ...state,
      loading: true,
    }
  },
  [stepZeroTypes.STEP_ZERO_DONE_CATALOG]: (state, action) => {
    return {
      ...state,
      data: action.payload.data,
      minAge: action.payload.minAge,
      maxAge: action.payload.maxAge,
      genders: action.payload.genders,
      loading: false,
    }
  },
  [ PURGE ]: () => ({ ...initialState })
};

export default function(state = initialState, action) {
  return reducer[action.type] ? reducer[action.type](state, action) : state;
}
