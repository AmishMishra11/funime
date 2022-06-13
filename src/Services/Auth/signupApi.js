import axios from "axios";

import { userLogin } from "../../Redux/Features/authSlice";
import { setCurrentUserDetails } from "../../Redux/Features/userSlice";

export const signinUser = async (
  tempFullName,
  tempUserName,
  tempEmail,
  tempPassword,
  dispatch,
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

    dispatch(userLogin());
    dispatch(setCurrentUserDetails(res.data.createdUser));
    navigate("/home");
  } catch (e) {
    console.log("error occured: ", e);
  }
};
