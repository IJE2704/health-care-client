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
import Swal from "sweetalert2";
import { baseurl } from "../constants/baseUrl";
const AddDataModal = ({ isOpen, onOpen, onClose }) => {
  const { loggedUser, date, setUpdate, update } = useContext(Context);
  const [updateO2, setUpdateO2] = useState(false);
  const [updateSugar, setUpdateSugar] = useState(false);
  const [updatePressure, setUpdatePressure] = useState(false);
  // console.log(loggedUser)
  const [bloodFormData, setBloodFormData] = useState({
    bloodO2: "",
    bloodSugar: "",
    bloodHighPressure: "",
    bloodLowPressure: "",
  });

  const [mesureMentsFormData, setMesureMentsFormData] = useState({
    weight: "",
    height: "",
  });

  const handleBloodChange = (e) => {
    const { name, value } = e.target;
    setBloodFormData({
      ...bloodFormData,
      [name]: value,
    });
  };

  const handlMesurementChange = (e) => {
    const { name, value } = e.target;
    setMesureMentsFormData({
      ...mesureMentsFormData,
      [name]: value,
    });
  };

  const handleBloodDataSubmit = async (e) => {
    console.log("first");
    e.preventDefault();

    const bloodInformation = {
      userId: loggedUser.userId,
      bloodO2: bloodFormData.bloodO2,
      bloodSugar: bloodFormData.bloodSugar,
      bloodHighPressure: bloodFormData.bloodHighPressure,
      bloodLowPressure: bloodFormData.bloodLowPressure,
      date: date,
    };

    try {
      const response = await fetch(`${baseurl}/add/blood/information`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bloodInformation),
      });
      const data = await response.json();
      console.log(data);
      if (data.insertedId) {
        onClose();
        console.log("updated");
        setUpdate(update + 1);
        Swal.fire({
          title: "Good Job!",
          text: "Successfully Blood information added.",
          icon: "success",
        });
        setBloodFormData({
          bloodO2: "",
          bloodSugar: "",
          bloodHighPressure: "",
          bloodLowPressure: "",
        });
      } else {
        <Alert status="error">
          <AlertIcon />
          There was an error processing your request
        </Alert>;
      }
    } catch (error) {
      console.log(error);
    }
    
  };

  const handleMesurementsSubmit = async (e) => {
    console.log("2nd");
    e.preventDefault();
    console.log(mesureMentsFormData);

    if (mesureMentsFormData.height && mesureMentsFormData.weight) {
      const newMeasurementsData = {
        userId: loggedUser.userId,
        height: mesureMentsFormData.height,
        weight: mesureMentsFormData.weight,
        date: date,
      };
      // console.log(newBloodSugarData)
      try {
        const response = await fetch(`${baseurl}/addmeasurements`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newMeasurementsData),
        });
        const data = await response.json();
        console.log(data);
        if (data.acknowledged) {
          onClose();
          console.log("updated");
          setUpdate(update + 1);
          Swal.fire({
            title: "Good Job!",
            text: "Successfully Measurements information added.",
            icon: "success",
          });
          setMesureMentsFormData({
            height: "",
            weight: "",
          });
        } else {
          Swal.fire({
            title: "Sorry!",
            text: "Something is wrong.",
            icon: "error",
          });
          setMesureMentsFormData({
            height: "",
            weight: "",
          });
        }
        // console.log(data)
      } catch (error) {}
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
                <h1 className="text-2xl mt-4">Update Your Information</h1>
              </ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <div>
                  <form
                    onSubmit={handleBloodDataSubmit}
                    className=" shadow-md rounded px-8 pt-6 pb-8 mb-4"
                  >
                    <h1 className="text-center text-xl font-semibold mb-5 text-red-600">
                      Blood Information
                    </h1>
                    <div className="flex justify-center items-center gap-2 mb-4">
                      <div>
                        <label
                          className="block text-gray-700 text-sm font-bold mb-2"
                          htmlFor="bloodO2"
                        >
                          Oxygen Level (%)
                        </label>
                        <input
                          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                          id="bloodO2"
                          name="bloodO2"
                          type="number"
                          placeholder="Enter oxygen level"
                          value={bloodFormData.bloodO2}
                          onChange={handleBloodChange}
                          required
                        />
                      </div>
                      <div>
                        <label
                          className="block text-gray-700 text-sm font-bold mb-2"
                          htmlFor="bloodSugar"
                        >
                          Sugar Level (mmo/L)
                        </label>
                        <input
                          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                          id="bloodSugar"
                          name="bloodSugar"
                          type="number"
                          placeholder="Enter sugar level"
                          value={bloodFormData.bloodSugar}
                          onChange={handleBloodChange}
                          required
                        />
                      </div>
                    </div>
                    <div className="mb-4"></div>
                    <div className="flex justify-between items-center mb-4 gap-2">
                      <div>
                        <label
                          className="block text-gray-700 text-sm font-bold mb-2"
                          htmlFor="bloodPressure"
                        >
                          High Pressure (mmHg)
                        </label>
                        <input
                          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                          id="bloodHighPressure"
                          name="bloodHighPressure"
                          type="text"
                          value={bloodFormData.bloodHighPressure}
                          onChange={handleBloodChange}
                          placeholder="Enter high pressure level"
                          required
                        />
                      </div>
                      <div>
                        <label
                          className="block text-gray-700 text-sm font-bold mb-2"
                          htmlFor="bloodPressure"
                        >
                          Low Pressure (mmHg)
                        </label>
                        <input
                          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                          id="bloodLowPressure"
                          name="bloodLowPressure"
                          type="text"
                          value={bloodFormData.bloodLowPressure}
                          onChange={handleBloodChange}
                          placeholder="Enter low pressure level"
                          required
                        />
                      </div>
                    </div>
                    <div className="flex items-center justify-center">
                      <button
                        className="btn text-black font-bold py-2 px-4 hover:scale-105 rounded focus:outline-none focus:shadow-outline"
                        type="submit"
                      >
                        Update Levels
                      </button>
                    </div>
                  </form>
                </div>
                <div>
                  <form
                    onSubmit={handleMesurementsSubmit}
                    className=" shadow-md rounded px-8 pt-6 pb-8 mb-4"
                  >
                    <h1 className="text-center text-xl font-semibold mb-5 text-red-600">
                      Body Information
                    </h1>
                    <div className="flex justify-center items-center gap-2 mb-4">
                      <div>
                        <label
                          className="block text-gray-700 text-sm font-bold mb-2"
                          htmlFor="weight"
                        >
                          Weight (kg)
                        </label>
                        <input
                          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                          id="weight"
                          name="weight"
                          type="text"
                          placeholder="Enter weight"
                          value={mesureMentsFormData.weight}
                          onChange={handlMesurementChange}
                        />
                      </div>
                      <div>
                        <label
                          className="block text-gray-700 text-sm font-bold mb-2"
                          htmlFor="height"
                        >
                          Height (inch)
                        </label>
                        <input
                          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                          id="height"
                          name="height"
                          type="text"
                          placeholder="Enter height"
                          value={mesureMentsFormData.height}
                          onChange={handlMesurementChange}
                        />
                      </div>
                    </div>
                    <div className="mb-4"></div>

                    <div className="flex items-center justify-center">
                      <button
                        className="btn text-black font-bold py-2 px-4 hover:scale-105 rounded focus:outline-none focus:shadow-outline"
                        type="submit"
                      >
                        Update
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

export default AddDataModal;
