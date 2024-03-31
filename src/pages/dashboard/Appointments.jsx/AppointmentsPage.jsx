import React from 'react';
import { IoMdAdd } from 'react-icons/io';

const AppointmentsPage = () => {
  return (
    <div className="relative h-full w-full">
    <div className="absolute w-[200px] bottom-0 right-0 mr-6 2xl:mr-16">
      <div className="  flex w-full justify-center items-end mb-4 mt-8">
        <button className=" btn flex justify-center items-center gap-3 px-2 text-black py-3 w-full rounded-[10px] font-semibold hover:scale-105">
          <p>Add</p> <IoMdAdd></IoMdAdd>
        </button>
      </div>
    </div>
  </div>
  );
};

export default AppointmentsPage;