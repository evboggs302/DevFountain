const initialState = {
  myPosts: null,
  followingPosts: null
};

const FOLLOWING_POSTS = "FOLLOWING_POSTS"
const MY_POSTS = "MY_POSTS"

export default function postsReducer(state = initialState, action) {
  switch (action.type) {
    case FOLLOWING_POSTS:
      return {...state, followingPosts: action.payload};
    case MY_POSTS:
      return {...state, myPosts: action.payload};
    default:
      return "this is the initial state", state;
  }
}

export function myPost(post) {
  return {
    type: MY_POSTS,
    payload: post
  };
}

export function followingPosts(posts){
  return {
    type: FOLLOWING_POSTS,
    payload: posts
  }
}
