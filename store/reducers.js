export const user = (state = null, action) => {
  switch (action.type) {
    case 'POST_USER_SUCCEEDED':
      return { ...action.user };

    default:
      return state;
  }
}
