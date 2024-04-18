import React, { useContext, useEffect, useState } from "react";
import { CiPillsBottle1 } from "react-icons/ci";
import { MdBloodtype } from "react-icons/md";

import AddDataModal from "../../../components/AddDataModal";
import { useDisclosure } from "@chakra-ui/react";
import { Context } from "../../../provider/DataProvide";
import { IoMdAdd } from "react-icons/io";

const DashboardPage = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { userBloodPressure, userBloodSugar, userBloodO2, userMeasurements } =
    useContext(Context);
  console.log(userBloodPressure, userBloodSugar, userBloodO2, userMeasurements);
  return (
    <div className="grid grid-cols-4 relative w-full h-full">
      <div className="col-span-3 mr-4 2xl:mr-6">
        <div className="grid grid-cols-3 gap-4">
          <div className=" px-3 py-5 2xl:px-5 2xl:py-7 bg-white rounded-xl shadow-xl border border-[#E8E7E7]">
            <div className="flex justify-center gap-2 items-center">
              <div className="w-[30px] h-[30px] bg-[#D6FFDD] rounded-lg flex justify-center items-center">
                <CiPillsBottle1 className="text-green-700" />
              </div>
              <h1 className="text-sm 2xl:text-base font-semibold">
                Blood Oxygen
              </h1>
            </div>
            {userBloodO2 ? (
              <>
                <div className="flex justify-between items-center">
                  <div className=" flex justify-center items-center gap-2 mt-4 ">
                    <h1 className=" text-[25px] 2xl:text-[32px] py-0">
                      {userBloodO2?.bloodO2}
                    </h1>
                    <p className="text-[#818181] text-sm 2xl:text-base">%</p>
                  </div>

                  <div
                    className={`px-2 py-1 flex justify-center items-center ${
                      userBloodO2?.condition === "Normal"
                        ? "bg-[#D6FFDD]"
                        : "bg-red-600 text-white"
                    } rounded`}
                  >
                    <h1 className="text-xs">{userBloodO2?.condition}</h1>
                  </div>
                </div>
              </>
            ) : (
              <>
                <h1 className="text-sm text-center text-red-700 mt-3">
                  Please update your information
                </h1>
              </>
            )}
          </div>
          <div className=" px-3 py-5 2xl:px-5 2xl:py-7 bg-white rounded-xl shadow-xl border border-[#E8E7E7]">
            <div className="flex justify-center gap-2 items-center">
              <div className="w-[30px] h-[30px] bg-[#F8DEBD] rounded-lg flex justify-center items-center">
                <CiPillsBottle1 className="text-[#E79B38]" />
              </div>
              <h1 className="text-sm 2xl:text-base font-semibold">
                Blood Sugar
              </h1>
            </div>
            {userBloodSugar ? (
              <>
                <div className="flex justify-between items-center">
                  <div className=" flex justify-center items-center gap-2 mt-4 ">
                    <h1 className=" text-[25px] 2xl:text-[32px] py-0">
                      {userBloodSugar?.bloodSugar}{" "}
                    </h1>
                    <p className="text-[#818181] text-sm 2xl:text-base">
                      mg/dl
                    </p>
                  </div>

                  <div
                    className={`px-2 py-1 flex justify-center items-center ${
                      userBloodSugar?.condition === "Normal"
                        ? "bg-[#F8DEBD]"
                        : "bg-red-600 text-white"
                    } rounded`}
                  >
                    <h1 className="text-xs">{userBloodSugar.condition}</h1>
                  </div>
                </div>
              </>
            ) : (
              <>
                <h1 className="text-sm text-center text-red-700 mt-3">
                  Please update your information
                </h1>
              </>
            )}
          </div>

          <div className=" px-3 py-5 2xl:px-5 2xl:py-7 bg-white rounded-xl shadow-xl border border-[#E8E7E7]">
            <div className="flex justify-center gap-2 items-center">
              <div className="w-[30px] h-[30px] bg-[#D0fbff] rounded-lg flex justify-center items-center">
                <MdBloodtype className="text-[#478F96]" />
              </div>
              <h1 className="text-sm 2xl:text-base font-semibold">
                Blood Pressure
              </h1>
            </div>
            {userBloodPressure ? (
              <>
                <div className="flex justify-between items-center">
                  <div className=" flex justify-center items-center gap-2 mt-4 ">
                    <h1 className=" text-[25px] 2xl:text-[32px] py-0">
                      {userBloodPressure?.bloodHighPressure}{" "}
                    </h1>
                    <p className="text-[#818181] text-sm 2xl:text-base">
                      / {userBloodPressure?.bloodLowPressure} mmgh
                    </p>
                  </div>

                  <div
                    className={`px-2 py-1 flex justify-center items-center ${
                      userBloodPressure?.condition === "Normal"
                        ? "bg-[#D0fbff]"
                        : "bg-red-600 text-white"
                    } rounded`}
                  >
                    <h1 className="text-xs">{userBloodPressure.condition}</h1>
                  </div>
                </div>
              </>
            ) : (
              <>
                <h1 className="text-sm text-center text-red-700 mt-3">
                  Please update your information
                </h1>
              </>
            )}
          </div>
        </div>
        <div className="bg-white h-[100px] rounded-xl shadow-xl border border-[#E8E7E7] mt-6">
          <h1 className="text-center font-bold text-xl 2xl:text-2xl mt-2">
            Medicines
          </h1>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-xl border border-[#E8E7E7] mt-6">
          <h1>Appointments</h1>
        </div>
      </div>
      <div className="col-span-1 flex flex-col mr-3">
        <div className="">
          <div className="w-full bg-black rounded-xl p-3 py-7 2xl:py-5 2xl:p-5 shadow-xl">
            <h1 className="text-white text-lg 2xl:text-[22px] ">
              BMI Calculator
            </h1>

            <div className=" flex flex-col gap-3 mt-5">
              <div className="flex justify-between items-center bg-[#F8DEBD] rounded-xl 2xl:px-5 2xl:py-6 px-4 py-5">
                <p className="text-black text-sm 2xl:text-base">Height </p>
                {userMeasurements?.height ? (
                  <p className="text-black text-sm 2xl:text-base">
                    {userMeasurements?.height} ft
                  </p>
                ) : (
                  <h1 className="text-sm text-center text-red-700 mt-3">
                    No Data
                  </h1>
                )}
              </div>
              <div className="flex justify-between items-center bg-[#D0FBFF] rounded-xl 2xl:px-5 2xl:py-6 px-4 py-5">
                <p className="text-black text-sm 2xl:text-base">Weight </p>
                {userMeasurements?.weight ? (
                  <p className="text-black text-sm 2xl:text-base">
                    {userMeasurements?.weight} kg                    
                  </p>
                ) : (
                  <h1 className="text-sm text-center text-red-700 mt-3">
                    No Data
                  </h1>
                )}
              </div>

              <div className=" bg-[#4A4949] rounded-xl 2xl:px-5 2xl:py-6 px-4 py-5">
                <h1 className="text-white text-sm 2xl:text-base">
                  Body Mass Index (BMI)
                </h1>

                <div className="flex justify-between items-center mt-5">
                  <div>
                    {userMeasurements?.bmi ? (
                      <h1 className="text-white text-sm">
                        {userMeasurements?.bmi}
                      </h1>
                    ) : (
                      <h1 className="text-sm text-center text-red-700 mt-3">
                        No Data
                      </h1>
                    )}
                  </div>
                  <div
                    className={`px-2 py-1 flex justify-center items-center ${
                      userMeasurements?.condition === "Healthy"
                        ? "bg-[#D6FFDD]"
                        : "bg-red-600 text-white"
                    }  rounded`}
                  >
                    <h1 className="text-xs">
                      You are {userMeasurements?.condition}
                    </h1>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <AddDataModal
        isOpen={isOpen}
        onOpen={onOpen}
        onClose={onClose}
      ></AddDataModal>
      <div className="absolute w-[200px] bottom-0 right-0 mr-5 2xl:mr-16"> 
        <div className="flex w-full justify-center items-end mb-4 mt-8">
          <button
            onClick={onOpen}
            className=" btn flex justify-center items-center gap-3 text-black py-3 w-full px-2 rounded-[10px] font-semibold hover:scale-105"
          >
            <p>Update</p> <IoMdAdd></IoMdAdd>
          </button>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
