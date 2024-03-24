import React, { createContext, useEffect, useState } from 'react';
export const Context = createContext()

const DataProvide = ({children}) => {
  const [selectedMenu,setMenu] = useState("");
  const setUser = (user) => {
    // const data = { key: 'value' }; // Your data object
    localStorage.setItem('user', JSON.stringify(user)); // Store data in localStorage
  };
  const user ={
    name:'Meraj'
  }
 
  const setSelectedMenu = (data) =>{
    localStorage.setItem("menu", data);
    setMenu(data);
  }
  useEffect(()=>{
    const menu = localStorage.getItem("menu");
    setMenu(menu)
  },[])
  const info ={
    setUser,
    setSelectedMenu,
    selectedMenu,
  }
  return (
    < Context.Provider value={info}>
      {children}
    </ Context.Provider>
  );
};

export default DataProvide;