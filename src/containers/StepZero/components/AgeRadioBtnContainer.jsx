import React from 'react';
import { Field } from 'redux-form';
import Dropdown from '../../../components/Dropdown';
import LocaleString from '../../../components/LocaleString';
import Radio from '../../../components/Radio';
import { stepOneFormFieldsName } from '../selectors';

function AgeRadioBtnContainer({ range, age, isDropdown }) {
  
  return (
    <div className="content__age--block">
      <Field
        name={stepOneFormFieldsName.age}
        type="radio"
        options={range}
        component={({ input, options }) => {
          return (
            options.map((value) => (
              <div key={value} className="content__age react-text-left react-mb-10">
                <Radio
                  {...input}
                  className="content__radio-btn--font-16"
                  checked={`${age}` === `${value}`}
                  children={value}
                  value={value}
                />
              </div>
            ))
          );
        }}
      />
    </div>
  );
}

function AgeDropdown(args) {
  const { range, input } = args;
  const { value, onChange } = input;
  
  return (
    <div className="step-one__dropdown-age">
      <Dropdown
        options={range.map(number => ({ id: '' + number, display_name: '' + number, name: '' + number }))}
        handleChange={onChange}
        selectedOption={value || <LocaleString stringKey="select_camper_age" />}
      />
    </div>
  );
}

export default AgeRadioBtnContainer;
