import { createSlice, nanoid } from "@reduxjs/toolkit";
import { sub } from "date-fns";
const initialState = [
  {
    id: "1",
    title: "Learning Redux",
    content: "I've heard good things about Toolkit",
    date: sub(new Date(), { minutes: 10 }).toISOString(),
    reactions: {
      thumpsUp: 0,
      wow: 0,
      heart: 0,
      rocket: 0,
      coffee: 0,
    },
  },
  {
    id: "2",
    title: "Slices..",
    content: "The more I say slice, the more I want pizza",
    date: sub(new Date(), { minutes: 5 }).toISOString(),
    reactions: {
      thumpsUp: 0,
      wow: 0,
      heart: 0,
      rocket: 0,
      coffee: 0,
    },
  },
];

const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    postAdded: {
      reducer(state, action) {
        state.push(action.payload);
      },
      prepare(title, content, userId) {
        return {
          payload: {
            id: nanoid(),
            title,
            content,
            userId,
            date: new Date().toISOString(),
            reactions: {
              thumpsUp: 0,
              wow: 0,
              heart: 0,
              rocket: 0,
              coffee: 0,
            },
          },
        };
      },
    },
    reactionAdded(state, action) {
      const { postId, reaction } = action.payload;
      const existingPosts = state.find((post) => post.id === postId);
      if (existingPosts) {
        existingPosts.reactions[reaction]++;
      }
    },
  },
});

export const selectAllPost = (state) => state.posts;
//if shape of state changes eventually all we need to update this function

export default postSlice.reducer;

export const { postAdded, reactionAdded } = postSlice.actions;
