import React from 'react';
import LocaleString from '../components/LocaleString';
import calculateAge from './calculateAge';

const validate = (values, state) => {
  const errors = {};
  errors['email'] = values['email'] ? undefined : 'Must be valid email. example@yourdomain.com';
  
  const age = Number(state.values.age || 0);
  
  errors['date_of_birth'] = values.date_of_birth && calculateAge(values.date_of_birth) !== age
    ? <LocaleString stringKey={'camper_age_is_not_equal'}/>
    : undefined;
  
  return errors;
};

export default validate;
