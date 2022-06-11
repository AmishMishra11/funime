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

    localStorage.setItem("userDetails", JSON.stringify(res.data.foundUser));

    dispathcAuth(userLogin(res.data));
    navigate("/home");
  } catch (e) {
    console.log("error occured: ", e);
  }
};
