import axios from "axios";
import { likePost } from "../../Redux/Features/postSlice";

export const like = async (id, dispatch) => {
  const encodedToken = localStorage.getItem("token");
  try {
    const res = await axios({
      method: "POST",
      headers: { authorization: encodedToken },
      url: `/api/posts/like/${id}`,
    });

    dispatch(likePost(res.data.posts));
  } catch (e) {
    console.log("error occured: ", e);
  }
};
