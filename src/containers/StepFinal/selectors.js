// Modules
import { createSelector } from 'reselect';
// Selectors
import { stateSelector, stepOneFormValueSelector } from '../StepOne/selectors';
// Constants
export const stepFinalFormFieldNames = {
  position: 'position',
  shirtSize: 'shirt_size',
  firstName: 'first_name',
  lastName: 'last_name',
  email: 'email',
  phone: 'phone',
  guardianInformationFirstName: 'guardian_information.first_name',
  guardianInformationLastName: 'guardian_information.last_name',
  guardianInformationEmail: 'guardian_information.email',
  guardianInformationPhone: 'guardian_information.phone',
};

function finalStepSelector(state) {
  return state.finalStep;
}

export const finalStepPositionsSelector = createSelector(
  finalStepSelector,
  function(finalStep) {
    return finalStep.positions;
  }
);

export const finalStepSelectedPositionSelector = createSelector(
  stateSelector,
  function(state) {
    return stepOneFormValueSelector(state, stepFinalFormFieldNames.position);
  }
);

export const finalStepShirtSizeSelector = createSelector(
  stateSelector,
  function(state) {
    return stepOneFormValueSelector(state, stepFinalFormFieldNames.shirtSize);
  }
);

export const finalStepPositionSelector = createSelector(
  stateSelector,
  function(state) {
    return stepOneFormValueSelector(state, stepFinalFormFieldNames.position);
  }
);

export const finalStepFirstNameSelector = createSelector(
  stateSelector,
  function(state) {
    return stepOneFormValueSelector(state, stepFinalFormFieldNames.firstName);
  }
);

export const finalStepLastNameSelector = createSelector(
  stateSelector,
  function(state) {
    return stepOneFormValueSelector(state, stepFinalFormFieldNames.lastName);
  }
);

export const finalStepEmailSelector = createSelector(
  stateSelector,
  function(state) {
    return stepOneFormValueSelector(state, stepFinalFormFieldNames.email);
  }
);

export const finalStepPhoneSelector = createSelector(
  stateSelector,
  function(state) {
    return stepOneFormValueSelector(state, stepFinalFormFieldNames.phone);
  }
);

export const finalStepGuardianFirstNameSelector = createSelector(
  stateSelector,
  function(state) {
    return stepOneFormValueSelector(state, stepFinalFormFieldNames.guardianInformationFirstName);
  }
);

export const finalStepGuardianLastNameSelector = createSelector(
  stateSelector,
  function(state) {
    return stepOneFormValueSelector(state, stepFinalFormFieldNames.guardianInformationLastName);
  }
);

export const finalStepGuardianEmailSelector = createSelector(
  stateSelector,
  function(state) {
    return stepOneFormValueSelector(state, stepFinalFormFieldNames.guardianInformationEmail);
  }
);

export const finalStepGuardianPhoneSelector = createSelector(
  stateSelector,
  function(state) {
    return stepOneFormValueSelector(state, stepFinalFormFieldNames.guardianInformationPhone);
  }
);
