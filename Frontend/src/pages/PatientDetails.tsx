
import Header from '../components/Header';
import { FaUpload } from 'react-icons/fa';

interface AddPatientFormValues {
  fullName: string;
  age: number ;
  gender: string;
  contactInfo: string;
  reasonForAdmittance: string;
  assignedDoctor: string;
  assignedRoom: string;
  assignedBed: string;
  documents: File[];
}



const AddPatientFormPage: React.FC = () => {
  
return (
    <div className="flex flex-col items-start p-0 w-full min-h-screen font-inter bg-gray-100">
      <Header />
      <main className="flex flex-row justify-center items-start py-5 px-40 w-full flex-grow">
        <div className="flex flex-col items-start p-0 w-full max-w-[960px] h-auto bg-white rounded-lg shadow-lg">
          <div className="flex flex-row flex-wrap justify-between items-start content-start p-4 gap-3 w-full h-[105px] border-b border-gray-200">
            <div className="flex flex-col items-start p-0 gap-3 w-full md:w-[352px] min-w-[288px] h-[73px]">
              <h1 className="font-bold text-3xl leading-10 text-blue-500  w-full h-10">
                Add Patient
              </h1>
              <p className="font-normal text-sm leading-[21px] text-blue-500  w-full h-[21px]">
                Enter the patient's details to add them to the system.
              </p>
            </div>
          </div>

          <form  className="w-full flex flex-col items-start">
            <div className="flex flex-col items-start py-4 px-4 w-full h-[47px]">
              <h2 className="font-bold text-lg leading-[23px] text-blue-500  w-full h-[23px]">
                Step 1: Patient Details
              </h2>
            </div>

            <div className="flex flex-col w-full">
              <div className="flex flex-col items-start p-3 px-4 gap-4 w-full h-auto">
                <label htmlFor="fullName" className="font-medium text-base leading-6 text-blue-500  pb-2 w-full h-8">
                  Full Name
                </label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                
                  placeholder="Enter full name"
                  className="box-border p-4 w-full h-[56px] bg-sidebar-active-bg rounded-xl font-normal text-base leading-6 text-blue-500  placeholder:text-secondary-text focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="flex flex-col items-start p-3 px-4 gap-4 w-full h-auto">
                <label htmlFor="age" className="font-medium text-base leading-6 text-blue-500  pb-2 w-full h-8">
                  Age
                </label>
                <input
                  type="number"
                  id="age"
                  name="age"
                 
                  placeholder="Enter age"
                  className="box-border p-4 w-full h-[56px] bg-sidebar-active-bg rounded-xl font-normal text-base leading-6 text-blue-500 placeholder:text-secondary-text focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="flex flex-col items-start p-3 px-4 gap-4 w-full h-auto">
                <label htmlFor="gender" className="font-medium text-base leading-6 text-blue-500 pb-2 w-full h-8">
                  Gender
                </label>
                <select
                  id="gender"
                  name="gender"
             
                  className="box-border p-4 w-full h-[56px] bg-sidebar-active-bg rounded-xl font-normal text-base leading-6 text-blue-500  placeholder:text-secondary-text focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="" disabled>Select gender</option>
                
                </select>
              </div>

              <div className="flex flex-col items-start p-3 px-4 gap-4 w-full h-auto">
                <label htmlFor="contactInfo" className="font-medium text-base leading-6 text-blue-500 pb-2 w-full h-8">
                  Contact Information
                </label>
                <input
                  type="text"
                  id="contactInformation"
                  name="contactInformation"
               
                  placeholder="Enter contact information"
                  className="box-border p-4 w-full h-[56px] bg-sidebar-active-bg rounded-xl font-normal text-base leading-6 text-blue-500  placeholder:text-secondary-text focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="flex flex-col items-start p-3 px-4 gap-4 w-full h-auto">
                <label htmlFor="reasonForAdmittance" className="font-medium text-base leading-6 text-blue-500  pb-2 w-full h-8">
                  Reason for Admiting
                </label>
                <textarea
                  id="reason"
                  name="reason"
                
                  placeholder="Enter reason for admittance"
                  rows={5}
                  className="box-border p-4 w-full min-h-[144px] bg-sidebar-active-bg rounded-xl font-normal text-base leading-6 text-blue-500  placeholder:text-secondary-text focus:outline-none focus:ring-2 focus:ring-blue-500 resize-y"
                />
              </div>
            </div>

            <div className="flex flex-col items-start py-4 px-4 w-full h-[47px]">
              <h2 className="font-bold text-lg leading-[23px] text-blue-500  w-full h-[23px]">
                Step 2: Assign a Doctor
              </h2>
            </div>

            <div className="flex flex-col items-start p-3 px-4 gap-4 w-full h-auto">
              <label htmlFor="assignedDoctor" className="font-medium text-base leading-6 text-blue-500  pb-2 w-full h-8">
                Select Doctor
              </label>
              <select
                id="assignedDoctor"
                name="assignedDoctor"
             
                className="box-border p-4 w-full h-[56px] bg-sidebar-active-bg rounded-xl font-normal text-base leading-6 text-blue-500  placeholder:text-secondary-text focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="" disabled>Choose a doctor</option>
              
              </select>
            </div>

            <div className="flex flex-col items-start py-4 px-4 w-full h-[47px]">
              <h2 className="font-bold text-lg leading-[23px] text-blue-500  w-full h-[23px]">
                Step 3: Assign Bed and Room
              </h2>
            </div>

            <div className="flex flex-col w-full">
              <div className="flex flex-col items-start p-3 px-4 gap-4 w-full h-auto">
                <label htmlFor="assignedRoom" className="font-medium text-base leading-6 text-blue-500 pb-2 w-full h-8">
                  Select Room
                </label>
                <select
                  id="assignedRoom"
                  name="assignedRoom"
           
                  className="box-border p-4 w-full h-[56px] bg-sidebar-active-bg rounded-xl font-normal text-base leading-6 text-blue-500 placeholder:text-secondary-text focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="" disabled>Choose a room</option>
                
                </select>
              </div>

              <div className="flex flex-col items-start p-3 px-4 gap-4 w-full h-auto">
                <label htmlFor="assignedBed" className="font-medium text-base leading-6 text-blue-500  pb-2 w-full h-8">
                  Select Bed
                </label>
                <select
                  id="assignedBed"
                  name="assignedBed"
                
                  className="box-border p-4 w-full h-[56px] bg-sidebar-active-bg rounded-xl font-normal text-base leading-6 text-text-dark placeholder:text-secondary-text focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="" disabled>Choose a bed</option>
                
                </select>
              </div>
            </div>

            <div className="flex flex-col items-start py-4 px-4 w-full h-[47px]">
              <h2 className="font-bold text-lg leading-[23px] text-blue-500  w-full h-[23px]">
                Step 4: Upload Documents
              </h2>
            </div>

            <div className="flex flex-col items-start p-4 w-full h-auto">
              <div
                className="box-border flex flex-col items-center justify-center p-6 gap-6 w-full h-[232px] border-2 border-dashed border-border-input rounded-xl"
             
              >
                <div className="flex flex-col items-center p-0 gap-2 w-[210px] max-w-[480px] h-[52px]">
                  <p className="font-bold text-lg leading-[23px] text-center text-blue-500  w-full h-[23px]">
                    Drag and drop files here
                  </p>
                  <p className="font-normal text-sm leading-[21px] text-centertext-blue-500  w-[120px] max-w-[480px] h-[21px]">
                    Or click to browse
                  </p>
                </div>
                <input
                  type="file"
                  multiple
                
                  className="hidden"
                  id="documentUpload"
                />
                <label
                  htmlFor="documentUpload"
                  className="flex flex-row justify-center items-center px-4 w-[84px] min-w-[84px] max-w-[480px] h-10 bg-sidebar-active-bg rounded-2xl cursor-pointer hover:bg-gray-300 transition-colors"
                >
                  <span className="font-bold text-sm leading-[21px] text-center text-blue-500  w-[49px] h-[21px]">
                    Upload
                  </span>
                  <FaUpload size={14} className="ml-2 text-text-dark" />
                </label>
            
              </div>
            </div>

            <div className="flex flex-row justify-end items-start p-3 px-4 w-full h-[64px]">
              <button
                type="submit"
                className="flex flex-row justify-center items-center px-4 w-[84px] min-w-[84px] max-w-[480px] h-10 bg-blue-600 rounded-2xl shadow-md hover:bg-gray-800 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
              >
                <span className="font-bold text-sm leading-[21px] text-center text-white w-[49px] h-[21px]">
                  Submit
                </span>
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default AddPatientFormPage;
