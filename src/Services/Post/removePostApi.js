import axios from "axios";
import {
  deletePost,
  removePostFromUserFeed,
} from "../../Redux/Features/postSlice";
import { toast } from "react-toastify";

export const removePost = async (PostId, userId, dispatch) => {
  const encodedToken = localStorage.getItem("token");

  try {
    const res = await axios({
      method: "DELETE",
      url: `/api/posts/${PostId}`,
      headers: { authorization: encodedToken },
    });
    if (res.status === 201) {
      dispatch(deletePost(res.data.posts));
      dispatch(removePostFromUserFeed(userId));
    }
  } catch (e) {
    toast.error("Failed to delete Post");
    console.log("error occured: ", e);
  }
};
