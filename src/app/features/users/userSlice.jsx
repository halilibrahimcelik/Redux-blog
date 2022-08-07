import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
const USER_URL = "https://jsonplaceholder.typicode.com/users";

const initialState = [];

export const fetchUsers = createAsyncThunk("users/fetchUser", async () => {
  try {
    const response = await fetch(USER_URL);
    const data = await response.json();
    if (!response.ok) {
      throw new Error("User info is not fetched");
    }
    return data;
  } catch (error) {
    return error.message;
  }
});

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      return action.payload;
    });
  },
});
export const selectAlluser = (state) => state.users;
export const selectUserById = (state, userId) =>
  state.users.find((user) => user.id === userId);

export default userSlice.reducer;
