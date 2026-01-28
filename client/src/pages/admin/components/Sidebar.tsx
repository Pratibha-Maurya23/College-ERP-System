import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  UserCheck, 
  Users, 
  GraduationCap, 
  Building, 
  User,
  X,
  ChevronRight
} from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const navigation = [
    {
      name: 'Dashboard',
      href: '/admin/dashboard',
      icon: LayoutDashboard
    },
    {
      name: 'Student Verification',
      href: '/admin/dashboard/student-verification',
      icon: UserCheck
    },
    {
      name: 'Faculty Records',
      href: '/admin/dashboard/faculty-record',
      icon: Users
    },
    {
      name: 'Student Records',
      href: '/admin/dashboard/student-record',
      icon: GraduationCap
    },
    {
      name: 'Hostel Records',
      href: '/admin/dashboard/hostel-record',
      icon: Building
    }
  ];

  const NavItem = ({ item }: { item: typeof navigation[0] }) => (
    <NavLink
      to={item.href}
      className={({ isActive }) =>
        `flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
          isActive
            ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200'
            : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-200'
        }`
      }
      onClick={() => onClose()}
    >
      <item.icon className="w-5 h-5 mr-3" />
      {item.name}
      <ChevronRight className="w-4 h-4 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
    </NavLink>
  );

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 lg:hidden bg-black bg-opacity-50"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 dark:border-gray-700 transform transition-transform lg:relative lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-2">
            <GraduationCap className="w-8 h-8 text-blue-600" />
            <span className="text-xl font-bold text-gray-900 dark:text-white">CollegeERP</span>
          </div>
          <button
            onClick={onClose}
            className="lg:hidden p-1 rounded-md text-gray-400 hover:text-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-2">
          {navigation.map((item) => (
            <NavItem key={item.name} item={item} />
          ))}
        </nav>

        <div className="p-4 border-t border-gray-200 dark:border-gray-700">
          <div className="text-xs text-gray-500 dark:text-gray-400 text-center">
            © 2024 CollegeERP
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
