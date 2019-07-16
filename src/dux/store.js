import { createStore, combineReducers } from "redux";

import userReducer from "./reducers/userReducer";
import messageReducer from "./reducers/messageReducer";
import postsReducer from "./reducers/postsReducer";
import marketplaceReducer from "./reducers/marketplaceReducer";
import skills from "./reducers/skillsReducer";

const rootReducer = combineReducers({
  user: userReducer,
  message: messageReducer,
  posts: postsReducer,
  marketplace: marketplaceReducer,
  skills: skills
});

export default createStore(rootReducer);
