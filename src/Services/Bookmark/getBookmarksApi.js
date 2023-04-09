import { toast } from "react-toastify";
import { secureAxiosInstance } from "../apiInterceptor";

export const getBookmarks = async (id) => {
  const encodedToken = localStorage.getItem("token");
  try {
    const res = await secureAxiosInstance({
      method: "GET",
      url: `/users/bookmark/${id}`,
      headers: { authorization: encodedToken },
    });

    if (res.status === 200) return res.data.bookmarks;
  } catch (e) {
    toast.error("Failed to load Bookmarks");
    console.log("error occured: ", e);
  }
};
