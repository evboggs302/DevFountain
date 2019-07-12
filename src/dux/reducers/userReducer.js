const initialState = {
  user: null
};

const SET_USER = "SET_USER";

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case SET_USER:
      console.log("this is the user who logged in ", action.payload);
      return { ...state, user: action.payload };
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
