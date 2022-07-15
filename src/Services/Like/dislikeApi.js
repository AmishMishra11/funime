import axios from "axios";
import { likeHandler, dislikePost } from "../../Redux/Features/postSlice";

export const dislike = async (id, dispatch) => {
  const encodedToken = localStorage.getItem("token");
  try {
    const res = await axios({
      method: "POST",
      headers: { authorization: encodedToken },
      url: `/api/posts/dislike/${id}`,
    });
    const myPost = res.data.posts.find((item) => item._id === id);

    dispatch(likeHandler(myPost));

    dispatch(dislikePost(res.data.posts));
  } catch (e) {
    console.log("error occured: ", e);
  }
};
