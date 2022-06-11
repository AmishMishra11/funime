import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./Features/authSlice";
import userReducer from "./Features/userSlice";
export const store = configureStore({
  reducer: { auth: authReducer, users: userReducer },
});
