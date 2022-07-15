import React, { useState, useRef, useEffect } from "react";
import { useDispatch } from "react-redux";
import { editUserCall } from "../Redux/Features/userSlice";

import { toast } from "react-toastify";

function Modal({ setIsModal, isModal, user }) {
  const ref = useRef();

  const { profileBackgroundImg, profileImg, fullName, portfolio, about } = user;

  const dispatch = useDispatch();

  const bgInput = useRef();
  const pfpInput = useRef();

  const [editBackground, setEditBackground] = useState("");
  const [editImg, setEditImg] = useState("");
  const [editFullName, setEditFullName] = useState(fullName);

  const [editPortfolio, setEditPortfolio] = useState(portfolio);
  const [editBio, setEditBio] = useState(about);

  const handleEditProfile = () => {
    setIsModal(false);
    dispatch(
      editUserCall({
        fullName: editFullName,
        profileImg: editImg ? URL.createObjectURL(editImg) : profileImg,
        profileBackgroundImg: editBackground
          ? URL.createObjectURL(editBackground)
          : profileBackgroundImg,
        about: editBio,
        portfolio: editPortfolio,
      })
    );
  };

  useEffect(() => {
    const checkIfClickedOutside = (e) => {
      if (isModal && ref.current && !ref.current.contains(e.target)) {
        setIsModal(false);
      }
    };
    document.addEventListener("mousedown", checkIfClickedOutside);
    return () => {
      document.removeEventListener("mousedown", checkIfClickedOutside);
    };
  }, [isModal, setIsModal]);

  return (
    <div
      className="flex flex-col justify-between items-center w-[20rem] sm:w-[25rem]  md:w-[30rem] bg-secondaryLight dark:bg-nightDark dark:text-secondaryDark overflow-hidden border-2 border-primaryDark rounded-lg  fixed top-1/2 left-1/2 translate-x-[-50%] translate-y-[-55%] md:translate-y-[-45%] p-2  z-30"
      ref={ref}
    >
      <div className="flex justify-end items-end p-4 w-full">
        <i
          className="fa-solid fa-xl fa-xmark cursor-pointer"
          onClick={() => setIsModal(false)}
        ></i>
      </div>
      <div className=" relative mb-10 w-full p-2">
        <img
          src={
            editBackground
              ? URL.createObjectURL(editBackground)
              : profileBackgroundImg
          }
          alt="BgImg"
          className="h-36  sm:h-40 md:h-48 w-full  rounded-lg"
        />
        <input
          className="hidden "
          type="file"
          onChange={(e) => setEditBackground(e.target.files[0])}
          accept="image/*"
          ref={bgInput}
        />

        <div
          className="p-1 rounded-md bg-primaryLight absolute top-[.5rem] right-2 cursor-pointer"
          onClick={() => bgInput.current.click()}
        >
          <i className="fa-solid fa-image"></i> Banner
        </div>
        <img
          src={editImg ? URL.createObjectURL(editImg) : profileImg}
          alt="Pfp"
          className="h-16 w-16 absolute bottom-[-1rem] left-6 border-2 rounded-full border-secondaryLight dark:border-nightInput"
        />

        <input
          className="hidden "
          type="file"
          onChange={(e) => setEditImg(e.target.files[0])}
          accept="image/*"
          ref={pfpInput}
        />
        <div
          className="p-1 rounded-md bg-primaryLight absolute bottom-[-.5rem] left-24 cursor-pointer"
          onClick={() => pfpInput.current.click()}
        >
          <i className="fa-solid fa-camera"></i> Profile
        </div>
      </div>

      <div className="flex flex-row  justify-between items-center w-full p-1 gap-4">
        <div className="flex-col justify-start items-center w-full ">
          <div className="">Full Name:</div>
          <div>
            <input
              className="border-2 rounded border-primaryLight  w-full p-1 dark:bg-nightInput"
              type="text"
              placeholder={editFullName}
              value={editFullName}
              onChange={(e) => setEditFullName(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="flex-row  justify-center items-center w-full p-1">
        <div className="">WebSite:</div>
        <div>
          <input
            className="border-2 rounded border-primaryLight  w-full p-1 dark:bg-nightInput"
            type="text"
            placeholder={editPortfolio}
            value={editPortfolio}
            onChange={(e) => setEditPortfolio(e.target.value)}
          />
        </div>
      </div>

      <div className="flex-row  justify-center items-center w-full p-1">
        <div>Bio</div>

        <textarea
          className="border-2 rounded border-primaryLight  w-full p-1 dark:bg-nightInput  h-20"
          placeholder={editBio}
          value={editBio}
          onChange={(e) => setEditBio(e.target.value)}
        ></textarea>
      </div>

      <button
        className="bg-primaryDark p-2 w-full rounded-lg text-secondaryDark"
        onClick={() => {
          editFullName
            ? handleEditProfile()
            : toast.error("Full Name cannot be empty");
        }}
      >
        Update Profile
      </button>
    </div>
  );
}

export { Modal };
