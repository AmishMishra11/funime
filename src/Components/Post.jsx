import React, { useState } from "react";
import { useEffect } from "react";
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { dislikePostCall, likePostCall } from "../Redux/Features/postSlice";
import {
  addBookmarkCall,
  removeBookmarkCall,
} from "../Redux/Features/userSlice";

import { removePost } from "../Services/Post/removePostApi";

function Post({ item }) {
  const ref = useRef();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { currentUserDetails } = useSelector((store) => store.users);

  const { bookmarks } = useSelector((store) => store.users);

  const {
    _id,
    userImage,
    userId,
    username,
    updatedAt,
    postImg,
    content,
    comments,
    likes,
  } = item;

  const [options, setOptions] = useState(false);

  useEffect(() => {
    const checkIfClickedOutside = (e) => {
      if (options && ref.current && !ref.current.contains(e.target)) {
        setOptions(false);
      }
    };
    document.addEventListener("mousedown", checkIfClickedOutside);
    return () => {
      document.removeEventListener("mousedown", checkIfClickedOutside);
    };
  }, [options]);

  return (
    <div
      key={_id}
      className="flex flex-col items-stretch justify-between  w-full h-full p-5 mb-4  min-h-fit border-2 rounded-md shadow-sm bg-secondaryLight dark:bg-nightDark dark:text-secondaryDark dark:border-nightInput"
    >
      <div className="flex items-center justify-between">
        <div
          className="flex items-center justify-start"
          onClick={() => {
            userId === currentUserDetails._id
              ? navigate("/home/profile")
              : navigate(`/home/peopleprofile/${userId}`);
          }}
        >
          <img
            src={userImage}
            alt="userImage"
            className=" rounded-full w-10 h-10 md:w-12 md:h-12 bg-pink-300 cursor-pointer mr-2"
          />

          <div className="flex flex-col items-start justify-center ">
            <div className="text-primaryDark font-medium text-lg">
              {username}
            </div>
            <div>{new Date(updatedAt)?.toDateString()}</div>
          </div>
        </div>

        {currentUserDetails._id === userId && (
          <div
            className="cursor-pointer relative px-2"
            onClick={() => setOptions((prev) => !prev)}
          >
            <i className="fa-lg fa-solid fa-ellipsis-vertical "></i>
            {options && (
              <div
                className="w-24 h-20 bg-secondaryDark dark:bg-nightLight border-2 border-primaryLight rounded-md absolute top-0 right-4 flex flex-col items-start p-2 justify-center"
                ref={ref}
              >
                <div
                  className="p-1 "
                  onClick={() => navigate(`/home/editPost/${_id}`)}
                >
                  <i className="fa-solid fa-pen-to-square"></i>Edit
                </div>
                <div
                  className="p-1 text-red-500"
                  onClick={() => removePost(_id, userId, dispatch)}
                >
                  <i className="fa-solid fa-trash"></i>Delete
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      <div className="px-2 py-4 ">
        {postImg?.url?.length !== 0 && (
          <img
            src={postImg?.url}
            alt="userPostImg"
            className="rounded-md max-h-[50] md:max-h-[65vh] cursor-pointer"
            onClick={() => navigate(`/home/post/${_id}`)}
          />
        )}

        <p className="pt-2">{content}</p>
      </div>
      <div className="flex justify-between items-center mt-2 ">
        {item?.likes?.likedBy?.find(
          (users) => users.userId === currentUserDetails._id
        ) ? (
          <i
            className="fa-lg fa-solid fa-heart  cursor-pointer  text-primaryDark "
            onClick={() => dispatch(dislikePostCall(_id))}
          >
            <span className="font-normal pl-2">{likes?.likeCount}</span>
          </i>
        ) : (
          <i
            className="fa-lg fa-regular fa-heart  cursor-pointer  text-primaryDark"
            onClick={() => dispatch(likePostCall(_id))}
          >
            <span className="pl-2">{likes?.likeCount}</span>
          </i>
        )}

        <i
          className="fa-lg fa-regular fa-comment  cursor-pointer  text-primaryDark"
          onClick={() => navigate(`/home/post/${_id}`)}
        >
          <span className="pl-2">{comments?.length}</span>
        </i>

        {bookmarks?.find((item) => item._id == _id) ? (
          <i
            className="fa-lg fa-solid fa-bookmark cursor-pointer  text-primaryDark"
            onClick={() => dispatch(removeBookmarkCall(_id))}
          ></i>
        ) : (
          <i
            className="fa-lg fa-regular fa-bookmark  cursor-pointer  text-primaryDark"
            onClick={() => dispatch(addBookmarkCall(_id))}
          ></i>
        )}
      </div>
    </div>
  );
}

export { Post };
