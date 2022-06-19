import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { loadPostCall } from "../Redux/Features/postSlice";

import { dislike } from "../Services/Like/dislikeApi";
import { like } from "../Services/Like/likeApi";

import {
  addBookmarkCall,
  removeBookmarkCall,
} from "../Redux/Features/userSlice";
import { addComments } from "../Services/Comments/addCommentsApi";
import { likeComments } from "../Services/Comments/likeCommentsApi";
import { dislikeComments } from "../Services/Comments/dislikeCommentsApi";
import { removeComments } from "../Services/Comments/removeCommentsApi";
import { editComments } from "../Services/Comments/editCommentsApi";

function PostPage() {
  const navigate = useNavigate();
  const { postID } = useParams();

  const { currentUserDetails } = useSelector((store) => store.users);

  const { singlePost } = useSelector((store) => store.posts);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadPostCall(postID));
  }, [dispatch, postID, singlePost]);

  const {
    userImage,
    username,
    userId,
    updatedAt,
    postImg,
    content,
    likes,
    comments,
    bookmarks,
  } = singlePost;

  const fileInput = useRef();

  const [commentImage, setcommentImage] = useState("");
  const [commentContent, setcommentContent] = useState("");

  const newCommentHandler = () => {
    addComments(
      {
        content: commentContent,
        commentImg: commentImage && URL.createObjectURL(commentImage),
        userImage: currentUserDetails.profileImg,
        commentUserId: currentUserDetails._id,
      },
      postID,
      dispatch
    );

    setcommentContent("");
    setcommentImage("");
  };

  const [options, setOptions] = useState(false);

  const commentInput = useRef();

  const [isEdit, setIsEdit] = useState(false);

  const [commnetId, setCommentId] = useState("");

  const editHandler = (commentObj) => {
    setIsEdit(true);

    setcommentContent(commentObj.content);

    setcommentImage(commentObj.commentImg);

    setCommentId(commentObj._id);

    commentInput.current.select();
  };

  const editPostCommentHandler = () => {
    editComments(
      {
        content: commentContent,
        commentImg: commentImage
          ? typeof commentImage === "string"
            ? commentImage
            : URL.createObjectURL(commentImage)
          : "",
        userImage: currentUserDetails.profileImg,
        commentUserId: currentUserDetails._id,
      },
      postID,
      commnetId
    );

    setcommentContent("");
    setcommentImage("");
    setIsEdit(false);
  };

  return (
    <div className=" w-full md:w-10/12    md:mx-10 md:my-6  xlg:mx-14 xlg:my-10 rounded-lg bg-secondaryDark   overflow-y-auto h-[calc(100vh-6rem)] md:h-[calc(100vh-8rem)] scrollbar-hide ">
      <div className="p-5">
        {/* show post */}
        {singlePost ? (
          <div className="flex flex-col items-stretch justify-between  w-full h-full p-5 mb-4  min-h-fit border-2 rounded-md shadow-sm bg-secondaryLight">
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
            <div className="px-2 py-4">
              {postImg?.length !== 0 && (
                <img
                  src={postImg}
                  alt="userPostImg"
                  className="rounded-md max-h-[50] md:max-h-[65vh] "
                />
              )}

              <p className="pt-2">{content}</p>
            </div>
            <div className="flex justify-between items-center mt-2 ">
              {singlePost?.likes?.likedBy?.find(
                (users) => users._id === currentUserDetails._id
              ) ? (
                <i
                  className="fa-lg fa-solid fa-heart  cursor-pointer  text-primaryDark "
                  onClick={() => dislike(postID, dispatch)}
                >
                  <span className="font-normal pl-2">{likes?.likeCount}</span>
                </i>
              ) : (
                <i
                  className="fa-lg fa-regular fa-heart  cursor-pointer  text-primaryDark"
                  onClick={() => like(postID, dispatch)}
                >
                  <span className="pl-2">{likes?.likeCount}</span>
                </i>
              )}
              <i className="fa-lg fa-regular fa-comment  cursor-pointer  text-primaryDark">
                <span className="pl-2">{comments?.length}</span>
              </i>

              {bookmarks?.find((item) => item._id === postID) ? (
                <i
                  className="fa-lg fa-solid fa-bookmark cursor-pointer  text-primaryDark"
                  onClick={() => dispatch(removeBookmarkCall(postID))}
                ></i>
              ) : (
                <i
                  className="fa-lg fa-regular fa-bookmark  cursor-pointer  text-primaryDark"
                  onClick={() => dispatch(addBookmarkCall(postID))}
                ></i>
              )}
            </div>
          </div>
        ) : (
          <div>Loading...</div>
        )}

        {/* show comments */}
        <div className="flex flex-col justify-center items-center w-full h-full bg-secondaryDark rounded-md">
          {comments?.map(
            ({
              _id,
              commentUserId,
              content,
              updatedAt,
              commentImg,
              userImage,
              username,
              votes,
            }) => (
              <div
                key={_id}
                className="flex flex-col w-full p-4  bg-secondaryLight shadow-md rounded-md mb-4"
              >
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
                      <div>{username}</div>
                      <div>{new Date(updatedAt)?.toDateString()}</div>
                    </div>
                  </div>
                  {currentUserDetails._id === commentUserId && (
                    <div
                      className="cursor-pointer relative px-2"
                      onClick={() => setOptions((prev) => !prev)}
                    >
                      <i className="fa-lg fa-solid fa-ellipsis-vertical "></i>
                      {options && (
                        <div className="w-24 h-20 bg-secondaryDark border-2 border-primaryLight rounded-md absolute top-0 right-4 flex flex-col items-start p-2 justify-center">
                          <div
                            className="p-1 "
                            onClick={() =>
                              editHandler({ content, commentImg, _id })
                            }
                          >
                            <i className="fa-solid fa-pen-to-square"></i>Edit
                          </div>
                          <div
                            className="p-1 text-red-500"
                            onClick={() => removeComments(postID, _id)}
                          >
                            <i className="fa-solid fa-trash"></i>Delete
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {commentImg && (
                  <div className=" p-2">
                    <img
                      src={commentImg}
                      alt="commentImg"
                      className="w-fit h-56  rounded-md"
                    />
                  </div>
                )}

                <div className="flex flex-col justify-center items-start">
                  <div className="p-4"> {content}</div>

                  {votes.upvotedBy.find(
                    (users) => users._id === currentUserDetails._id
                  ) ? (
                    <i
                      className="fa-lg fa-solid fa-heart  cursor-pointer  text-primaryDark p-4"
                      onClick={() => dislikeComments(postID, _id)}
                    >
                      <span className="pl-2 font-normal">
                        {votes?.upvotedBy?.length}
                      </span>
                    </i>
                  ) : (
                    <i
                      className="fa-lg fa-regular fa-heart  cursor-pointer  text-primaryDark p-4"
                      onClick={() => likeComments(postID, _id)}
                    >
                      <span className="pl-2 font-normal">
                        {votes?.upvotedBy?.length}
                      </span>
                    </i>
                  )}
                </div>
              </div>
            )
          )}
        </div>

        {/* add comment */}
        <div className="border-2 border-primaryLight rounded-md">
          <div className="flex p-5 w-full gap-2  ">
            <img
              src={currentUserDetails?.profileImg}
              alt="UserProfileImg"
              className=" rounded-full   min-w-[3rem] w-12 h-12 md:min-w-[4rem] md:w-16 md:h-16 bg-pink-300 cursor-pointer "
            />

            <div className="w-full  ">
              <textarea
                className="w-full h-24 p-2 rounded-lg "
                name="newPost"
                placeholder="Add Your Comment Here"
                onChange={(e) => setcommentContent(e.target.value)}
                value={commentContent}
                ref={commentInput}
                required
              ></textarea>
              {commentImage && (
                <div className="w-32 h-fit m-2 relative rounded-md  ">
                  <img
                    src={
                      typeof commentImage === "string"
                        ? commentImage
                        : URL.createObjectURL(commentImage)
                    }
                    alt="uploadImage"
                    className="w-fit h-fit rounded-md"
                  />
                  <span
                    className="flex justify-center items-center bg-primaryLight absolute top-[-8px] right-[-10px] w-6 h-6 rounded-full cursor-pointer"
                    onClick={() => setcommentImage("")}
                  >
                    <i className="fa-solid fa-xmark"></i>
                  </span>
                </div>
              )}

              <div className="flex justify-between items-center">
                <div>
                  <input
                    className="hidden "
                    type="file"
                    onChange={(e) => setcommentImage(e.target.files[0])}
                    accept="image/*"
                    ref={fileInput}
                  />
                  <i
                    className="pr-2 fa-xl fa-solid fa-image cursor-pointer text-primaryDark"
                    onClick={() => fileInput?.current.click()}
                  ></i>
                </div>

                <div className="flex  items-center justify-center px-2">
                  {isEdit && (
                    <button
                      className="bg-red-500 text-secondaryDark w-24 p-2 border-2 rounded-md"
                      onClick={() => {
                        setcommentContent("");
                        setcommentImage("");
                        setIsEdit(false);
                      }}
                    >
                      Cancel
                    </button>
                  )}
                  <button
                    className="bg-primaryDark text-secondaryDark w-24 p-2 border-2 rounded-md"
                    onClick={() =>
                      commentContent || commentImage
                        ? isEdit
                          ? editPostCommentHandler()
                          : newCommentHandler()
                        : alert("You have to fill alteast one field")
                    }
                  >
                    Comment
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export { PostPage };
