import { createSlice } from "@reduxjs/toolkit";

const oldToken = localStorage.getItem("token");

const initialState = {
  token: oldToken ?? null,
  isAuth: oldToken ? true : false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    userLogin: (state) => {
      state.isAuth = true;
    },
    userLogout: (state) => {
      state.isAuth = false;
    },
  },
});

export const { userLogin, userLogout } = authSlice.actions;

export default authSlice.reducer;
