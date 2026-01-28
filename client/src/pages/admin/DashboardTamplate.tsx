import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Breadcrumb from './components/Breadcrumb';
import { Outlet } from 'react-router-dom';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);


  return (
    <div className="h-screen flex bg-gray-50 ">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="flex-1 flex flex-col overflow-hidden lg:ml-64">
        <Header onMenuClick={() => setSidebarOpen(true)} />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50  p-6">
          <div className="max-w-7xl mx-auto">
            <Breadcrumb />
            <div className="mt-4">
              <Outlet /> {/* <-- This makes nested routes render! */}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};
export default DashboardLayout;
