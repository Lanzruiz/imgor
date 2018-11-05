// Constants
import * as stepsTypes from '../constants/steps';

const initialState = {
  currentStep: 7, // TODO: rewrite that to 1!
  maxStepValue: null,
  shouldShowEmailModal: true,
};

export default function(state = initialState, action) {
  const { type, payload } = action;
  switch(type) {
    case stepsTypes.INCREMENT_CURRENT_STEP:
      const counter = (
        (state.maxStepValue > state.currentStep)
          ? state.currentStep + 1
          : state.currentStep
      );
      return {
        ...state,
        currentStep: counter,
      };
    case stepsTypes.SET_MAX_STEP_VALUE:
      return {
        ...state,
        maxStepValue: payload,
      };
    case stepsTypes.CLOSE_EMAIL_MODAL:
      return {
        ...state,
        shouldShowEmailModal: false,
      };
    default:
      return state;
  }
};
