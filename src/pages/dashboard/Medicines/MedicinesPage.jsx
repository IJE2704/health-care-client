import { useDisclosure } from "@chakra-ui/react";
import React, { useContext } from "react";
import { IoMdAdd } from "react-icons/io";
import AddMedicinesModal from "../../../components/AddMedicinesModal";
import { Context } from "../../../provider/DataProvide";
import MedicinesCart from "../../../components/MedicinesCart";

const MedicinesPage = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { userMedicines } = useContext(Context);
  console.log(userMedicines)
  return (
    <div className="relative h-full w-full">
      <div className="mt-7 space-y-4">
        <div className="grid grid-cols-8">
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
        { userMedicines ? (

          userMedicines?.map(medicine => <MedicinesCart key={medicine._id} medicine={medicine}></MedicinesCart>)
        ):(
          <p>No data</p>
        )
        }
        
      </div>
      <div className="absolute w-[200px] bottom-0 right-0 mr-6 2xl:mr-16">
        <div
          onClick={onOpen}
          className="  flex w-full justify-center items-end mb-4 mt-8"
        >
          <button className=" btn flex justify-center items-center gap-3 px-2 text-black py-3 w-full rounded-[10px] font-semibold hover:scale-105 ">
            <p>Add</p> <IoMdAdd></IoMdAdd>
          </button>
        </div>
      </div>
      <AddMedicinesModal
        isOpen={isOpen}
        onOpen={onOpen}
        onClose={onClose}
      ></AddMedicinesModal>
     
    </div>
  );
};

export default MedicinesPage;
