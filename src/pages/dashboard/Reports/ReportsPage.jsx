import React, { useContext, useState } from "react";
import { IoMdAdd } from "react-icons/io";
import AddReportsModal from "../../../components/AddReportsModal";
import { useDisclosure } from "@chakra-ui/react";
import { Context } from "../../../provider/DataProvide";
import { FaDownload } from "react-icons/fa6";
import { MdDelete } from "react-icons/md";
import { ImEnlarge } from "react-icons/im";
import Swal from "sweetalert2";
import { removeData } from "../../../constants/removeData";
import { IoAdd } from "react-icons/io5";
const ReportsPage = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { userReports, setuserReports } = useContext(Context);
  const [props, setProps] = useState({});

  const handleDeleteReports =async (id) => {
    const url = `https://healthcare-2fif.onrender.com/report/delete/${id}`
    const data = await removeData(url);
    if (data.deletedCount) {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success",
          });
          const newData = userReports.filter(
            (report) => report._id !== id
          );
          // console.log(newData);
          setuserReports(newData);
        }
      });
    }
  };

  const handleOpenReportsModal = (report) => {
    setProps({
      showReport: "true",
      report: report,
    });
    onOpen();
  };

  const handleOpenAddReportsModal = () => {
    setProps({
      addReport: "true",
    });
    onOpen();
  };

  return (
    <div className="grid relative grid-cols-12 gap-2 h-full w-full">
      <div className="col-span-12 mr-4">
        {userReports.length === 0 ? (
          <h1 className="text-center text-xl font-semibold my-8 text-red-500 ">
            You don't have any reports
          </h1>
        ) : (
          <div className="grid grid-cols-3 2xl:grid-cols-4 gap-4">
            {userReports.map((report) => (
              <div
                key={report._id}
                className="col-span-1  bg-white rounded-xl shadow-xl border border-[#E8E7E7] "
              >
                <div className="flex flex-col justify-center items-center ">
                  <h1 className="text-xl font-medium my-4">{report.name}</h1>
                  <div
                    onClick={() => handleOpenReportsModal(report)}
                    className="w-full h-[300px] 2xl:h-[400px] p-4 cursor-pointer relative"
                  >
                    <img
                      className="w-full h-full object-cover"
                      src={report.img}
                      alt=""
                    />
                    <div className="absolute bg-gray-300 p-3 rounded-full flex justify-center items-center top-0 right-2 opacity-50">
                      <ImEnlarge></ImEnlarge>
                    </div>
                  </div>
                </div>
                <div className=" p-4 flex justify-between items-center">
                  <FaDownload className="text-xl text-pink-500 cursor-pointer"></FaDownload>{" "}
                  <MdDelete onClick={()=> handleDeleteReports(report._id)} className="text-xl text-pink-500 cursor-pointer"></MdDelete>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      
        <div className=" w-[40px] hover:w-[100px] flex  justify-center items-end mb-4 bottom-[25%]  right-0 fixed">
          <button
            onClick={handleOpenAddReportsModal}
            className=" side-btn flex justify-center items-center gap-3 px-2 text-black py-3 w-full  font-semibold hover:scale-105"
          >
            <IoAdd></IoAdd>
          </button>
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
