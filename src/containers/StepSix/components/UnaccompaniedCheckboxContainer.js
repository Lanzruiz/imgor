// Modules
import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import isEqual from 'lodash/isEqual';
// Components
import Radio from '../../../components/Radio';
import LocaleString from '../../../components/LocaleString';
// Constants

const UnaccompaniedCheckboxContainer = (props) => {
  const { unaccompanied, transportUnaccompanied, name } = props;
  const options = [
    { value: 'true', stringKey: 'step_six.yes', price: transportUnaccompanied && transportUnaccompanied.price },
    { value: 'false', stringKey: 'step_six.no', price: 0 },
  ];
  return (
    <div className="step-six__radio-container unaccompanied__radio-buttons">
      <Field
        name={name}
        type="radio"
        options={options}
        component={({ input, options }) => (
          options.map(({ value, stringKey, price }) => {
            return (
              <div key={value} className="step-six__radio-block">
                <Radio
                  {...input}
                  checked={isEqual(unaccompanied, value)}
                  value={value}
                >
                  <LocaleString stringKey={stringKey} />
                  {` + $${price}`}
                </Radio>
              </div>
            );
          })
        )}
      />
    </div>
  );
};

UnaccompaniedCheckboxContainer.displayName = 'UnaccompaniedCheckboxContainer';

UnaccompaniedCheckboxContainer.propTypes = {
  unaccompanied: PropTypes.string,
  transportUnaccompanied: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    package_product_id: PropTypes.string,
    price: PropTypes.number,
  }),
};

UnaccompaniedCheckboxContainer.defaultProps = {};

export default UnaccompaniedCheckboxContainer;
