import { createSlice } from "@reduxjs/toolkit";

import { createAsyncThunk } from "@reduxjs/toolkit";

import { getAllPosts } from "../../Services/Post/getAllPostApi";
import { getPosts } from "../../Services/Post/getPostApi";
import { getUserPosts } from "../../Services/Post/getUserPostApi";

import axios from "axios";
import { toast } from "react-toastify";
import { like } from "../../Services/Like/likeApi";
import { dislike } from "../../Services/Like/dislikeApi";

const initialState = {
  allPostsStatus: "idle",
  allPosts: [],
  userPostsStatus: "idle",
  userPosts: [],
  followedUserPostsStatus: "idle",
  userFeedPost: [],
  singlePostStatus: "idle",
  singlePost: {},
  comments: [],
};

// export const loadAllPostsCall = createAsyncThunk("posts/loadAllPostsCall", () =>
//   getAllPosts()
// );

export const loadAllPostsCall = createAsyncThunk(
  "posts/loadAllPostsCall",
  async () => {
    try {
      const res = await axios({
        method: "GET",
        url: "/api/posts",
      });

      if (res.status === 200) return res.data.posts;
    } catch (e) {
      toast.error("Failed to load Posts");
      console.log("error occured: ", e);
      return [];
    }
  }
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

export const likePostCall = createAsyncThunk("posts/likePostCall", (id) =>
  like(id)
);

export const dislikePostCall = createAsyncThunk("posts/dislikePostCall", (id) =>
  dislike(id)
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

    editPostCall: (state, action) => {
      state.allPosts = action.payload;
    },
    deletePost: (state, action) => {
      state.allPosts = [action.payload];
    },

    getCommentCall: (state, action) => {
      state.comments = action.payload;
    },

    addCommentCall: (state, action) => {
      state.comments = action.payload;
    },

    commentCallHandler: (state, action) => {
      state.singlePost = {
        ...state.singlePost,
        comments: action.payload,
      };
    },

    removeCommentCall: (state, action) => {
      state.comments = action.payload;
    },

    likeCommentCall: (state, action) => {
      state.comments = action.payload;
    },

    dislikeCommentCall: (state, action) => {
      state.comments = action.payload;
    },

    editCommentCall: (state, action) => {
      state.comments = action.payload;
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

    [loadAllPostsCall.rejected]: (state) => {
      state.allPostsStatus = "failed";
      state.allPosts = [];
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

    [likePostCall.fulfilled]: (state, action) => {
      state.allPosts = action.payload.allPosts;
      state.singlePost = action.payload.myPost;
    },

    [dislikePostCall.fulfilled]: (state, action) => {
      state.allPosts = action.payload.allPosts;
      state.singlePost = action.payload.myPost;
    },
  },
});

export const {
  addNewPostToAllPost,
  deletePost,
  editPostCall,
  addNewPostToUserFeedPost,
  removeAllPostFromUserFeed,
  removePostFromUserFeed,
  getCommentCall,
  addCommentCall,
  commentCallHandler,
  removeCommentCall,
  likeCommentCall,
  dislikeCommentCall,
  editCommentCall,
} = postslice.actions;

export default postslice.reducer;
