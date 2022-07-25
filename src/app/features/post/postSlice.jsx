import { createSlice } from "@reduxjs/toolkit";
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
  reducers: {},
});
export default postSlice.reducer;
