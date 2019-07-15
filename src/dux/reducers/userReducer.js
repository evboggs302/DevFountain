const initialState = {
  user: null,
  following: null
};

const SET_USER = "SET_USER";
const SET_FOLLOWING = "SET_FOLLOWING"

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case SET_USER:
      console.log("this is the user who logged in ", action.payload);
      return { ...state, user: action.payload };
    case SET_FOLLOWING:
      console.log('These are the poeple who you follow', action.payload)
      return {...state, following: action.payload};
    default:
      return state;
  }
}

export function setUser(user) {
  return {
    type: SET_USER,
    payload: user
  };
}

export function setFollowing(following){
  return {
    type: SET_FOLLOWING,
    payload: following
  }
}
