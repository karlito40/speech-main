import moment from "moment";
import * as validatorStrategy from 'validator';

export const IsIn = (hasToContains) => (value) => {
  return hasToContains.includes(value);
}

export const IsDate = () => (value) => {
  return (value)
          ? moment(value, "YYYY-MM-DD").isValid()
          : false;
}

export const IsEmail = () => (value) => {
  if(!value || typeof value != "string") {
    return false;
  }
  return validatorStrategy.isEmail(value);
}

export const MinLength = (min) => (value) => {
  return value && value.length >= min;
}

export default function Form(schemas) {
  return (values) => {
    let errors = {};
    for(const [field, schema] of Object.entries(schemas)) {
      const validators = Array.isArray(schema) ? schema : [schema];
      for(let validator of validators) {
        if(typeof validator == "function") {
          validator = { constraint: validator };
        }
        if(!validator.message) {
          validator.message = "Champs invalide.";
        }

        if(!validator.constraint(values[field])) {
          if(!errors[field]) {
            errors[field] = '';
          }
          errors[field] += validator.message + " ";
        }
      }
    }

    return errors;
  }
}
