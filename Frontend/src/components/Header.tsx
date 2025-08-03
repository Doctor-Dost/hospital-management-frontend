
import React from 'react';
import { FaBars } from 'react-icons/fa';

interface HeaderProps {
  title: string;
  onMenuClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ title, onMenuClick }) => {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <button
            onClick={onMenuClick}
            className="lg:hidden p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100"
          >
            <FaBars className="text-lg" />
          </button>
          <h1 className="ml-4 lg:ml-0 text-2xl font-semibold text-gray-900">
            {title}
          </h1>
        </div>
      </div>
    </header>
  );
};

export default Header;