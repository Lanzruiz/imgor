import {
  required,
  email,
} from 'redux-form-validators';

const validations = {
  email: [
    required({ msg: 'Must be valid email. example@yourdomain.com' }),
    email({ msg: 'Must be valid email. example@yourdomain.com' }),
  ],
}

const validate = (values) => {
  const errors = {};
  for (let field in validations) {
    let value = values[field];
    errors[field] = validations[field].map((validateField) => {
      return validateField(value, values);
    }).find(x => x);
  }
  return errors;
}

export default validate;
