import axios from "axios";

import { userLogin } from "../../Redux/Features/authSlice";

export const signinUser = async (
  tempFullName,
  tempUserName,
  tempEmail,
  tempPassword,
  dispathcAuth,
  navigate
) => {
  try {
    const res = await axios({
      method: "POST",
      url: "/api/auth/signup",
      data: {
        username: tempUserName,
        password: tempPassword,
        fullName: tempFullName,
        email: tempEmail,
      },
    });

    localStorage.setItem("token", res.data.encodedToken);
    dispathcAuth(userLogin(res.data));
    navigate("/home/feed");
  } catch (e) {
    console.log("error occured: ", e);
  }
};
