import axios from "axios";
import { editCommentCall } from "../../Redux/Features/postSlice";
import { toast } from "react-toastify";
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

    if (res.status === 201) dispatch(editCommentCall(res.data.comments));
  } catch (e) {
    toast.error("Failed to edti comment");
    console.log("error occured: ", e);
  }
};
