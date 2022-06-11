import React from "react";

import { AsideFeed } from "./AsideFeed";
import { AddPost } from "./AddPost";
import { Post } from "./Post";

function Feed() {
  return (
    <div className="flex justify-between bg-secondaryLight ">
      <div className="  w-full  mx-8 my-6  md:mx-10 md:my-6  xlg:mx-14 xlg:my-10 rounded-lg bg-secondaryDark   overflow-y-auto h-[78vh] md:h-[84vh] scrollbar-hide">
        <div>
          <AddPost />
          <main>
            <Post />
            <Post />
            <Post />
            <Post />
          </main>
        </div>
      </div>
      <AsideFeed />
    </div>
  );
}

export { Feed };
