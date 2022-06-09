import React from "react";

import postImage from "../assets/wallpaper.png";

function Post() {
  return (
    <div className="flex flex-col items-stretch justify-between  w-[94%] md:w-[96%] h-full p-5 m-4 min-h-fit border-2 rounded-md shadow-sm bg-secondaryLight">
      <div className="flex item-center justify-start">
        <div className=" rounded-full w-12 h-12 bg-pink-300 cursor-pointer mr-2"></div>
        <div className="flex flex-col items-start justify-center">
          <div>userName</div>
          <div>Jun 09 2022</div>
        </div>
      </div>
      <div className="px-2 py-4">
        <img src={postImage} alt="userPostImg" className="rounded-md " />

        <p className="pt-2">Test Post</p>
      </div>
      <div className="flex justify-between items-center mt-2 ">
        <i className="fa-lg fa-regular fa-heart  cursor-pointer  text-primaryDark"></i>
        <i className="fa-lg fa-regular fa-comment  cursor-pointer  text-primaryDark"></i>
        <i className="fa-lg fa-regular fa-bookmark  cursor-pointer  text-primaryDark"></i>
      </div>
    </div>
  );
}

export { Post };
