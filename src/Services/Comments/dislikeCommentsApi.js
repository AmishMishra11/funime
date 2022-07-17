import axios from "axios";
import { dislikeCommentCall } from "../../Redux/Features/postSlice";
import { toast } from "react-toastify";

export const dislikeComments = async (postID, id, dispatch) => {
  const encodedToken = localStorage.getItem("token");

  try {
    const res = await axios({
      method: "POST",
      url: `/api/comments/downvote/${postID}/${id}`,
      headers: { authorization: encodedToken },
    });

    if (res.status === 201) dispatch(dislikeCommentCall(res.data.comments));
  } catch (e) {
    toast.error("Try Again Later");
    console.log("error occured: ", e);
  }
};
