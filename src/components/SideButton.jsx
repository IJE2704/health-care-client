import React, { useState } from 'react';
import { IoMdAdd } from 'react-icons/io';

const SideButton = () => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="fixed right-0 bottom-1/4 mb-20">
      <div
        onClick={() => setExpanded(!expanded)}
        className={`flex items-center justify-end transition-all duration-300 ${
          expanded ? 'w-[100px]' : 'w-[40px]'
        }`}
      >
        <button className="btn flex items-center gap-2 px-3 text-black py-2 rounded-full font-semibold hover:scale-105 bg-blue-500 hover:bg-blue-600 transition-colors duration-300">
          <p className={`hidden sm:inline-block ${expanded ? 'mr-2' : 'opacity-0'}`}>Add</p>
          <IoMdAdd className="text-white" />
        </button>
      </div>
    </div>
  );
}
export default SideButton;