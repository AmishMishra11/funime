import axios from "axios";
import {
  addNewPostToAllPost,
  addNewPostToUserFeedPost,
} from "../../Redux/Features/postSlice";
import { toast } from "react-toastify";
export const addPost = async (postData, dispatch) => {
  const encodedToken = localStorage.getItem("token");
  try {
    const res = await axios({
      method: "POST",
      url: "/api/posts",
      headers: { authorization: encodedToken },
      data: { postData },
    });

    if (res.status === 201) {
      dispatch(addNewPostToAllPost(res.data.posts));
      const arrLength = res.data.posts.length;
      const newPost = res.data.posts[arrLength - 1];
      dispatch(addNewPostToUserFeedPost(newPost));
    }
  } catch (e) {
    toast.error("Failed to add new post");
    console.log("Error occured: ", e);
  }
};
