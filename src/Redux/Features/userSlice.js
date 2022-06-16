import { createSlice } from "@reduxjs/toolkit";

import { getAllUsers } from "../../Services/User/getAllUsersApi";

import { createAsyncThunk } from "@reduxjs/toolkit";
import { follow } from "../../Services/Follow/followApi";
import { unfollow } from "../../Services/Follow/unfollowApi";
import { editUser } from "../../Services/User/editUserApi";
import { getUser } from "../../Services/User/getUserApi";
import { addBookmarks } from "../../Services/Bookmark/addBookmarksApi";
import { getBookmarks } from "../../Services/Bookmark/getBookmarksApi";
import { removeBookmarks } from "../../Services/Bookmark/removeBookmarksApi";

const initialState = {
  allUsers: [],
  allUserStatus: "idle",
  error: null,
  currentUserDetails: localStorage.getItem("userDetails")
    ? JSON.parse(localStorage.getItem("userDetails"))
    : {},
  followStatus: "idle",

  user: [],
  userStatus: "idle",

  bookmarkStatus: "idle",
  bookmarks: [],
};

export const loadAllUsersCall = createAsyncThunk(
  "users/loadAllUsersCall",
  getAllUsers
);

export const loadUserCall = createAsyncThunk("users/loadUesrCall", (id) =>
  getUser(id)
);

export const editUserCall = createAsyncThunk(
  "users/editUserCall",
  (editUesrData) => editUser(editUesrData)
);

export const addBookmarkCall = createAsyncThunk("users/addBookmarkCall", (id) =>
  addBookmarks(id)
);

export const removeBookmarkCall = createAsyncThunk(
  "users/removeBookmarkCall",
  (id) => removeBookmarks(id)
);

export const getBookmarkCall = createAsyncThunk(
  "users/getBookmarkCall",
  getBookmarks
);

export const followCall = createAsyncThunk("users/followCall", (id) =>
  follow(id)
);

export const unfollowCall = createAsyncThunk("users/unfollowCall", (id) =>
  unfollow(id)
);

export const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setCurrentUserDetails: (state, action) => {
      state.currentUserDetails = action.payload;
    },

    removeCUrrentUserDetails: (state) => {
      state.currentUserDetails = {};
    },
  },

  extraReducers: {
    [loadAllUsersCall.pending]: (state) => {
      state.allUserStatus = "loading";
    },

    [loadAllUsersCall.fulfilled]: (state, action) => {
      state.allUserStatus = "fulfilled";
      state.allUsers = action.payload;
    },

    [loadUserCall.pending]: (state) => {
      state.userStatus = "loading";
    },

    [loadUserCall.fulfilled]: (state, action) => {
      state.userStatus = "fulfilled";
      state.user = action.payload;
    },

    [editUserCall.pending]: (state) => {
      state.allUserStatus = "loading";
    },

    [editUserCall.fulfilled]: (state, action) => {
      state.allUserStatus = "fulfilled";
      state.currentUserDetails = action.payload;
    },

    [addBookmarkCall.fulfilled]: (state, action) => {
      state.bookmarks = action.payload;
      state.currentUserDetails.bookmarks = action.payload;

      localStorage.setItem(
        "userDetails",
        JSON.stringify(state.currentUserDetails)
      );
    },

    [removeBookmarkCall.fulfilled]: (state, action) => {
      state.bookmarks = action.payload;
      state.currentUserDetails.bookmarks = action.payload;

      localStorage.setItem(
        "userDetails",
        JSON.stringify(state.currentUserDetails)
      );
    },

    [getBookmarkCall.pending]: (state) => {
      state.bookmarkStatus = "loading";
    },

    [getBookmarkCall.fulfilled]: (state, action) => {
      state.bookmarkStatus = "fulfilled";
      state.bookmarks = action.payload;
    },

    [followCall.pending]: (state) => {
      state.followStatus = "loading";
    },

    [followCall.fulfilled]: (state, action) => {
      state.followStatus = "fulfilled";
      state.currentUserDetails = action.payload;
    },

    [unfollowCall.pending]: (state) => {
      state.followStatus = "loading";
    },

    [unfollowCall.fulfilled]: (state, action) => {
      state.followStatus = "fulfilled";
      state.currentUserDetails = action.payload;
    },
  },
});

export const { setCurrentUserDetails, removeCUrrentUserDetails } =
  userSlice.actions;

export default userSlice.reducer;
