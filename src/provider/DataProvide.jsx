import React, { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { fetchData } from "../constants/fetchData";
import { baseurl } from "../constants/baseUrl";
export const Context = createContext();


const DataProvide = ({ children }) => {
  const [selectedMenu, setMenu] = useState("");
  const [loggedUser, setLoggedUser] = useState({});
  const [date, setDate] = useState("");
  const [userBloodO2Data, setUserBloodO2Data] = useState({});
  const [userBloodSugarData, setUserBloodSugarData] = useState({});
  const [userBloodPressureData, setUserBloodPressureData] = useState({});
  const [userMeasuremnetsData, setUserMeasuremnetsData] = useState({});
  const [userBloodO2, setUserBloodO2] = useState(null);
  const [userBloodSugar, setUserBloodSugar] = useState({});
  const [userBloodPressure, setUserBloodPressure] = useState({});
  const [userMeasurements, setUserMeasurements] = useState({});
  const [userMedicines, setUserMedicines] = useState([]);
  const [userAppointments, setUserAppointMents] = useState([]);
  const [closeAppointMent, setCloseAppointment] = useState({});
  const [userReports, setuserReports] = useState([]);
  const [update, setUpdate] = useState(0);
  const [updateMedicines, setUpdateMedicines] = useState(0);
  const [updateAppointments, setUpdateAppointments] = useState(0);
  const [updateReports, setUpdateReports] = useState(0);
  const [morningMedicines, setMorningMedicines] = useState([]);
  const [noonMedicines, setNoonMedicines] = useState([]);
  const [nightMedicines, setNightMedicines] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [bloodInformation,setBloodInformation] = useState({})

  useEffect(() => {
    const endpoint = `notification/${loggedUser.userId}`;
    const fetchNotifications = async () => {
      try {
        const notificationsData = await fetchData(endpoint);
        const reverseNotification = notificationsData.reverse();
        setNotifications(reverseNotification)
        // console.log(reverseNotification)
        
      } catch (error) {
        console.log(error);
      }
    };
    fetchNotifications();
  }, [loggedUser,update]);

  useEffect(() => {
    const fetchBloodInformation = async () => {
      try {
        const endPoint = `blood/information/${loggedUser.userId}`
        const bloodInformationData = await fetchData(endPoint);
        const lastBloodInformationData = bloodInformationData[bloodInformationData.length -1]
        // console.log(lastBloodInformationData)
        setBloodInformation(lastBloodInformationData)
        // console.log(bloodInformationData)
         const measurementsResponse = await fetch(
          `${baseurl}/measurements/${loggedUser?.userId}`
        );
        const measurementsData = await measurementsResponse.json();
        const lastMeasurementsData =
          measurementsData[measurementsData.length - 1];
        setUserMeasurements(lastMeasurementsData);
        setUserMeasuremnetsData(measurementsData);

       
      } catch (error) {
        console.error("Error fetching data:", error);
        // Handle error state or alert user
      }
    };

    if (loggedUser?.userId) {
      fetchBloodInformation();
    }
  }, [loggedUser, update]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const medicinesResponse = await fetch(
          `${baseurl}/medicine/${loggedUser?.userId}`
        );
        const medicinesData = await medicinesResponse.json();
        // console.log(medicinesData)
        setUserMedicines(medicinesData);
      } catch (error) {
        console.error("Error fetching data:", error);
        // Handle error state or alert user
      }
    };

    if (loggedUser?.userId) {
      fetchData();
    }
  }, [loggedUser, updateMedicines]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const appointmentsResponse = await fetch(
          `${baseurl}/appointment/${loggedUser?.userId}`
        );
        const appointMentsData = await appointmentsResponse.json();
        // console.log(appointMentsData);

        // Sort the data based on date and time
        appointMentsData.sort((a, b) => {
          // Compare dates first
          const dateComparison = new Date(a.date) - new Date(b.date);
          if (dateComparison !== 0) {
            return dateComparison;
          }

          // If dates are equal, compare times
          const timeA = a.time.split(":");
          const timeB = b.time.split(":");

          const hourComparison = parseInt(timeA[0]) - parseInt(timeB[0]);
          if (hourComparison !== 0) {
            return hourComparison;
          }

          const minuteComparison = parseInt(timeA[1]) - parseInt(timeB[1]);
          return minuteComparison;
        });
        setUserAppointMents(appointMentsData);
        setCloseAppointment(appointMentsData[0]);
        // Print sorted data
        // console.log(appointMentsData);
      } catch (error) {
        console.error("Error fetching data:", error);
        // Handle error state or alert user
      }
    };

    if (loggedUser?.userId) {
      fetchData();
    }
  }, [loggedUser, updateAppointments]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const reportsResponse = await fetch(
          `${baseurl}/report/${loggedUser?.userId}`
        );
        const reportsData = await reportsResponse.json();
        // console.log(reportsData);

        setuserReports(reportsData);

        // Print sorted data
        // console.log(reportsData);
      } catch (error) {
        console.error("Error fetching data:", error);
        // Handle error state or alert user
      }
    };

    if (loggedUser?.userId) {
      fetchData();
    }
  }, [loggedUser, updateReports]);

  useEffect(() => {
    const morning = userMedicines?.filter(
      (medicine) => medicine.morning === true
    );
    setMorningMedicines(morning);
    // console.log(morning)
    const noon = userMedicines?.filter((medicine) => medicine.noon === true);
    setNoonMedicines(noon);
    // console.log(noon)
    const night = userMedicines?.filter((medicine) => medicine.night === true);
    setNightMedicines(night);
    // console.log(night)
  }, [userMedicines]);

  const setUser = (user) => {
    localStorage.setItem("user", JSON.stringify(user));
    setLoggedUser(user); // Store data in localStorage
  };

  const logOut = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("menu");
  };

  useEffect(() => {
    const menu = localStorage.getItem("menu");
    setMenu(menu);
    const user = JSON.parse(localStorage.getItem("user"));
    setLoggedUser(user);
  }, []);

  // console.log(loggedUser)

  const setSelectedMenu = (data) => {
    localStorage.setItem("menu", data);
    setMenu(data);
  };

  const info = {
    setUser,
    setSelectedMenu,
    selectedMenu,
    loggedUser,
    logOut,
    date,
    setDate,
    userBloodO2Data,
    setUserBloodO2Data,
    userBloodSugarData,
    setUserBloodSugarData,
    userBloodPressureData,
    setUserBloodPressureData,
    userBloodPressure,
    userBloodSugar,
    userBloodO2,
    setUpdate,
    update,
    userMeasurements,
    userMeasuremnetsData,
    setUpdateMedicines,
    updateMedicines,
    updateAppointments,
    setUpdateAppointments,
    userMedicines,
    setUserMedicines,
    setMenu,
    setLoggedUser,
    morningMedicines,
    noonMedicines,
    nightMedicines,
    updateReports,
    setUpdateReports,
    userAppointments,
    closeAppointMent,
    userReports,
    setuserReports,
    setUserAppointMents,
    setCloseAppointment,
    notifications,
    setNotifications,
    bloodInformation
  };

  return <Context.Provider value={info}>{children}</Context.Provider>;
};

export default DataProvide;
