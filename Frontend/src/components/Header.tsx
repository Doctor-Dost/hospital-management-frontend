import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { IoIosAddCircle } from "react-icons/io"; 
import { IoSearch } from "react-icons/io5"; 


const MedicalIcon: React.FC = () => {
  return <IoIosAddCircle size={16} color="#0D141C" />; 
};


const UserAvatar: React.FC = () => (
  <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center text-gray-700 font-bold text-lg">
    JD
  </div>
);

const Header: React.FC = () => {
  const [showSearchInput, setShowSearchInput] = useState(false);
 

  const handleSearchIconClick = () => {
    setShowSearchInput(!showSearchInput);
   
  };

 


  const navLinks = [
    { name: 'Dashboard', path: '/dashboard' },
    { name: 'My Patients', path: '/my-patients' },
    { name: 'Appointments', path: '/appointments' },

  ];

  return (
   
    <header className="box-border flex flex-row justify-between items-center py-3 px-10 w-full h-[65px] bg-blue-300">


      <div className="flex flex-row items-center gap-4 w-[110px] h-[23px]">
        
        <div className="flex flex-col items-start p-0 w-4 h-4">
          <MedicalIcon /> 
        </div>
       
        <div className="flex flex-col items-start p-0 w-[78px] h-[23px]">
          <span className="font-bold text-lg leading-[23px] text-primary-text">
            DoctorDost
          </span>
        </div>
      </div>

     
      <nav className="flex flex-row justify-end items-center p-0 gap-8 flex-grow h-10">
      
        <div className="flex flex-row items-center p-0 gap-9 h-10">
          {navLinks.map(({ name, path }) => (
            <Link key={name} to={path} className="flex flex-col items-start p-0 h-[21px] ">
              <span className="font-medium text-sm leading-[21px] text-primary-text hover:text-blue-accent transition-colors ">
                {name}
              </span>
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-2">
          {showSearchInput && (
            <input
              type="text"
              placeholder="Search"
              className="px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 w-48 transition-all duration-300"
              autoFocus 
            />
          )}
      
          <button
            type="button"
            onClick={handleSearchIconClick}
            className="flex flex-row justify-center items-center px-[10px] gap-2 w-10 h-10 bg-bg-badge rounded-full cursor-pointer hover:bg-gray-200 transition-colors"
          >
            <IoSearch size={20} color="#0D141C" /> 
          </button>
       
        </div>

       
        <UserAvatar />
      </nav>
    </header>
  );
};

export default Header;
