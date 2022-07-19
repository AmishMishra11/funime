import axios from "axios";
import { toast } from "react-toastify";

export const getPosts = async (id) => {
  try {
    const res = await axios({
      method: "GET",
      url: `/api/posts/${id}`,
    });

    if (res.status === 200) return res.data.post;
  } catch (e) {
    toast.error("Failed to load post");
    console.log("error occured:", e);
  }
};
