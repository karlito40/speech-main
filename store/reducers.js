export const user = (state = null, action) => {
  switch (action.type) {
    case 'GET_ME_SUCCEEDED':
      const o = { ...action.data };
      delete o.profile;
      return o;

    case 'GET_USER_SUCCEEDED':
    case 'POST_USER_SUCCEEDED':
      return { ...action.data };

    default:
      return state;
  }
}

export const profile = (state = null, action) => {
  switch (action.type) {
    case 'GET_ME_SUCCEEDED':
      return { ...action.data.profile };

    case 'POST_PROFILE_SUCCEEDED':
      return { ...action.data };

    default:
      return state;
  }
}
