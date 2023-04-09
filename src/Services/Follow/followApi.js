import { toast } from "react-toastify";
import { secureAxiosInstance } from "../apiInterceptor";

export const follow = async (_id) => {
  const encodedToken = localStorage.getItem("token");

  try {
    const res = await secureAxiosInstance({
      method: "POST",
      headers: { authorization: encodedToken },
      url: `/users/follow/${_id}`,
    });

    if (res.status === 200) return res.data.user;
  } catch (e) {
    toast.error("Failed to follow User");
    console.log("error occured: ", e);
    return;
  }
};
