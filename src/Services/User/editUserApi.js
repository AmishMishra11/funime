import axios from "axios";

export const editUser = async (editUserdata) => {
  const encodedToken = localStorage.getItem("token");
  try {
    const res = await axios({
      method: "POST",
      url: "/api/users/edit",
      headers: { authorization: encodedToken },
      data: { userData: editUserdata },
    });
    localStorage.setItem("userDetails", JSON.stringify(res.data.user));

    return res.data.user;
  } catch (e) {
    console.log("error occured: ", e);
  }
};
