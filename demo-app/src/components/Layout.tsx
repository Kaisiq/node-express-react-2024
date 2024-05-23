import React from "react";
import { NavLink, Outlet } from "react-router-dom";

type Props = {};

const Layout = (props: Props) => {
  return (
    <>
      <div>Hello React Router Demo</div>
      <nav>
        <NavLink to="/home">Home</NavLink>
        <NavLink to="/about">About</NavLink>
      </nav>
      <Outlet />
    </>
  );
};

export default Layout;
