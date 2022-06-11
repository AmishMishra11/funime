import React from "react";
import { useNavigate } from "react-router";
import { useSelector, useDispatch } from "react-redux/es/exports";

import Logo from "../assets/funime-logo.png";
import { userLogout } from "../Redux/Features/authSlice";

function Navigation() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { currentUserDetails } = useSelector((store) => store.users);

  const handleLogout = () => {
    dispatch(userLogout);
    localStorage.removeItem("token");
    localStorage.removeItem("userDetails");
    navigate("/");
  };

  return (
    <div className=" shadow-2xl sticky top-0 z-50 bg-primaryDark">
      <nav className="flex justify-between items-center ">
        <div
          className="pl-2  sm:pl-7 cursor-pointer"
          onClick={() => navigate("/home")}
        >
          <img
            className=" w-20 sm:w-44 sm:h-10 md:w-52 md:h-22"
            src={Logo}
            alt="Logo"
          />
        </div>
        <div
          className="flex px-5 py-2 sm:px-10 sm:py-5  items-center cursor-pointer text-secondaryLight"
          onClick={() => handleLogout()}
        >
          <h1 className="px-3 text-md sm:text-2xl font-medium ">
            {currentUserDetails?.username}
          </h1>
          <span>
            <i className="fas sm:fa-xl fa-sign-out"></i>
          </span>
        </div>
      </nav>
    </div>
  );
}

export { Navigation };
