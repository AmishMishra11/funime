import { toast } from "react-toastify";
import {
  addCommentCall,
  commentCallHandler,
} from "../../Redux/Features/postSlice";
import { secureAxiosInstance } from "../apiInterceptor";

export const addComments = async (commentData, id, dispatch) => {
  const encodedToken = localStorage.getItem("token");

  try {
    const res = await secureAxiosInstance({
      method: "POST",
      url: `/comments/add/${id}`,
      headers: { authorization: encodedToken },
      data: { commentData: commentData },
    });

    if (res.status === 201) {
      dispatch(commentCallHandler(res.data.comments));
      dispatch(addCommentCall(res.data.comments));
    }
  } catch (e) {
    toast.error(e.response.data.message);
    console.log("error occured: ", e);
  }
};
