import { toast } from "react-toastify";
import { secureAxiosInstance } from "../apiInterceptor";

export const getUserPosts = async (userName) => {
  const encodedToken = localStorage.getItem("token");

  try {
    const res = await secureAxiosInstance({
      method: "GET",
      url: `/posts/user/${userName}`,
      headers: { authorization: encodedToken },
    });

    if (res.status === 200) return res.data.posts;
  } catch (e) {
    toast.error(e.response.data.message);
    console.log("Error Occured", e);
  }
};
