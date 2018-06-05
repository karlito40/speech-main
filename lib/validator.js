import moment from "moment";
export const IsIn = (hasToContains) => (value) => {
  return hasToContains.includes(value);
}

export const IsDate = () => (value) => {
  return (value) 
          ? moment(value, "YYYY-MM-DD").isValid() 
          : false;
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

    console.log("Form errors", errors);

    return errors;
  }
}
