import axios from "axios";
import { dislikePost } from "../../Redux/Features/postSlice";

export const dislike = async (id, dispatch) => {
  const encodedToken = localStorage.getItem("token");
  try {
    const res = await axios({
      method: "POST",
      headers: { authorization: encodedToken },
      url: `/api/posts/dislike/${id}`,
    });

    dispatch(dislikePost(res.data.posts));
  } catch (e) {
    console.log("error occured: ", e);
  }
};
