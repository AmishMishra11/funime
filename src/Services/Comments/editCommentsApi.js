import axios from "axios";
import { editCommentCall } from "../../Redux/Features/postSlice";

export const editComments = async (
  commentData,
  PostId,
  commentId,
  dispatch
) => {
  const encodedToken = localStorage.getItem("token");

  try {
    const res = await axios({
      method: "POST",
      url: `/api/comments/edit/${PostId}/${commentId}`,
      headers: { authorization: encodedToken },
      data: { commentData: commentData },
    });

    dispatch(editCommentCall(res.data.comments));
  } catch (e) {
    console.log("error occured: ", e);
  }
};
