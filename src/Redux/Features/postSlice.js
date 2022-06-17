import { createSlice } from "@reduxjs/toolkit";

import { createAsyncThunk } from "@reduxjs/toolkit";

import { getAllPosts } from "../../Services/Post/getAllPostApi";
import { getPosts } from "../../Services/Post/getPostApi";
import { getUserPosts } from "../../Services/Post/getUserPostApi";

const initialState = {
  allPostsStatus: "idle",
  allPosts: [],
  userPostsStatus: "idle",
  userPosts: [],
  followedUserPostsStatus: "idle",
  userFeedPost: [],
  singlePostStatus: "idle",
  singlePost: {},
};

export const loadAllPostsCall = createAsyncThunk(
  "posts/loadAllPostsCall",
  getAllPosts
);

export const loadPostCall = createAsyncThunk("posts/loadPostCall", (id) =>
  getPosts(id)
);

export const loadUserPostCall = createAsyncThunk(
  "posts/loadUserPostCall",
  (userName) => getUserPosts(userName)
);

export const loadFollowedUserPostsCall = createAsyncThunk(
  "posts/loadFollowedUserPostsCall",
  (userName) => getUserPosts(userName)
);

export const postslice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    addNewPostToAllPost: (state, action) => {
      state.allPosts = action.payload;
    },

    likePost: (state, action) => {
      state.allPosts = action.payload;
    },
    dislikePost: (state, action) => {
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
    [loadAllPostsCall.pending]: (state) => {
      state.allPostsStatus = "loading";
    },

    [loadAllPostsCall.fulfilled]: (state, action) => {
      state.allPostsStatus = "fulfilled";
      state.allPosts = action.payload;
    },

    [loadPostCall.pending]: (state) => {
      state.singlePostStatus = "loading";
    },

    [loadPostCall.fulfilled]: (state, action) => {
      state.singlePostStatus = "fulfilled";
      state.singlePost = action.payload;
    },

    [loadUserPostCall.pending]: (state) => {
      state.userPostsStatus = "loading";
    },

    [loadUserPostCall.fulfilled]: (state, action) => {
      state.userPostsStatus = "fulfilled";
      state.userPosts = action.payload;
    },

    [loadFollowedUserPostsCall.pending]: (state) => {
      state.followedUserPostsStatus = "loading";
    },

    [loadFollowedUserPostsCall.fulfilled]: (state, action) => {
      state.followedUserPostsStatus = "fulfilled";

      const oldPostsallPostsValue = state.userFeedPost;
      const newPostValue = action.payload;

      const tempAr = oldPostsallPostsValue.filter((newPost) => {
        const result = newPostValue.find(
          (oldPost) => oldPost.id === newPost.id
        );
        return result ? false : true;
      });

      newPostValue.push(...tempAr);

      state.userFeedPost = newPostValue;
    },
  },
});

export const {
  addNewPostToAllPost,
  likePost,
  dislikePost,
  addNewPostToUserFeedPost,
  removeAllPostFromUserFeed,
  removePostFromUserFeed,
} = postslice.actions;

export default postslice.reducer;
