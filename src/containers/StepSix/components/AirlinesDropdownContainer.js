// Modules
import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import find from 'lodash/find';
// Components
import LocaleString from '../../../components/LocaleString';
import Dropdown from '../../../components/Dropdown';
// Constants
import { stepSixFormFieldNames } from '../selectors';

const AirlinesDropdownContainer = (props) => {
  const { airlines } = props;
  return (
    <Field
      name={stepSixFormFieldNames.airportPickupAirline}
      options={airlines}
      component={(renderFieldProps) => {
        const { input, options } = renderFieldProps;
        const { value, onChange } = input;
        return (
          <div className="step-six__form-field step-six__select-container">
            <Dropdown
              whiteArrow
              selectedOption={value || <LocaleString stringKey="step_six.select_airline" />}
              options={options}
              handleChange={(id) => {
                const selectedItem = find(options, ['id', id]);
                if (selectedItem) {
                  onChange(selectedItem.name);
                }
              }}
            />
          </div>
        );
      }}
    />
  );
}

AirlinesDropdownContainer.displayName = 'AirlinesDropdownContainer';

AirlinesDropdownContainer.propTypes = {
  airlines: PropTypes.arrayOf(
    PropTypes.shape({
      display_name: PropTypes.string,
      id: PropTypes.string,
      name: PropTypes.string,
    }),
  ),
  name: PropTypes.string,
};

AirlinesDropdownContainer.defaultProps = {
  airlines: [],
};

export default AirlinesDropdownContainer;
