import axios from "axios";
import { toast } from "react-toastify";

export const editUser = async (editUserdata) => {
  const encodedToken = localStorage.getItem("token");
  try {
    const res = await axios({
      method: "POST",
      url: "/api/users/edit",
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
