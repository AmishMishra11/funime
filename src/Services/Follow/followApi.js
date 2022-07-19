import axios from "axios";
import { toast } from "react-toastify";

export const follow = async (_id) => {
  const encodedToken = localStorage.getItem("token");

  try {
    const res = await axios({
      method: "POST",
      headers: { authorization: encodedToken },
      url: `/api/users/follow/${_id}`,
    });

    if (res.status === 200) return res.data.user;
  } catch (e) {
    toast.error("Failed to follow User");
    console.log("error occured: ", e);
    return;
  }
};
