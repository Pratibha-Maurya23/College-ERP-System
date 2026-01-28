import React from 'react';
import { 
  FileText, 
  Building, 
  GraduationCap, 
  Clock, 
  BookOpen, 
  Calendar,
  Bell,
  TrendingUp,
  Award,
  Users,
  AlertCircle
} from 'lucide-react';
import { ModuleType } from '../../../App';

interface DashboardProps {
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
  onModuleChange: (module: ModuleType) => void;
}

export const Home: React.FC<DashboardProps> = ({ student, onModuleChange }) => {
  const quickStats = [
    { label: 'Current CGPA', value: '8.7', icon: TrendingUp, color: 'bg-green-500' },
    { label: 'Attendance', value: '92%', icon: Clock, color: 'bg-blue-500' },
    { label: 'Pending Fees', value: '₹5,000', icon: AlertCircle, color: 'bg-orange-500' },
    { label: 'Library Books', value: '3', icon: BookOpen, color: 'bg-purple-500' },
  ];

  const moduleCards = [
    {
      id: 'admission' as ModuleType,
      title: 'Admission',
      description: 'Next year registration, documents, and service requests',
      icon: FileText,
      color: 'bg-blue-500',
      stats: 'Application Status: Approved'
    },
    {
      id: 'hostel' as ModuleType,
      title: 'Hostel Allocation',
      description: 'Room allocation, mess menu, and facility requests',
      icon: Building,
      color: 'bg-green-500',
      stats: 'Room: H-3, 205A'
    },
    {
      id: 'examination' as ModuleType,
      title: 'Examination',
      description: 'Registration, admit cards, results, and re-evaluation',
      icon: GraduationCap,
      color: 'bg-purple-500',
      stats: 'Next Exam: 15 days'
    },
    {
      id: 'attendance' as ModuleType,
      title: 'Attendance',
      description: 'View attendance records and track your progress',
      icon: Clock,
      color: 'bg-orange-500',
      stats: 'This Month: 92%'
    },
    {
      id: 'library' as ModuleType,
      title: 'Library Management',
      description: 'Book search, issue/return status, and fine tracking',
      icon: BookOpen,
      color: 'bg-indigo-500',
      stats: '3 Books Issued'
    }
  ];

  const recentAnnouncements = [
    {
      id: 1,
      title: 'Mid-term Examination Schedule Released',
      date: '2 hours ago',
      type: 'exam',
      urgent: true
    },
    {
      id: 2,
      title: 'Hostel Fee Payment Due Date Extended',
      date: '1 day ago',
      type: 'fee',
      urgent: false
    },
    {
      id: 3,
      title: 'New Books Available in Library',
      date: '3 days ago',
      type: 'library',
      urgent: false
    }
  ];

  const upcomingEvents = [
    { date: '2024-01-15', event: 'Mid-term Exams Begin', type: 'exam' },
    { date: '2024-01-20', event: 'Technical Symposium', type: 'event' },
    { date: '2024-01-25', event: 'Fee Payment Deadline', type: 'fee' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* Welcome Section */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Welcome back, {student.name}!</h1>
            <p className="text-gray-600 mt-1">
              {student.course} • {student.year} • {student.semester}
            </p>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-500">Student ID</p>
            <p className="text-lg font-semibold text-gray-900">{student.rollNumber}</p>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        {quickStats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                </div>
                <div className={`p-3 rounded-lg ${stat.color}`}>
                  <Icon className="h-6 w-6 text-white" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Modules */}
        <div className="lg:col-span-2">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Student Modules</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {moduleCards.map((module) => {
              const Icon = module.icon;
              return (
                <div
                  key={module.id}
                  onClick={() => onModuleChange(module.id)}
                  className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 cursor-pointer hover:shadow-md transition-all duration-200 group"
                >
                  <div className="flex items-center mb-4">
                    <div className={`p-3 rounded-lg ${module.color} group-hover:scale-110 transition-transform duration-200`}>
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-semibold text-gray-900">{module.title}</h3>
                      <p className="text-sm text-gray-600">{module.stats}</p>
                    </div>
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed">{module.description}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Announcements */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center mb-4">
              <Bell className="h-5 w-5 text-blue-600 mr-2" />
              <h3 className="text-lg font-semibold text-gray-900">Recent Announcements</h3>
            </div>
            <div className="space-y-3">
              {recentAnnouncements.map((announcement) => (
                <div key={announcement.id} className="border-l-2 border-blue-200 pl-3 py-2">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-medium text-gray-900">{announcement.title}</h4>
                    {announcement.urgent && (
                      <span className="bg-red-100 text-red-600 text-xs px-2 py-1 rounded-full">
                        Urgent
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-gray-500 mt-1">{announcement.date}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Upcoming Events */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center mb-4">
              <Calendar className="h-5 w-5 text-purple-600 mr-2" />
              <h3 className="text-lg font-semibold text-gray-900">Upcoming Events</h3>
            </div>
            <div className="space-y-3">
              {upcomingEvents.map((event, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <div className="bg-purple-100 text-purple-600 text-xs px-2 py-1 rounded-md">
                    {event.date}
                  </div>
                  <p className="text-sm text-gray-700 flex-1">{event.event}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};