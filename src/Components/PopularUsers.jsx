import React from "react";
import { Link, useNavigate } from "react-router-dom";

function PopularUsers() {
  const navigate = useNavigate();
  return (
    <div className="hidden xl:block bg-secondaryDark rounded-lg w-2/4 mr-5 h-fit my-6 pb-2">
      <div className="flex flex-col justify-center items-center m-4 p-4 border-2 rounded-md shadow-md">
        <div
          className=" rounded-full w-16 h-16 bg-pink-300 cursor-pointer"
          onClick={() => navigate("/home/profile")}
        ></div>
        <h1 className=" font-medium text-lg">UserName</h1>
        <h1>Full Name</h1>
      </div>

      <div className="flex justify-between items-center">
        <div className="leading-3 px-4 py-2">Suggested for you</div>
        <Link to="/home/search" className="px-4 py-2 font-medium">
          See All
        </Link>
      </div>
      <div className="flex flex-col items-center justify-center   mx-4">
        <div className="flex items-center justify-between w-full p-2 m-2 border-2 rounded-md shadow-sm ">
          <div
            className="flex cursor-pointer"
            onClick={() => navigate("/home/profile")}
          >
            <div className=" rounded-full w-12 h-12 bg-pink-300 cursor-pointer"></div>
            <div className="flex flex-col px-2">
              <p>User1</p>
              <p>Full Name1</p>
            </div>
          </div>

          <button className="py-1 bg-primaryDark text-secondaryLight border-2 border-primaryDark rounded-md w-24">
            Follow
          </button>
        </div>
        <div className="flex items-center justify-between w-full p-2 m-2 border-2 rounded-md shadow-sm">
          <div
            className="flex cursor-pointer"
            onClick={() => navigate("/home/profile")}
          >
            <div className=" rounded-full w-12 h-12 bg-pink-300 cursor-pointer"></div>
            <div className="flex flex-col px-2">
              <p>User2</p>
              <p>Full Name2</p>
            </div>
          </div>

          <button className="py-1 bg-secondaryLight text-primaryDark  border-2 border-primaryDark rounded-md w-24">
            Following
          </button>
        </div>
        <div className="flex items-center justify-between w-full p-2 m-2 border-2 rounded-md shadow-sm">
          <div
            className="flex cursor-pointer"
            onClick={() => navigate("/home/profile")}
          >
            <div className=" rounded-full w-12 h-12 bg-pink-300 cursor-pointer"></div>
            <div className="flex flex-col px-2">
              <p>User3</p>
              <p>Full Name3</p>
            </div>
          </div>

          <button className="py-1 bg-primaryDark text-secondaryLight border-2 border-primaryDark rounded-md w-24 ">
            Follow
          </button>
        </div>
        <div className=" hidden xl:flex items-center justify-between w-full p-2 m-2 border-2 rounded-md shadow-sm">
          <div
            className="flex cursor-pointer"
            onClick={() => navigate("/home/profile")}
          >
            <div className=" rounded-full w-12 h-12 bg-pink-300 cursor-pointer"></div>
            <div className="flex flex-col px-2">
              <p>User4</p>
              <p>Full Name4</p>
            </div>
          </div>

          <button className="py-1 bg-primaryDark text-secondaryLight border-2 border-primaryDark rounded-md w-24 ">
            Follow
          </button>
        </div>
      </div>
    </div>
  );
}

export { PopularUsers };
