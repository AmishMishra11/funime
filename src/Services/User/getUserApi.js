import { toast } from "react-toastify";
import { secureAxiosInstance } from "../apiInterceptor";

export const getUser = async (id) => {
  const encodedToken = localStorage.getItem("token");

  try {
    const res = await secureAxiosInstance({
      method: "GET",
      url: `/users/${id}`,
      headers: { authorization: encodedToken },
    });

    if (res.status === 200) return res.data.user;
  } catch (e) {
    toast.error(e.response.data.message);
    console.log("error occured: ", e);
  }
};
