import React from "react";
import { NavLink } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux/es/exports";
import { loadUserPostCall } from "../Redux/Features/postSlice";

function Sidebar() {
  const dispatch = useDispatch();

  const { currentUserDetails } = useSelector((store) => store.users);

  const getActiveStyle = ({ isActive }) => ({
    color: isActive ? "#9333EA" : "",
  });

  return (
    <ul className="flex justify-between border-t-2 border-primaryDark md:border-0 md:justify-start md:flex-col w-full md:max-w-fit md:h-[90vh] bg-secondaryDark   sticky bottom-0  md:top-16">
      <li className="p-4 md:p-6 ">
        <NavLink
          style={getActiveStyle}
          to="/home"
          end
          className="inline-flex items-center"
        >
          <i className="fa-solid fa-house"></i>
          <h4 className="hidden px-2 font-medium lg:block">Feed</h4>
        </NavLink>
      </li>
      <li className="p-4 md:p-6 ">
        <NavLink
          style={getActiveStyle}
          to="/home/search"
          end
          className="inline-flex items-center"
        >
          <i className="fa-solid fa-magnifying-glass"></i>
          <h4 className="hidden px-2 font-medium lg:block">Search</h4>
        </NavLink>
      </li>
      <li className="p-4 md:p-6 ">
        <NavLink
          style={getActiveStyle}
          to="/home/explore"
          end
          className="inline-flex items-center"
        >
          <i className="fa-solid fa-compass"></i>
          <h4 className="hidden px-2 font-medium lg:block">Explore</h4>
        </NavLink>
      </li>
      <li className="p-4 md:p-6 ">
        <NavLink
          style={getActiveStyle}
          to="/home/bookmarks"
          end
          className="inline-flex items-center"
        >
          <i className="fa-solid fa-bookmark"></i>
          <h4 className="hidden px-2 font-medium lg:block">Bookmarks</h4>
        </NavLink>
      </li>
      <li className="p-4 md:p-6 ">
        <NavLink
          style={getActiveStyle}
          to="/home/profile"
          end
          className="inline-flex items-center"
          onClick={() =>
            dispatch(loadUserPostCall(currentUserDetails?.username))
          }
        >
          <i className="fa-solid fa-user"></i>
          <h4 className="hidden px-2 font-medium lg:block">Profile</h4>
        </NavLink>
      </li>
    </ul>
  );
}

export { Sidebar };
