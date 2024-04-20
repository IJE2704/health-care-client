import React, { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const o2Response = await fetch(
          `https://healthcare-2fif.onrender.com/o2/${loggedUser?.userId}`
        );
        const o2Data = await o2Response.json();
        const lastO2Data = o2Data[o2Data.length - 1];
        setUserBloodO2(lastO2Data);
        // console.log(lastO2Data);
        setUserBloodO2Data(o2Data);

        const glucoseResponse = await fetch(
          `https://healthcare-2fif.onrender.com/glucose/${loggedUser?.userId}`
        );
        const glucoseData = await glucoseResponse.json();
        const lastGlucoseData = glucoseData[glucoseData.length - 1];
        setUserBloodSugar(lastGlucoseData);
        setUserBloodSugarData(glucoseData);

        const pressureResponse = await fetch(
          `https://healthcare-2fif.onrender.com/pressure/${loggedUser?.userId}`
        );
        const pressureData = await pressureResponse.json();
        const lastPressureData = pressureData[pressureData.length - 1];
        setUserBloodPressure(lastPressureData);
        setUserBloodPressureData(pressureData);

        const measurementsResponse = await fetch(
          `https://healthcare-2fif.onrender.com/measurements/${loggedUser?.userId}`
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
      fetchData();
    }
  }, [loggedUser, update]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const medicinesResponse = await fetch(
          `https://healthcare-2fif.onrender.com/medicine/${loggedUser?.userId}`
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
          `https://healthcare-2fif.onrender.com/appointment/${loggedUser?.userId}`
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
          `https://healthcare-2fif.onrender.com/report/${loggedUser?.userId}`
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
  };

  return <Context.Provider value={info}>{children}</Context.Provider>;
};

export default DataProvide;
