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

    localStorage.setItem("userDetails", JSON.stringify(res.data.createdUser));

    dispathcAuth(userLogin(res.data));
    navigate("/home");
  } catch (e) {
    console.log("error occured: ", e);
  }
};
