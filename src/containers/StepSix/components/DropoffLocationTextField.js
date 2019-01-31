// Modules
import React from 'react';
import PropTypes from 'prop-types';
import isEqual from 'lodash/isEqual';
// Components
import Input from '../../../components/Input';
// Constants
import { stepSixFormFieldNames, departingFormFieldNames } from '../selectors';

const DropoffLocationTextField = (props) => {
  const isDisabled = !isEqual(props.dropoff, departingFormFieldNames.other);
  
  return isEqual(props.dropoff, departingFormFieldNames.other) && (
    <div className="step-six__text-input step-six__form-field">
      <Input
        name={stepSixFormFieldNames.dropoffOtherLocation}
        label="step_six.other_location"
        disabled={isDisabled}
      />
    </div>
  );
};

DropoffLocationTextField.displayName = 'DropoffLocationTextField';

DropoffLocationTextField.propTypes = {
  dropoff: PropTypes.string,
};

DropoffLocationTextField.defaultProps = {};

export default DropoffLocationTextField;
