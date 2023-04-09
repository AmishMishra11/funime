import { toast } from "react-toastify";
import { secureAxiosInstance } from "../apiInterceptor";
export const addBookmarks = async (id) => {
  const encodedToken = localStorage.getItem("token");
  const userDetailsString = localStorage.getItem("userDetails");
  const userDetails = JSON.parse(userDetailsString);
  try {
    const res = await secureAxiosInstance({
      method: "POST",
      url: `/users/add-bookmark/${id}`,
      headers: { authorization: encodedToken },
      data: {
        userId: userDetails._id,
      },
    });

    if (res.status === 201) return res.data.bookmarks;
  } catch (e) {
    toast.error("Failed to add Bookmark");
    console.log("error occured: ", e);
  }
};
