import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { likeComments } from "../Services/Comments/likeCommentsApi";
import { dislikeComments } from "../Services/Comments/dislikeCommentsApi";
import { removeComments } from "../Services/Comments/removeCommentsApi";
import { useRef } from "react";
import { useState } from "react";

function CommentSection({ item, postID, editHandler }) {
  const ref = useRef();
  const { currentUserDetails } = useSelector((store) => store.users);

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const [options, setOptions] = useState(false);

  const {
    _id,
    commentUserId,
    content,
    updatedAt,
    commentImg,
    userImage,
    username,
    votes,
  } = item;

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
    <div className="flex flex-col w-full p-4  bg-secondaryLight dark:bg-nightDark dark:text-secondaryDark shadow-md rounded-md mb-4">
      <div className="flex items-center justify-between">
        <div
          className="flex items-center justify-start"
          onClick={() => {
            commentUserId === currentUserDetails._id
              ? navigate("/home/profile")
              : navigate(`/home/peopleprofile/${commentUserId}`);
          }}
        >
          <img
            src={userImage}
            alt="userImage"
            className=" rounded-full w-10 h-10 md:w-12 md:h-12 bg-pink-300 cursor-pointer mr-2"
          />

          <div className="flex flex-col items-start justify-center">
            <div className="text-primaryDark font-medium text-lg">
              {username}
            </div>
            <div>{new Date(updatedAt)?.toDateString()}</div>
          </div>
        </div>
        {currentUserDetails._id === commentUserId && (
          <div
            className="cursor-pointer relative px-2"
            onClick={(e) => {
              setOptions((prev) => !prev);
            }}
          >
            <i className="fa-lg fa-solid fa-ellipsis-vertical "></i>
            {options && (
              <div
                className="w-24 h-20 bg-secondaryDark dark:bg-nightLight border-2 border-primaryLight rounded-md absolute top-0 right-5 flex flex-col items-start p-2 justify-center"
                ref={ref}
              >
                <div
                  className="p-1 w-full "
                  onClick={() =>
                    editHandler({
                      content,
                      commentImg,
                      _id,
                    })
                  }
                >
                  <i className="fa-solid fa-pen-to-square"></i>Edit
                </div>
                <div
                  className="p-1 w-full text-red-500"
                  onClick={() => removeComments(postID, _id, dispatch)}
                >
                  <i className="fa-solid fa-trash"></i>Delete
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {commentImg?.url?.length !== 0 && (
        <div className=" p-2">
          <img
            src={commentImg.url}
            alt="commentImg"
            className="w-fit h-56  rounded-md"
          />
        </div>
      )}

      <div className="flex flex-col justify-center items-start">
        <div className="p-4"> {content}</div>

        {votes?.find((users) => users.userId === currentUserDetails._id) ? (
          <i
            className="fa-lg fa-solid fa-heart  cursor-pointer  text-primaryDark p-4"
            onClick={() => dislikeComments(postID, _id, dispatch)}
          >
            <span className="pl-2 font-normal">{votes?.length}</span>
          </i>
        ) : (
          <i
            className="fa-lg fa-regular fa-heart  cursor-pointer  text-primaryDark p-4"
            onClick={() => likeComments(postID, _id, dispatch)}
          >
            <span className="pl-2 font-normal">{votes?.length}</span>
          </i>
        )}
      </div>
    </div>
  );
}

export { CommentSection };
