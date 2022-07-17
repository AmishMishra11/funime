import axios from "axios";
import { toast } from "react-toastify";
import {
  addCommentCall,
  commentCallHandler,
} from "../../Redux/Features/postSlice";

export const addComments = async (commentData, id, dispatch) => {
  const encodedToken = localStorage.getItem("token");

  try {
    const res = await axios({
      method: "POST",
      url: `/api/comments/add/${id}`,
      headers: { authorization: encodedToken },
      data: { commentData: commentData },
    });

    if (res.status === 201) {
      dispatch(commentCallHandler(res.data.comments));
      dispatch(addCommentCall(res.data.comments));
    }
  } catch (e) {
    toast.error("Failed to add comments");
    console.log("error occured: ", e);
  }
};
