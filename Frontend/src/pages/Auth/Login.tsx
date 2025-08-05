// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';
// import type { RootState } from '../../redux/store';
// import { loginStart, loginSuccess, loginFailure } from '../../redux/slices/authSlice';
// import  {authService}  from '../../services/authService';
// import { setEncryptedStorage } from '../../utils/encryption';
// import  Input  from '../../constants/Input'
// import Button from '../../constants/Button';
// import { FaHospital, FaEye, FaEyeSlash } from 'react-icons/fa';

// const Login: React.FC = () => {
//   const [formData, setFormData] = useState({
//     email: '',
//     password: '',
//   });
//   const [showPassword, setShowPassword] = useState(false);
//   const [errors, setErrors] = useState<Record<string, string>>({});

//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const { loading, error, isAuthenticated, user } = useSelector(
//     (state: RootState) => state.auth
//   );


//   const validateForm = () => {
//     const newErrors: Record<string, string> = {};

//     if (!formData.email.trim()) {
//       newErrors.email = 'Email is required';
//     } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
//       newErrors.email = 'Please enter a valid email';
//     }

//     if (!formData.password) {
//       newErrors.password = 'Password is required';
//     } else if (formData.password.length < 6) {
//       newErrors.password = 'Password must be at least 6 characters';
//     }

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     if (!validateForm()) return;

//     dispatch(loginStart());

//     try {
//       const response = await authService.login(formData);
      
//       setEncryptedStorage('refreshToken', 'true'); 

//       dispatch(loginSuccess({
//         user: response.user,
//         accessToken: response.accessToken,
//       }));

    
//       if (response.user.role === 'Doctor' && response.user.needs_password_update) {
//         navigate('/reset-password');
//       } else if (response.user.role === 'Doctor') {
//         navigate('/doctor');
//       } else {
//         navigate('/admin');
//       }
//     } catch (error: any) {
//       dispatch(loginFailure(error.response?.data?.error || 'Login failed'));
//     }
//   };

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({ ...prev, [name]: value }));
    
//      if (errors[name]) {
//       setErrors(prev => ({ ...prev, [name]: '' }));
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-primary-50 to-primary-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-md w-full space-y-8">
//         <div className="text-center">
//           <div className="flex justify-center">
//             <div className="bg-primary-600 p-3 rounded-full">
//               <FaHospital className="text-white text-3xl" />
//             </div>
//           </div>
//           <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
//             Welcome to DoctorDost
//           </h2>
//           <p className="mt-2 text-sm text-gray-600">
//             Sign in to your account to continue
//           </p>
//         </div>

//         <div className="bg-white py-8 px-6 shadow-lg rounded-lg border border-gray-200">
//           <form className="space-y-6" onSubmit={handleSubmit}>
//             {error && (
//               <div className="bg-red-50 border border-red-200 rounded-md p-4">
//                 <p className="text-sm text-red-600">{error}</p>
//               </div>
//             )}

//             <Input
//               label="Email Address"
//               type="email"
//               name="email"
//               value={formData.email}
//               onChange={handleChange}
//               error={errors.email}
//               placeholder="Enter your email"
//               required
//             />

//             <div className="relative">
//               <Input
//                 label="Password"
//                 type={showPassword ? 'text' : 'password'}
//                 name="password"
//                 value={formData.password}
//                 onChange={handleChange}
//                 error={errors.password}
//                 placeholder="Enter your password"
//                 required
//               />
//               <button
//                 type="button"
//                 className="absolute right-3 top-9 text-gray-400 hover:text-gray-600"
//                 onClick={() => setShowPassword(!showPassword)}
//               >
//                 {showPassword ? <FaEyeSlash /> : <FaEye />}
//               </button>
//             </div>

           
//             <Button
//              className='primary'
//              >
//               Login
//              </Button>
//           </form>
//         </div>

//       </div>
//     </div>
//   );
// };

// export default Login;


import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../../redux/store';
import { loginStart, loginSuccess, loginFailure } from '../../redux/slices/authSlice';
import { authService } from '../../services/authService';
import { setEncryptedStorage } from '../../utils/encryption';

const Login: React.FC = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state: RootState) => state.auth);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    dispatch(loginStart());

    try {
      const response = await authService.login(formData);

      setEncryptedStorage('refreshToken', 'true');

      dispatch(
        loginSuccess({
          user: response.user,
          accessToken: response.accessToken,
        })
      );

      // Navigate based on role
      if (response.user.role === 'Doctor' && response.user.needs_password_update) {
        navigate('/reset-password');
      } else if (response.user.role === 'Doctor') {
        navigate('/doctor');
      } else {
        navigate('/admin');
      }
    } catch (error: any) {
      dispatch(loginFailure(error.response?.data?.error || 'Login failed'));
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <header className="p-4 border-b flex items-center">
        <div className="text-lg font-bold">Doctor Dost</div>
      </header>

      <main className="flex-grow flex items-center justify-center px-4">
        <div className="max-w-md w-full">
          <h2 className="text-2xl font-bold text-center mb-6">Welcome to Doctor Dost</h2>

          <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-lg ">
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-md p-3 text-red-600 text-sm">
                {error}
              </div>
            )}

            <div>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
            </div>

            <div>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Password"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-full transition-colors"
              disabled={loading}
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>

    
        </div>
      </main>
    </div>
  );
};

export default Login;
