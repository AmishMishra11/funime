import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import {
  addBookmarkCall,
  removeBookmarkCall,
} from "../Redux/Features/userSlice";
import { dislike } from "../Services/Like/dislikeApi";
import { like } from "../Services/Like/likeApi";

function Post({ item }) {
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

  return (
    <div
      key={_id}
      className="flex flex-col items-stretch justify-between  w-full h-full p-5 mb-4  min-h-fit border-2 rounded-md shadow-sm bg-secondaryLight"
    >
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

        <div className="flex flex-col items-start justify-center">
          <div>{username}</div>
          <div>{new Date(updatedAt)?.toDateString()}</div>
        </div>
      </div>
      <div className="px-2 py-4 ">
        {postImg?.length !== 0 && (
          <img
            src={postImg}
            alt="userPostImg"
            className="rounded-md max-h-[50] md:max-h-[65vh] cursor-pointer"
            onClick={() => navigate(`/home/post/${_id}`)}
          />
        )}

        <p className="pt-2">{content}</p>
      </div>
      <div className="flex justify-between items-center mt-2 ">
        {item?.likes?.likedBy?.find(
          (users) => users._id === currentUserDetails._id
        ) ? (
          <i
            className="fa-lg fa-solid fa-heart  cursor-pointer  text-primaryDark "
            onClick={() => dislike(_id, dispatch)}
          >
            <span className="font-normal pl-2">{likes?.likeCount}</span>
          </i>
        ) : (
          <i
            className="fa-lg fa-regular fa-heart  cursor-pointer  text-primaryDark"
            onClick={() => like(_id, dispatch)}
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

        {bookmarks?.find((item) => item._id === _id) ? (
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
