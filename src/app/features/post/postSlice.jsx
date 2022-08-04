import { createSlice, nanoid, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { sub } from "date-fns";

// const initialState = [
//   {
//     id: "1",
//     title: "Learning Redux",
//     content: "I've heard good things about Toolkit",
//     date: sub(new Date(), { minutes: 10 }).toISOString(),
//     reactions: {
//       thumpsUp: 0,
//       wow: 0,
//       heart: 0,
//       rocket: 0,
//       coffee: 0,
//     },
//   },
//   {
//     id: "2",
//     title: "Slices..",
//     content: "The more I say slice, the more I want pizza",
//     date: sub(new Date(), { minutes: 5 }).toISOString(),
//     reactions: {
//       thumpsUp: 0,
//       wow: 0,
//       heart: 0,
//       rocket: 0,
//       coffee: 0,
//     },
//   },
// ];

const POST_URL = "https://jsonplaceholder.typicode.com/posts";

const initialState = {
  posts: [],
  status: "idle", //"idle" |"loading" | "succeeded" |"failed"
  error: null,
};

export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
  try {
    const response = await fetch(POST_URL);
    if (!response.ok) {
      throw new Error("Fetching failed...");
    }
    const data = await response.json();

    return data;
  } catch (error) {
    return error.message;
  }
});
export const addNewPosts = createAsyncThunk(
  "posts/addNewPosts",
  async (initialPost) => {
    // try {
    //   const response = await fetch(POST_URL, {
    //     method: "POST",
    //     body: initialPost,
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //   });
    //   if (!response.ok) {
    //     throw new Error("Fetching failed...");
    //   }
    //   const data = await response.json();

    //   return data;
    // } catch (error) {
    //   return error.message;
    // }
    const response = await axios.post(POST_URL, initialPost);
    return response.data;
  }
);

const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    postAdded: {
      reducer(state, action) {
        state.posts.push(action.payload);
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
      const existingPosts = state.posts.find((post) => post.id === postId);
      if (existingPosts) {
        existingPosts.reactions[reaction]++;
      }
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchPosts.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = "succeeded";
        //?adding date and reactions because our API does not store these two key values
        let min = 1;
        const loadedPosts = action.payload.map((post) => {
          post.date = sub(new Date(), { minutes: min++ }).toISOString();
          post.reactions = {
            thumpsUp: 0,
            wow: 0,
            heart: 0,
            rocket: 0,
            coffee: 0,
          };
          return post;
        });
        //?add any fetched posts to the array
        state.posts = state.posts.concat(loadedPosts);
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(addNewPosts.fulfilled, (state, action) => {
        action.payload.userId = Number(action.payload.userId); //?string geliyor userId o yüzden numbera çeviriyoruz
        action.payload.date = new Date().toISOString();
        action.payload.reactions = {
          thumpsUp: 0,
          wow: 0,
          heart: 0,
          rocket: 0,
          coffee: 0,
        };
        console.log(action.payload);
        state.posts.push(action.payload);
      });
  },
});

export const selectAllPost = (state) => state.posts.posts;
export const getAllStatus = (state) => state.posts.status;
export const getAllErrors = (state) => state.posts.error;

export const selectPostById = (state, postId) => {
  return state.posts.posts.find((post) => post.id === postId);
};
export default postSlice.reducer;

export const { postAdded, reactionAdded } = postSlice.actions;
