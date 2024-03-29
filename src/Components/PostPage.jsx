import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { toast } from "react-toastify";
import { loadPostCall } from "../Redux/Features/postSlice";
import { addComments } from "../Services/Comments/addCommentsApi";
import { editComments } from "../Services/Comments/editCommentsApi";
import { getComments } from "../Services/Comments/getCommentsApi";
import { Post } from "./Post";
import { CommentSection } from "./CommentSection";
import { Loading } from "./Loading";

function PostPage() {
  const navigate = useNavigate();

  const { postID } = useParams();

  const { currentUserDetails } = useSelector((store) => store.users);

  const { singlePost, comments } = useSelector((store) => store.posts);

  const dispatch = useDispatch();

  useEffect(() => {
    if (singlePost !== undefined && Object.keys(singlePost).length === 0)
      navigate("/home");
  }, [singlePost]);

  useEffect(() => {
    dispatch(loadPostCall(postID));
  }, []);

  useEffect(() => {
    getComments(postID, dispatch);
  }, []);

  const fileInput = useRef();

  const [commentImage, setcommentImage] = useState("");
  const [editCommentImage, setEditCommentImage] = useState("");
  const [commentContent, setcommentContent] = useState("");

  const handleEditCommentImage = (e) => {
    const file = e.target.files[0];
    if (file) previewEditCommentImage(file);
  };

  const previewEditCommentImage = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setEditCommentImage(reader.result);
    };
  };

  const newCommentHandler = () => {
    addComments(
      {
        content: commentContent,
        commentImg: editCommentImage && editCommentImage,
        userImage: currentUserDetails.profileImg,
        commentUserId: currentUserDetails._id,
      },
      postID,
      dispatch
    );

    setcommentContent("");
    setEditCommentImage("");
  };

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
        commentImg: editCommentImage && editCommentImage,
        userImage: currentUserDetails.profileImg,
        commentUserId: currentUserDetails._id,
      },
      postID,
      commnetId,
      dispatch
    );

    setcommentContent("");
    setEditCommentImage("");
    setIsEdit(false);
  };

  return (
    <div className=" w-full md:w-10/12    md:mx-10 md:my-6  xlg:mx-14 xlg:my-10 rounded-lg bg-secondaryDark dark:bg-nightLight  overflow-y-auto h-[calc(100vh-6rem)] md:h-[calc(100vh-8rem)] scrollbar-hide ">
      <div className="p-5">
        {/* show post */}
        {singlePost ? (
          <Post key={singlePost._id} item={singlePost} />
        ) : (
          <Loading />
        )}

        {/* show comments */}
        <div className="flex flex-col justify-center items-center w-full h-full bg-secondaryDark dark:bg-nightLight  rounded-md">
          {comments?.map((item) => (
            <CommentSection
              key={item._id}
              item={item}
              postID={postID}
              editHandler={editHandler}
            />
          ))}
        </div>

        {/* add comment */}
        <div className="border-2 border-primaryLight rounded-md">
          <div className="flex p-5 w-full gap-2  ">
            <img
              src={currentUserDetails?.profileImg.url}
              alt="UserProfileImg"
              className=" rounded-full   min-w-[3rem] w-12 h-12 md:min-w-[4rem] md:w-16 md:h-16 bg-pink-300 cursor-pointer "
            />

            <div className="w-full  ">
              <textarea
                className="w-full h-24 p-2 rounded-lg dark:bg-nightInput dark:text-secondaryDark "
                name="newPost"
                placeholder="Add Your Comment Here"
                onChange={(e) => setcommentContent(e.target.value)}
                value={commentContent}
                ref={commentInput}
                required
              ></textarea>
              {editCommentImage && (
                <div className="w-32 h-fit m-2 relative rounded-md  ">
                  <img
                    src={editCommentImage ? editCommentImage : commentImage}
                    alt="uploadImage"
                    className="w-fit h-fit rounded-md"
                  />
                  <span
                    className="flex justify-center items-center bg-primaryLight absolute top-[-8px] right-[-10px] w-6 h-6 rounded-full cursor-pointer"
                    onClick={() => setEditCommentImage("")}
                  >
                    <i className="fa-solid fa-xmark"></i>
                  </span>
                </div>
              )}

              <div className="flex justify-between items-center">
                {/* for adding comment with image */}
                {/* <div>
                  <input
                    className="hidden "
                    type="file"
                    onChange={(e) => handleEditCommentImage(e)}
                    accept="image/*"
                    ref={fileInput}
                  />
                  <i
                    className="pr-2 fa-xl fa-solid fa-image cursor-pointer text-primaryDark"
                    onClick={() => fileInput?.current.click()}
                  ></i>
                </div> */}

                <div className="flex  items-center justify-center px-2 gap-2">
                  {isEdit && (
                    <button
                      className="bg-red-500 text-secondaryDark w-24 p-2 border-2 dark:border-nightInput rounded-md"
                      onClick={() => {
                        setcommentContent("");
                        setEditCommentImage("");
                        setIsEdit(false);
                      }}
                    >
                      Cancel
                    </button>
                  )}
                  <button
                    className="bg-primaryDark text-secondaryDark w-24 p-2 border-2 dark:border-nightInput rounded-md"
                    onClick={() =>
                      commentContent || commentImage
                        ? isEdit
                          ? editPostCommentHandler()
                          : newCommentHandler()
                        : toast.error("You have to fill alteast one field")
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
