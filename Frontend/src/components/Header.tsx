// import React, { useState } from 'react';
// import { IoIosAddCircle } from "react-icons/io"; 


// const MedicalIcon: React.FC = () => {
//   return <IoIosAddCircle size={16} color="#0D141C" />; 
// };


// const UserAvatar: React.FC = () => (
//   <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center text-gray-700 font-bold text-lg">
//     JD
//   </div>
// );

// const Header: React.FC = () => {


//   return (
   
//     <header className="box-border flex flex-row justify-between items-center py-3 px-10 w-full h-[65px] bg-blue-300">


//       <div className="flex flex-row items-center gap-4 w-[110px] h-[23px]">
        
//         <div className="flex flex-col items-start p-0 w-4 h-4">
//           <MedicalIcon /> 
//         </div>
       
//         <div className="flex flex-col items-start p-0 w-[78px] h-[23px]">
//           <span className="font-bold text-lg leading-[23px] text-primary-text">
//             DoctorDost
//           </span>
//         </div>
//       </div>

       
//         <UserAvatar />
//     </header>
//   );
// };

// export default Header;


import React from 'react';
import { FaBars } from 'react-icons/fa';

interface HeaderProps {
  title: string;
  onMenuClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ title, onMenuClick }) => {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <button
            onClick={onMenuClick}
            className="lg:hidden p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100"
          >
            <FaBars className="text-lg" />
          </button>
          <h1 className="ml-4 lg:ml-0 text-2xl font-semibold text-gray-900">
            {title}
          </h1>
        </div>
      </div>
    </header>
  );
};

export default Header;