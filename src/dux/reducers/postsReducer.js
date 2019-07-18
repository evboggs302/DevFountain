const initialState = {
  profilePosts: null,
  followingPosts: null
};

const FOLLOWING_POSTS = "FOLLOWING_POSTS";
const PROFILE_POSTS = "PROFILE_POSTS";

export default function postsReducer(state = initialState, action) {
  switch (action.type) {
    case FOLLOWING_POSTS:
      return { ...state, followingPosts: action.payload };
    case PROFILE_POSTS:
      return { ...state, profilePosts: action.payload };
    default:
      return "this is the initial state", state;
  }
}

export function setProfilePosts(posts) {
  return {
    type: PROFILE_POSTS,
    payload: posts
  };
}

export function followingPosts(posts) {
  return {
    type: FOLLOWING_POSTS,
    payload: posts
  };
}
