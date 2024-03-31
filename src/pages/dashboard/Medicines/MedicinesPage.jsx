import { useDisclosure } from "@chakra-ui/react";
import React, { useContext } from "react";
import { IoMdAdd } from "react-icons/io";
import AddMedicinesModal from "../../../components/AddMedicinesModal";
import { Context } from "../../../provider/DataProvide";

const MedicinesPage = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {userMedicines} = useContext(Context);
  return (
    <div className="relative h-full w-full">
      <div className="absolute w-[200px] bottom-0 right-0 mr-6 2xl:mr-16">
        <div onClick={onOpen} className="  flex w-full justify-center items-end mb-4 mt-8">
          <button className=" btn flex justify-center items-center gap-3 px-2 text-black py-3 w-full rounded-[10px] font-semibold hover:scale-105 ">
            <p>Add</p> <IoMdAdd></IoMdAdd>
          </button>
        </div>
      </div>
      <AddMedicinesModal isOpen={isOpen} onOpen={onOpen} onClose={onClose}></AddMedicinesModal>
      <div>
<h1>{userMedicines.length}</h1>
      </div>
    </div>
  );
};

export default MedicinesPage;
