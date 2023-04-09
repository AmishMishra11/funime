import { toast } from "react-toastify";

import { userLogin } from "../../Redux/Features/authSlice";
import { setCurrentUserDetails } from "../../Redux/Features/userSlice";
import { secureAxiosInstance } from "../apiInterceptor";

export const loginUser = async (
  tempUesrName,
  tempPassword,
  dispatch,
  navigate
) => {
  try {
    const res = await secureAxiosInstance({
      method: "POST",
      url: "/auth/login",
      data: { username: tempUesrName, password: tempPassword },
    });

    if (res.status === 200) {
      localStorage.setItem("token", res.data.encodedToken);
      localStorage.setItem("userDetails", JSON.stringify(res.data.foundUser));
      dispatch(userLogin());
      dispatch(setCurrentUserDetails(res.data.foundUser));
      navigate("/home");
    }
  } catch (e) {
    console.log("error occured: ", e);
    toast.error("Login Failed");
  }
};
