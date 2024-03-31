import React, { useContext, useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
} from "@chakra-ui/react";
import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from "@chakra-ui/react";
import { Context } from "../provider/DataProvide";
import { TbMedicineSyrup } from "react-icons/tb";
import { FaTablets } from "react-icons/fa6";
import { BiSolidInjection } from "react-icons/bi";
import Swal from "sweetalert2";
const AddMedicinesModal = ({ isOpen, onOpen, onClose }) => {
  const { loggedUser, date, setUpdateMedicines, updateMedicines } = useContext(Context);

  const [medicineType, setMedicineType] = useState("");
  // console.log(loggedUser)

  const [medicinesFormatData, setMedicinesFormatData] = useState({
    name: "",
    type: "",
    meal: "",
    startingDate: "",
    endingDate: "",
  });
  const [formData, setFormData] = useState({
    morning: false,
    noon: false,
    night: false,
  });

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: checked,
    }));
  };
  const handleMedicinesDataChange = (e) => {
    const { name, value } = e.target;
    setMedicinesFormatData({
      ...medicinesFormatData,
      [name]: value,
    });
  };

  const handleAddMedicines = async (e) => {
    e.preventDefault();
    const medicineData = {
      userId:loggedUser.userId,
      ...medicinesFormatData,
      type: medicineType,
      ...formData,
    };
    console.log(medicineData);
    if (medicineData) {
      console.log('enter')
      try {
        const response = await fetch(
          "https://healthcare-2fif.onrender.com/addmedicine",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(medicineData),
          }
        );
        const data = await response.json();
        console.log(data);
        if (data.acknowledged) {
          onClose();
          console.log("updated");
          setUpdateMedicines(updateMedicines + 1);
          Swal.fire({
            title: "Good Job!",
            text: "Successfully Medicines information added.",
            icon: "success",
          });
          setMedicinesFormatData({
            name: "",
            type: "",
            meal: "",
            startingDate: "",
            endingDate: "",
          });
          setFormData({
            morning: false,
            noon: false,
            night: false,
          });
        }
      } catch (error) {
        console.log(error)
      }
    }
  };

  return (
    <div>
      <>
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <div className="bg rounded-md">
              <ModalHeader>
                <h1 className="text-2xl mt-4">Add Your Medicines</h1>
              </ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <div>
                  <form
                    onSubmit={handleAddMedicines}
                    className=" shadow-md rounded px-8 pt-6 pb-8 mb-4"
                  >
                    <h1 className="text-center text-xl font-semibold mb-5 text-red-600">
                      Medicines Information
                    </h1>

                    <div>
                      <label
                        className="block text-gray-700 text-sm font-bold mb-2"
                        htmlFor="name"
                      >
                        Medicines Name
                      </label>
                      <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="name"
                        name="name"
                        type="text"
                        placeholder="Enter medicine name"
                        value={medicinesFormatData.name}
                        onChange={handleMedicinesDataChange}
                        required
                      />
                    </div>
                    <div className="mt-4">
                      <label
                        className="block text-gray-700 text-sm font-bold mb-2"
                        htmlFor="bloodO2"
                      >
                        Medicines Type
                      </label>
                      <div className="flex justify-around items-center gap-4 ">
                        <div
                          onClick={() => setMedicineType("Tablet")}
                          className={`flex flex-col w-[90px] h-[90px] justify-center items-center   rounded-[10px] ${
                            medicineType === "Tablet"
                              ? "border-pink-600 border-[1px]"
                              : ""
                          } bg-white `}
                        >
                          <FaTablets className="text-lg text-pink-500"></FaTablets>
                          <p className="text-xs ">Tablet</p>
                        </div>
                        <div
                          onClick={() => setMedicineType("Syrup")}
                          className={`flex flex-col w-[90px] h-[90px] justify-center items-center  rounded-[10px] bg-white ${
                            medicineType === "Syrup"
                              ? "border-pink-600 border-[1px]"
                              : ""
                          } `}
                        >
                          <TbMedicineSyrup className="text-lg text-pink-500"></TbMedicineSyrup>
                          <p className="text-xs ">Syrup</p>
                        </div>
                        <div
                          onClick={() => setMedicineType("Injection")}
                          className={`flex flex-col w-[90px] h-[90px] justify-center items-center  rounded-[10px] bg-white ${
                            medicineType === "Injection"
                              ? "border-pink-600 border-[1px]"
                              : ""
                          } `}
                        >
                          <BiSolidInjection className="text-lg text-pink-500"></BiSolidInjection>
                          <p className="text-xs ">Injection</p>
                        </div>
                      </div>
                    </div>
                    <div className="mb-4"></div>
                    <label
                      className="block text-gray-700 text-sm font-bold mb-2"
                      htmlFor="bloodO2"
                    >
                      Medicines Times
                    </label>
                    <div className="space-y-2 flex justify-between items-center">
                      <div>
                        <label className="flex items-center">
                          <input
                            type="checkbox"
                            name="morning"
                            checked={formData.morning}
                            onChange={handleCheckboxChange}
                            className="form-checkbox h-5 w-5 text-pink-600"
                          />
                          <span className="ml-2">Morning</span>
                        </label>
                      </div>
                      <div>
                        <label className="flex items-center">
                          <input
                            type="checkbox"
                            name="noon"
                            checked={formData.noon}
                            onChange={handleCheckboxChange}
                            className="form-checkbox h-5 w-5 text-pink-600"
                          />
                          <span className="ml-2">Noon</span>
                        </label>
                      </div>
                      <div>
                        <label className="flex items-center">
                          <input
                            type="checkbox"
                            name="night"
                            checked={formData.night}
                            onChange={handleCheckboxChange}
                            className="form-checkbox h-5 w-5 text-pink-600"
                          />
                          <span className="ml-2">Evening</span>
                        </label>
                      </div>
                    </div>
                    <div className="mt-4">
                      <label
                        className="block text-gray-700 text-sm font-bold mb-2"
                        htmlFor="startingDate"
                      >
                        After Meal or Before Meal
                      </label>
                      <select
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="meal"
                        name="meal"
                        value={medicinesFormatData.meal}
                        onChange={handleMedicinesDataChange}
                        required
                      >
                        <option value="">Select a time</option>
                        <option value="After Meal">After Meal</option>
                        <option value="Before Meal">Before Meal</option>
                        {/* Add more options as needed */}
                      </select>
                    </div>

                    <div className="flex justify-between items-center gap-4 mt-4 mb-4">
                      <div>
                        <label
                          className="block text-gray-700 text-sm font-bold mb-2"
                          htmlFor="bloodPressure"
                        >
                          Starting date
                        </label>
                        <input
                          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                          id="startingDate"
                          name="startingDate"
                          type="text"
                          value={medicinesFormatData.startingDate}
                          onChange={handleMedicinesDataChange}
                          placeholder="date"
                          required
                        />
                      </div>
                      <div>
                        <label
                          className="block text-gray-700 text-sm font-bold mb-2"
                          htmlFor="bloodPressure"
                        >
                          Ending Date
                        </label>
                        <input
                          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                          id="endingDate"
                          name="endingDate"
                          type="text"
                          value={medicinesFormatData.endingDate}
                          onChange={handleMedicinesDataChange}
                          placeholder="date"
                          required
                        />
                      </div>
                    </div>
                    <div className="flex items-center justify-center">
                      <button
                        className="btn w-full text-black font-bold py-2 px-4 hover:scale-105 rounded focus:outline-none focus:shadow-outline"
                        type="submit"
                      >
                        ADD
                      </button>
                    </div>
                  </form>
                </div>
              </ModalBody>
            </div>
          </ModalContent>
        </Modal>
      </>
    </div>
  );
};

export default AddMedicinesModal;
