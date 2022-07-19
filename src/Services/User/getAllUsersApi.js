import axios from "axios";
import { toast } from "react-toastify";

export const getAllUsers = async () => {
  try {
    const res = await axios({
      method: "GET",
      url: "/api/users",
    });

    if (res.status === 200) return res.data.users;
  } catch (e) {
    toast.error("Failed to get Users");
    console.log("error occured: ", e);
  }
};
