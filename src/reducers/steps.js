// Constants
import * as stepsTypes from '../constants/steps';

const initialState = {
  currentStep: 1,
  maxStepValue: null,
  shouldShowEmailModal: true,
};

export default function(state = initialState, action) {
  const { type, payload } = action;
  switch(type) {
    case stepsTypes.INCREMENT_CURRENT_STEP: {
      const counter = (
        (state.maxStepValue > state.currentStep)
          ? state.currentStep + 1
          : state.currentStep
      );
      return {
        ...state,
        currentStep: counter,
      };
    }

    case stepsTypes.SET_MAX_STEP_VALUE: {
      return {
        ...state,
        maxStepValue: payload,
      };
    }

    case stepsTypes.CLOSE_EMAIL_MODAL: {
      return {
        ...state,
        shouldShowEmailModal: false,
      };
    }

    case stepsTypes.SET_STEPS_COUNTER: {
      if (state.currentStep === payload) {
        return state;
      }
      return {
        ...state,
        currentStep: payload,
      };
    }

    default:
      return state;
  }
};
