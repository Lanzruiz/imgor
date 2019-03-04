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

const AirlinesDepartingDropdownContainer = (props) => {
  const { airlines } = props;
  return (
    <Field
      name={stepSixFormFieldNames.departingAirline}
      options={airlines}
      component={(renderFieldProps) => {
        const { input, options } = renderFieldProps;
        const { value, onChange } = input;
        return (
          <div className="step-six__form-field step-six__select-container">
            <Dropdown
              whiteArrow
              options={options}
              selectedOption={value || <LocaleString stringKey="step_six.select_airline" />}
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
};

AirlinesDepartingDropdownContainer.displayName = 'AirlinesDepartingDropdownContainer';

AirlinesDepartingDropdownContainer.propTypes = {
  airlines: PropTypes.arrayOf(
    PropTypes.shape({
      display_name: PropTypes.string,
      id: PropTypes.string,
      name: PropTypes.string,
    }),
  ),
};

AirlinesDepartingDropdownContainer.defaultProps = {
  airlines: [],
};

export default AirlinesDepartingDropdownContainer;
