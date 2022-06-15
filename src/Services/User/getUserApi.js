import axios from "axios";

export const getUser = async (id) => {
  try {
    const res = await axios({
      method: "GET",
      url: `/api/users/${id}`,
    });

    return res.data.user;
  } catch (e) {
    console.log("error occured: ", e);
  }
};
