import React, { useState, useRef, useEffect } from 'react';
import { useAdmin } from '../contexts/AdminContext';
import { 
  Menu, 
  Bell,  
  User, 
  Settings, 
  LogOut, 
  ChevronDown 
} from 'lucide-react';
import { useNavigate } from "react-router-dom";

interface HeaderProps {
  onMenuClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onMenuClick }) => {
  const { admin, logout } = useAdmin();
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    const role = localStorage.getItem("role") || "student";
    logout();
    // Redirect to correct login page
    navigate(`/login?role=${role}`, { replace: true });
  };

  const profileMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target as Node)) {
        setShowProfileMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const notifications = [
    { id: 1, message: '5 new student applications pending', time: '2 min ago' },
    { id: 2, message: 'Faculty meeting scheduled for 3 PM', time: '1 hour ago' },
    { id: 3, message: 'Hostel room allocation updated', time: '3 hours ago' }
  ];

  return (
    <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
      <div className="flex items-center justify-between px-6 py-4">
        {/* Left side */}
        <div className="flex items-center space-x-4">
          <button
            onClick={onMenuClick}
            className="lg:hidden p-2 rounded-md text-gray-400 hover:text-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <Menu className="w-5 h-5" />
          </button>
          
          <div className="hidden md:block">
            <h1 className="text-xl font-semibold text-gray-900 dark:text-white">
              Admin Dashboard
            </h1>
          </div>
        </div>

        {/* Right side */}
        <div className="flex items-center space-x-4">
          {/* Theme toggle */}

          {/* Notifications */}
          <div className="relative">
            <button className="p-2 rounded-md text-gray-400 hover:text-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors relative">
              <Bell className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
            </button>
          </div>

          {/* Profile menu */}
          <div className="relative" ref={profileMenuRef}>
            <button
              onClick={() => setShowProfileMenu(!showProfileMenu)}
              className="flex items-center space-x-2 p-2 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                <User className="w-5 h-5 text-white" />
              </div>
              <span className="text-sm font-medium hidden md:block">{admin?.username}</span>
              <ChevronDown className="w-4 h-4" />
            </button>

            {showProfileMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1 z-50 border border-gray-200 dark:border-gray-700">
                <div className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300 border-b border-gray-200 dark:border-gray-700">
                  <div className="font-medium">{admin?.username}</div>
                  <div className="text-gray-500 dark:text-gray-400">{admin?.role}</div>
                </div>
                
                <button className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center space-x-2">
                  <Settings className="w-4 h-4" />
                  <span>Settings</span>
                </button>
                
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 text-sm text-red-700 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center space-x-2"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Logout</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;