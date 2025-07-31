import React from 'react';
import { IoIosAddCircle } from "react-icons/io";


const LoginMedicalIcon: React.FC = () => (
    <IoIosAddCircle />
);

const LoginNavbar: React.FC = () => {
  return (

    <header className="box-border flex flex-row justify-between items-center py-3 px-10 w-full h-12 bg-blue-300">
     
      <div className="flex flex-row items-center gap-4 w-[151px] h-[23px]">
    
        <div className="flex flex-col items-start p-0 w-4 h-4">
          <LoginMedicalIcon /> 
        </div>
       
        <div className="flex flex-col items-start p-0 w-[119px] h-[23px]">
          <span className="font-bold text-lg leading-[23px] text-primary-text">
            DoctorDost
          </span>
        </div>
      </div>
  
    </header>
  );
};

export default LoginNavbar;
