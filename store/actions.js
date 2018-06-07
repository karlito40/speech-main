export const setErrorForm = (formId, errors) => (dispatch) => {
  dispatch({
    type: '@@redux-form/STOP_SUBMIT',
    meta: {
      form: formId,
    },
    payload: errors
  });
  dispatch({
    type: '@@redux-form/SET_SUBMIT_FAILED',
    meta: {
      form: 'onboardingForm',
      fields: Object.keys(errors),
    },
    error: true
  });
}
