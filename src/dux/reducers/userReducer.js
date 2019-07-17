const initialState = {
  user: null,
  following: null,
  otherPerson: null
};

const SET_USER = "SET_USER";
const SET_FOLLOWING = "SET_FOLLOWING";
const SET_OTHER_PERSON = "SET_OTHER_PERSON";

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case SET_USER:
      console.log("this is the user who logged in ", action.payload);
      return { ...state, user: action.payload };
    case SET_FOLLOWING:
      console.log("These are the poeple who you follow", action.payload);
      return { ...state, following: action.payload };
    case SET_OTHER_PERSON:
      console.log("other persons info", action.payload);
      return { ...state, otherPerson: action.payload };
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

export function setOtherPerson(info) {
  console.log("image recieved from reducer", info);
  return {
    type: SET_OTHER_PERSON,
    payload: info
  };
}
