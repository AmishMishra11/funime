import axios from "axios";
import { likeCommentCall } from "../../Redux/Features/postSlice";

export const likeComments = async (postID, id, dispatch) => {
  const encodedToken = localStorage.getItem("token");

  try {
    const res = await axios({
      method: "POST",
      url: `/api/comments/upvote/${postID}/${id}`,
      headers: { authorization: encodedToken },
    });
    dispatch(likeCommentCall(res.data.comments));
  } catch (e) {
    console.log("error occured: ", e);
  }
};
