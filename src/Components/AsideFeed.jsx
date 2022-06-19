import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { PopularUsers } from "./PopularUsers";

import { useDispatch, useSelector } from "react-redux/es/exports";
import { loadUserPostCall } from "../Redux/Features/postSlice";

function AsideFeed() {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const { currentUserDetails } = useSelector((store) => store.users);

  const { profileImg, username, fullName } = currentUserDetails;

  return (
    <div className="hidden xl:block bg-secondaryDark dark:bg-nightLight rounded-lg w-2/4 mr-5 h-fit my-6 pb-2">
      <div className="flex flex-col justify-center items-center m-4 p-4 border-2 dark:border-nightInput rounded-md shadow-md">
        <img
          src={profileImg}
          alt="Current User Profile"
          className=" rounded-full w-16 h-16 bg-pink-300 cursor-pointer"
          onClick={() => {
            dispatch(loadUserPostCall(currentUserDetails?.username));
            navigate("/home/profile");
          }}
        />

        <h1 className=" font-medium text-lg dark:text-secondaryDark">
          {username}
        </h1>
        <h1 className="dark:text-secondaryDark">{fullName}</h1>
      </div>

      <div className="flex justify-between items-center">
        <div className="leading-3 px-4 py-2 dark:text-secondaryDark">
          Suggested for you
        </div>
        <Link
          to="/home/search"
          className="px-4 py-2 font-medium dark:text-secondaryDark"
        >
          See All
        </Link>
      </div>
      <div className="flex flex-col items-center justify-center   mx-4">
        <PopularUsers />
      </div>
    </div>
  );
}

export { AsideFeed };
