import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router";

function RequiresAuth() {
  const { isAuth } = useSelector((store) => store.auth);
  return isAuth ? <Outlet /> : <Navigate to="/" />;
}

export default RequiresAuth;
