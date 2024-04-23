import { useContext, useState } from "react";
import { RiDashboardFill } from "react-icons/ri";
import { FaBookOpen } from "react-icons/fa";
import { SiGoogleclassroom } from "react-icons/si";
import { PiExam } from "react-icons/pi";
import { FaChalkboardTeacher } from "react-icons/fa";

import { Link, useNavigate } from "react-router-dom";
import { Context } from "../provider/DataProvide";
import { GiMedicines } from "react-icons/gi";
import { TbReportSearch } from "react-icons/tb";
import { FaUserDoctor } from "react-icons/fa6";
import { MdOutlineTipsAndUpdates } from "react-icons/md";
import logo from '../assets/logo.png'
import { GoGraph } from "react-icons/go";

const Nav = () => {
  const { user, selectedMenu, setSelectedMenu,logOut } = useContext(Context);
  const navigate = useNavigate();
  const handleLogout =()=>{
    navigate('/');
    logOut()
  }
  return (
    <div className="w-full h-screen flex flex-col  shadow-2xl">
      <Link to="/">
        <div className="flex justify-center items-center pt-5 ">
          <img className="w-[70px] h-[70px] 2xl:w-[100px] 2xl:h-[100px]" src={logo} alt="" />
        </div>
      </Link>
      <div className="mt-6 2xl:mt-16 flex flex-col gap-2 pr-4 flex-1">
        <Link to={`/dashboard/home`}>
          <div
            onClick={() => setSelectedMenu("Dashboard")}
            className={`flex justify-start pl-[50px] 2xl:pl-[100px] items-center  gap-4 text-base md:text-xl 2xl:text-2xl w-full  hover:bg hover:border-pink-300 border py-4 rounded-br-lg rounded-tr-lg ${
              selectedMenu === "Dashboard" ? "btn text-white" : ""
            }`}
          >
            <RiDashboardFill className="text-pink-700" /> <h1>Dashboard</h1>
          </div>
        </Link>
        <Link to="/dashboard/medicines">
          <div
            onClick={() => setSelectedMenu("Medicines")}
            className={`flex justify-start pl-[50px] 2xl:pl-[100px] items-center gap-4 text-base md:text-xl 2xl:text-2xl w-full  hover:btn hover:border-pink-300 border py-4 rounded-br-lg rounded-tr-lg ${
              selectedMenu === "Medicines" ? "btn text-white" : ""
            }`}
          >
            <GiMedicines className="text-pink-700" /> <h1>Medicines</h1>
          </div>
        </Link>
        <Link to="/dashboard/reports">
          <div
            onClick={() => setSelectedMenu("Reports")}
            className={`flex justify-start pl-[50px] 2xl:pl-[100px] items-center gap-4 text-base md:text-xl 2xl:text-2xl w-full  hover:btn hover:border-pink-300 border py-4 rounded-br-lg rounded-tr-lg ${
              selectedMenu === "Reports" ? "btn text-white" : ""
            }`}
          >
            <TbReportSearch className="text-pink-700" /> <h1>Reports</h1>
          </div>
        </Link>
        <Link to="/dashboard/appointments">
          <div
            onClick={() => setSelectedMenu("Appointments")}
            className={`flex justify-start pl-[50px] 2xl:pl-[100px] items-center gap-4 text-base md:text-xl 2xl:text-2xl w-full  hover:btn hover:border-pink-300 border py-4 rounded-br-lg rounded-tr-lg ${
              selectedMenu === "Appointments" ? "btn text-white" : ""
            }`}
          >
            <FaUserDoctor className="text-pink-700" /> <h1>Appointments</h1>
          </div>
        </Link>
        <Link to="/dashboard/plans">
          <div
            onClick={() => setSelectedMenu("Analysis")}
            className={`flex justify-start pl-[50px] 2xl:pl-[100px] items-center gap-4 text-base md:text-xl 2xl:text-2xl w-full  hover:btn hover:border-pink-300 border py-4 rounded-br-lg rounded-tr-lg ${
              selectedMenu === "Analysis" ? "btn text-white" : ""
            }`}
          >
            <GoGraph className="text-pink-700" /> <h1>Analysis</h1>
          </div>
        </Link>
        <Link to="/dashboard/plans">
          <div
            onClick={() => setSelectedMenu("Tips")}
            className={`flex justify-start pl-[50px] 2xl:pl-[100px] items-center gap-4 text-base md:text-xl 2xl:text-2xl w-full  hover:btn hover:border-pink-300 border py-4 rounded-br-lg rounded-tr-lg ${
              selectedMenu === "Tips" ? "btn text-white" : ""
            }`}
          >
            <MdOutlineTipsAndUpdates className="text-pink-700" /> <h1>Tips</h1>
          </div>
        </Link>
      </div>
      <div className="flex justify-center  px-16 mb-4">
        <button onClick={handleLogout} className=" btn text-black py-3 w-full rounded-[10px] hover:scale-105">LogOut</button>
      </div>
    </div>
  );
};

export default Nav;
