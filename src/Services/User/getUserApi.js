import axios from "axios";
import { toast } from "react-toastify";

export const getUser = async (id) => {
  try {
    const res = await axios({
      method: "GET",
      url: `/api/users/${id}`,
    });

    console.log(res);
    if (res.status === 200) return res.data.user;
  } catch (e) {
    toast.error("Failed to load user");
    console.log("error occured: ", e);
  }
};
