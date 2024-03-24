import { useContext, useState } from "react";
import { RiDashboardFill } from "react-icons/ri";
import { FaBookOpen } from "react-icons/fa";
import { SiGoogleclassroom } from "react-icons/si";
import { PiExam } from "react-icons/pi";
import { FaChalkboardTeacher } from "react-icons/fa";

import { Link } from "react-router-dom";
import { Context } from "../provider/DataProvide";

const Nav = () => {
  const { user, selectedMenu, setSelectedMenu } = useContext(Context);
  return (
    <div className="w-full h-screen  shadow-2xl">
      <Link to="/">
        <div className="flex justify-center items-center pt-5">
          <h1 className="font-bold text-[#D08726] text-4xl 2xl:text-5xl">
            HEALTH CARE
          </h1>
        </div>
      </Link>
      <div className="mt-16 flex flex-col gap-2 pr-4">
        <Link to={`/dashboard/home`}>
          <div
            onClick={() => setSelectedMenu("Dashboard")}
            className={`flex justify-start pl-[50px] 2xl:pl-[100px] items-center  gap-4 text-base md:text-xl lg:text-2xl w-full  hover:bg-[#D08726] hover:text-white border py-4 rounded-br-lg rounded-tr-lg ${
              selectedMenu === "Dashboard" ? "bg-[#D08726] text-white" : ""
            }`}
          >
            <RiDashboardFill /> <h1>Dashboard</h1>
          </div>
        </Link>
        <Link to="/dashboard/medicines">
          <div
            onClick={() => setSelectedMenu("Medicines")}
            className={`flex justify-start pl-[50px] 2xl:pl-[100px] items-center gap-4 text-base md:text-xl lg:text-2xl w-full  hover:bg-[#D08726] hover:text-white border py-4 rounded-br-lg rounded-tr-lg ${
              selectedMenu === "Medicines" ? "bg-[#D08726] text-white" : ""
            }`}
          >
            <FaBookOpen /> <h1>Medicines</h1>
          </div>
        </Link>
        <Link to="/dashboard/reports">
          <div
            onClick={() => setSelectedMenu("Reports")}
            className={`flex justify-start pl-[50px] 2xl:pl-[100px] items-center gap-4 text-base md:text-xl lg:text-2xl w-full  hover:bg-[#D08726] hover:text-white border py-4 rounded-br-lg rounded-tr-lg ${
              selectedMenu === "Reports" ? "bg-[#D08726] text-white" : ""
            }`}
          >
            <SiGoogleclassroom /> <h1>Reports</h1>
          </div>
        </Link>
        <Link to="/dashboard/appointments">
          <div
            onClick={() => setSelectedMenu("Appointments")}
            className={`flex justify-start pl-[50px] 2xl:pl-[100px] items-center gap-4 text-base md:text-xl lg:text-2xl w-full  hover:bg-[#D08726] hover:text-white border py-4 rounded-br-lg rounded-tr-lg ${
              selectedMenu === "Appointments" ? "bg-[#D08726] text-white" : ""
            }`}
          >
            <PiExam /> <h1>Appointments</h1>
          </div>
        </Link>
        <Link to="/dashboard/plans">
          <div
            onClick={() => setSelectedMenu("Teachers")}
            className={`flex justify-start pl-[50px] 2xl:pl-[100px] items-center gap-4 text-base md:text-xl lg:text-2xl w-full  hover:bg-[#D08726] hover:text-white border py-4 rounded-br-lg rounded-tr-lg ${
              selectedMenu === "Teachers" ? "bg-[#D08726] text-white" : ""
            }`}
          >
            <FaChalkboardTeacher /> <h1>Teachers</h1>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Nav;
