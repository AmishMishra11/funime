import axios from "axios";

import { userLogin } from "../../Redux/Features/authSlice";

export const loginUser = async (
  tempUesrName,
  tempPassword,
  dispathcAuth,
  navigate
) => {
  try {
    const res = await axios({
      method: "POST",
      url: "/api/auth/login",
      data: { username: tempUesrName, password: tempPassword },
    });

    localStorage.setItem("token", res.data.encodedToken);
    dispathcAuth(userLogin(res.data));
    navigate("/home/feed");
  } catch (e) {
    console.log("error occured: ", e);
  }
};
