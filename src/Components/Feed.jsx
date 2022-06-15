import React, { useEffect } from "react";

import { AsideFeed } from "./AsideFeed";
import { AddPost } from "./AddPost";
import { Post } from "./Post";

import { useDispatch, useSelector } from "react-redux/es/exports";
import { loadFollowedUserPostsCall } from "../Redux/Features/postSlice";

function Feed() {
  const dispatch = useDispatch();

  const { currentUserDetails } = useSelector((store) => store.users);

  useEffect(() => {
    if (currentUserDetails) {
      dispatch(loadFollowedUserPostsCall(currentUserDetails?.username));
    }
  }, [dispatch, currentUserDetails]);

  const { postStatus, userFeedPost } = useSelector((store) => store.posts);

  return (
    <div className="flex justify-between bg-secondaryLight ">
      <div className="  w-full   md:mx-10 md:my-6  xlg:mx-14 xlg:my-10 rounded-lg bg-secondaryDark   overflow-y-auto h-[78vh] md:h-[84vh] scrollbar-hide">
        <div>
          <AddPost />
          <main className="p-4">
            {postStatus === "loading" ? (
              <div>Loading...</div>
            ) : (
              userFeedPost.map((item) => <Post key={item._id} item={item} />)
            )}

            <div className="text-primaryDark">
              Follow more users to see their posts.
            </div>
          </main>
        </div>
      </div>
      <AsideFeed />
    </div>
  );
}

export { Feed };
