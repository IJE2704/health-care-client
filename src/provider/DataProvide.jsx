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
  const [update, setUpdate] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const o2Response = await fetch(
          `https://healthcare-2fif.onrender.com/o2/${loggedUser?.userId}`
        );
        const o2Data = await o2Response.json();
        const lastO2Data = o2Data[o2Data.length - 1];
        setUserBloodO2(lastO2Data);
        console.log(lastO2Data);
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
    console.log(userMeasurements);
  }, [userMeasurements]);

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
  };

  return <Context.Provider value={info}>{children}</Context.Provider>;
};

export default DataProvide;
