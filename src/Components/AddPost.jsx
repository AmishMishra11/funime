import React from "react";

function AddPost() {
  return (
    <div className="border-b-2 border-primaryDark ">
      <div className="flex m-5 w-full  ">
        <div className=" rounded-full w-12 h-12 bg-pink-300 cursor-pointer mr-2"></div>
        <div className="w-full pr-10 ">
          <textarea
            className="w-full h-24 p-2"
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
