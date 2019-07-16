const initialState = {
  user: null,
  following: null
};

const SET_USER = "SET_USER";
const SET_FOLLOWING = "SET_FOLLOWING";
const SET_USER_IMAGE = "SET_USER_IMAGE";

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case SET_USER:
      console.log("this is the user who logged in ", action.payload);
      return { ...state, user: action.payload };
    case SET_FOLLOWING:
      console.log("These are the poeple who you follow", action.payload);
      return { ...state, following: action.payload };
    case SET_USER_IMAGE:
      console.log("image to update", action.payload)
      let userCopy = state.user
      userCopy.profile_pic = action.payload
      console.log('this is the user copy', userCopy)
      return {...state, user: userCopy}
    default:
      return state;
  }
}

export function setUser(user) {
  console.log("updating user", user);
  return {
    type: SET_USER,
    payload: user
  };
}

export function setFollowing(following) {
  return {
    type: SET_FOLLOWING,
    payload: following
  };
}

export function setUserImage(image) {
  console.log("image recieved from reducer", image);
  return {
    type: SET_USER_IMAGE,
    payload: image
  }
}