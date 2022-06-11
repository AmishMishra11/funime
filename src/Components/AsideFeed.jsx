import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { PopularUsers } from "./PopularUsers";
import { useSelector } from "react-redux/es/exports";

function AsideFeed() {
  const navigate = useNavigate();

  const { currentUserDetails } = useSelector((store) => store.users);

  const { profileImg, username, fullName } = currentUserDetails;

  return (
    <div className="hidden xl:block bg-secondaryDark rounded-lg w-2/4 mr-5 h-fit my-6 pb-2">
      <div className="flex flex-col justify-center items-center m-4 p-4 border-2 rounded-md shadow-md">
        <img
          src={profileImg}
          alt="Current User Profile"
          className=" rounded-full w-16 h-16 bg-pink-300 cursor-pointer"
          onClick={() => navigate("/home/profile")}
        />

        <h1 className=" font-medium text-lg">{username}</h1>
        <h1>{fullName}</h1>
      </div>

      <div className="flex justify-between items-center">
        <div className="leading-3 px-4 py-2">Suggested for you</div>
        <Link to="/home/search" className="px-4 py-2 font-medium">
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
