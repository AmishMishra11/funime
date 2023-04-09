import { getCommentCall } from "../../Redux/Features/postSlice";
import { toast } from "react-toastify";
import { secureAxiosInstance } from "../apiInterceptor";

export const getComments = async (id, dispatch) => {
  const encodedToken = localStorage.getItem("token");
  try {
    const res = await secureAxiosInstance({
      method: "GET",
      url: `/comments/${id}`,
      headers: { authorization: encodedToken },
    });
    if (res.status === 200) dispatch(getCommentCall(res.data.comments));
  } catch (e) {
    dispatch(getCommentCall([]));
    toast.error("Failed to load Comments");
    console.log("error occured: ", e);
  }
};
