import axios from "axios";
import { toast } from "react-toastify";

export const addBookmarks = async (id) => {
  const encodedToken = localStorage.getItem("token");
  try {
    const res = await axios({
      method: "POST",
      url: `/api/users/bookmark/${id}`,
      headers: { authorization: encodedToken },
    });

    if (res.status === 200) return res.data.bookmarks;
  } catch (e) {
    toast.error("Failed to add Bookmark");
    console.log("error occured: ", e);
  }
};
