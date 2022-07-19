import axios from "axios";
import { toast } from "react-toastify";
export const unfollow = async (id) => {
  const encodedToken = localStorage.getItem("token");
  try {
    const res = await axios({
      method: "POST",
      headers: { authorization: encodedToken },
      url: `/api/users/unfollow/${id}`,
    });

    if (res.status === 200) return res.data.user;
  } catch (e) {
    toast.error("Failed to unfillow user");
    console.log("error occured: ", e);
  }
};
