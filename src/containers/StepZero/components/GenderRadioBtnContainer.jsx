import cx from 'classnames';
import include from 'lodash/includes';
import isEqual from 'lodash/isEqual';
import toLower from 'lodash/toLower';
import React from 'react';
import { Field } from 'redux-form';
import LocaleString from '../../../components/LocaleString';
import Radio from '../../../components/Radio';
import { stepOneFormFieldsName } from '../selectors';

function GenderRadioBtnContainer({ options, value, possibleValues }) {
  const defaultPossibleValues = [ 'Male', 'Female' ];
  const computedPossibleValues = !possibleValues || include(possibleValues, 'All') ? defaultPossibleValues : possibleValues;
  
  return (
    <div className="content__radio-container">
      <Field
        className="content__radio-btn"
        name={stepOneFormFieldsName.gender}
        type="radio"
        options={options}
        component={({ input, options }) => (
          options.map((gender) => {
            const lowerCaseOptionValue = toLower(gender);
            const isDisabled = !include(computedPossibleValues.map(toLower), lowerCaseOptionValue);
            const radioBtnClassNames = cx('content__label', { 'content__label--disabled': isDisabled });
            
            return (
              <div key={lowerCaseOptionValue} className={radioBtnClassNames}>
                <Radio
                  {...input}
                  className="content__radio-btn--font-16"
                  value={lowerCaseOptionValue}
                  checked={isEqual(lowerCaseOptionValue, toLower(value))}
                  disabled={isDisabled}
                >
                  <LocaleString stringKey={lowerCaseOptionValue}/>
                  {isDisabled && (
                    <span className="content__radio-btn--sold-out">
                      <LocaleString stringKey="sold-out"/>
                    </span>
                  )}
                </Radio>
              </div>
            );
          })
        )}
      />
    </div>
  );
}

export default GenderRadioBtnContainer;
