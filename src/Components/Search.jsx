import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router";

import noResult from "../assets/what_should_we_do.gif";

import {
  loadAllPostsCall,
  loadFollowedUserPostsCall,
  removePostFromUserFeed,
} from "../Redux/Features/postSlice";

import {
  loadAllUsersCall,
  followCall,
  unfollowCall,
} from "../Redux/Features/userSlice";

import { Post } from "./Post";

function Search() {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const { allPosts, allPostsStatus } = useSelector((store) => store.posts);
  const { currentUserDetails, allUsers, allUserStatus } = useSelector(
    (store) => store.users
  );

  const currentUserId = currentUserDetails._id;

  const users = allUsers.filter((user) => user._id !== currentUserId);

  const PopularUsers = [...users]?.sort(
    (a, b) => b.followers.length - a.followers.length
  );

  useEffect(() => {
    if (allPostsStatus === "idle") {
      dispatch(loadAllPostsCall());
    }

    if (allUserStatus === "idle") {
      dispatch(loadAllUsersCall());
    }
  }, [dispatch, allPostsStatus, allUserStatus]);

  const [searchText, setSearchText] = useState("");

  let showUsers = [];
  let showPosts = [];
  if (!searchText) {
    showUsers = PopularUsers;
    showPosts = [];
  } else {
    const tempUser = PopularUsers.filter((users) => {
      if (
        users.fullName.toLowerCase().includes(searchText.toLocaleLowerCase()) ||
        users.username.toLowerCase().includes(searchText.toLocaleLowerCase())
      ) {
        return users;
      }
    });

    const tempPost = allPosts.filter((posts) => {
      if (
        posts.content.toLowerCase().includes(searchText.toLocaleLowerCase())
      ) {
        return posts;
      }
    });

    showUsers = tempUser;
    showPosts = tempPost;
  }

  return (
    <div className=" w-full md:w-10/12    md:mx-10 md:my-6  xlg:mx-14 xlg:my-10 rounded-lg bg-secondaryDark   overflow-y-auto h-[78vh] md:h-[84vh] scrollbar-hide ">
      <div className="flex flex-col justify-center items-center p-4">
        <div className="text-primaryDark text-lg  md:text-3xl font-medium pb-5 mb-4 border-b-2 border-primaryDark w-full text-center">
          <p className="mb-2">Search</p>

          <input
            type="text"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            placeholder="Search Users or Posts"
            className="border-2 border-primaryDark rounded-lg w-4/5 md:w-3/6 p-2 text-lg text-gray-800"
          />
        </div>

        {showUsers.length !== 0 && (
          <div className="w-full flex flex-col justify-center items-center">
            <div className="text-3xl font-semibold text-primaryDark p-2 w-full">
              Users
            </div>

            <div className="w-11/12 md:w-4/5">
              {allUserStatus === "loading" ? (
                <p>Loading</p>
              ) : (
                <div>
                  {showUsers?.map(({ profileImg, username, fullName, _id }) => (
                    <div
                      key={_id}
                      className="flex items-center justify-between w-full p-3 mb-3  border-2 rounded-md shadow-sm bg-secondaryLight"
                    >
                      <div
                        className="flex items-center justify-between cursor-pointer"
                        onClick={() => {
                          navigate(`/home/peopleprofile/${_id}`);
                        }}
                      >
                        <img
                          className=" rounded-full w-12 h-12 bg-pink-300 cursor-pointer"
                          src={profileImg}
                          alt="Users Profile"
                        />

                        <div className="flex flex-col px-2">
                          <p className="font-medium">{username}</p>
                          <p className="text-sm">{fullName}</p>
                        </div>
                      </div>
                      {currentUserDetails?.following?.find(
                        (item) => item._id === _id
                      ) ? (
                        <button
                          className="py-1 bg-secondaryLight text-primaryDark  border-2 border-primaryDark rounded-md w-20 md:w-24"
                          onClick={() => {
                            dispatch(removePostFromUserFeed(_id));
                            dispatch(unfollowCall(_id));
                          }}
                        >
                          Following
                        </button>
                      ) : (
                        <button
                          className="py-1 bg-primaryDark text-secondaryLight border-2 border-primaryDark rounded-md w-20 md:w-24"
                          onClick={() => {
                            dispatch(loadFollowedUserPostsCall(username));
                            dispatch(followCall(_id));
                          }}
                        >
                          Follow
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {showPosts.length !== 0 && (
          <div className="w-full flex flex-col justify-center items-center">
            <div className="text-3xl font-semibold text-primaryDark p-2 w-full">
              Posts
            </div>
            {allUserStatus === "loading" ? (
              <div>Loading</div>
            ) : (
              showPosts?.map((item) => <Post key={item._id} item={item} />)
            )}
          </div>
        )}

        {showPosts.length === 0 && showUsers.length === 0 && (
          <div>
            <div className="text-lg pb-2">Oops! No post or user found!</div>
            <img src={noResult} alt="Not Found" className="rounded" />
          </div>
        )}
      </div>
    </div>
  );
}

export { Search };
