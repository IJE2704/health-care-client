import React, { useContext, useEffect, useState } from "react";
import { CiPillsBottle1 } from "react-icons/ci";
import { MdBloodtype } from "react-icons/md";

import AddDataModal from "../../../components/AddDataModal";
import { useDisclosure } from "@chakra-ui/react";
import { Context } from "../../../provider/DataProvide";
import { IoMdAdd } from "react-icons/io";
import Calendar from "../../../components/Calender";

const DashboardPage = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    userMeasurements,
    userMedicines,
    morningMedicines,
    noonMedicines,
    nightMedicines,
    closeAppointMent,
    bloodInformation,
  } = useContext(Context);
  // console.log(bloodInformation)
  const {bloodPressureCondition,sugarConditon,oxygenCondition,bloodLowPressure,bloodHighPressure,bloodSugar,bloodO2} = bloodInformation;
  return (
    <div className="grid grid-cols-4 relative w-full h-full">
      <div className="col-span-3 mr-4 2xl:mr-6">
        <div className={`grid grid-cols-3 gap-4 ${bloodO2 || bloodHighPressure || bloodSugar ? '':'min-h-[150px] 2xl:min-h-[200px]'}`}>
          <div className={` px-3 py-5 2xl:px-5 2xl:py-7 bg-white rounded-xl shadow-xl border border-[#E8E7E7] ${oxygenCondition ==="High" || oxygenCondition === 'Low' ? "border-[1px] border-red-500":""}`}>
            <div className="flex justify-center gap-2 items-center">
              <div className="w-[30px] h-[30px] bg-[#D6FFDD] rounded-lg flex justify-center items-center">
                <CiPillsBottle1 className="text-green-700" />
              </div>
              <h1 className="text-sm 2xl:text-base font-semibold">
                Blood Oxygen
              </h1>
            </div>
            {bloodO2 ? (
              <>
                <div className={`flex justify-between items-center `}>
                  <div className=" flex justify-center items-center gap-2 mt-4 ">
                    <h1 className=" text-[25px] 2xl:text-[32px] py-0">
                      {bloodO2}
                    </h1>
                    <p className="text-[#818181] text-sm 2xl:text-base">%</p>
                  </div>

                  <div
                    className={`px-2 py-1 flex justify-center items-center ${
                      oxygenCondition === "Normal"
                        ? "bg-[#D6FFDD]"
                        : "bg-red-600 text-white"
                    } rounded`}
                  >
                    <h1 className="text-xs">{oxygenCondition}</h1>
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
          <div className={` px-3 py-5 2xl:px-5 2xl:py-7 bg-white rounded-xl shadow-xl border border-[#E8E7E7] ${sugarConditon ==="High" || sugarConditon === 'Low' ? "border-[1px] border-red-500":""}`}>
            <div className="flex justify-center gap-2 items-center">
              <div className="w-[30px] h-[30px] bg-[#F8DEBD] rounded-lg flex justify-center items-center">
                <CiPillsBottle1 className="text-[#E79B38]" />
              </div>
              <h1 className="text-sm 2xl:text-base font-semibold">
                Blood Sugar
              </h1>
            </div>
            {bloodSugar ? (
              <>
                <div className="flex justify-between items-center">
                  <div className=" flex justify-center items-center gap-2 mt-4 ">
                    <h1 className=" text-[25px] 2xl:text-[32px] py-0">
                      {bloodSugar}{" "}
                    </h1>
                    <p className="text-[#818181] text-sm 2xl:text-base">
                      mmo/L
                    </p>
                  </div>

                  <div
                    className={`px-2 py-1 flex justify-center items-center ${
                      sugarConditon === "Normal"
                        ? "bg-[#F8DEBD]"
                        : "bg-red-600 text-white"
                    } rounded`}
                  >
                    <h1 className="text-xs">{sugarConditon}</h1>
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

          <div className={` px-3 py-5 2xl:px-5 2xl:py-7 bg-white rounded-xl shadow-xl border border-[#E8E7E7] ${bloodPressureCondition ==="High" || bloodPressureCondition === 'Low' ? "border-[1px] border-red-500":""}`}>
            <div className="flex justify-center gap-2 items-center">
              <div className="w-[30px] h-[30px] bg-[#D0fbff] rounded-lg flex justify-center items-center">
                <MdBloodtype className="text-[#478F96]" />
              </div>
              <h1 className="text-sm 2xl:text-base font-semibold">
                Blood Pressure
              </h1>
            </div>
            {bloodHighPressure ? (
              <>
                <div className="flex justify-between items-center">
                  <div className=" flex justify-center items-center gap-2 mt-4 ">
                    <h1 className=" text-[25px] 2xl:text-[32px] py-0">
                      {bloodHighPressure}{" "}
                    </h1>
                    <p className="text-[#818181] text-sm 2xl:text-base">
                      / {bloodLowPressure} mmgh
                    </p>
                  </div>

                  <div
                    className={`px-2 py-1 flex justify-center items-center ${
                      bloodPressureCondition === "Normal"
                        ? "bg-[#D0fbff]"
                        : "bg-red-600 text-white"
                    } rounded`}
                  >
                    <h1 className="text-xs">{bloodPressureCondition}</h1>
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
        <div className="bg-white min-h-[200px] 2xl:min-h-[300px] rounded-xl shadow-xl border border-[#E8E7E7] mt-6">
          <h1 className="text-center text-[#6A040f] font-bold text-xl 2xl:text-2xl my-5">
            Medicines
          </h1>
          <div>
            {userMedicines.length === 0 ? (
              <>
                <h1 className="text-center text-xl font-semibold my-8 text-red-500 ">
                  You dont have any medicines
                </h1>
              </>
            ) : (
              <>
                <div className="grid grid-cols-3 ">
                  <div className="col-span-1 border-r border-r-pink-500">
                    <div className="flex justify-center items-center border-b  bg-[#c7b3d4]">
                      <h1 className="text-center font-medium  py-2">Morning</h1>
                    </div>
                    <div className="p-5">
                      {morningMedicines?.map((medicine) => (
                        <div
                          key={medicine._id}
                          className="flex justify-between items-center"
                        >
                          <h1 className="text-base 2xl:text-xl font-medium italic">
                            {medicine.name}
                          </h1>
                          <h1 className="text-xs 2xl:text-sm">
                            {medicine.meal}
                          </h1>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="col-span-1 border-r border-r-pink-500">
                    <div className="flex justify-center items-center border-b  bg-[#F8DEBD]">
                      <h1 className="text-center font-medium  py-2">Noon</h1>
                    </div>
                    <div className="p-5">
                      {noonMedicines?.map((medicine) => (
                        <div
                          key={medicine._id}
                          className="flex justify-between items-center"
                        >
                          <h1 className="text-base 2xl:text-xl font-medium italic">
                            {medicine.name}
                          </h1>
                          <h1 className="text-xs 2xl:text-sm">
                            {medicine.meal}
                          </h1>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="col-span-1 border-r ">
                    <div className="flex justify-center items-center border-b  bg-[#c7b3d4]">
                      <h1 className="text-center font-medium  py-2">Night</h1>
                    </div>
                    <div className="p-5">
                      {nightMedicines?.map((medicine) => (
                        <div
                          key={medicine._id}
                          className="flex justify-between items-center"
                        >
                          <h1 className="text-base 2xl:text-xl font-medium italic">
                            {medicine.name}
                          </h1>
                          <h1 className="text-xs 2xl:text-sm">
                            {medicine.meal}
                          </h1>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-xl border border-[#E8E7E7] mt-6">
          <h1 className="text-center font-bold text-[#6A040f]">
            Upcoming Appointment
          </h1>

          {closeAppointMent ? (
            <>
              <div className="grid grid-cols-5 mt-5">
                <div className="col-span-1 flex justify-center items-center">
                  <p className="text-xl font-bold">
                    For {closeAppointMent.reason}
                  </p>
                </div>
                <div className="col-span-1 flex justify-center items-center">
                  <p className="text-base font-medium italic">
                    with {closeAppointMent.name}
                  </p>
                </div>
                <div className="col-span-1 flex justify-center items-center">
                  <p className="text-base  italic">
                    in {closeAppointMent.location}
                  </p>
                </div>
                <div className="col-span-1 flex justify-center items-center">
                  <p className="text-base font-bold italic">
                    at {closeAppointMent.time}
                  </p>
                </div>
                <div className="col-span-1 flex justify-center items-center">
                  <p className="text-base font-bold text-[#366e71]">
                    on {closeAppointMent.date}
                  </p>
                </div>
              </div>
            </>
          ) : (
            <>
              <h1 className="text-center text-xl font-semibold my-8 text-red-500 ">
                You dont have any appointment
              </h1>
            </>
          )}
        </div>
      </div>
      <div className="col-span-1 flex flex-col gap-3 mr-3">
        <div className="">
          <div className="w-full bg-[#6D597A] rounded-xl p-3 py-4 2xl:py-5 2xl:p-5 shadow-xl">
            <h1 className="text-white text-lg 2xl:text-[22px] ">
              BMI Calculator
            </h1>

            <div className=" flex flex-col gap-3 mt-2 2xl:mt-5">
              <div className="flex justify-between items-center bg-[#F8DEBD] rounded-xl 2xl:px-5 2xl:py-6 px-3 py-3">
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
              <div className="flex justify-between items-center bg-[#D0FBFF] rounded-xl 2xl:px-5 2xl:py-6 px-3 py-3">
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

              <div className=" bg-[#4A4949] rounded-xl 2xl:px-5 2xl:py-6 px-3 py-3">
                <h1 className="text-white text-sm 2xl:text-base">
                  Body Mass Index (BMI)
                </h1>

                <div className="flex justify-between items-center mt-2 2xl:mt-5 ">
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
        <div className="bg-white rounded-xl p-4 shadow-xl">
          <Calendar></Calendar>
        </div>
        <div className="flex w-full justify-center items-end mb-4 mt-4">
          <button
            onClick={onOpen}
            className=" btn flex justify-center items-center gap-3 text-black py-3 w-full px-2 rounded-[10px] font-semibold hover:scale-105"
          >
            <p>Update</p> <IoMdAdd></IoMdAdd>
          </button>
        </div>
      </div>
      <AddDataModal
        isOpen={isOpen}
        onOpen={onOpen}
        onClose={onClose}
      ></AddDataModal>
    </div>
  );
};

export default DashboardPage;
