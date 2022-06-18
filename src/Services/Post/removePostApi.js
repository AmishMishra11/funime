import axios from "axios";
import {
  deletePost,
  removePostFromUserFeed,
} from "../../Redux/Features/postSlice";

export const removePost = async (PostId, userId, dispatch) => {
  const encodedToken = localStorage.getItem("token");

  try {
    const res = await axios({
      method: "DELETE",
      url: `/api/posts/${PostId}`,
      headers: { authorization: encodedToken },
    });

    dispatch(deletePost(res.data.posts));
    dispatch(removePostFromUserFeed(userId));
  } catch (e) {
    console.log("error occured: ", e);
  }
};
