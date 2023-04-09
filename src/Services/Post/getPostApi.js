import { toast } from "react-toastify";
import { secureAxiosInstance } from "../apiInterceptor";

export const getPosts = async (id) => {
  const encodedToken = localStorage.getItem("token");

  try {
    const res = await secureAxiosInstance({
      method: "GET",
      url: `/posts/${id}`,
      headers: { authorization: encodedToken },
    });

    if (res.status === 200) return res.data.post;
  } catch (e) {
    toast.error("Failed to load post");
    console.log("error occured:", e);
  }
};
