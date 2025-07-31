import React, { useState, type FormEvent } from 'react';

import Header from '../components/Header';

interface UpdatePasswordFormValues {
  newPassword: string;
  confirmNewPassword: string;
}


// ye logic hi sab form mn jaega iske aage jab frontend dekhenge tab krna h 
// sab mn ye line add krna h
const NewRoom: React.FC = () => {
  const [formData, setFormData] = useState<UpdatePasswordFormValues>({
    newPassword: '',
    confirmNewPassword: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const { newPassword, confirmNewPassword } = formData;

   
    if (!newPassword || !confirmNewPassword) {
      alert('Please enter and confirm your new password.');
      return;
    }

    if (newPassword !== confirmNewPassword) {
      alert('New password and confirm password do not match.');
      return;
    }

    if (newPassword.length < 8) { 
      alert('Password must be at least 8 characters long.');
      return;
    }
 };

  return (
    
    <div className="flex flex-col w-full min-h-screen font-inter bg-gray-100">

   
      <Header />

      
      <main className="flex flex-row justify-center items-start py-5 px-40 w-full flex-grow">
     
        <div className="flex flex-col items-start py-5 w-full max-w-[960px] h-auto bg-white rounded-lg shadow-lg">

      
          <div className="flex flex-row flex-wrap justify-between items-start content-start p-4 gap-3 w-full border-b border-gray-200">
         
            <div className="flex flex-col items-start gap-3 w-full md:w-[408px] min-w-[288px] h-[73px]">
       
              <h1 className="font-bold text-3xl leading-10  text-blue-500 w-full h-10">
                Add New Room
              </h1>
            
            </div>
          </div>

     
          <form onSubmit={handleSubmit} className="flex flex-col md:flex-row flex-wrap gap-4 p-4 w-full">
            
            <div className="flex flex-row flex-wrap items-end content-start p-3 px-4 gap-4 w-full md:w-[480px] max-w-[480px] h-auto">
           
              <div className="flex flex-col items-start w-full min-w-[160px] h-[88px] flex-grow">
              
                <label htmlFor="newPassword" className="flex flex-col items-start pb-2 w-full h-[32px]">
                  <span className="font-medium text-base leading-6  text-blue-500 w-full h-6">
                  Room Name/Number
                  </span>
                </label>
             
                <input
                  type="password"
                  id="newPassword"
                  name="newPassword"
                  value={formData.newPassword}
                  onChange={handleChange}
                  placeholder="Enter new password"
                  className="box-border flex flex-row items-center p-[15px] w-full h-[56px] bg-bg-input border border-border-input rounded-[12px] font-normal text-base leading-6  text-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

          
            <div className="flex flex-row flex-wrap items-end content-start p-3 px-4 gap-4 w-full md:w-[480px] max-w-[480px] h-auto">
        
              <div className="flex flex-col items-start w-full min-w-[160px] h-[88px] flex-grow">
                
                <label htmlFor="confirmNewPassword" className="flex flex-col items-start pb-2 w-full h-[32px]">
                  <span className="font-medium text-base leading-6 text-blue-500 w-full h-6">
                  Number Of Beds
                  </span>
                </label>
            
                <input
                  type="password"
                  id="confirmNewPassword"
                  name="confirmNewPassword"
                  value={formData.confirmNewPassword}
                  onChange={handleChange}
                  placeholder="Confirm new password"
                  className="box-border flex flex-row items-center p-[15px] w-full h-[56px] bg-bg-input border border-border-input rounded-[12px] font-normal text-base leading-6  text-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

           
            <div className="flex flex-row justify-end items-start p-3 px-4 w-full h-[64px] mt-auto">
        
              <button
                type="submit"
                id="updatePasswordButton"
                 className="flex justify-center items-center px-4  h-[40px] bg-[#0A80ED] rounded-[20px] text-white font-bold text-sm leading-[21px] hover:bg-blue-700 transition-colors"
              >
         
                <span className="font-bold text-sm leading-[21px] text-center text-[#FAFAFA] w-[121px] h-[21px]">
                  Add Room
                </span>
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default NewRoom;
