import React, { useContext, useState } from "react";
import { IoMdAdd } from "react-icons/io";
import AddReportsModal from "../../../components/AddReportsModal";
import { useDisclosure } from "@chakra-ui/react";
import { Context } from "../../../provider/DataProvide";
const ReportsPage = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { userReports } = useContext(Context);
  const [props,setProps] = useState({})
  const handleOpenReportsModal = report => {
    setProps({
      showReport:'true',
      report:report
    })
    onOpen();
  }
  const handleOpenAddReportsModal = () => {
    setProps({
      addReport:'true',

    })
    onOpen();
  }
  return (
    <div className="grid grid-cols-12 h-full w-full">
      <div className="col-span-11">
        {userReports.length === 0 ? (
          <h1 className="text-center text-xl font-semibold my-8 text-red-500 ">
            You don't have any reports
          </h1>
        ) : (
          <div className="grid grid-cols-3">
            {userReports.map((report) => (
              <div onClick={()=>handleOpenReportsModal(report)}
                key={report._id}
                className="col-span-1 flex flex-col justify-center items-center"
              >
                <h1 className="text-xl font-medium mb-4">{report.name}</h1>
                <div className="w-[200px] h-[300px]">
                  <img className="object-cover" src={report.img} alt="" />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="col-span-1 flex justify-end items-end mr-2">
        <div className="  flex w-full justify-center items-end mb-4 mt-8">
          <button
            onClick={handleOpenAddReportsModal}
            className=" btn flex justify-center items-center gap-3 px-2 text-black py-3 w-full rounded-[10px] font-semibold hover:scale-105"
          >
            <p>Add</p> <IoMdAdd></IoMdAdd>
          </button>
        </div>
      </div>
      <AddReportsModal
        isOpen={isOpen}
        onOpen={onOpen}
        onClose={onClose}
        props={props}
      ></AddReportsModal>
    </div>
  );
};

export default ReportsPage;
