import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getBookmarkCall } from "../Redux/Features/userSlice";

import { Post } from "./Post";

function Bookmarks() {
  const dispatch = useDispatch();
  const { bookmarks, bookmarkStatus } = useSelector((store) => store.users);

  useEffect(() => {
    if (bookmarkStatus === "idle") {
      dispatch(getBookmarkCall());
    }
  }, [dispatch, bookmarkStatus]);

  return (
    <div className=" w-full md:w-10/12    md:mx-10 md:my-6  xlg:mx-14 xlg:my-10 rounded-lg bg-secondaryDark   overflow-y-auto h-[78vh] md:h-[84vh] scrollbar-hide ">
      <div className="flex flex-col justify-center items-center p-4">
        <div className="text-primaryDark text-lg  md:text-3xl font-medium pb-5 border-b-2 border-primaryDark w-full text-center">
          Bookmarks
        </div>
        <div>
          {bookmarkStatus === "loading" ? (
            <div>Loading</div>
          ) : (
            bookmarks?.map((item) => <Post key={item._id} item={item} />)
          )}
        </div>

        {!bookmarks.length && <div> Bookmark posts to show here</div>}
      </div>
    </div>
  );
}

export { Bookmarks };
