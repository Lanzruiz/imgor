// Modules
import isEqual from 'lodash/isEqual';
import assign from 'lodash/assign';
import { PURGE } from 'redux-persist';
// Constants
import * as stepsTypes from '../constants/steps';

const initialState = {
  currentStep: 0,
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
      return assign({}, state, { currentStep: counter });
    }

    case stepsTypes.SET_MAX_STEP_VALUE: {
      return assign({}, state, { maxStepValue: payload });
    }

    case stepsTypes.CLOSE_EMAIL_MODAL: {
      return assign({}, state, { shouldShowEmailModal: false });
    }

    case stepsTypes.SET_STEPS_COUNTER: {
      if (isEqual(state.currentStep, payload)) {
        return state;
      }
      return assign({}, state, { currentStep: payload });
    }

    case PURGE: {
      return assign({}, initialState);
    }

    default:
      return state;
  }
};
