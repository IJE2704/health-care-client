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
const AddReportsModal = ({ isOpen, onOpen, onClose, props }) => {
  const { loggedUser, date, updateReports, setUpdateReports } =
    useContext(Context);

  const [medicineType, setMedicineType] = useState("");
  // console.log(loggedUser)

  const [reportsData, setReportsData] = useState({
    name: "",
    img: "",
  });

  const handleMedicinesDataChange = (e) => {
    const { name, value } = e.target;
    setReportsData({
      ...reportsData,
      [name]: value,
    });
  };

  const handleAddAppointments = async (e) => {
    e.preventDefault();
    const appointment = {
      userId: loggedUser.userId,
      ...reportsData,
    };
    console.log(appointment);
    if (appointment) {
      console.log("enter");
      try {
        const response = await fetch(
          "https://healthcare-2fif.onrender.com/addreport",
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
          setUpdateReports(updateReports + 1);
          Swal.fire({
            title: "Good Job!",
            text: "Successfully set appointments.",
            icon: "success",
          });
          setReportsData({
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
                {props.addReport && (
                  <h1 className="text-2xl mt-4">Keep your reports safely</h1>
                )}
                {props.showReport && (
                  <h1 className="text-2xl mt-4 text-center">
                    {props.report.name}
                  </h1>
                )}
              </ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                {props.addReport && (
                  <div>
                    <form
                      onSubmit={handleAddAppointments}
                      className=" shadow-md rounded px-8 pt-6 pb-8 mb-4"
                    >
                      <h1 className="text-center text-xl font-semibold mb-5 text-red-600">
                        Reports Information
                      </h1>

                      <div className="mt-5">
                        <label
                          className="block text-gray-700 text-sm font-bold mb-2"
                          htmlFor="name"
                        >
                          Reports Name
                        </label>
                        <input
                          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                          id="name"
                          name="name"
                          type="text"
                          placeholder="Enter doctor name"
                          value={reportsData.name}
                          onChange={handleMedicinesDataChange}
                          required
                        />
                      </div>
                      <div className="mt-5">
                        <label
                          className="block text-gray-700 text-sm font-bold mb-2"
                          htmlFor="name"
                        >
                          Img Url
                        </label>
                        <input
                          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                          id="img"
                          name="img"
                          type="text"
                          placeholder="Enter location"
                          value={reportsData.img}
                          onChange={handleMedicinesDataChange}
                          required
                        />
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
                )}

                {props.showReport && (
                  <div className="w-full h-full p-5">
                    <img className="w-full h-full object-cover" src={props.report.img} alt="" />
                  </div>
                )}
              </ModalBody>
            </div>
          </ModalContent>
        </Modal>
      </>
    </div>
  );
};

export default AddReportsModal;
