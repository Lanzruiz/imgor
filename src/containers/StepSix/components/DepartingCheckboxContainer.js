// Modules
import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import isEqual from 'lodash/isEqual';
// Components
import Radio from '../../../components/Radio';
import LocaleString from '../../../components/LocaleString';
// Constants
import { stepSixFormFieldNames, departingFormFieldNames } from '../selectors';

const DepartingCheckboxContainer = (props) => {
  const { departing } = props;
  const { imgaCampusCenter, imgaClubHouse, other } = departingFormFieldNames;
  const options = [
    { value: imgaCampusCenter, stringKey: 'step_six.campus_center' },
    { value: imgaClubHouse, stringKey: 'step_six.club_house' },
    { value: other, stringKey: 'step_six.other' },
  ];
  return (
    <ul className="step-six__radio-list">
      <Field
        name={stepSixFormFieldNames.departing}
        type="radio"
        options={options}
        component={({ input, options }) => (
          options.map(({ value, stringKey }, idx) => {
            return (
              <li className="step-six__radio-list-item" key={idx}>
                <Radio
                  {...input}
                  className="step-six__initial-label"
                  value={value}
                  checked={isEqual(departing, value)}
                  children={<LocaleString stringKey={stringKey} />}
                />
              </li>
            );
          })
        )}
      />
    </ul>
  );
};

DepartingCheckboxContainer.displayName = 'DepartingCheckboxContainer';

DepartingCheckboxContainer.propTypes = {
  departing: PropTypes.string,
};

DepartingCheckboxContainer.defaultProps = {};

export default DepartingCheckboxContainer;
