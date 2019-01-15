// Modules
import React from 'react';
// Components
import Input from '../../../components/Input';
// Constants
import { stepSixFormFieldNames } from '../selectors';

const ArrivalFlightNumberTextInput = () => {
  return (
    <div className="step-six__text-input step-six__form-field">
      <Input
        name={stepSixFormFieldNames.arrivalFlightNumber}
        label="step_six.flight_number"
      />
    </div>
  );
}

ArrivalFlightNumberTextInput.displayName = 'ArrivalFlightNumberTextInput';

ArrivalFlightNumberTextInput.propTypes = {};

ArrivalFlightNumberTextInput.defaultProps = {};

export default ArrivalFlightNumberTextInput;
