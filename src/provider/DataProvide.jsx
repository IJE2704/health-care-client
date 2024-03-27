import React, { createContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
export const Context = createContext()

const DataProvide = ({children}) => {
  const [selectedMenu,setMenu] = useState("");
  const [loggedUser,setLoggedUser] = useState({})
  


  const setUser = (user) => {
    localStorage.setItem('user', JSON.stringify(user));
    setLoggedUser(user) // Store data in localStorage
  };


  


  const logOut = ()=>{
    localStorage.removeItem('user');
    localStorage.removeItem('menu');
  }
 



  useEffect(()=>{
    const menu = localStorage.getItem("menu");
    setMenu(menu)
    const user = JSON.parse(localStorage.getItem('user'));
    setLoggedUser(user);
  },[])


  // console.log(loggedUser)

  const setSelectedMenu = (data) =>{
    localStorage.setItem("menu", data);
    setMenu(data);
  }

  

  const info ={
    setUser,
    setSelectedMenu,
    selectedMenu,
    loggedUser,
    logOut,
  }


  return (
    < Context.Provider value={info}>
      {children}
    </ Context.Provider>
  );
};

export default DataProvide;