export const user = (state = null, action) => {
  switch (action.type) {
    case 'POST_USER_SUCCEEDED':
      return { ...action.data };

    default:
      return state;
  }
}

export const profile = (state = null, action) => {
  switch (action.type) {
    case 'POST_PROFILE_SUCCEEDED':
      return { ...action.data };

    default:
      return state;
  }
}
