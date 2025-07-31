import React from 'react';
import { Link } from 'react-router-dom'; 
import { FaTachometerAlt, FaUserMd, FaHospitalUser, FaBed } from "react-icons/fa";


const DashboardIcon: React.FC = () => { 
  return <FaTachometerAlt size={24} color="#141414" />; 
};

const DoctorManagementIcon: React.FC = () => { 
  return <FaUserMd size={24} color="#141414" />; 
};

const PatientManagementIcon: React.FC = () => { 
  return <FaHospitalUser size={24} color="#141414" />; 
};

const BedRoomManagementIcon: React.FC = () => { 
  return <FaBed size={24} color="#141414" />; 
};

interface NavItemProps {
  to: string;
  icon: React.FC; 
  label: string;
}

const NavItem: React.FC<NavItemProps> = ({ to, icon: Icon, label }) => {
 
  return (
    <Link
      to={to}
    
      className={`flex flex-row items-center px-3 py-2 gap-3 w-full h-10 rounded-full transition-colors hover:bg-gray-100`}
    >
      <Icon /> 
      <span className={`font-medium text-sm leading-[21px] text-blue-500 `}> 
        {label}
      </span>
    </Link>
  );
};

const AdminSidebar: React.FC = () => {
  return (
    <aside className="flex flex-col items-start p-0 w-[320px] min-h-screen font-inter">
      <div className="flex flex-col justify-between items-start p-4 w-full min-h-full bg-sidebar-bg flex-grow">
        <div className="flex flex-col items-start p-0 gap-4 w-full h-auto">
          <div className="flex flex-col items-start p-0 w-full h-6">
            <span className="font-medium text-base leading-6 text-text-dark  w-full h-6">
              HealthHub
            </span>
          </div>
          <nav className="flex flex-col items-start p-0 gap-2 w-full h-auto">
            <NavItem to="/dashboard" icon={DashboardIcon} label="Dashboard" />
            <NavItem to="/doctor-management" icon={DoctorManagementIcon} label="Doctor Management" />
            <NavItem to="/patient-management" icon={PatientManagementIcon} label="Patient Management" />
            <NavItem to="/bed-room-management" icon={BedRoomManagementIcon} label="Bed & Room Management" />
          </nav>
        </div>
      </div>
    </aside>
  );
};

export default AdminSidebar;
