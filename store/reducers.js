export const user = (state = null, action) => {
  switch (action.type) {
    case 'SET_USER_NAME':
      return {...state, ...{userName: action.userName}}
    default:
      return state;
  }
}
