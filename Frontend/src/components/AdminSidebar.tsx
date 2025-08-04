import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../redux/slices/authSlice';
import { FaTachometerAlt, FaUserMd, FaHospitalUser, FaBed, FaSignOutAlt } from 'react-icons/fa';

interface NavItemProps {
  to: string;
  label: string;
  icon: React.ReactNode;
  end?: boolean;
}

const NavItem: React.FC<NavItemProps> = ({ to, label, icon , end=false}) => {
  return (
    <NavLink
      to={to}
      end={end}
      className={({ isActive }) =>
        `flex items-center px-4 py-2 rounded-md mb-1 text-sm font-medium transition-colors ${
          isActive ? 'bg-orange-100 text-orange-600' : 'text-black-700 hover:bg-gray-100'
        }`
      }
    >
      <span className="mr-3">{icon}</span>
      {label}
    </NavLink>
  );
};

const AdminSidebar: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };
  return (
    <aside className="w-64 h-screen bg-white border-r border-gray-200 shadow-sm">
      <div className="h-16 flex items-center justify-center border-b border-gray-200">
        <h2 className="text-xl font-bold text-orange-600">DoctorDost</h2>
      </div>
      <nav className="mt-4 px-2 space-y-1">
        <NavItem to="/admin" label="Dashboard" icon={<FaTachometerAlt />}  end/>
        <NavItem to="/admin/doctors" label="Doctors" icon={<FaUserMd />} />
        <NavItem to="/admin/patients" label="Patients" icon={<FaHospitalUser />} />
        <NavItem to="/admin/rooms" label="Rooms & Beds" icon={<FaBed />} />
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

export default AdminSidebar;