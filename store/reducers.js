import { setCookie } from '../lib/cookie';

export const userApp = (state = null, action) => {
  switch (action.type) {
    case 'GET_ME_SUCCEEDED':
      const me = { ...action.data };
      delete me.profile;
      return me;

    case 'POST_TOKEN_SUCCEEDED':
    case 'POST_ME_SUCCEEDED':
      const user = { ...action.data };
      if(user.token) {
        setCookie('token', user.token, 30);
      }

      return user;

    default:
      return state;
  }
}

export const profileApp = (state = null, action) => {
  switch (action.type) {
    case 'GET_ME_SUCCEEDED':
      return { ...action.data.profile };

    case 'PUT_PROFILEAPP_SUCCEEDED':
    case 'POST_PROFILEAPP_SUCCEEDED':
      return { ...action.data };

    case 'POST_PROFILEPHOTOSAPP_SUCCEEDED':
      const profilePostPhoto = {pics: [], ...state};
      profilePostPhoto.photos = profilePostPhoto.photos.concat([{ ...action.data }]);
      return profilePostPhoto;

    case 'DELETE_PROFILEPHOTOSAPP_SUCCEEDED':
      const profileDeletePhoto = {...state};
      if(profileDeletePhoto.photos) {
        profileDeletePhoto.photos = profileDeletePhoto.photos.filter(photo => photo.id != action.data.id);
      }

      return profileDeletePhoto;

    default:
      return state;
  }
}

export const user = (state = null, action) => {
  switch (action.type) {
    case 'GET_USER_SUCCEEDED':
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
