import {
  deletePost,
  deleteSinglePost,
  removePostFromUserFeed,
} from "../../Redux/Features/postSlice";
import { toast } from "react-toastify";
import { secureAxiosInstance } from "../apiInterceptor";
import { removeBookmarkCall } from "../../Redux/Features/userSlice";

export const removePost = async (PostId, userId, dispatch) => {
  const encodedToken = localStorage.getItem("token");

  try {
    const res = await secureAxiosInstance({
      method: "DELETE",
      url: `/posts/${PostId}`,
      headers: { authorization: encodedToken },
    });
    if (res.status === 200) {
      // dispatch(removeBookmarkCall(PostId));
      dispatch(deleteSinglePost({}));
      dispatch(deletePost(res.data.posts));
      dispatch(removePostFromUserFeed(userId));
    }
  } catch (e) {
    toast.error("Failed to delete Post");
    console.log("error occured: ", e);
  }
};
