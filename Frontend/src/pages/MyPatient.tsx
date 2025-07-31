import React, { useState } from 'react';
import Header from '../components/Header'; 

interface Patient {
  id: string;
  name: string;
  dob: string; 
  gender: 'Male' | 'Female' | 'Other';
  admitDate: string; 
  roomNo: string;
}

const MyPatient: React.FC = () => {

  const [patients, setPatients] = useState<Patient[]>([]);
  const [loading, SetLoading] = useState<boolean>(true);

 
 


  return (
    <div className="flex flex-col items-start p-0 w-full min-h-screen font-inter bg-gray-100">
      <Header />
      <main className="flex flex-row justify-center items-start py-5 px-40 w-full flex-grow">
        <div className="flex flex-col items-start p-0 w-full max-w-[960px] h-auto">

    
          <div className="flex flex-row flex-wrap justify-between items-start content-start p-4 gap-3 w-full h-[72px]">
            <div className="flex flex-col items-start p-0 w-[288px] min-w-[288px] h-10">
              <h1 className="font-bold text-3xl leading-10 text-blue-500  w-full h-10">
                My Patients
              </h1>
            </div>
          </div>

       
          <div className="flex flex-col items-start p-3 px-4 w-full h-auto"> 
            <div className="box-border flex flex-col items-start w-full h-auto bg-bg-light border border-border-subtle rounded-lg overflow-hidden">

             
              <div className="flex flex-row w-full h-[46px] bg-bg-light border-b border-border-light"> 
                <div className="flex justify-center items-center p-3 w-[155px] flex-shrink-0">
                  <span className="font-medium text-sm leading-[21px] text-blue-500 ">Patient Name</span>
                </div>
                <div className="flex justify-center items-center p-3 w-[145px] flex-shrink-0">
                  <span className="font-medium text-sm leading-[21px] text-blue-500 ">Date of Birth</span>
                </div>
                <div className="flex justify-center items-center p-3 w-[154px] flex-shrink-0">
                  <span className="font-medium text-sm leading-[21px] text-blue-500 ">Gender</span>
                </div>
                <div className="flex justify-center items-center p-3 w-[156px] flex-shrink-0">
                  <span className="font-medium text-sm leading-[21px] text-blue-500 ">Condition</span>
                </div>
                <div className="flex justify-center items-center p-3 w-[170px] flex-shrink-0">
                  <span className="font-medium text-sm leading-[21px] text-blue-500 ">Admission Date</span>
                </div>
                <div className="flex justify-center items-center p-3 w-[145px] flex-shrink-0">
                  <span className="font-medium text-sm leading-[21px] text-blue-500 ">Room No.</span>
                </div>
              </div>

              <div className="flex flex-col w-full">
                {loading ? (
                  <div className="p-4 text-center text-blue-500 ">Loading patients...</div>
                ) : patients.length === 0 ? (
                  <div className="p-4 text-center text-secondary-text">No patients found.</div>
                ) : (
                  patients.map((patient, index) => (
                    <div key={patient.id} className={`flex flex-row w-full h-[72px] }`}>
                      <div className="flex justify-center items-center p-3 w-[155px] flex-shrink-0">
                        <span className="font-normal text-sm leading-[21px] text-primary-text">{patient.name}</span>
                      </div>
                      <div className="flex justify-center items-center p-3 w-[145px] flex-shrink-0">
                        <span className="font-normal text-sm leading-[21px] text-blue-accent">{patient.dob}</span>
                      </div>
                      <div className="flex justify-center items-center p-3 w-[154px] flex-shrink-0">
                        <span className="font-normal text-sm leading-[21px] text-blue-accent">{patient.gender}</span>
                      </div>
                      <div className="flex justify-center items-center p-3 w-[156px] flex-shrink-0">
                        
                      </div>
                      <div className="flex justify-center items-center p-3 w-[170px] flex-shrink-0">
                        <span className="font-normal text-sm leading-[21px] text-blue-accent">{patient.admitDate}</span>
                      </div>
                      <div className="flex justify-center items-center p-3 w-[145px] flex-shrink-0">
                        <span className="font-normal text-sm leading-[21px] text-blue-accent">{patient.roomNo}</span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default MyPatient;
