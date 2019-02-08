import React from 'react';
import {
  required,
  email,
} from 'redux-form-validators';
import LocaleString from '../components/LocaleString';
import calculateAge from './calculateAge';

const validations = {
  email: [
    required({ msg: 'Must be valid email. example@yourdomain.com' }),
    email({ msg: 'Must be valid email. example@yourdomain.com' }),
  ],
};

const validate = (values, state) => {
  const errors = {};
  for (let field in validations) {
    let value = values[field];
    errors[field] = validations[field].map((validateField) => {
      return validateField(value, values);
    }).find(x => x);
  }
  
  const age = Number(state.values.age || 0);
  errors['date_of_birth'] = calculateAge(values.date_of_birth) !== age
    ? <LocaleString stringKey={'camper_age_is_not_equal'}/>
    : undefined;
  
  return errors;
};

export default validate;
