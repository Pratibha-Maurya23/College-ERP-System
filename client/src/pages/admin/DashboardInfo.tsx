import React from 'react';
import { useAdmin } from './contexts/AdminContext';
import { 
  Users, 
  UserCheck, 
  GraduationCap, 
  Building, 
  TrendingUp, 
  TrendingDown,
  Calendar,
  AlertCircle,
  CheckCircle
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';

const MainDashboard: React.FC = () => {
  const { students, faculty, pendingApplications, hostelRooms } = useAdmin();

  // Calculate KPIs
  const totalStudents = students.length;
  const totalFaculty = faculty.length;
  const pendingApps = pendingApplications.length;
  const availableRooms = hostelRooms.filter(room => room.status === 'Available').length;

  const kpis = [
    {
      title: 'Total Students',
      value: totalStudents,
      change: 8.2,
      trend: 'up' as const,
      icon: GraduationCap,
      color: 'blue'
    },
    {
      title: 'Faculty Members',
      value: totalFaculty,
      change: 2.4,
      trend: 'up' as const,
      icon: Users,
      color: 'green'
    },
    {
      title: 'Pending Applications',
      value: pendingApps,
      change: -12.3,
      trend: 'down' as const,
      icon: UserCheck,
      color: 'orange'
    },
    {
      title: 'Available Rooms',
      value: availableRooms,
      change: 5.1,
      trend: 'up' as const,
      icon: Building,
      color: 'purple'
    }
  ];

  // Chart data
  const departmentData = [
    { name: 'Computer Science', students: 45, faculty: 8 },
    { name: 'Mechanical Eng.', students: 38, faculty: 6 },
    { name: 'Electrical Eng.', students: 32, faculty: 5 },
    { name: 'Civil Eng.', students: 28, faculty: 4 },
    { name: 'Chemical Eng.', students: 22, faculty: 3 }
  ];

  const feeStatusData = [
    { name: 'Paid', value: 67, color: '#10B981' },
    { name: 'Pending', value: 25, color: '#F59E0B' },
    { name: 'Overdue', value: 8, color: '#EF4444' }
  ];

  const enrollmentTrend = [
    { month: 'Jan', students: 120 },
    { month: 'Feb', students: 132 },
    { month: 'Mar', students: 145 },
    { month: 'Apr', students: 156 },
    { month: 'May', students: 168 },
    { month: 'Jun', students: 175 }
  ];

  const recentActivities = [
    {
      id: 1,
      type: 'success',
      message: 'New student application approved',
      time: '2 minutes ago'
    },
    {
      id: 2,
      type: 'info',
      message: 'Faculty meeting scheduled for tomorrow',
      time: '15 minutes ago'
    },
    {
      id: 3,
      type: 'warning',
      message: 'Room A-205 requires maintenance',
      time: '1 hour ago'
    },
    {
      id: 4,
      type: 'success',
      message: 'Monthly fee collection completed',
      time: '2 hours ago'
    }
  ];

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'success':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'warning':
        return <AlertCircle className="w-4 h-4 text-orange-500" />;
      default:
        return <Calendar className="w-4 h-4 text-blue-500" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg p-6 text-white">
        <h1 className="text-2xl font-bold mb-2">Welcome back, Administrator!</h1>
        <p className="opacity-90">Here's what's happening at your institution today.</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpis.map((kpi) => (
          <div key={kpi.title} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className={`p-2 rounded-lg bg-${kpi.color}-100 dark:bg-${kpi.color}-900`}>
                <kpi.icon className={`w-6 h-6 text-${kpi.color}-600 dark:text-${kpi.color}-400`} />
              </div>
              <div className="flex items-center text-sm">
                {kpi.trend === 'up' ? (
                  <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                ) : (
                  <TrendingDown className="w-4 h-4 text-red-500 mr-1" />
                )}
                <span className={kpi.trend === 'up' ? 'text-green-600' : 'text-red-600'}>
                  {Math.abs(kpi.change)}%
                </span>
              </div>
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                {kpi.value}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                {kpi.title}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Department Statistics */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Department Overview
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={departmentData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="students" fill="#3B82F6" name="Students" />
              <Bar dataKey="faculty" fill="#10B981" name="Faculty" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Fee Status Distribution */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Fee Status Distribution
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={feeStatusData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {feeStatusData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Enrollment Trend */}
        <div className="lg:col-span-2 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Enrollment Trend
          </h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={enrollmentTrend}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line 
                type="monotone" 
                dataKey="students" 
                stroke="#3B82F6" 
                strokeWidth={2}
                dot={{ fill: '#3B82F6' }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Recent Activities */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Recent Activities
          </h3>
          <div className="space-y-4">
            {recentActivities.map((activity) => (
              <div key={activity.id} className="flex items-start space-x-3">
                <div className="mt-1">
                  {getActivityIcon(activity.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-gray-900 dark:text-white">
                    {activity.message}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    {activity.time}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <button className="w-full mt-4 text-center text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400 font-medium">
            View all activities
          </button>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Quick Actions
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[
            { label: 'Add New Student', color: 'blue' },
            { label: 'Schedule Meeting', color: 'green' },
            { label: 'Generate Report', color: 'purple' },
            { label: 'Send Notification', color: 'orange' }
          ].map((action, index) => (
            <button
              key={index}
              className={`p-4 border-2 border-${action.color}-200 text-${action.color}-700 dark:text-${action.color}-400 rounded-lg hover:bg-${action.color}-50 dark:hover:bg-${action.color}-900 transition-colors font-medium`}
            >
              {action.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MainDashboard;