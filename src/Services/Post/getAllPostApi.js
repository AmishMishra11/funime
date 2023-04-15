import { toast } from "react-toastify";
import { secureAxiosInstance } from "../apiInterceptor";

export const getAllPosts = async () => {
  const encodedToken = localStorage.getItem("token");
  try {
    const res = await secureAxiosInstance({
      method: "GET",
      headers: { authorization: encodedToken },
      url: "/posts",
    });

    if (res.status === 200) return res.data.posts;
  } catch (e) {
    toast.error(e.response.data.message);
    console.log("error occured: ", e);
  }
};
