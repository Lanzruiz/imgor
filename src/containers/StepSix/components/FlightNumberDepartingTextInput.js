// Modules
import React from 'react';
// Components
import Input from '../../../components/Input';
// Constants
import { stepSixFormFieldNames } from '../selectors';

const FlightNumberDepartingTextInput = () => {
  return (
    <div className="step-six__text-input step-six__form-field">
      <Input
        name={stepSixFormFieldNames.departingFlightNumber}
        label="step_six.flight_number"
      />
    </div>
  );
}

FlightNumberDepartingTextInput.displayName = 'FlightNumberDepartingTextInput';

FlightNumberDepartingTextInput.propTypes = {};

FlightNumberDepartingTextInput.defaultProps = {};

export default FlightNumberDepartingTextInput;
