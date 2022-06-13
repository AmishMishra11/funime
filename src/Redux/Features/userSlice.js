import { createSlice } from "@reduxjs/toolkit";

import { getUsers } from "../../Services/User/getUserApi";

import { createAsyncThunk } from "@reduxjs/toolkit";
import { follow } from "../../Services/Follow/followApi";
import { unfollow } from "../../Services/Follow/unfollowApi";

const initialState = {
  allUsers: [],
  userStatus: "idle",
  error: null,
  currentUserDetails: localStorage.getItem("userDetails")
    ? JSON.parse(localStorage.getItem("userDetails"))
    : {},
  followStatus: "idle",
};

export const loadUsersCall = createAsyncThunk("users/loadUsersCall", getUsers);

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
    [loadUsersCall.pending]: (state) => {
      state.userStatus = "loading";
    },

    [loadUsersCall.fulfilled]: (state, action) => {
      state.userStatus = "fulfilled";
      state.allUsers = action.payload;
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
