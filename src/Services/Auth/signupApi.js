import { toast } from "react-toastify";

import { userLogin } from "../../Redux/Features/authSlice";
import { setCurrentUserDetails } from "../../Redux/Features/userSlice";
import { secureAxiosInstance } from "../apiInterceptor";

export const signinUser = async (
  tempFullName,
  tempUserName,
  tempEmail,
  tempPassword,
  dispatch,
  navigate,
  setLoading
) => {
  try {
    const res = await secureAxiosInstance({
      method: "POST",
      url: "/auth/signup",
      data: {
        username: tempUserName,
        password: tempPassword,
        fullName: tempFullName,
        email: tempEmail,
      },
    });

    if (res.status === 201) {
      localStorage.setItem("token", res.data.encodedToken);
      localStorage.setItem("userDetails", JSON.stringify(res.data.createdUser));
      dispatch(userLogin());
      dispatch(setCurrentUserDetails(res.data.createdUser));
      navigate("/home");
    }
  } catch (e) {
    setLoading(false);
    console.log("error occured: ", e);
    toast.error(e.response.data.message);
  }
};
