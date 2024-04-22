import { useDisclosure } from "@chakra-ui/react";
import React, { useContext } from "react";
import { IoMdAdd } from "react-icons/io";
import AddDataModal from "../../../components/AddDataModal";
import AddAppointMentsModal from "../../../components/AddAppointmentsModal";
import { Context } from "../../../provider/DataProvide";
import { RiDeleteBin6Line } from "react-icons/ri";
import { removeData } from "../../../constants/removeData";
import Swal from "sweetalert2";
const AppointmentsPage = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { userAppointments, setUserAppointMents, setCloseAppointment } =
    useContext(Context);

  const handleDeleteAppointment = async (id) => {
    const url = `https://healthcare-2fif.onrender.com/appointment/delete/${id}`;
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
          const newData = userAppointments.filter((appointment) => appointment._id !== id);
          // console.log(newData);
          setUserAppointMents(newData);
          setCloseAppointment(newData[0])
        }
      });
    }
  };

  return (
    <div className="grid grid-cols-12 gap-2 h-full w-full">
      <div className="col-span-12 mr-2 mt-7 space-y-4 ">
        <div className="grid grid-cols-5">
          <div className="col-span-1 flex justify-center items-center">
            <p className="font-bold text-lg">Reason</p>
          </div>
          <div className="col-span-1 flex justify-center items-center">
            <p className="font-bold text-lg">Dr. Name</p>
          </div>
          <div className="col-span-1 flex justify-center items-center">
            <p className="font-bold text-lg">Location</p>
          </div>
          <div className="col-span-1 flex justify-center items-center">
            <p className="font-bold text-lg">Time</p>
          </div>
          <div className="col-span-1 flex justify-center items-center">
            <p className="font-bold text-lg">Date</p>
          </div>
        </div>
        {userAppointments ? (
          userAppointments?.map((appointment) => (
            <div
              key={appointment._id}
              className="grid grid-cols-5 mt-5 bg-white rounded-xl shadow-xl border border-[#E8E7E7] py-5"
            >
              <div className="col-span-1 flex justify-center items-center">
                <p className="text-xl font-bold">{appointment.reason}</p>
              </div>
              <div className="col-span-1 flex justify-center items-center">
                <p className="text-base font-medium italic">
                  {appointment.name}
                </p>
              </div>
              <div className="col-span-1 flex justify-center items-center">
                <p className="text-base  italic">{appointment.location}</p>
              </div>
              <div className="col-span-1 flex justify-center items-center">
                <p className="text-base font-bold italic">{appointment.time}</p>
              </div>
              <div className="col-span-1 flex justify-center items-center gap-5">
                <p className="text-base font-bold italic">{appointment.date}</p>{" "}
                <RiDeleteBin6Line onClick={()=>handleDeleteAppointment(appointment._id)} className="text-red-600" />
              </div>
            </div>
          ))
        ) : (
          <p>No data</p>
        )}
      </div>
      <div className="  w-[40px] hover:w-[100px] bottom-[25%]  right-0 fixed mt-10">
        <div className="  flex w-full justify-center items-end mb-4 mt-8">
          <button
            onClick={onOpen}
            className=" side-btn flex justify-center items-center gap-3 px-2 text-black py-3 w-full  font-semibold hover:scale-105"
          >
            <IoMdAdd></IoMdAdd>
          </button>
        </div>
      </div>
      <AddAppointMentsModal
        isOpen={isOpen}
        onOpen={onOpen}
        onClose={onClose}
      ></AddAppointMentsModal>
    </div>
  );
};

export default AppointmentsPage;
