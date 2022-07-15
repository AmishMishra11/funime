import axios from "axios";
import {
  commentCallHandler,
  removeCommentCall,
} from "../../Redux/Features/postSlice";

export const removeComments = async (PostId, commentId, dispatch) => {
  const encodedToken = localStorage.getItem("token");

  try {
    const res = await axios({
      method: "POST",
      url: `/api/comments/delete/${PostId}/${commentId}`,
      headers: { authorization: encodedToken },
    });

    dispatch(commentCallHandler(res.data.comments));
    dispatch(removeCommentCall(res.data.comments));
  } catch (e) {
    console.log("error occured: ", e);
  }
};
