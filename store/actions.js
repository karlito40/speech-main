import axios from 'axios';

export function createUser(user) {
  return (dispatch) => {
    return axios.post('/api/user', user)
      .then(response => {
        return dispatch({ type: 'POST_USER_SUCCEEDED', user: response.data.data });
      })
      .catch(function (error) {
        throw error.response.data.error;
      });
  }
}
