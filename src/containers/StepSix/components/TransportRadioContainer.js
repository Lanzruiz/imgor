// Modules
import find from 'lodash/find';
import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import Dropdown from '../../../components/Dropdown';
import LocaleString from '../../../components/LocaleString';

function TransportRadioContainer(props) {
  const { options, value, name } = props;
  
  return (
    <Field
      name={name}
      type="radio"
      options={options}
      component={({ input, options }) => {
        const { onChange } = input;
        const name = (find(options, [ 'name', value ]) || {}).display_name;
        return (
          <Dropdown
            whiteArrow
            selectedOption={name || <LocaleString stringKey="step_six.select_airport"/>}
            options={options}
            handleChange={(id) => {
              const selectedItem = find(options, [ 'id', id ]);
              if(selectedItem) {
                onChange(selectedItem.name);
              }
            }}
          />
        )
      }}
    />
  );
};

TransportRadioContainer.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      airport: PropTypes.string,
      id: PropTypes.number,
      package_product_id: PropTypes.string,
      price: PropTypes.number,
      vehicle: PropTypes.string,
    }),
  ),
  value: PropTypes.string,
};

TransportRadioContainer.defaultProps = {
  options: [],
};

export default TransportRadioContainer;
