
import './App.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Auth/Login';
import ResetPassword from './pages/Auth/ResetPassword';

// Layouts
import AdminLayout from './layouts/AdminLayout';
import DoctorLayout from './layouts/DoctorLayout';

// Private route wrapper
import PrivateRoute from './routes/PrivateRoute';

// Admin pages
import AdminDashboard from './pages/Admin/AdminDashboard';
import DoctorList from './pages/Admin/Doctors/DoctorList';
import AddDoctor from './pages/Admin/Doctors/AddDoctor';
import DoctorDetails from './pages/Admin/Doctors/DoctorDetails';
import PatientList from './pages/Admin/Patients/PatientList';
import AddPatient from './pages/Admin/Patients/AddPatient';
import PatientDetails from './pages/Admin/Patients/PatientDetails';
import RoomList from './pages/Admin/Rooms/RoomList';
import AddRoom from './pages/Admin/Rooms/AddRoom';
import RoomDetails from './pages/Admin/Rooms/RoomDetails';

// Doctor pages
import DoctorDashboard from './pages/Doctors/DoctorDashboard';
import DoctorPatientDetails from './pages/Doctors/PatientDetails';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/reset-password" element={<ResetPassword />} />

         
        <Route element={<PrivateRoute role="Admin" />}> 
          <Route element={<AdminLayout />}> 
            <Route index path="/admin" element={<AdminDashboard />} />
             
            <Route path="/admin/doctors" element={<DoctorList />} />
            <Route path="/admin/doctors/add" element={<AddDoctor />} />
            <Route path="/admin/doctors/:doctorId" element={<DoctorDetails />} />
             
            <Route path="/admin/patients" element={<PatientList />} />
            <Route path="/admin/patients/add" element={<AddPatient />} />
            <Route path="/admin/patients/:patientId" element={<PatientDetails />} />
             
            <Route path="/admin/rooms" element={<RoomList />} />
            <Route path="/admin/rooms/add" element={<AddRoom />} />
            <Route path="/admin/rooms/:roomId" element={<RoomDetails />} />
          </Route>
        </Route>

         
        <Route element={<PrivateRoute role="Doctor" />}> 
          <Route element={<DoctorLayout />}> 
            <Route index path="/doctor" element={<DoctorDashboard />} />
            <Route path="/doctor/patients/:patientId" element={<DoctorPatientDetails />} />
          </Route>
        </Route>

         
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </div>
  );
}

export default App;
