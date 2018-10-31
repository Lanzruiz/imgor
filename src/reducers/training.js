// Constants
import * as trainingTypes from '../constants/training';

const initialState = {
  selectedId: null,
};

const training = (state = initialState, action) => {
  const { type, payload } = action;
  switch(type) {
    case trainingTypes.SAVE_TRAINING_ID:
      if (state.selectedId === payload) {
        return state;
      }
      return {
        ...state,
        selectedId: payload,
      };
    default:
      return state;
  }
};

export default training;
