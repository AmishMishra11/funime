import axios from "axios";
import { dislikeCommentCall } from "../../Redux/Features/postSlice";

export const dislikeComments = async (postID, id, dispatch) => {
  const encodedToken = localStorage.getItem("token");

  try {
    const res = await axios({
      method: "POST",
      url: `/api/comments/downvote/${postID}/${id}`,
      headers: { authorization: encodedToken },
    });
    dispatch(dislikeCommentCall(res.data.comments));
  } catch (e) {
    console.log("error occured: ", e);
  }
};
