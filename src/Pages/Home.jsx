import React from "react";
import { Outlet } from "react-router";
import { Sidebar, Navigation } from "../Components";

function Home() {
  return (
    <div className="flex-col relative h-[100vh]">
      <Navigation />

      <div className="md:flex justify-end flex-row-reverse ">
        <div className="bg-secondaryLight md:w-full ">
          <Outlet />
        </div>

        <Sidebar />
      </div>
    </div>
  );
}

export default Home;
