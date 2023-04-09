import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { loadPostCall } from "../Redux/Features/postSlice";
import { editPost } from "../Services/Post/editPostApi";

import { toast } from "react-toastify";

function EditPost() {
  const { postID } = useParams();

  const navigate = useNavigate();

  const { currentUserDetails } = useSelector((store) => store.users);

  const { singlePost, singlePostStatus } = useSelector((store) => store.posts);
  const { content, postImg } = singlePost;
  const dispatch = useDispatch();

  const [PostImage, setPostImage] = useState("");
  const [EditedPostImage, setEditedPostImage] = useState("");
  const [PostContent, setPostContent] = useState("");

  const handleEditPostImage = (e) => {
    const file = e.target.files[0];
    if (file) previewEditPostImage(file);
  };

  const previewEditPostImage = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setEditedPostImage(reader.result);
    };
  };

  useEffect(() => {
    dispatch(loadPostCall(postID));
  }, [dispatch, postID]);

  useEffect(() => {
    setPostContent(content);
    setPostImage(postImg);
    PostInput.current.select();
  }, [singlePost, content, postImg]);

  const fileInput = useRef();

  const PostInput = useRef();

  const ConfirmEditPostHandler = () => {
    editPost(
      {
        content: PostContent,
        postImg: EditedPostImage
          ? EditedPostImage
          : PostImage?.url?.length
          ? PostImage.url
          : "",
        userImage: currentUserDetails.profileImg,
        postUserId: currentUserDetails._id,
      },
      postID,
      dispatch
    );

    setPostContent("");
    setPostImage("");
    navigate("/home");
  };

  return (
    <div className=" w-full md:w-10/12    md:mx-10 md:my-6  xlg:mx-14 xlg:my-10 rounded-lg bg-secondaryDark dark:bg-nightLight dark:text-secondaryDark   overflow-y-auto h-[calc(100vh-6rem)] md:h-[calc(100vh-8rem)] scrollbar-hide  p-4">
      {singlePostStatus === "loading" ? (
        <div>Loading...</div>
      ) : (
        <div className="border-2 border-primaryLight rounded-md">
          <div className="flex p-5 w-full gap-2  ">
            <img
              src={currentUserDetails?.profileImg.url}
              alt="UserProfileImg"
              className=" rounded-full   min-w-[3rem] w-12 h-12 md:min-w-[4rem] md:w-16 md:h-16 bg-pink-300 cursor-pointer "
            />

            <div className="w-full  ">
              <textarea
                className="w-full h-24 p-2 rounded-lg  dark:bg-nightInput dark:text-secondaryDark"
                name="newPost"
                placeholder="Add Your Post Here"
                onChange={(e) => setPostContent(e.target.value)}
                value={PostContent}
                ref={PostInput}
                required
              ></textarea>
              {PostImage.length ||
                (EditedPostImage.length && (
                  <div className="w-60 h-fit m-2 relative rounded-md  ">
                    <img
                      src={EditedPostImage ? EditedPostImage : PostImage.url}
                      alt="uploadImage"
                      className="w-fit h-fit rounded-md"
                    />
                    <span
                      className="flex justify-center items-center bg-primaryLight absolute top-[-8px] right-[-10px] w-6 h-6 rounded-full cursor-pointer"
                      onClick={() => {
                        setPostImage("");
                        setEditedPostImage("");
                      }}
                    >
                      <i className="fa-solid fa-xmark"></i>
                    </span>
                  </div>
                ))}

              <div className="flex justify-between items-center">
                <div>
                  <input
                    className="hidden "
                    type="file"
                    onChange={(e) => handleEditPostImage(e)}
                    accept="image/*"
                    ref={fileInput}
                  />
                  <i
                    className="pr-2 fa-xl fa-solid fa-image cursor-pointer text-primaryDark"
                    onClick={() => fileInput?.current.click()}
                  ></i>
                </div>

                <div className="flex  items-center justify-center px-2 gap-2">
                  <button
                    className="bg-red-500 text-secondaryDark w-24 p-2 border-2 dark:border-nightInput rounded-md"
                    onClick={() => {
                      setPostContent("");
                      setPostImage("");
                      navigate("/home");
                    }}
                  >
                    Cancel
                  </button>

                  <button
                    className="bg-primaryDark text-secondaryDark w-24 p-2 border-2 dark:border-nightInput rounded-md"
                    onClick={() =>
                      PostContent || PostImage
                        ? ConfirmEditPostHandler()
                        : toast.error("You have to fill alteast one field")
                    }
                  >
                    Post
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export { EditPost };
