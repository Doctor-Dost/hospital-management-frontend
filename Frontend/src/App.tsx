
import './App.css'
import AdminSidebar from './pages/AdminSidebar';
import DoctorSidebar from './pages/DoctorSidebar';
import Header from './components/Header';
import Login from './pages/Login';
import UpdatePasswordPage from './pages/UpdatePassword';

import NewRoom from './pages/NewRoom';
import BedRoom from './pages/BedRoom';
import PatientDetail from './pages/PatientDetails';
import MyPatient from './pages/MyPatient';
import PatientManagemnt from './pages/PatientManagemnt';

function App() {

  return (
    <div>
      {/* <Header/> */}
      <Login/>
      <UpdatePasswordPage/>
      
       <AdminSidebar/>
       <DoctorSidebar/>
       
       <NewRoom/>
       <BedRoom/>
       <PatientDetail/>
       <MyPatient/>
       <PatientManagemnt/>
       
    </div>
  )
}

export default App;
