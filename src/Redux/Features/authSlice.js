import { createSlice } from "@reduxjs/toolkit";

const oldToken = localStorage.getItem("token");

const initialState = {
  userDetails: [],
  token: oldToken ?? null,
  isAuth: oldToken ? true : false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    userLogin: (state, action) => {
      state.userDetails = action.payload;
      state.isAuth = true;
    },
    userLogout: (state) => {
      state.userDetails = [];
      state.isAuth = false;
    },
  },
});

export const { userLogin, userLogout } = authSlice.actions;

export default authSlice.reducer;
