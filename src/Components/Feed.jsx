import React, { useEffect } from "react";

import { AsideFeed } from "./AsideFeed";
import { AddPost } from "./AddPost";
import { Post } from "./Post";

import { useDispatch, useSelector } from "react-redux/es/exports";
import { loadFollowedUserPostsCall } from "../Redux/Features/postSlice";

import { Link } from "react-router-dom";
function Feed() {
  const dispatch = useDispatch();

  const { currentUserDetails } = useSelector((store) => store.users);
  const { allPostsStatus, userFeedPost, allPosts } = useSelector(
    (store) => store.posts
  );

  useEffect(() => {
    dispatch(loadFollowedUserPostsCall(currentUserDetails?.username));
  }, [allPosts]);

  useEffect(() => {
    currentUserDetails?.following?.map((item) =>
      dispatch(loadFollowedUserPostsCall(item.username))
    );
  }, [currentUserDetails]);

  return (
    <div className="flex justify-between bg-secondaryLight ">
      <div className="  w-full   md:mx-10 md:my-6  xlg:mx-14 xlg:my-10 rounded-lg bg-secondaryDark   overflow-y-auto h-[78vh] md:h-[84vh] scrollbar-hide">
        <div>
          <AddPost />
          <main className="p-4">
            {allPostsStatus === "loading" ? (
              <div>Loading...</div>
            ) : (
              userFeedPost.map((item) => <Post key={item._id} item={item} />)
            )}

            <div className="text-primaryDark md:flex  items-center justify-between">
              <div className="py-2">Follow more users to see their posts.</div>

              <Link to="/home/search" className="py-2 cursor-pointer">
                See Suggested Users
              </Link>
            </div>
          </main>
        </div>
      </div>
      <AsideFeed />
    </div>
  );
}

export { Feed };
