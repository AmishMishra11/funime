import React from "react";

import { useSelector } from "react-redux/es/exports";

function AddPost() {
  const { currentUserDetails } = useSelector((store) => store.users);

  return (
    <div className="border-b-2 border-primaryDark ">
      <div className="flex p-5 w-full gap-2  ">
        <img
          src={currentUserDetails?.profileImg}
          alt="UserProfileImg"
          className=" rounded-full   min-w-[3rem] w-12 h-12 md:min-w-[4rem] md:w-16 md:h-16 bg-pink-300 cursor-pointer "
        />

        <div className="w-full  ">
          <textarea
            className="w-full h-24 p-2 rounded-lg"
            name="newPost"
            placeholder="What's on your mind?"
          ></textarea>

          <div className="flex justify-between items-center">
            <div>
              <i className="  pr-2  fa-lg fa-solid fa-image"></i>
              <i className="  pr-2  fa-lg fa-regular fa-face-laugh-squint"></i>
            </div>
            <button className="bg-primaryDark text-secondaryDark w-24 p-2 border-2 rounded-md">
              Post
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export { AddPost };
