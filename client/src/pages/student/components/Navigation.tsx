import React, { useState } from 'react';
import { 
  Home, 
  FileText, 
  Building, 
  GraduationCap, 
  Clock, 
  BookOpen, 
  User, 
  LogOut, 
  Menu,
  X
} from 'lucide-react';
import { ModuleType } from '../../admin/Home';

interface NavigationProps {
  student: {
    id: string;
    name: string;
    email: string;
    course: string;
    year: string;
    semester: string;
    rollNumber: string;
    profileImage?: string;
  };
  currentModule: ModuleType;
  onModuleChange: (module: ModuleType) => void;
  onLogout: () => void;
}

const navigationItems = [
  { id: 'dashboard' as ModuleType, label: 'Dashboard', icon: Home },
  { id: 'admission' as ModuleType, label: 'Admission', icon: FileText },
  { id: 'hostel' as ModuleType, label: 'Hostel', icon: Building },
  { id: 'examination' as ModuleType, label: 'Examination', icon: GraduationCap },
  { id: 'attendance' as ModuleType, label: 'Attendance', icon: Clock },
  { id: 'library' as ModuleType, label: 'Library', icon: BookOpen },
];

export const Navigation: React.FC<NavigationProps> = ({
  student,
  currentModule,
  onModuleChange,
  onLogout
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 bg-white shadow-lg z-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo and Title */}
            <div className="flex items-center">
              <div className="h-8 w-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <GraduationCap className="h-5 w-5 text-white" />
              </div>
              <span className="ml-3 text-xl font-bold text-gray-900">Student ERP</span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-1">
              {navigationItems.map((item) => {
                const Icon = item.icon;
                const isActive = currentModule === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => onModuleChange(item.id)}
                    className={`flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                      isActive
                        ? 'bg-blue-100 text-blue-700 shadow-sm'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                    }`}
                  >
                    <Icon className="h-4 w-4 mr-2" />
                    {item.label}
                  </button>
                );
              })}
            </div>

            {/* User Menu */}
            <div className="flex items-center space-x-4">
              <button
                onClick={() => onModuleChange('profile')}
                className="flex items-center space-x-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-lg p-2 hover:bg-gray-100 transition-colors duration-200"
              >
                {student.profileImage ? (
                  <img 
                    src={student.profileImage} 
                    alt={student.name}
                    className="h-8 w-8 rounded-full object-cover"
                  />
                ) : (
                  <div className="h-8 w-8 bg-gray-300 rounded-full flex items-center justify-center">
                    <User className="h-4 w-4 text-gray-600" />
                  </div>
                )}
                <div className="hidden sm:block text-left">
                  <div className="font-medium text-gray-900">{student.name}</div>
                  <div className="text-xs text-gray-500">{student.rollNumber}</div>
                </div>
              </button>

              <button
                onClick={onLogout}
                className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200"
                title="Logout"
              >
                <LogOut className="h-5 w-5" />
              </button>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg"
              >
                {isMobileMenuOpen ? (
                  <X className="h-5 w-5" />
                ) : (
                  <Menu className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-200 shadow-lg">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navigationItems.map((item) => {
                const Icon = item.icon;
                const isActive = currentModule === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      onModuleChange(item.id);
                      setIsMobileMenuOpen(false);
                    }}
                    className={`flex items-center w-full px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                      isActive
                        ? 'bg-blue-100 text-blue-700'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                    }`}
                  >
                    <Icon className="h-4 w-4 mr-3" />
                    {item.label}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </nav>
    </>
  );
};