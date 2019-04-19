import cx from 'classnames';
import include from 'lodash/includes';
import isEqual from 'lodash/isEqual';
import React from 'react';
import { Field } from 'redux-form';
import LocaleString from '../../../components/LocaleString';
import Radio from '../../../components/Radio';
import { stepOneFormFieldsName } from '../selectors';

function SleepawayRadioBtn({ options, sleepaway, possibleValues, handleChange }) {
  return (
    <div className="sleepaway-container">
      <Field
        className="content__radio-btn"
        name={stepOneFormFieldsName.sleepaway}
        type="radio"
        options={options}
        component={({ input, options }) => (
          options.map(({ value, stringKey }) => {
            const isDisabled = !include(possibleValues, value);
            const radioBtnClassNames = cx('content__sleepaway-label react-mb-10', {
              'content__sleepaway-label--disabled': isDisabled,
            });
            return (
              <div key={value} className={radioBtnClassNames}>
                <Radio
                  {...input}
                  className="content__radio-btn--font-16"
                  value={value}
                  checked={isEqual(sleepaway, value)}
                  disabled={isDisabled}
                  handleChange={handleChange}
                >
                  <LocaleString stringKey={`step_zero.sleepaway_${stringKey}`}/>{' '}
                  {isDisabled && (
                    <span className="content__radio-btn--sold-out">
                      <LocaleString stringKey="sold-out"/>
                    </span>
                  )}
                </Radio>
              </div>
            );
          }))}
      />
    </div>
  );
}

export default SleepawayRadioBtn;
