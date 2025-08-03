import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import AdminSidebar from '../components/AdminSidebar';
import Header from '../components/Header';

 
const AdminLayout: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);

  const handleMenuClick = () => {
    setSidebarOpen(prev => !prev);
  };

  return (
    <div className="min-h-screen flex bg-gray-50">
       <div className={`hidden lg:block`}> 
        <AdminSidebar />
      </div>
       {sidebarOpen && (
        <div className="fixed inset-0 z-40 flex lg:hidden">
          <div className="relative flex-1 flex flex-col max-w-xs w-full bg-white border-r border-gray-200">
            <AdminSidebar />
          </div>
          <div
            className="flex-shrink-0 w-14" 
            aria-hidden="true" 
            onClick={() => setSidebarOpen(false)}
          />
        </div>
      )}
      <div className="flex flex-col flex-1 w-0 overflow-hidden">
        <Header title="Admin" onMenuClick={handleMenuClick} />
        <main className="flex-1 overflow-y-auto p-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;