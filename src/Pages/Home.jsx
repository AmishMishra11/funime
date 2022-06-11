import React, { useEffect } from "react";
import { Outlet } from "react-router";
import { Sidebar, Navigation } from "../Components";
import { useDispatch } from "react-redux/es/exports";
import { setCurrentUserDetails } from "../Redux/Features/userSlice";

function Home() {
  const dispatch = useDispatch();

  const user = localStorage.getItem("userDetails");
  const userValue = JSON.parse(user);

  useEffect(() => {
    dispatch(setCurrentUserDetails(userValue));
  }, [dispatch, userValue]);

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
