import React, { useState } from "react";
import { useDispatch } from "react-redux";

import { Link, useNavigate } from "react-router-dom";

import wallpaper from "../assets/wallpaper.png";

import { loginUser } from "../Services/Auth/loginApi";

function Login() {
  const dispathcAuth = useDispatch();
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

  const { tempUserName, tempPassword } = tempUserDetail;

  return (
    <div className="flex lg:justify-between items-center w-screen h-screen ">
      <img
        className="hidden lg:block h-screen w-2/4 xl:w-7/12"
        src={wallpaper}
        alt="wallpaper"
      />

      <div className="flex justify-center items-center  bg-fixed  w-full h-full  bg-[url('https://res.cloudinary.com/amish11/image/upload/v1654621786/social%20media/mobile-wallpaper_pfk8rt.jpg')] lg:bg-none ">
        <div className=" flex-row justify-center content-center w-80 xl:w-96 p-5 m-2  bg-secondaryDark border-2 rounded-lg border-primaryDark shadow-xl">
          <h1 className="text-primaryDark text-3xl font-semibold text-center mb-10">
            Login
          </h1>

          <div className="flex-row  justify-center items-center w-full p-1">
            <div className="">User Name:</div>
            <div>
              <input
                className="border-2 rounded border-primaryDark w-full p-1"
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
            <div>Password:</div>
            <div>
              <input
                className="border-2 rounded border-primaryDark w-full p-1"
                type="password"
                id="password-id"
                placeholder="••••••••"
                name="tempPassword"
                value={tempPassword}
                onChange={handleChange}
              />
            </div>
          </div>
          <div
            className="mx-1 my-2 p-3 text-center bg-primaryDark text-secondaryDark rounded-lg cursor-pointer"
            onClick={() =>
              tempUserName && tempPassword
                ? loginUser(tempUserName, tempPassword, dispathcAuth, navigate)
                : alert("Please fill all the fields")
            }
          >
            Login
          </div>

          <div
            className="mx-1 my-2 p-3 text-center text-primaryDark bg-secondaryDark border-2 rounded-lg border-primaryDark cursor-pointer"
            onClick={() =>
              setTempUserDetail({
                tempUserName: "GuestU",
                tempPassword: "Guest@123",
              })
            }
          >
            Guest Login
          </div>
          <div className="p-1 text-center ">
            <Link className="hover:border-b-2 border-primaryDark" to="/signup">
              Create New Account <i className="fa-solid fa-angle-right"></i>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
