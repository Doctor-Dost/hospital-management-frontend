import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../redux/slices/authSlice';
import { FaTachometerAlt, FaUserInjured, FaSignOutAlt } from 'react-icons/fa';

interface NavItemProps {
  to: string;
  label: string;
  icon: React.ReactNode;
}

const NavItem: React.FC<NavItemProps> = ({ to, label, icon }) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex items-center px-4 py-2 rounded-md mb-1 text-sm font-medium transition-colors ${
          isActive ? 'bg-blue-100 text-blue-600' : 'text-gray-700 hover:bg-gray-100'
        }`
      }
    >
      <span className="mr-3">{icon}</span>
      {label}
    </NavLink>
  );
};

const DoctorSidebar: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };
  return (
    <aside className="w-64 h-screen bg-white border-r border-gray-200 shadow-sm">
      <div className="h-16 flex items-center justify-center border-b border-gray-200">
        <h2 className="text-xl font-bold text-blue-600">DoctorDost</h2>
      </div>
      <nav className="mt-4 px-2 space-y-1">
        <NavItem to="/doctor" label="My Patients" icon={<FaUserInjured />} />
        {/* Logout button */}
        <button
          onClick={handleLogout}
          className="flex items-center w-full px-4 py-2 rounded-md mb-1 text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors"
        >
          <FaSignOutAlt className="mr-3" /> Logout
        </button>
      </nav>
    </aside>
  );
};

export default DoctorSidebar;