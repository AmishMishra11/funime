import { editCommentCall } from "../../Redux/Features/postSlice";
import { toast } from "react-toastify";
import { secureAxiosInstance } from "../apiInterceptor";
export const editComments = async (
  commentData,
  PostId,
  commentId,
  dispatch
) => {
  const encodedToken = localStorage.getItem("token");

  try {
    const res = await secureAxiosInstance({
      method: "POST",
      url: `/comments/edit/${PostId}/${commentId}`,
      headers: { authorization: encodedToken },
      data: { commentData: commentData },
    });

    if (res.status === 201) dispatch(editCommentCall(res.data.comments));
  } catch (e) {
    toast.error(e.response.data.message);
    console.log("error occured: ", e);
  }
};
