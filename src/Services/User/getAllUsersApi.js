import axios from "axios";

export const getAllUsers = async () => {
  try {
    const res = await axios({
      method: "GET",
      url: "/api/users",
    });

    return res.data.users;
  } catch (e) {
    console.log("error occured: ", e);
  }
};
