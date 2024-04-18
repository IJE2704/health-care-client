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
const AddAppointMentsModal = ({ isOpen, onOpen, onClose }) => {
  const { loggedUser, date, updateAppointments, setUpdateAppointments } =
    useContext(Context);

  const [medicineType, setMedicineType] = useState("");
  // console.log(loggedUser)

  const [appointmentData, setAppointmentData] = useState({
    reason: "",
    name: "",
    location: "",
    time: "",
    date: "",
  });


  const handleMedicinesDataChange = (e) => {
    const { name, value } = e.target;
    setAppointmentData({
      ...appointmentData,
      [name]: value,
    });
  };

  const handleAddAppointments = async (e) => {
    e.preventDefault();
    const appointment = {
      userId: loggedUser.userId,
      ...appointmentData,
    };
    console.log(appointment);
    if (appointment) {
      console.log("enter");
      try {
        const response = await fetch(
          "https://healthcare-2fif.onrender.com/addappointment",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(appointment),
          }
        );
        const data = await response.json();
        console.log(data);
        if (data.acknowledged) {
          onClose();
          console.log("updated");
          setUpdateAppointments(updateAppointments + 1);
          Swal.fire({
            title: "Good Job!",
            text: "Successfully set appointments.",
            icon: "success",
          });
          setAppointmentData({
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
        console.log(error);
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
                <h1 className="text-2xl mt-4">Set your appointments</h1>
              </ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <div>
                  <form
                    onSubmit={handleAddAppointments}
                    className=" shadow-md rounded px-8 pt-6 pb-8 mb-4"
                  >
                    <h1 className="text-center text-xl font-semibold mb-5 text-red-600">
                      Appointment Information
                    </h1>

                    <div className="mt-5">
                      <label
                        className="block text-gray-700 text-sm font-bold mb-2"
                        htmlFor="name"
                      >
                        Reason
                      </label>
                      <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="reason"
                        name="reason"
                        type="text"
                        placeholder="Enter reason"
                        value={appointmentData.reason}
                        onChange={handleMedicinesDataChange}
                        required
                      />
                    </div>

                    <div className="mt-5">
                      <label
                        className="block text-gray-700 text-sm font-bold mb-2"
                        htmlFor="name"
                      >
                        Doctor Name
                      </label>
                      <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="name"
                        name="name"
                        type="text"
                        placeholder="Enter doctor name"
                        value={appointmentData.name}
                        onChange={handleMedicinesDataChange}
                        required
                      />
                    </div>
                    <div className="mt-5">
                      <label
                        className="block text-gray-700 text-sm font-bold mb-2"
                        htmlFor="name"
                      >
                        Location
                      </label>
                      <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="location"
                        name="location"
                        type="text"
                        placeholder="Enter location"
                        value={appointmentData.location}
                        onChange={handleMedicinesDataChange}
                        required
                      />
                    </div>
                    <div className="flex gap-4 mt-5">
                      <div>
                        <label
                          className="block text-gray-700 text-sm font-bold mb-2"
                          htmlFor="name"
                        >
                          Time
                        </label>
                        <input
                          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                          id="time"
                          name="time"
                          type="time"
                          placeholder="Enter time"
                          value={appointmentData.time}
                          onChange={handleMedicinesDataChange}
                          required
                        />
                      </div>
                      <div>
                        <label
                          className="block text-gray-700 text-sm font-bold mb-2"
                          htmlFor="name"
                        >
                         Date
                        </label>
                        <input
                          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                          id="date"
                          name="date"
                          type="date"
                          placeholder="Enter date"
                          value={appointmentData.date}
                          onChange={handleMedicinesDataChange}
                          required
                        />
                      </div>
                    </div>

                    <div className="flex items-center justify-center mt-5">
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

export default AddAppointMentsModal;
