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

import axios from "axios";
import { toast } from "react-toastify";
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

// export const loadAllUsersCall = createAsyncThunk(
//   "users/loadAllUsersCall",
//   getAllUsers
// );

export const loadAllUsersCall = createAsyncThunk(
  "users/loadAllUsersCall",
  async () => {
    try {
      const res = await axios({
        method: "GET",
        url: "/api/users",
      });

      if (res.status === 200) return res.data.users;
    } catch (e) {
      toast.error("Failed to load Users");
      console.log("error occured: ", e);
      return [];
    }
  }
);

// export const loadUserCall = createAsyncThunk("users/loadUesrCall", (id) =>
//   getUser(id)
// );

export const loadUserCall = createAsyncThunk(
  "users/loadUesrCall",
  async (id, { rejectWithValue, getState }) => {
    const {
      users: { user },
    } = getState();

    try {
      const res = await axios({
        method: "GET",
        url: `/api/users/${id}`,
      });

      if (res.status === 200) return res.data.user;
    } catch (e) {
      toast.error("Failed to load user");
      console.log("error occured: ", e);
      return rejectWithValue(user);
    }
  }
);

// export const editUserCall = createAsyncThunk(
//   "users/editUserCall",
//   (editUesrData) => editUser(editUesrData)
// );

export const editUserCall = createAsyncThunk(
  "users/editUserCall",
  async (editUesrData, { rejectWithValue, getState }) => {
    const {
      users: { currentUserDetails },
    } = getState();

    const encodedToken = localStorage.getItem("token");

    try {
      const res = await axios({
        method: "POST",
        url: "/api/users/edit",
        headers: { authorization: encodedToken },
        data: { userData: editUesrData },
      });

      if (res.status === 201) {
        localStorage.setItem("userDetails", JSON.stringify(res.data.user));
        return res.data.user;
      }
    } catch (e) {
      toast.error("Failed to follow User");
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

export const getBookmarkCall = createAsyncThunk(
  "users/getBookmarkCall",
  getBookmarks
);

// export const followCall = createAsyncThunk("users/followCall", (id) =>
//   follow(id)
// );

export const followCall = createAsyncThunk(
  "users/followCall",
  async (_id, { rejectWithValue, getState }) => {
    const {
      users: { currentUserDetails },
    } = getState();

    const encodedToken = localStorage.getItem("token");

    try {
      const res = await axios({
        method: "POST",
        headers: { authorization: encodedToken },
        url: `/api/users/follow/${_id}`,
      });
      if (res.status === 200) {
        return res.data.user;
      }
    } catch (e) {
      toast.error("Failed to follow User");
      console.log("error occured: ", e);
      return rejectWithValue(currentUserDetails);
    }
  }
);

// export const unfollowCall = createAsyncThunk("users/unfollowCall", (id) =>
//   unfollow(id)
// );

export const unfollowCall = createAsyncThunk(
  "users/unfollowCall",
  async (_id, { rejectWithValue, getState }) => {
    const {
      users: { currentUserDetails },
    } = getState();

    const encodedToken = localStorage.getItem("token");

    try {
      const res = await axios({
        method: "POST",
        headers: { authorization: encodedToken },
        url: `/api/users/unfollow/${_id}`,
      });
      if (res.status === 200) {
        return res.data.user;
      }
    } catch (e) {
      toast.error("Failed to follow User");
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
