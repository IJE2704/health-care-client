import React from 'react';
import { Outlet } from 'react-router-dom';
import Nav from '../../Shared/Nav';

const DashBoard = () => {
  return (
    <div className='bg-[#FFFCF8] grid grid-cols-5'> 
      <div className='col-span-1'>
        <Nav></Nav>
      </div>
      <div className='col-span-3'>
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default DashBoard;