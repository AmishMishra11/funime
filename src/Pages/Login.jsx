import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";

import { Link, useNavigate } from "react-router-dom";

import wallpaper from "../assets/wallpaper.png";

import { loginUser } from "../Services/Auth/loginApi";

import { toast } from "react-toastify";
import { Loading } from "../Components/Loading";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [tempUserDetail, setTempUserDetail] = useState({
    tempUserName: "",
    tempPassword: "",
  });

  const handleChange = (e) => {
    setTempUserDetail({
      ...tempUserDetail,
      [e.target.name]: e.target.value,
    });
  };

  let temp = localStorage.getItem("key");
  if (temp === "true") {
    localStorage.removeItem("key");
  }

  useEffect(() => {
    if (temp === "true")
      toast.error("Session Expired!", {
        toastId: "id",
      });
  }, [temp]);

  const { tempUserName, tempPassword } = tempUserDetail;

  const [loading, setLoading] = useState(false);

  const correctLogin = () => {
    loginUser(tempUserName, tempPassword, dispatch, navigate, setLoading);
    setLoading(true);
  };

  return (
    <div className="flex lg:justify-between items-center w-screen h-screen bg-secondaryLight dark:bg-nightDark ">
      <img
        className="hidden lg:block h-screen w-2/4 xl:w-7/12"
        src={wallpaper}
        alt="wallpaper"
      />

      <div className="flex justify-center items-center  bg-fixed  w-full h-full  bg-[url('https://res.cloudinary.com/amish11/image/upload/v1654621786/social%20media/mobile-wallpaper_pfk8rt.jpg')] lg:bg-none ">
        <div
          className=" flex-row justify-center content-center w-80 xl:w-96 p-5 m-2  bg-secondaryDark 
        dark:text-secondaryLight dark:bg-nightLight border-2 rounded-lg border-primaryDark shadow-xl"
        >
          <h1 className="text-primaryDark text-3xl  font-semibold text-center mb-10">
            Login
          </h1>

          <div className="flex-row  justify-center items-center w-full p-1">
            <div className="dark:text-secondaryLight">User Name:</div>
            <div>
              <input
                className="border-2 rounded border-primaryDark w-full p-1 dark:bg-nightInput"
                type="text"
                id="email-id"
                placeholder="UserName"
                name="tempUserName"
                value={tempUserName}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="flex-col justify-center items-center w-full  p-1">
            <div className="dark:text-secondaryLight">Password:</div>
            <div>
              <input
                className="border-2 rounded border-primaryDark w-full p-1 dark:bg-nightInput"
                type="password"
                id="password-id"
                placeholder="••••••••"
                name="tempPassword"
                value={tempPassword}
                onChange={handleChange}
              />
            </div>
          </div>

          {loading ? (
            <div className="mx-1 my-2 p-3 text-center bg-primaryDark text-secondaryDark rounded-lg cursor-pointer">
              <Loading />
            </div>
          ) : (
            <div
              className="mx-1 my-2 p-3 text-center bg-primaryDark text-secondaryDark rounded-lg cursor-pointer"
              onClick={() => {
                tempUserName && tempPassword
                  ? correctLogin()
                  : toast.error("Please fill all the fields");
              }}
            >
              Login
            </div>
          )}

          {/* <div
            className="mx-1 my-2 p-3 text-center text-primaryDark bg-secondaryDark dark:text-secondaryLight dark:bg-nightLight border-2 rounded-lg border-primaryDark cursor-pointer"
            onClick={() =>
              setTempUserDetail({
                tempUserName: "GuestU",
                tempPassword: "Guest@123",
              })
            }
          >
            Guest Login
          </div> */}
          <div className="p-1 text-center ">
            <Link
              className="hover:border-b-2 border-primaryDark dark:text-secondaryLight"
              to="/signup"
            >
              Create New Account <i className="fa-solid fa-angle-right"></i>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
