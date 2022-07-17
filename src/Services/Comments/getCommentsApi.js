import axios from "axios";
import { getCommentCall } from "../../Redux/Features/postSlice";
import { toast } from "react-toastify";

export const getComments = async (id, dispatch) => {
  try {
    const res = await axios({
      method: "GET",
      url: `/api/comments/${id}`,
    });
    if (res.status === 200) dispatch(getCommentCall(res.data.comments));
  } catch (e) {
    dispatch(getCommentCall([]));
    toast.error("Failed to load Comments");
    console.log("error occured: ", e);
  }
};
