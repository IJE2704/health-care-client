import { useDisclosure } from "@chakra-ui/react";
import React, { useContext, useEffect, useState } from "react";
import { IoMdAdd } from "react-icons/io";
import AddMedicinesModal from "../../../components/AddMedicinesModal";
import { Context } from "../../../provider/DataProvide";
import MedicinesCart from "../../../components/MedicinesCart";
import { useMutation, useQuery } from "react-query";

import { removeData } from "../../../constants/removeData";
import Swal from "sweetalert2";
import SideButton from "../../../components/SideButton";

const MedicinesPage = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { userMedicines, setUserMedicines, loggedUser } = useContext(Context);
  const handleDeleteMedicine = async (id) => {
    const url = `https://healthcare-2fif.onrender.com/medicine/delete/${id}`;
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
          const newData = userMedicines.filter(
            (medicine) => medicine._id !== id
          );
          console.log(newData);
          setUserMedicines(newData);
        }
      });
    }
  };

  // console.log(userMedicines)
  return (
    <div>
      {userMedicines ? (
        <div className="grid grid-cols-12 gap-2 h-full w-full">
          <div className="mt-7 space-y-4 col-span-12 mr-2">
            <div className="grid grid-cols-9">
              <div className="col-span-1 flex justify-center items-center">
                <p className="font-bold text-lg">Type</p>
              </div>
              <div className="col-span-2 flex justify-center items-center">
                <p className="font-bold text-lg">Name</p>
              </div>
              <div className="col-span-2 flex justify-center items-center">
                <p className="font-bold text-lg">Time</p>
              </div>
              <div className="col-span-1 flex justify-center items-center">
                <p className="font-bold text-lg">Meal</p>
              </div>
              <div className="col-span-2 flex justify-center items-center">
                <p className="font-bold text-lg">Date</p>
              </div>
            </div>
            {userMedicines ? (
              userMedicines?.map((medicine) => (
                <MedicinesCart
                  key={medicine._id}
                  medicine={medicine}
                  handleDeleteMedicine={handleDeleteMedicine}
                ></MedicinesCart>
              ))
            ) : (
              <p>No data</p>
            )}
          </div>
          <div className=" w-[40px] hover:w-[100px] bottom-[10%]  right-0 fixed">
            <div
              onClick={onOpen}
              className="  flex w-full justify-center items-end mb-4 mt-8"
            >
              <button className=" side-btn flex justify-center items-center gap-3 px-2 text-black py-3 w-full  font-semibold hover:scale-105 ">
                <p className="hidden hover:block">Add</p> <IoMdAdd></IoMdAdd>
              </button>
            </div>
          </div>
          {/* <SideButton></SideButton> */}
          <AddMedicinesModal
            isOpen={isOpen}
            onOpen={onOpen}
            onClose={onClose}
          ></AddMedicinesModal>
        </div>
      ) : (
        <div>
          <p>Loading</p>
        </div>
      )}
    </div>
  );
};

export default MedicinesPage;
