import axios from "axios";

export const follow = async (id) => {
  const encodedToken = localStorage.getItem("token");
  try {
    const res = await axios({
      method: "POST",
      headers: { authorization: encodedToken },
      url: `/api/users/follow/${id}`,
    });

    return res.data.user;
  } catch (e) {
    console.log("error occured: ", e);
  }
};
