// Modules
import React from 'react';
import PropTypes from 'prop-types';
import isEqual from 'lodash/isEqual';
import { Field } from 'redux-form';
// Components
import Radio from '../../../components/Radio';
// Constants
import { stepSixFormFieldNames } from '../selectors';

const DepartingTransportRadioContainer = (props) => {
  const { options, value } = props;
  return (
    <ul className="step-six__radio-list">
      <Field
        name={stepSixFormFieldNames.departingTransport}
        type="radio"
        options={options}
        component={({ input, options }) => (
          options.map(({ id, airport, price }) => {
            const computedLabel = price ? `${airport} - $${price}` : airport;
            return (
              <li key={id} className="step-six__radio-list-item">
                <Radio
                  {...input}
                  value={id}
                  checked={isEqual(('' + value), ('' + id))}
                  children={computedLabel}
                />
              </li>
            );
          })
        )}
      />
    </ul>
  );
};

DepartingTransportRadioContainer.displayName = 'DepartingTransportRadioContainer';

DepartingTransportRadioContainer.propTypes = {
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

DepartingTransportRadioContainer.defaultProps = {};

export default DepartingTransportRadioContainer;
