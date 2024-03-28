import React, { useContext, useEffect, useState } from "react";
import { Context } from "../provider/DataProvide";
import { CiBellOn } from "react-icons/ci";

const Header = () => {
  const { loggedUser, selectedMenu,date,setDate } = useContext(Context);
  
  const [header, setHeader] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const handleSearchChange = (event) => {
    setSearchValue(event.target.value);
  };

  useEffect(() => {
    if (selectedMenu === "Dashboard") {
      setHeader("Health Overview");
    } else if (selectedMenu === "Medicines") {
      setHeader(selectedMenu);
    } else if (selectedMenu === "Reports") {
      setHeader(selectedMenu);
    } else if (selectedMenu === "Appointments") {
      setHeader(selectedMenu);
    }
  }, [selectedMenu]);

  useEffect(() => {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, "0"); // Adding 1 because getMonth() returns zero-based month index
    const day = String(currentDate.getDate()).padStart(2, "0");
    const formattedDate = `${day}-${month}-${year}`;
    setDate(formattedDate);
  }, []);
  return (
    <div className="grid grid-cols-3 items-center">
      <div className="col-span-1">
        <h1 className="text-[#303030] text-[24px]  2xl:text-[28px] font-bold">
          {header}
        </h1>
        <p className="text-[#6A6969] text-sm 2xl:text-base font-semibold">
          {date}
        </p>
      </div>
      <div className="col-span-1 flex items-center gap-2">
        <div>
          <input
            type="text"
            placeholder="Search..."
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-pink-300"
            value={searchValue}
            onChange={handleSearchChange}
          />
        </div>
        <div className="flex justify-center items-center p-[10px] rounded-md border-gray-300 border hover:hover:border-pink-300 bg-white cursor-pointer">
          <CiBellOn className="text-xl" />
        </div>
      </div>
      <div className="col-span-1 flex justify-center items-center">
        <h1 className="text-[#303030] text-[24px]  2xl:text-[28px] font-bold">{loggedUser.name}</h1>
      </div>
    </div>
  );
};

export default Header;
