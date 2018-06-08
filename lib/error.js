import { SubmissionError } from 'redux-form';

export const getConstraints = (errors) => {
  if(!errors) {
    return {};
  }

  let constraints = {};
  for(const error of errors) {
    constraints[error.property] = '';
    for(const message of Object.values(error.constraints)) {
      constraints[error.property] += message;
    }
  }

  return constraints;
}

export const getServerError = (data) => {
  return data && data.error;
}

export const handleServerError = (data) => {
  const constraints = getConstraints(getServerError(data));
  throw new SubmissionError(constraints);
}
