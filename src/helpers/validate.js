import React from 'react';
import LocaleString from '../components/LocaleString';
import calculateAge from './calculateAge';

export const emailValidate = (value, message, description) => {
  const regEx = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;
  if(!value) return message;
  return value && regEx.test(value) ? undefined : description;
};


const validate = (values, state) => {
  const errors = {};
  
  const emailMessage = 'Must be valid email. example@yourdomain.com';
  errors['email'] = emailValidate(values['email'], emailMessage, emailMessage);
  
  const age = Number(state.values.age || 0);
  
  errors['date_of_birth'] = values.date_of_birth && calculateAge(values.date_of_birth) !== age
    ? <LocaleString stringKey={'camper_age_is_not_equal'}/>
    : undefined;
  
  return errors;
};

export default validate;
