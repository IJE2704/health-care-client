import React, { useContext } from "react";
import { Outlet } from "react-router-dom";
import Nav from "../../Shared/Nav";
import Header from "../../Shared/Header";
import { Context } from "../../provider/DataProvide";
import { Spinner } from "@chakra-ui/react";

const DashBoard = () => {
  const { loading, setLoading } = useContext(Context);
  return (
    <div>
      {loading ? (
        <>
          <div className="flex justify-center items-start bg h-screen">
            <Spinner className="mt-10" color="red.500" size="xl" />
          </div>
        </>
      ) : (
        <div className="bg grid grid-cols-5 h-screen">
          <div className="col-span-1">
            <Nav></Nav>
          </div>
          <div className="col-span-4 pt-7 2xl:pt-14 ml-8 2xl:ml-10 h-screen overflow-hidden overflow-y-scroll">
            <div className="grid grid-rows-7 2xl:grid-rows-8 gap-5 2xl:gap-10">
              <div className="row-span-1">
                <Header></Header>
              </div>
              <div className=" row-span-6 2xl:row-span-7 ">
                <Outlet></Outlet>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashBoard;
