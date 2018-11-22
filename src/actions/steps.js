// Constants
import * as stepTypes from '../constants/steps';

export function incrementStepsCounter() {
  return { type: stepTypes.INCREMENT_CURRENT_STEP };
};

export function setMaxStepValue(value) {
  return {
    type: stepTypes.SET_MAX_STEP_VALUE,
    payload: value,
  };
};

export function setStepsCounter(payload) {
  return function(dispatch) {
    return new Promise(function(resolve) {
      resolve({ type: stepTypes.SET_STEPS_COUNTER, payload: payload });
    }).then(dispatch);
  }
}
