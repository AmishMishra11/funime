import { toast } from "react-toastify";
import { secureAxiosInstance } from "../apiInterceptor";

export const editUser = async (id, editUserdata) => {
  const encodedToken = localStorage.getItem("token");
  try {
    const res = await secureAxiosInstance({
      method: "POST",
      url: `/users/edit/${id}`,
      headers: { authorization: encodedToken },
      data: { userData: editUserdata },
    });

    if (res.status === 201) {
      localStorage.setItem("userDetails", JSON.stringify(res.data.user));
      return res.data.user;
    }
  } catch (e) {
    toast.error("Failed to update Profile");
    console.log("error occured: ", e);
  }
};
