import React from "react";
import NavBar from "./MenuBar";
import { Outlet } from "react-router";

export default () => {
  return (
    <>
      <NavBar />
      <Outlet />
    </>
  );
};
