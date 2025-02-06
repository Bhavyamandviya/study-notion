import React from "react";
import * as Icons from "react-icons/vsc";
import { useDispatch } from "react-redux";
import { NavLink, matchPath, useLocation } from "react-router-dom";

const Sidebarlink = ({ data, iconname }) => {
  console.log(iconname);
  const Icon = Icons[iconname];
  const location = useLocation();
  const dispatch = useDispatch();

  const matchRoute = (route) => {
    return matchPath({ path: route }, location.pathname);
  };
  return (
    <>
      <NavLink
        to={data?.path}
        className={`relative px-8 py-2 text-sm font-medium text-richblack-25 ${
          matchRoute(data?.path) ? "bg-yellow-400" : "bg-opacity-0"
        }`}
      >
        <span
          className={`${
            matchRoute(data?.path) ? "opacity-100" : "opacity-0"
          } absolute left-0 top-0 h-full w-[0.2rem] bg-yellow-100`}
        ></span>
        <div className="flex items-center gap-x-3">
          <Icon className="text-lg" />
          <span>{data?.name}</span>
        </div>
      </NavLink>
    </>
  );
};

export default Sidebarlink;
