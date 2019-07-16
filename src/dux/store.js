import { createStore, combineReducers } from "redux";

import userReducer from "./reducers/userReducer";
import messageReducer from "./reducers/messageReducer";
import postsReducer from "./reducers/postsReducer";
import marketplaceReducer from "./reducers/marketplaceReducer";
import skills from "./reducers/skillsReducer";
import roomReducer from "./reducers/roomReducer";

const rootReducer = combineReducers({
  user: userReducer,
  message: messageReducer,
  posts: postsReducer,
  marketplace: marketplaceReducer,
  skills: skills,
  rooms: roomReducer
});

export default createStore(rootReducer);
