import axios from "axios";
import { toast } from "react-toastify";
export const dislike = async (id) => {
  const encodedToken = localStorage.getItem("token");
  try {
    const res = await axios({
      method: "POST",
      headers: { authorization: encodedToken },
      url: `/api/posts/dislike/${id}`,
    });

    if (res.status === 201) {
      const allPosts = res.data.posts;
      const myPost = res.data.posts.find((item) => item._id === id);
      return { allPosts: allPosts, myPost: myPost };
    }
  } catch (e) {
    toast.error("Failed to dislike Post");
    console.log("error occured: ", e);
  }
};
