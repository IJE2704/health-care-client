import React, { useState } from 'react';
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
const AddDataModal = ({ isOpen, onOpen, onClose } ) => {
  const [bloodFormData, setBloodFormData] = useState({
    bloodO2: "",
    bloodSugar: "",
    bloodHighPressure: "",
    bloodLowPressure: "",
  });

  const handleBloodChange = (e) => {
    const { name, value } = e.target;
    setBloodFormData({
      ...bloodFormData,
      [name]: value,
    });
  };

  const handleBloodDataSubmit = (e) => {
    console.log("first")
    e.preventDefault;
    console.log(bloodFormData);
  };
  return (
    <div>
      <>
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <div className="bg rounded-md">
              <ModalHeader>
                <h1 className="text-center">Updae Your Information</h1>
              </ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <div>
                  <form onSubmit={handleBloodChange} className=" shadow-md rounded px-8 pt-6 pb-8 mb-4">
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
                        />
                      </div>
                      <div>
                        <label
                          className="block text-gray-700 text-sm font-bold mb-2"
                          htmlFor="bloodSugar"
                        >
                          Sugar Level (mg/dL)
                        </label>
                        <input
                          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                          id="bloodSugar"
                          name="bloodSugar"
                          type="number"
                          placeholder="Enter sugar level"
                          value={bloodFormData.bloodSugar}
                          onChange={handleBloodChange}
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
                          id="bloodPressure"
                          type="text"
                          placeholder="Enter high pressure level"
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
                          id="bloodPressure"
                          type="text"
                          placeholder="Enter low pressure level"
                        />
                      </div>
                    </div>
                    <div className="flex items-center justify-center">
                      <button
                        className="btn text-black font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        type="submit"
                      >
                        Update Levels
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