import React, { useContext, useEffect, useState } from "react";
import { Context } from "../provider/DataProvide";
import { CiBellOn } from "react-icons/ci";
import { FaUserAlt } from "react-icons/fa";
import { useDisclosure } from "@chakra-ui/react";
import ProfileModal from "../components/ProfileModal";

const Header = () => {
  const { loggedUser, selectedMenu, date, setDate, notifications } =
    useContext(Context);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [props,setProps] = useState({});
  
  const openNotificationsModal = ()=>{
    setProps({
      title:"Notifications",
      notifi:'notifications'
    })
    onOpen();
  }

  const openProfileModal = ()=>{
    setProps({
      title:'Profile',
      profile:"profile"
    })
    onOpen();
  }

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
    // console.log(notifications)
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
        <div onClick={openNotificationsModal} className="relative flex justify-center items-center p-[10px] rounded-md border-gray-300 border hover:hover:border-pink-300 bg-white cursor-pointer">
          <CiBellOn className="text-xl" />
          <div className="absolute top-[-10px] right-[-10px]">
            {notifications.length != 0 && (
              <>
                <div className="w-[20px] h-[20px] bg-red-600 rounded-full flex justify-center items-center">
                  <p className="text-white text-xs">{notifications.length}</p>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
      <div
        onClick={openProfileModal}
        className="col-span-1 flex justify-end gap-5 items-center cursor-pointer mr-10"
      >
        <h1 className="text-[#303030] text-[24px]  2xl:text-[28px] font-bold">
          {loggedUser.name}
        </h1>{" "}
        <FaUserAlt className="text-2xl text-pink-500 "></FaUserAlt>
      </div>
      <ProfileModal
        isOpen={isOpen}
        onOpen={onOpen}
        onClose={onClose}
        props={props}
      ></ProfileModal>
    </div>
  );
};

export default Header;
