import React from "react";
import { Outlet } from "react-router-dom";
import Nav from "../../Shared/Nav";
import Header from "../../Shared/Header";

const DashBoard = () => {
  return (
    <div className="bg grid grid-cols-5">
      <div className="col-span-1">
        <Nav></Nav>
      </div>
      <div className="col-span-4 mt-7 2xl:mt-14 ml-8 2xl:ml-10">
        <div className="grid grid-rows-7 gap-5 2xl:gap-10">
          <div className="row-span-1">
            <Header></Header>
          </div>
          <div className="row-span-6">
            <Outlet></Outlet>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashBoard;
