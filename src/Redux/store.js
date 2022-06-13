import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./Features/authSlice";
import userReducer from "./Features/userSlice";
import postReducer from "./Features/postSlice";
export const store = configureStore({
  reducer: { auth: authReducer, users: userReducer, posts: postReducer },
});
