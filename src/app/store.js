import { configureStore } from "@reduxjs/toolkit";
import postsReducer from "./features/post/postSlice";

const store = configureStore({
  reducer: {
    posts: postsReducer,
  },
});

export default store;
