import React from "react";
import { BiSolidInjection } from "react-icons/bi";
import { FaTablets } from "react-icons/fa6";
import { TbMedicineSyrup } from "react-icons/tb";

const MedicinesCart = ({ medicine }) => {
  console.log(medicine);
  const {
    _id,
    name,
    type,
    meal,
    startingDate,
    endingDate,
    morning,
    noon,
    night,
  } = medicine;
  return (
    <div className="w-full grid grid-cols-8 bg-white rounded-xl shadow-xl border border-[#E8E7E7] py-5">
      <div className="col-span-1">
        {type === "Tablet" && (
          <div className="flex justify-center items-center">
            <FaTablets className="text-2xl text-pink-500"></FaTablets>
          </div>
        )}
        {type === "Syrup" && (
          <div className="flex justify-center items-center">
            <TbMedicineSyrup className="text-lg text-pink-500"></TbMedicineSyrup>
          </div>
        )}
        {type === "Injection" && (
          <div className="flex justify-center items-center">
            <BiSolidInjection className="text-lg text-pink-500"></BiSolidInjection>
          </div>
        )}
      </div>
      <div className="col-span-2 flex justify-center items-center">
        <p>{name}</p>
      </div>
      <div className="col-span-2 flex justify-center items-center gap-3">
        <div className="w-[15px] h-[15px] rounded-full">
          {morning ? (
            <div className="w-full h-full rounded-full bg-green-600"></div>
          ) : (
            <div className="w-full h-full rounded-full bg-red-600"></div>
          )}
        </div>
        <div className="w-[15px] h-[15px] rounded-full">
          {noon ? (
            <div className="w-full h-full rounded-full bg-green-600"></div>
          ) : (
            <div className="w-full h-full rounded-full bg-red-600"></div>
          )}
        </div>
        <div className="w-[15px] h-[15px] rounded-full">
          {night ? (
            <div className="w-full h-full rounded-full bg-green-600"></div>
          ) : (
            <div className="w-full h-full rounded-full bg-red-600"></div>
          )}
        </div>
      </div>
      <div className="col-span-1 flex justify-center items-center">
        <p>{meal}</p>
      </div>
      <div className="col-span-2 flex flex-col justify-center items-center">
      <p>Start: {startingDate}</p>
      <p>End:{endingDate}</p>
      </div>
    </div>
  );
};

export default MedicinesCart;
