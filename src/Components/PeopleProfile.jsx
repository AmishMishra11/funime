import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import {
  loadUserPostCall,
  loadFollowedUserPostsCall,
  removePostFromUserFeed,
} from "../Redux/Features/postSlice";
import {
  followCall,
  loadUserCall,
  unfollowCall,
} from "../Redux/Features/userSlice";
import { Post } from "./Post";

function PeopleProfile() {
  const dispatch = useDispatch();
  const { peopleprofileID } = useParams();

  const { user, currentUserDetails } = useSelector((store) => store.users);

  const { userPosts } = useSelector((store) => store.posts);

  const {
    _id,
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
  } = user;

  useEffect(() => {
    dispatch(loadUserCall(peopleprofileID));
    dispatch(loadUserPostCall(username));
  }, [dispatch, peopleprofileID, user, username]);

  const displayUserPosts = [...userPosts]?.sort(
    (a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)
  );

  return (
    <div className=" w-full md:w-10/12    md:mx-10 md:my-6  xlg:mx-14 xlg:my-10 rounded-lg bg-secondaryDark dark:bg-nightLight   overflow-y-auto h-[calc(100vh-6rem)] md:h-[calc(100vh-8rem)] scrollbar-hide ">
      {user ? (
        <div className="flex flex-col p-4">
          <div className="relative mb-16 ">
            <img
              src={profileBackgroundImg}
              alt="prifileBgImg"
              className=" h-56 md:h-80 w-full rounded-lg "
            />

            <img
              src={profileImg}
              alt="profileImg"
              className=" h-24 w-24  md:h-28 md:w-28 rounded-full  absolute bottom-[-2.5rem] left-4 md:left-10 border-2 border-secondaryLight dark:border-nightInput"
            />

            {currentUserDetails?.following?.find((item) => item._id === _id) ? (
              <button
                className="py-2 w-24 bg-secondaryLight dark:bg-nightDark text-primaryDark  border-2 border-primaryDark rounded-md absolute bottom-[-3rem] right-0 cursor-pointer"
                onClick={() => {
                  dispatch(removePostFromUserFeed(_id));
                  dispatch(unfollowCall(_id));
                }}
              >
                Following
              </button>
            ) : (
              <button
                className="py-2 w-24 rounded-md bg-primaryDark border-2 absolute bottom-[-3rem] right-0 cursor-pointer"
                onClick={() => {
                  dispatch(loadFollowedUserPostsCall(username));
                  dispatch(followCall(_id));
                }}
              >
                Follow
              </button>
            )}
          </div>
          <div className="h-fit w-full py-4 mb-4 bg-secondaryLight dark:bg-nightDark dark:text-secondaryDark rounded-lg flex flex-col gap-2 border-b-2 border-primaryDark">
            <p className="px-2 text-2xl font-semibold">{fullName}</p>
            <p className="px-2 text-lg">@{username}</p>
            <p className="px-2">{email}</p>
            {about && <p className="px-2">{about}</p>}
            <div className=" px-2  md:flex  justify-start items-center">
              {portfolio && (
                <div className="cursor-pointer">
                  <i className="text-blue-400 fa-solid fa-link"></i>
                  <a className="text-blue-400" href={portfolio}>
                    {portfolio}
                  </a>
                </div>
              )}
              <p className="md:px-2 md:pl-4 ">
                <i className="fa-solid fa-calendar-days"></i>
                <span className="px-1">Joined</span>
                {new Date(updatedAt)?.toDateString()}
              </p>
            </div>
            <div className=" px-2  flex justify-start items-center">
              <p className=" pr-2">{following?.length} following</p>
              <p className=" pr-2">{followers?.length} followers</p>
            </div>
          </div>

          {userPosts ? (
            displayUserPosts.map((item) => <Post key={item._id} item={item} />)
          ) : (
            <div>Loading</div>
          )}
        </div>
      ) : (
        <p>loading</p>
      )}
    </div>
  );
}

export { PeopleProfile };
