import axios from "axios";
import { toast } from "react-toastify";

export const getBookmarks = async () => {
  const encodedToken = localStorage.getItem("token");
  try {
    const res = await axios({
      method: "GET",
      url: "/api/users/bookmark",
      headers: { authorization: encodedToken },
    });

    if (res.status === 200) return res.data.bookmarks;
  } catch (e) {
    toast.error("Failed to load Bookmarks");
    console.log("error occured: ", e);
  }
};
