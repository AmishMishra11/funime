import axios from "axios";
import {
  commentCallHandler,
  removeCommentCall,
} from "../../Redux/Features/postSlice";
import { toast } from "react-toastify";

export const removeComments = async (PostId, commentId, dispatch) => {
  const encodedToken = localStorage.getItem("token");

  try {
    const res = await axios({
      method: "POST",
      url: `/api/comments/delete/${PostId}/${commentId}`,
      headers: { authorization: encodedToken },
    });

    if (res.status === 201) {
      dispatch(commentCallHandler(res.data.comments));
      dispatch(removeCommentCall(res.data.comments));
    }
  } catch (e) {
    toast.error("Failed to delete Comment");
    console.log("error occured: ", e);
  }
};
