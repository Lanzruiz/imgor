// Modules
import { createSelector } from 'reselect';
// Selectors
import { stateSelector, stepOneFormValuesName, stepOneFormValueSelector } from '../StepOne/selectors';
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
  stepOneFormValuesName,
  function(state, name) {
    return stepOneFormValueSelector(state, name, stepFinalFormFieldNames.position);
  }
);

export const finalStepShirtSizeSelector = createSelector(
  stateSelector,
  stepOneFormValuesName,
  function(state, name) {
    return stepOneFormValueSelector(state, name, stepFinalFormFieldNames.shirtSize);
  }
);

export const finalStepPositionSelector = createSelector(
  stateSelector,
  stepOneFormValuesName,
  function(state, name) {
    return stepOneFormValueSelector(state, name, stepFinalFormFieldNames.position);
  }
);

export const finalStepFirstNameSelector = createSelector(
  stateSelector,
  stepOneFormValuesName,
  function(state, name) {
    return stepOneFormValueSelector(state, name, stepFinalFormFieldNames.firstName);
  }
);

export const finalStepLastNameSelector = createSelector(
  stateSelector,
  stepOneFormValuesName,
  function(state, name) {
    return stepOneFormValueSelector(state, name, stepFinalFormFieldNames.lastName);
  }
);

export const finalStepEmailSelector = createSelector(
  stateSelector,
  stepOneFormValuesName,
  function(state, name) {
    return stepOneFormValueSelector(state, name, stepFinalFormFieldNames.email);
  }
);

export const finalStepPhoneSelector = createSelector(
  stateSelector,
  stepOneFormValuesName,
  function(state, name) {
    return stepOneFormValueSelector(state, name, stepFinalFormFieldNames.phone);
  }
);

export const finalStepGuardianFirstNameSelector = createSelector(
  stateSelector,
  stepOneFormValuesName,
  function(state, name) {
    return stepOneFormValueSelector(state, name, stepFinalFormFieldNames.guardianInformationFirstName);
  }
);

export const finalStepGuardianLastNameSelector = createSelector(
  stateSelector,
  stepOneFormValuesName,
  function(state, name) {
    return stepOneFormValueSelector(state, name, stepFinalFormFieldNames.guardianInformationLastName);
  }
);

export const finalStepGuardianEmailSelector = createSelector(
  stateSelector,
  stepOneFormValuesName,
  function(state, name) {
    return stepOneFormValueSelector(state, name, stepFinalFormFieldNames.guardianInformationEmail);
  }
);

export const finalStepGuardianPhoneSelector = createSelector(
  stateSelector,
  stepOneFormValuesName,
  function(state, name) {
    return stepOneFormValueSelector(state, name, stepFinalFormFieldNames.guardianInformationPhone);
  }
);
