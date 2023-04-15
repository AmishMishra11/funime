import React, { useState, useRef } from "react";

import { useSelector, useDispatch } from "react-redux/es/exports";
import { addPost } from "../Services/Post/addPostApi";
import { toast } from "react-toastify";
import { Loading } from "./Loading";

function AddPost() {
  const dispatch = useDispatch();
  const fileInput = useRef();

  const { currentUserDetails } = useSelector((store) => store.users);

  const [postImage, setPostImage] = useState("");
  const [postContent, setPostContent] = useState("");

  const handleAddPostImage = (e) => {
    const file = e.target.files[0];
    if (file) previewPostImage(file);
  };

  const previewPostImage = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPostImage(reader.result);
    };
  };

  const newPostHandler = () => {
    addPost(
      {
        comments: [],
        content: postContent,
        postImg: postImage && postImage,
        userImage: currentUserDetails.profileImg,
        userId: currentUserDetails._id,
      },
      dispatch,
      setLoading
    );

    setPostContent("");
    setPostImage("");
    setLoading(true);
  };

  const [loading, setLoading] = useState(false);

  return (
    <div className="border-b-2 border-primaryDark dark:bg-nightLight ">
      <div className="flex p-5 w-full gap-2  ">
        <img
          src={currentUserDetails?.profileImg.url}
          alt="UserProfileImg"
          className=" rounded-full   min-w-[3rem] w-12 h-12 md:min-w-[4rem] md:w-16 md:h-16 bg-pink-300 cursor-pointer "
        />

        <div className="w-full  ">
          <textarea
            className="w-full h-24 p-2 rounded-lg dark:bg-nightInput dark:text-secondaryDark"
            name="newPost"
            placeholder="What's on your mind?"
            onChange={(e) => setPostContent(e.target.value)}
            value={postContent}
            required
          ></textarea>
          {postImage && (
            <div className="w-32 h-fit m-2 relative rounded-md  ">
              <img
                src={postImage && postImage}
                alt="uploadImage"
                className="w-fit h-fit rounded-md"
              />
              <span
                className="flex justify-center items-center bg-primaryLight absolute top-[-8px] right-[-10px] w-6 h-6 rounded-full cursor-pointer"
                onClick={() => setPostImage("")}
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
                onChange={(e) => handleAddPostImage(e)}
                accept="image/*"
                ref={fileInput}
              />
              <i
                className="pr-2 fa-xl fa-solid fa-image cursor-pointer text-primaryDark"
                onClick={() => fileInput.current.click()}
              ></i>
            </div>

            {loading ? (
              <button className="bg-primaryDark text-secondaryDark dark:border-nightLight w-24 p-2 border-2 rounded-md">
                <Loading />
              </button>
            ) : (
              <button
                className="bg-primaryDark text-secondaryDark dark:border-nightLight w-24 p-2 border-2 rounded-md"
                onClick={() =>
                  postContent || postImage
                    ? newPostHandler()
                    : toast.error("You have to fill alteast one field")
                }
              >
                Post
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export { AddPost };
