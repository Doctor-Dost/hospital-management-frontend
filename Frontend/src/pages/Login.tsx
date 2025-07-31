

import LoginNavbar from '../components/LoginNavbar';

// interface LoginFormValues {
//   email: string;
//   password: string;
// }

const Login: React.FC = () => {
return (
  
    <div
      className="min-h-screen flex flex-col bg-gray-100"
      style={{ fontFamily: 'Inter, sans-serif' }} 
    >
     
      <LoginNavbar />

     
      <div className="flex flex-grow items-center justify-center p-4 ">
      
        <div
          className="flex flex-col items-center w-full max-w-md p-8 bg-white rounded-lg shadow-lg  bg-center"
          style={{ backgroundImage: 'url()' }} 
        >

        
          <div className="mb-6">
            <img
              src="/loginImg.png" 
              alt="Company Logo"
              className="w-24 h-24 object-contain rounded-full"
            
            />
          </div>

       
          <div className="flex flex-col items-center px-4 pt-5 pb-3 w-full ">
            <h1 className="text-3xl font-bold text-center  text-blue-500  w-full">
              Welcome to MediConnect
            </h1>
          </div>

          <form  className="w-full flex flex-col items-center gap-4">
      
            <div className="flex flex-col w-full px-4">
              <div className="flex flex-col w-full h-[56px]">
                <div className="flex items-center px-[15px] h-full bg-white  rounded-[12px]"> 
                  <input
                    name="email"
                    type="email"
                   
                    placeholder="Email"
                    className="box-border flex flex-row items-center p-[15px] w-full h-[56px] bg-bg-input border border-border-input rounded-[12px] font-normal text-base leading-6 text-blue-500  focus:outline-none focus:ring-2 focus:ring-blue-500 " 
                  />
                </div>
              </div>
            </div>

            <div className="flex flex-col w-full px-4">
              <div className="flex flex-col w-full h-[56px]">
                <div className="flex items-center px-[15px] h-full bg-white rounded-[12px]"> 
                  <input
                    name="password"
                    type="password"
               
                    placeholder="Password"
                    className="box-border flex flex-row items-center p-[15px] w-full h-[56px] bg-bg-input border border-border-input rounded-[12px] font-normal text-base leading-6 text-blue-500  focus:outline-none focus:ring-2 focus:ring-blue-500" 
                  />
                </div>
              </div>
            </div>

       
            <div className="flex items-start px-4 py-3 w-full">
              <button
                type="submit"
                className="flex justify-center items-center px-4 w-full h-[40px] bg-[#0A80ED] rounded-[20px] text-white font-bold text-sm leading-[21px] hover:bg-blue-700 transition-colors"
              >
                Login
              </button>
            </div>

         
        
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
