import { likeCommentCall } from "../../Redux/Features/postSlice";

import { toast } from "react-toastify";
import { secureAxiosInstance } from "../apiInterceptor";

export const likeComments = async (postID, id, dispatch) => {
  const encodedToken = localStorage.getItem("token");
  const userDetailsString = localStorage.getItem("userDetails");
  const userDetails = JSON.parse(userDetailsString);

  try {
    const res = await secureAxiosInstance({
      method: "POST",
      url: `/comments/upvote/${postID}/${id}`,
      headers: { authorization: encodedToken },
      data: {
        userId: userDetails._id,
      },
    });

    if (res.status === 201) dispatch(likeCommentCall(res.data.comments));
  } catch (e) {
    toast.error(e.response.data.message);
    console.log("error occured: ", e);
  }
};
