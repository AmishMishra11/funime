import { createSlice } from "@reduxjs/toolkit";

import { createAsyncThunk } from "@reduxjs/toolkit";

import { getPosts } from "../../Services/Post/getPostApi";
import { getUserPosts } from "../../Services/Post/getUserPostApi";

const initialState = {
  postStatus: "idle",
  allPosts: [],
  userPostStatus: "idle",
  userPosts: [],
  userFeedPost: [],
  singlePost: {},
};

export const loadPostsCall = createAsyncThunk("posts/loadPostsCall", getPosts);

export const loadUserPostCall = createAsyncThunk(
  "posts/loadUserPostCall",
  (userName) => getUserPosts(userName)
);

export const postslice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    addNewPostToAllPost: (state, action) => {
      state.allPosts = action.payload;
    },

    addNewPostToUserFeedPost: (state, action) => {
      state.userFeedPost.unshift(action.payload);
    },

    removePostFromUserFeed: (state, action) => {
      state.userFeedPost = state.userFeedPost.filter(
        (posts) => action.payload !== posts.userId
      );
    },

    removeAllPostFromUserFeed: (state) => {
      state.userFeedPost = [];
    },
  },

  extraReducers: {
    [loadPostsCall.pending]: (state) => {
      state.postStatus = "loading";
    },

    [loadPostsCall.fulfilled]: (state, action) => {
      state.postStatus = "fulfilled";
      state.allPosts = action.payload;
    },

    [loadUserPostCall.pending]: (state) => {
      state.userPostStatus = "loading";
    },

    [loadUserPostCall.fulfilled]: (state, action) => {
      state.userPostStatus = "fulfilled";
      state.userPosts = action.payload;

      state.userFeedPost.unshift(...action.payload);
    },
  },
});

export const {
  addNewPostToAllPost,
  addNewPostToUserFeedPost,
  removeAllPostFromUserFeed,
  removePostFromUserFeed,
} = postslice.actions;

export default postslice.reducer;
