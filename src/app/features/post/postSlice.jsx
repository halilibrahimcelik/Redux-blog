import { createSlice, nanoid } from "@reduxjs/toolkit";
const initialState = [
  {
    id: "1",
    title: "Learning Redux",
    content: "I've heard good things about Toolkit",
  },
  {
    id: "",
    title: "Slices..",
    content: "The more I say slice, the more I want pizza",
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
      prepare(title, content) {
        return {
          payload: {
            id: nanoid(),
            title,
            content,
          },
        };
      },
    },
  },
});

export const selectAllPost = (state) => state.posts;
//if shape of state changes eventually all we need to update this function

export default postSlice.reducer;

export const { postAdded } = postSlice.actions;
