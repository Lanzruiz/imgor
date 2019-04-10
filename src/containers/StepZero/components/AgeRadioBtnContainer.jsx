import React from 'react';
import { Field } from 'redux-form';
import Radio from '../../../components/Radio';
import { stepOneFormFieldsName } from '../selectors';

function AgeRadioBtnContainer({ range, age }) {
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

export default AgeRadioBtnContainer;
