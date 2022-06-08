import React from "react";
import { NavLink } from "react-router-dom";

function Sidebar() {
  return (
    <div className=" ">
      <ul className="flex-col ">
        <li>
          <NavLink to="/home/feed">
            <h4>Feed</h4>
          </NavLink>
        </li>
        <li>
          <NavLink to="/home/search">
            <h4>Search</h4>
          </NavLink>
        </li>
        <li>
          <NavLink to="/home/explore">
            <h4>Explore</h4>
          </NavLink>
        </li>
        <li>
          <NavLink to="/home/bookmarks">
            <h4>Bookmarks</h4>
          </NavLink>
        </li>
        <li>
          <NavLink to="/home/profile">
            <h4>Profile</h4>
          </NavLink>
        </li>
      </ul>
    </div>
  );
}

export { Sidebar };
