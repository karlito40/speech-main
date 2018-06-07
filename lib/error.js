import { SubmissionError } from 'redux-form';

export const getConstraints = (errors) => {
  let constraints = {};
  for(const error of errors) {
    constraints[error.property] = '';
    for(const message of Object.values(error.constraints)) {
      constraints[error.property] += message;
    }
  }

  return constraints;
}

export const getServerError = (server) => {
  if(!server
    || !server.response
    || !server.response.data
    || !server.response.data.error) {
    return null;
  }

  return server.response.data.error;
}

export const handleServerError = (server) => {
  const constraints = getConstraints(getServerError(server));
  throw new SubmissionError(constraints);
}
