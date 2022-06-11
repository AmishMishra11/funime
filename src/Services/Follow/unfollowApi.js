import axios from "axios";

export const unfollow = async (id) => {
  const encodedToken = localStorage.getItem("token");
  try {
    const res = await axios({
      method: "POST",
      headers: { authorization: encodedToken },
      url: `/api/users/unfollow/${id}`,
    });

    return res.data.user;
  } catch (e) {
    console.log("error occured: ", e);
  }
};
