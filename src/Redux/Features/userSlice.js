import { createSlice } from "@reduxjs/toolkit";

import { createAsyncThunk } from "@reduxjs/toolkit";

import { addBookmarks } from "../../Services/Bookmark/addBookmarksApi";
import { getBookmarks } from "../../Services/Bookmark/getBookmarksApi";
import { removeBookmarks } from "../../Services/Bookmark/removeBookmarksApi";

import { editProfileImageOfPost } from "./postSlice";

import { toast } from "react-toastify";
import { secureAxiosInstance } from "../../Services/apiInterceptor";
const initialState = {
  allUsers: [],
  allUserStatus: "idle",

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
  async () => {
    try {
      const encodedToken = localStorage.getItem("token");

      const res = await secureAxiosInstance({
        method: "GET",
        url: "/users",
        headers: { authorization: encodedToken },
      });

      if (res.status === 200) return res.data.users;
    } catch (e) {
      toast.error(e.response.data.message);
      console.log("error occured: ", e);
      return [];
    }
  }
);

export const loadUserCall = createAsyncThunk(
  "users/loadUesrCall",
  async (id, { rejectWithValue, getState }) => {
    const {
      users: { user },
    } = getState();

    try {
      const encodedToken = localStorage.getItem("token");

      const res = await secureAxiosInstance({
        method: "GET",
        url: `/users/${id}`,
        headers: { authorization: encodedToken },
      });

      if (res.status === 200) return res.data.user;
    } catch (e) {
      toast.error(e.response.data.message);
      console.log("error occured: ", e);
      return rejectWithValue(user);
    }
  }
);

export const editUserCall = createAsyncThunk(
  "users/editUserCall",
  async (editUesrData, { rejectWithValue, getState, dispatch }) => {
    const {
      users: { currentUserDetails },
    } = getState();

    try {
      const encodedToken = localStorage.getItem("token");

      const res = await secureAxiosInstance({
        method: "POST",
        url: `/users/edit/${editUesrData.id}`,
        headers: { authorization: encodedToken },
        data: { userData: editUesrData },
      });

      if (res.status === 201) {
        // editUesrData.setLoading(false);

        dispatch(editProfileImageOfPost(res.data.posts));
        localStorage.setItem("userDetails", JSON.stringify(res.data.user));
        return res.data.user;
      }
    } catch (e) {
      // editUesrData.setLoading(false);

      toast.error(e.response.data.message);
      console.log("error occured: ", e);
      return rejectWithValue(currentUserDetails);
    }
  }
);

export const addBookmarkCall = createAsyncThunk("users/addBookmarkCall", (id) =>
  addBookmarks(id)
);

export const removeBookmarkCall = createAsyncThunk(
  "users/removeBookmarkCall",
  (id) => removeBookmarks(id)
);

export const getBookmarkCall = createAsyncThunk("users/getBookmarkCall", (id) =>
  getBookmarks(id)
);

export const followCall = createAsyncThunk(
  "users/followCall",
  async (_id, { rejectWithValue, getState }) => {
    const {
      users: { currentUserDetails },
    } = getState();

    const userDetailsString = localStorage.getItem("userDetails");
    const userDetails = JSON.parse(userDetailsString);

    try {
      const encodedToken = localStorage.getItem("token");

      const res = await secureAxiosInstance({
        method: "POST",
        headers: { authorization: encodedToken },
        url: `/users/follow/${_id}`,
        data: {
          userId: userDetails._id,
        },
      });
      if (res.status === 200) {
        return res.data.user;
      }
    } catch (e) {
      toast.error(e.response.data.message);
      console.log("error occured: ", e);
      return rejectWithValue(currentUserDetails);
    }
  }
);

export const unfollowCall = createAsyncThunk(
  "users/unfollowCall",
  async (_id, { rejectWithValue, getState }) => {
    const {
      users: { currentUserDetails },
    } = getState();

    const userDetailsString = localStorage.getItem("userDetails");
    const userDetails = JSON.parse(userDetailsString);

    try {
      const encodedToken = localStorage.getItem("token");

      const res = await secureAxiosInstance({
        method: "POST",
        headers: { authorization: encodedToken },
        url: `/users/unfollow/${_id}`,
        data: {
          userId: userDetails._id,
        },
      });
      if (res.status === 200) {
        return res.data.user;
      }
    } catch (e) {
      toast.error(e.response.data.message);
      console.log("error occured: ", e);
      return rejectWithValue(currentUserDetails);
    }
  }
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

    [loadAllUsersCall.rejected]: (state) => {
      state.allUserStatus = "failed";
      state.allUsers = [];
    },

    [loadUserCall.pending]: (state) => {
      state.userStatus = "loading";
    },

    [loadUserCall.fulfilled]: (state, action) => {
      state.userStatus = "fulfilled";
      state.user = action.payload;
    },

    [loadUserCall.rejected]: (state, action) => {
      state.userStatus = "failed";
      state.user = action.payload;
    },

    [editUserCall.pending]: (state) => {
      state.allUserStatus = "loading";
    },

    [editUserCall.fulfilled]: (state, action) => {
      state.allUserStatus = "fulfilled";
      state.currentUserDetails = action.payload;
    },

    [editUserCall.rejected]: (state, action) => {
      state.allUserStatus = "failed";
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

    [followCall.rejected]: (state, action) => {
      state.currentUserDetails = action.payload;
      state.followStatus = "failed";
    },

    [unfollowCall.pending]: (state) => {
      state.followStatus = "loading";
    },

    [unfollowCall.fulfilled]: (state, action) => {
      state.followStatus = "fulfilled";
      state.currentUserDetails = action.payload;
    },

    [unfollowCall.rejected]: (state, action) => {
      state.currentUserDetails = action.payload;
      state.followStatus = "failed";
    },
  },
});

export const { setCurrentUserDetails, removeCUrrentUserDetails } =
  userSlice.actions;

export default userSlice.reducer;
