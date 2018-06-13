import moment from "moment";
import * as validatorStrategy from 'validator';

export const IsIn = (hasToContains) => (value) => {
  return hasToContains.includes(value);
}

export const IsDate = () => (value) => {
  const isValid = (value)
          ? moment(value, "YYYY-MM-DD").isValid()
          : false;
  return {
    isValid,
    message: 'Date invalide'
  };
}

export const IsEmail = () => (value) => {
  return {
    isValid: value && typeof value == "string" && validatorStrategy.isEmail(value),
    message: 'Email invalide.'
  };
}

export const MinLength = (min) => (value) => {
  return {
    isValid: value && value.length >= min,
    message: `Renseignez au moins ${min} caractères.`
  };
}

export const Required = () => (value) => {
  return {
    isValid: value && value.length > 0,
    message: 'Champ requis'
  };
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


        let validatorReponse = validator.constraint(values[field]);
        if(validatorReponse == null || typeof validatorReponse != "object") {
          validatorReponse = { op: validatorReponse };
        }

        if(!validatorReponse.message) {
          validatorReponse.message = "Champs invalide.";
        }

        if(!validatorReponse.isValid) {
          if(!errors[field]) {
            errors[field] = '';
          }
          errors[field] += validatorReponse.message + " ";
        }
      }
    }

    return errors;
  }
}



export function validateChange(options, e) {
  const onValidate = options.onValidate || (() => {});
  const value = e.target.value;
  const { name, validator } = options;

  const validatorResponse = validator(value);
  const errorName = `${name}Error`;
  if(!validatorResponse.isValid) {
    this.setState({ [errorName]: validatorResponse.message });
  } else {
    this.setState({ [errorName]: false });
    onValidate(name, value);
  }
}
