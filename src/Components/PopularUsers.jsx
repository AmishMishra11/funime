import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import {
  loadAllUsersCall,
  followCall,
  unfollowCall,
} from "../Redux/Features/userSlice";
import { removePostFromUserFeed } from "../Redux/Features/postSlice";
import { Loading } from "./Loading";

function PopularUsers() {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const { currentUserDetails, allUsers, allUserStatus, followStatus } =
    useSelector((store) => store.users);

  useEffect(() => {
    if (allUserStatus === "idle") {
      dispatch(loadAllUsersCall());
    }
  }, [dispatch, allUserStatus, currentUserDetails]);

  const currentUserId = currentUserDetails._id;

  const users = allUsers?.filter((user) => user._id !== currentUserId);

  const sortedUsers = [...users]?.sort(
    (a, b) => b?.followers?.length - a?.followers?.length
  );

  const PopularUsers = sortedUsers?.slice(0, 4);

  const unfollowHandler = (id) => {
    followStatus === "fulfilled" && dispatch(removePostFromUserFeed(id));
  };

  return allUserStatus === "loading" ? (
    <Loading />
  ) : (
    <>
      {PopularUsers?.map(({ profileImg, username, fullName, _id }) => (
        <div
          key={_id}
          className="flex items-center justify-between w-full p-2 m-2 border-2 rounded-md shadow-sm bg-secondaryLight dark:bg-nightDark dark:border-nightInput"
        >
          <div
            className="flex items-center justify-between cursor-pointer"
            onClick={() => {
              navigate(`/home/peopleprofile/${_id}`);
            }}
          >
            <img
              className=" rounded-full w-12 h-12 bg-pink-300 cursor-pointer"
              src={profileImg.url}
              alt="Users Profile"
            />

            <div className="flex flex-col px-2 dark:text-secondaryDark">
              <p className="font-medium">{username}</p>
              <p className="text-sm">{fullName}</p>
            </div>
          </div>
          {currentUserDetails?.following?.find((item) => item.userId == _id) ? (
            <button
              className="py-1 bg-secondaryLight dark:bg-nightDark text-primaryDark  border-2 border-primaryDark rounded-md w-24"
              onClick={() => {
                dispatch(unfollowCall(_id));

                unfollowHandler(_id);
              }}
            >
              Following
            </button>
          ) : (
            <button
              className="py-1 bg-primaryDark text-secondaryLight border-2 border-primaryDark rounded-md w-24"
              onClick={() => {
                dispatch(followCall(_id));
              }}
            >
              Follow
            </button>
          )}
        </div>
      ))}
    </>
  );
}

export { PopularUsers };
