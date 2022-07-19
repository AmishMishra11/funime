import axios from "axios";
import { toast } from "react-toastify";

export const getUserPosts = async (userName) => {
  try {
    const res = await axios({
      method: "GET",
      url: `/api/posts/user/${userName}`,
    });

    if (res.status === 200) return res.data.posts;
  } catch (e) {
    toast.error("Failed to load post");
    console.log("Error Occured", e);
  }
};
