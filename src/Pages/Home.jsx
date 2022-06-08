import React from "react";
import { Outlet } from "react-router";
import { Sidebar, Navigation } from "../Components";

function Home() {
  return (
    <div className="flex-col">
      <Navigation />

      <div className="flex">
        <Sidebar />
        <Outlet />
      </div>
    </div>
  );
}

export default Home;
