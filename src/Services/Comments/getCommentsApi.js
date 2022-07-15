import axios from "axios";
import { getCommentCall } from "../../Redux/Features/postSlice";

export const getComments = async (id, dispatch) => {
  try {
    const res = await axios({
      method: "GET",
      url: `/api/comments/${id}`,
    });

    dispatch(getCommentCall(res.data.comments));
  } catch (e) {
    console.log("error occured: ", e);
  }
};
