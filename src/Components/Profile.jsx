import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadUserPostCall } from "../Redux/Features/postSlice";
import { AddPost } from "./AddPost";
import { Modal } from "./Modal";
import { Post } from "./Post";
import { Loading } from "./Loading";

function Profile() {
  const dispatch = useDispatch();

  const { userPosts, allPosts } = useSelector((store) => store.posts);

  const { allUserStatus, currentUserDetails } = useSelector(
    (store) => store.users
  );

  const [isModal, setIsModal] = useState(false);

  const {
    profileBackgroundImg,
    profileImg,
    fullName,
    username,
    email,
    about,
    portfolio,
    updatedAt,
    followers,
    following,
  } = currentUserDetails;

  useEffect(() => {
    dispatch(loadUserPostCall(currentUserDetails?.username));
  }, [dispatch, currentUserDetails, allPosts]);

  const displayUserPosts =
    userPosts?.length &&
    [...userPosts]?.sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );

  return (
    <div className=" w-full md:w-10/12    md:mx-10 md:my-6  xlg:mx-14 xlg:my-10 rounded-lg bg-secondaryDark  dark:bg-nightLight overflow-y-auto h-[calc(100vh-6rem)] md:h-[calc(100vh-8rem)] scrollbar-hide ">
      <div className="flex flex-col p-4">
        <div className="relative mb-16 ">
          <img
            src={profileBackgroundImg.url}
            alt="prifileBgImg"
            className=" h-56 md:h-80 w-full rounded-lg "
          />

          <img
            src={profileImg.url}
            alt="profileImg"
            className=" h-24 w-24  md:h-28 md:w-28 rounded-full  absolute bottom-[-2.5rem] left-4 md:left-10 border-2 dark:border-nightInput border-secondaryLight"
          />

          {allUserStatus === "loading" ? (
            <div className="p-2 rounded-md w-[92.23px] h-10 flex items-center  bg-primaryLight dark:text-secondaryDark absolute bottom-[-3rem] right-0 cursor-pointer">
              <Loading />
            </div>
          ) : (
            <div
              className="p-2 rounded-md bg-primaryLight dark:text-secondaryDark absolute bottom-[-3rem] right-0 cursor-pointer"
              onClick={() => setIsModal((preVal) => !preVal)}
            >
              Edit Profile
            </div>
          )}
        </div>
        <div className="h-fit w-full py-4 mb-4 bg-secondaryLight dark:bg-nightDark dark:text-secondaryDark rounded-lg flex flex-col gap-2 border-b-2 border-primaryDark">
          <p className="px-2 text-2xl font-semibold">{fullName}</p>
          <p className="px-2 text-lg">@{username}</p>
          <p className="px-2">{email}</p>
          {about && <p className="px-2">{about}</p>}
          <div className=" px-2  md:flex  justify-start items-center">
            {portfolio && (
              <div className="cursor-pointer pr-2">
                <i className="text-blue-400 fa-solid fa-link"></i>
                <a className="text-blue-400" href={portfolio}>
                  My Website
                </a>
              </div>
            )}
            <p className="">
              <i className="fa-solid fa-calendar-days"></i>{" "}
              <span className="px-1">Joined</span>
              {new Date(updatedAt)?.toDateString()}
            </p>
          </div>
          <div className=" px-2  flex justify-start items-center">
            <p className=" pr-2">{following.length} following</p>
            <p className=" pr-2">{followers.length} followers</p>
          </div>
        </div>

        <div className="mb-4">
          <AddPost />
        </div>

        {userPosts?.length ? (
          displayUserPosts.map((item) => <Post key={item._id} item={item} />)
        ) : (
          <></>
        )}
      </div>

      {isModal && (
        <Modal
          setIsModal={setIsModal}
          isModal={isModal}
          user={currentUserDetails}
        />
      )}
    </div>
  );
}

export { Profile };
