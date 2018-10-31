import * as stepTypes from '../constants/steps';

export const incrementStepsCounter = () => ({ type: stepTypes.INCREMENT_CURRENT_STEP });

export const setMaxStepValue = (value) => ({
  type: stepTypes.SET_MAX_STEP_VALUE,
  payload: value,
});

export const closeEmailModal = () => ({ type: stepTypes.CLOSE_EMAIL_MODAL });
