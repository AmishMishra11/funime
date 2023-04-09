import { toast } from "react-toastify";
import { secureAxiosInstance } from "../apiInterceptor";

export const removeBookmarks = async (id) => {
  const encodedToken = localStorage.getItem("token");
  const userDetailsString = localStorage.getItem("userDetails");
  const userDetails = JSON.parse(userDetailsString);
  try {
    const res = await secureAxiosInstance({
      method: "POST",
      url: `/users/remove-bookmark/${id}`,
      headers: { authorization: encodedToken },
      data: {
        userId: userDetails._id,
      },
    });

    if (res.status === 201) return res.data.bookmarks;
  } catch (e) {
    toast.error("Failed to remove Bookmars");
    console.log("error occured: ", e);
  }
};
