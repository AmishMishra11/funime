import React, { useState } from "react";
import { useDispatch } from "react-redux";

import { Link, useNavigate } from "react-router-dom";

import wallpaper from "../assets/wallpaper.png";

import { signinUser } from "../Services/Auth/signupApi";

import { toast } from "react-toastify";

function Singup() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const EMAIL_REGEX = new RegExp(
    // eslint-disable-next-line
    "^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|\"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*\")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\\])$"
  );

  const [tempUserDetail, setTempUserDetail] = useState({
    tempFullName: "",
    tempUserName: "",
    tempEmail: "",
    tempPassword: "",
  });

  const handleChange = (e) => {
    setTempUserDetail({
      ...tempUserDetail,
      [e.target.name]: e.target.value,
    });
  };

  const { tempFullName, tempUserName, tempEmail, tempPassword } =
    tempUserDetail;

  return (
    <div className="flex lg:justify-between items-center w-screen h-screen  bg-secondaryLight dark:bg-nightDark ">
      <img
        className="hidden lg:block h-screen w-2/4 xl:w-7/12"
        src={wallpaper}
        alt="wallpaper"
      />

      <div className="flex justify-center items-center  bg-fixed  w-full h-full  bg-[url('https://res.cloudinary.com/amish11/image/upload/v1654621786/social%20media/mobile-wallpaper_pfk8rt.jpg')] lg:bg-none ">
        <div
          className=" flex-row justify-center content-center w-80 xl:w-96 p-5 m-2  border-2 rounded-lg border-primaryDark shadow-xl bg-secondaryDark 
        dark:bg-nightLight"
        >
          <h1 className="text-primaryDark text-3xl font-semibold text-center mb-10">
            Sign Up
          </h1>

          <div className="flex-row  justify-center items-center w-full p-1">
            <div className="dark:text-secondaryLight">Full Name:</div>
            <div>
              <input
                className="border-2 rounded border-primaryDark w-full p-1  dark:text-secondaryLight   dark:bg-nightInput"
                type="text"
                placeholder="Full Name"
                id="full-name-id"
                name="tempFullName"
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="flex-row  justify-center items-center w-full p-1">
            <div className="dark:text-secondaryLight">User Name:</div>
            <div>
              <input
                className="border-2 rounded border-primaryDark w-full p-1 dark:text-secondaryLight   dark:bg-nightInput"
                type="text"
                placeholder="UserName"
                id="user-name-id"
                name="tempUserName"
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="flex-row  justify-center items-center w-full p-1">
            <div className="dark:text-secondaryLight">Email:</div>
            <div>
              <input
                className="border-2 rounded border-primaryDark w-full p-1 dark:text-secondaryLight   dark:bg-nightInput"
                type="test"
                placeholder="name@company.com"
                id="email-id"
                name="tempEmail"
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="flex-col justify-center items-center w-full  p-1">
            <div className="dark:text-secondaryLight">Password:</div>
            <div>
              <input
                className="border-2 rounded border-primaryDark w-full p-1 dark:text-secondaryLight dark:bg-nightInput"
                type="password"
                placeholder="••••••••"
                id="password-id"
                name="tempPassword"
                onChange={handleChange}
              />
            </div>
          </div>
          <div
            className="mx-1 my-2 p-3 text-center bg-primaryDark text-secondaryDark rounded-lg cursor-pointer"
            onClick={() =>
              tempFullName && tempUserName && tempEmail && tempPassword
                ? !EMAIL_REGEX.test(tempEmail)
                  ? toast.error("Please enter valid Email")
                  : tempPassword.length < 6
                  ? toast.error("Please choose a strong Passwrod")
                  : signinUser(
                      tempFullName,
                      tempUserName,
                      tempEmail,
                      tempPassword,
                      dispatch,
                      navigate
                    )
                : toast.error("Please fill all the fields")
            }
          >
            Sign Up
          </div>

          <div className="p-1 text-center ">
            <Link
              className="hover:border-b-2 border-primaryDark dark:text-secondaryLight"
              to="/"
            >
              Already have an Account
              <i className="fa-solid fa-angle-right"></i>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Singup;
