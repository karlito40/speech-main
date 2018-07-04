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
      return {
        askFor: [],
        askReceived: [],
        photos: [], 
        ...action.data
      };

    case 'POST_PROFILEPHOTOSAPP_SUCCEEDED':
      const profilePostPhoto = {photos: [], ...state};
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

export const profileDisplay = (state = null, action) => {
  switch (action.type) {
    case 'GET_PROFILEDISPLAY_SUCCEEDED':
      return { ...action.data };

    default:
      return state;
  }
}

export const forProfiles = (state = null, action) => {
  switch (action.type) {
    case 'GET_FORPROFILES_SUCCEEDED':
      let list = (state && state.data) ? state.data : [];
      list = list.concat(action.data.data);
      const hasMore = list.length < action.data.meta.total;

      return {
        data: list,
        meta: action.data.meta,
        hasMore
      };

    default:
      return state;
  }
}
