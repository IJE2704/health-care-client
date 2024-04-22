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
import { FaRegUserCircle, FaUserCircle } from "react-icons/fa";
import { IoIosNotificationsOutline, IoMdNotifications } from "react-icons/io";
import { RxCross1 } from "react-icons/rx";
import { baseurl } from "../constants/baseUrl";
import { removeData } from "../constants/removeData";
const ProfileModal = ({ isOpen, onOpen, onClose, props }) => {
  const {
    loggedUser,
    userMedicines,
    userAppointments,
    userMeasurements,
    userReports,
    notifications,
    setNotifications,
  } = useContext(Context);
  // console.log(userMeasurements);
  const { userId, name, username, number, age, gender, email } =
    loggedUser ?? {};
  const { height, weight, bmi } = userMeasurements ?? {};
  const { title, notifi, profile } = props ?? {};

  const handleRemoveNotification = async (id) => {
    // console.log(notifications)
    const url = `${baseurl}/notifications/delete/${id}`;
    const res = await removeData(url);
    console.log(res);
    if (res.deletedCount) {
      const newNotifications = notifications.filter((not) => not._id !== id);
      setNotifications(newNotifications);
    }

    // console.log(notifications)
  };
  return (
    <div>
      <>
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <div className="bg rounded-md">
              <ModalHeader>
                <h1 className="text-2xl mt-4 text-center">{title}</h1>
              </ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                {profile && (
                  <div className="w-full flex flex-col justify-center items-center">
                    <div className="flex flex-col justify-center items-center">
                      <FaUserCircle className="text-[100px] text-pink-700"></FaUserCircle>
                      <h1 className="text-2xl font-semibold mt-4">{name}</h1>
                    </div>
                    <div className="w-full mt-5">
                      <p className="text-xl font-medium text-pink-800 pl-1">
                        User Information
                      </p>
                      <div className="w-full h-[2px] bg-btn "></div>
                      <div className="flex justify-between items-center px-4 py-1">
                        <h1 className="text-lg font-bold italic">Name : </h1>{" "}
                        <h1 className="text-lg italic">{name}</h1>
                      </div>
                      <div className="flex justify-between items-center px-4 py-1">
                        <h1 className="text-lg font-bold italic">
                          User Name:{" "}
                        </h1>{" "}
                        <h1 className="text-lg italic">{username}</h1>
                      </div>
                      <div className="flex justify-between items-center px-4 py-1">
                        <h1 className="text-lg font-bold italic">Email: </h1>{" "}
                        <h1 className="text-lg italic">{email}</h1>
                      </div>
                      <div className="flex justify-between items-center px-4 py-1">
                        <h1 className="text-lg font-bold italic">Number : </h1>{" "}
                        <h1 className="text-lg italic">{number}</h1>
                      </div>
                      <div className="flex justify-between items-center px-4 py-1">
                        <h1 className="text-lg font-bold italic">Gender : </h1>{" "}
                        <h1 className="text-lg italic">{gender}</h1>
                      </div>
                      <div className="flex justify-between items-center px-4 py-1">
                        <h1 className="text-lg font-bold italic">Age : </h1>{" "}
                        <h1 className="text-lg italic">{age}</h1>
                      </div>
                    </div>
                    <div className="w-full mt-5 mb-10">
                      <p className="text-xl font-medium text-pink-800 pl-1">
                        Health Information
                      </p>
                      <div className="w-full h-[2px] bg-btn "></div>
                      <div className="flex justify-between items-center px-4 py-1">
                        <h1 className="text-lg font-bold italic">
                          Ongoing Medicine :{" "}
                        </h1>{" "}
                        <h1 className="text-lg italic">
                          {userMedicines.length}
                        </h1>
                      </div>
                      <div className="flex justify-between items-center px-4 py-1">
                        <h1 className="text-lg font-bold italic">
                          Appointments:{" "}
                        </h1>{" "}
                        <h1 className="text-lg italic">
                          {userAppointments.length}
                        </h1>
                      </div>
                      <div className="flex justify-between items-center px-4 py-1">
                        <h1 className="text-lg font-bold italic">Reports : </h1>{" "}
                        <h1 className="text-lg italic">{userReports.length}</h1>
                      </div>
                      <div className="flex justify-between items-center px-4 py-1">
                        <h1 className="text-lg font-bold italic">
                          Last Height:{" "}
                        </h1>{" "}
                        <h1 className="text-lg italic">{height} Ft</h1>
                      </div>
                      <div className="flex justify-between items-center px-4 py-1">
                        <h1 className="text-lg font-bold italic">
                          Last Weight :{" "}
                        </h1>{" "}
                        <h1 className="text-lg italic">{weight} kg</h1>
                      </div>
                      <div className="flex justify-between items-center px-4 py-1">
                        <h1 className="text-lg font-bold italic">
                          Last BMI :{" "}
                        </h1>{" "}
                        <h1 className="text-lg italic">{bmi}</h1>
                      </div>
                    </div>
                  </div>
                )}
                {notifi && (
                  <div className="mb-10">
                    {notifications.length === 0 ? (
                      <div>
                        <h1 className="text-xl text-red-500 font-semibold text-center">There is no notification for you.</h1>
                      </div>
                    ) : (
                      <div>
                        {notifications.map((notification) => (
                          <div
                            className=" grid grid-cols-6 py-4"
                            key={notification._id}
                          >
                            <div className="col-span-1 flex justify-center items-center">
                              <div className="w-[25px] h-[25px] bg-gray-200 flex justify-center items-center rounded-full">
                                <IoIosNotificationsOutline className="text-lg" />
                              </div>
                            </div>
                            <div className="col-span-4 flex flex-col justify-center items-start text-gray-500">
                              <p className="text-lg font-semibold">{notification.name}</p>
                              <p>{notification.message}</p>
                            </div>
                            <div className="col-span-1 flex justify-center items-center cursor-pointer">
                              <RxCross1
                                onClick={() =>
                                  handleRemoveNotification(notification._id)
                                }
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
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

export default ProfileModal;
