import axios from "axios";

import { userLogin } from "../../Redux/Features/authSlice";
import { setCurrentUserDetails } from "../../Redux/Features/userSlice";

export const loginUser = async (
  tempUesrName,
  tempPassword,
  dispatch,
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

    dispatch(userLogin());
    dispatch(setCurrentUserDetails(res.data.foundUser));
    navigate("/home");
  } catch (e) {
    console.log("error occured: ", e);
  }
};
