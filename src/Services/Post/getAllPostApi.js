import axios from "axios";
import { toast } from "react-toastify";

export const getAllPosts = async () => {
  try {
    const res = await axios({
      method: "GET",
      url: "/api/posts",
    });

    if (res.status === 200) return res.data.posts;
  } catch (e) {
    toast.error("Failed to load Posts");
    console.log("error occured: ", e);
  }
};
