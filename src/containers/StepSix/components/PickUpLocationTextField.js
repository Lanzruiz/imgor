// Modules
import React from 'react';
import PropTypes from 'prop-types';
import isEqual from 'lodash/isEqual';
// Components
import Input from '../../../components/Input';
// Constants
import { stepSixFormFieldNames, departingFormFieldNames } from '../selectors';

const PickUpLocationTextField = (props) => {
  const isDisabled = !isEqual(props.departing, departingFormFieldNames.other);
  return isEqual(props.departing, departingFormFieldNames.other) && (
    <div className="step-six__text-input step-six__form-field">
      <Input
        name={stepSixFormFieldNames.pickUpOtherLocation}
        label="step_six.other_location"
        disabled={isDisabled}
      />
    </div>
  );
};

PickUpLocationTextField.displayName = 'PickUpLocationTextField';

PickUpLocationTextField.propTypes = {
  departing: PropTypes.string,
};

PickUpLocationTextField.defaultProps = {};

export default PickUpLocationTextField;
