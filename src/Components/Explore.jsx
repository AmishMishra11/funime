import React, { useEffect, useState } from "react";

import { useSelector, useDispatch } from "react-redux";
import { loadAllPostsCall } from "../Redux/Features/postSlice";

import { Post } from "./Post";
import { Loading } from "./Loading";

function Explore() {
  const dispatch = useDispatch();
  const { allPosts, allPostsStatus } = useSelector((store) => store.posts);

  useEffect(() => {
    if (allPostsStatus === "idle") {
      dispatch(loadAllPostsCall());
    }
  }, [allPostsStatus]);

  const [filter, setFilter] = useState("Popular");

  const [showFilter, setShowFilter] = useState(false);

  const displayRecent = [...allPosts]?.sort(
    (a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)
  );

  const displayOldest = [...allPosts]?.sort(
    (a, b) => new Date(a.updatedAt) - new Date(b.updatedAt)
  );

  const displayPopular = [...allPosts]?.sort(
    (a, b) => b.likes.likeCount - a.likes.likeCount
  );
  let showExplore = [];

  if (filter === "Popular") {
    showExplore = [...displayPopular];
  } else if (filter === "Recent") {
    showExplore = [...displayRecent];
  } else if (filter === "Oldest") {
    showExplore = [...displayOldest];
  } else {
    showExplore = [...allPosts];
  }

  return (
    <div className=" w-full md:w-10/12    md:mx-10 md:my-6  xlg:mx-14 xlg:my-10 rounded-lg bg-secondaryDark  dark:bg-nightLight  overflow-y-auto h-[calc(100vh-6rem)] md:h-[calc(100vh-8rem)] scrollbar-hide ">
      <div className="flex flex-col justify-center items-center p-4">
        <div className="text-primaryDark text-lg  md:text-3xl font-medium pb-5 border-b-2 border-primaryDark w-full text-center">
          Explore
        </div>

        <div className="py-4 px-2  mb-4 text-right w-full border-b-2 border-primaryDark flex justify-end ">
          <div
            className=" py-2 w-24 text-center  bg-primaryLight dark:text-secondaryDark rounded-lg cursor-pointer relative"
            onClick={() => setShowFilter((preVal) => !preVal)}
          >
            {filter}
            <div className="absolute top-10 right-0 w-full mt-2 bg-primaryLight rounded-lg ">
              {showFilter && (
                <div className="flex flex-col gap-2    ">
                  <div
                    className="cursor-pointer rounded-lg test-secondaryDark text-center py-1"
                    onClick={() => setFilter("Popular")}
                  >
                    Popular
                  </div>
                  <div
                    className="cursor-pointer rounded-lg test-secondaryDark text-center py-1"
                    onClick={() => setFilter("Recent")}
                  >
                    Recent
                  </div>
                  <div
                    className="cursor-pointer rounded-lg test-secondaryDark text-center py-1"
                    onClick={() => setFilter("Oldest")}
                  >
                    Oldest
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="w-full">
          {allPostsStatus === "loading" ? (
            <Loading />
          ) : (
            showExplore?.map((item) => <Post key={item._id} item={item} />)
          )}
        </div>
      </div>
    </div>
  );
}

export { Explore };
