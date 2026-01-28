import React, { useState } from 'react';
import { 
  Calendar, 
  Clock, 
  TrendingUp, 
  AlertTriangle,
  CheckCircle,
  XCircle,
  BarChart3,
  Filter
} from 'lucide-react';

interface AttendanceModuleProps {
  student: {
    id: string;
    name: string;
    email: string;
    course: string;
    year: string;
    semester: string;
    rollNumber: string;
  };
}

export const AttendanceModule: React.FC<AttendanceModuleProps> = ({ student }) => {
  const [selectedPeriod, setSelectedPeriod] = useState('current-month');
  const [selectedSubject, setSelectedSubject] = useState('all');

  const subjects = [
    {
      name: 'Data Structures and Algorithms',
      code: 'CSE301',
      totalClasses: 45,
      attendedClasses: 42,
      percentage: 93.3,
      status: 'good',
      instructor: 'Dr. Priya Sharma'
    },
    {
      name: 'Database Management Systems',
      code: 'CSE302',
      totalClasses: 40,
      attendedClasses: 35,
      percentage: 87.5,
      status: 'good',
      instructor: 'Prof. Rajesh Kumar'
    },
    {
      name: 'Computer Networks',
      code: 'CSE303',
      totalClasses: 38,
      attendedClasses: 30,
      percentage: 78.9,
      status: 'warning',
      instructor: 'Dr. Anita Singh'
    },
    {
      name: 'Operating Systems',
      code: 'CSE304',
      totalClasses: 42,
      attendedClasses: 29,
      percentage: 69.0,
      status: 'critical',
      instructor: 'Prof. Vikram Gupta'
    },
    {
      name: 'Software Engineering',
      code: 'CSE305',
      totalClasses: 36,
      attendedClasses: 33,
      percentage: 91.7,
      status: 'good',
      instructor: 'Dr. Neha Agarwal'
    }
  ];

  const recentAttendance = [
    { date: '2024-01-15', subject: 'CSE301', status: 'present', time: '09:30 AM' },
    { date: '2024-01-15', subject: 'CSE302', status: 'present', time: '11:30 AM' },
    { date: '2024-01-15', subject: 'CSE303', status: 'absent', time: '02:00 PM' },
    { date: '2024-01-14', subject: 'CSE304', status: 'present', time: '09:30 AM' },
    { date: '2024-01-14', subject: 'CSE305', status: 'present', time: '02:00 PM' },
    { date: '2024-01-12', subject: 'CSE301', status: 'present', time: '09:30 AM' },
    { date: '2024-01-12', subject: 'CSE302', status: 'absent', time: '11:30 AM' },
    { date: '2024-01-12', subject: 'CSE303', status: 'present', time: '02:00 PM' },
  ];

  const monthlyTrend = [
    { month: 'Sep', percentage: 85 },
    { month: 'Oct', percentage: 88 },
    { month: 'Nov', percentage: 82 },
    { month: 'Dec', percentage: 86 },
    { month: 'Jan', percentage: 84 }
  ];

  const overallAttendance = {
    totalClasses: 201,
    attendedClasses: 169,
    percentage: 84.1,
    requiredPercentage: 75
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'good':
        return <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-700">Good</span>;
      case 'warning':
        return <span className="px-2 py-1 text-xs rounded-full bg-yellow-100 text-yellow-700">Low</span>;
      case 'critical':
        return <span className="px-2 py-1 text-xs rounded-full bg-red-100 text-red-700">Critical</span>;
      default:
        return <span className="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-700">Unknown</span>;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'present':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'absent':
        return <XCircle className="h-4 w-4 text-red-600" />;
      default:
        return <Clock className="h-4 w-4 text-gray-600" />;
    }
  };

  const getProgressBarColor = (percentage: number) => {
    if (percentage >= 85) return 'bg-green-500';
    if (percentage >= 75) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const filteredSubjects = selectedSubject === 'all' ? subjects : subjects.filter(s => s.code === selectedSubject);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Attendance Management</h1>
        <p className="text-gray-600">Track your class attendance and maintain required attendance percentage</p>
      </div>

      {/* Overall Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Overall Attendance</p>
              <p className={`text-2xl font-bold ${
                overallAttendance.percentage >= 85 ? 'text-green-600' :
                overallAttendance.percentage >= 75 ? 'text-yellow-600' : 'text-red-600'
              }`}>
                {overallAttendance.percentage}%
              </p>
            </div>
            <div className={`p-3 rounded-lg ${
              overallAttendance.percentage >= 85 ? 'bg-green-100' :
              overallAttendance.percentage >= 75 ? 'bg-yellow-100' : 'bg-red-100'
            }`}>
              <TrendingUp className={`h-6 w-6 ${
                overallAttendance.percentage >= 85 ? 'text-green-600' :
                overallAttendance.percentage >= 75 ? 'text-yellow-600' : 'text-red-600'
              }`} />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Total Classes</p>
              <p className="text-2xl font-bold text-gray-900">{overallAttendance.totalClasses}</p>
            </div>
            <div className="p-3 rounded-lg bg-blue-100">
              <Calendar className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Classes Attended</p>
              <p className="text-2xl font-bold text-gray-900">{overallAttendance.attendedClasses}</p>
            </div>
            <div className="p-3 rounded-lg bg-green-100">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Required %</p>
              <p className="text-2xl font-bold text-gray-900">{overallAttendance.requiredPercentage}%</p>
            </div>
            <div className="p-3 rounded-lg bg-orange-100">
              <AlertTriangle className="h-6 w-6 text-orange-600" />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Subject-wise Attendance */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Subject-wise Attendance</h2>
              <div className="flex items-center space-x-4">
                <select
                  value={selectedSubject}
                  onChange={(e) => setSelectedSubject(e.target.value)}
                  className="px-3 py-1 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="all">All Subjects</option>
                  {subjects.map((subject) => (
                    <option key={subject.code} value={subject.code}>
                      {subject.code} - {subject.name.substring(0, 20)}...
                    </option>
                  ))}
                </select>
                <Filter className="h-4 w-4 text-gray-400" />
              </div>
            </div>

            <div className="space-y-4">
              {filteredSubjects.map((subject, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow duration-200">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h3 className="font-semibold text-gray-900">{subject.name}</h3>
                      <p className="text-sm text-gray-600">
                        {subject.code} • {subject.instructor}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className={`text-xl font-bold ${
                        subject.percentage >= 85 ? 'text-green-600' :
                        subject.percentage >= 75 ? 'text-yellow-600' : 'text-red-600'
                      }`}>
                        {subject.percentage}%
                      </p>
                      {getStatusBadge(subject.status)}
                    </div>
                  </div>

                  <div className="mb-3">
                    <div className="flex justify-between text-sm text-gray-600 mb-1">
                      <span>Attendance Progress</span>
                      <span>{subject.attendedClasses}/{subject.totalClasses} classes</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full transition-all duration-300 ${getProgressBarColor(subject.percentage)}`}
                        style={{ width: `${subject.percentage}%` }}
                      ></div>
                    </div>
                  </div>

                  {subject.percentage < 75 && (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                      <p className="text-sm text-red-700">
                        <strong>Warning:</strong> Attendance below required 75%. 
                        You need to attend {Math.ceil((0.75 * (subject.totalClasses + 10) - subject.attendedClasses))} 
                        more classes without absence to reach 75%.
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Monthly Trend */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <BarChart3 className="h-5 w-5 mr-2 text-blue-600" />
              Monthly Trend
            </h3>
            <div className="space-y-3">
              {monthlyTrend.map((month, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">{month.month} 2024</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-16 bg-gray-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full ${getProgressBarColor(month.percentage)}`}
                        style={{ width: `${month.percentage}%` }}
                      ></div>
                    </div>
                    <span className="text-sm font-medium">{month.percentage}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <Clock className="h-5 w-5 mr-2 text-purple-600" />
              Recent Activity
            </h3>
            <div className="space-y-3">
              {recentAttendance.slice(0, 6).map((record, index) => (
                <div key={index} className="flex items-center space-x-3 py-2">
                  {getStatusIcon(record.status)}
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">{record.subject}</p>
                    <p className="text-xs text-gray-500">{record.date} at {record.time}</p>
                  </div>
                  <span className={`px-2 py-1 text-xs rounded-full capitalize ${
                    record.status === 'present' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                  }`}>
                    {record.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-200 text-sm">
                Download Attendance Report
              </button>
              <button className="w-full bg-gray-100 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors duration-200 text-sm">
                Request Attendance Correction
              </button>
              <button className="w-full bg-gray-100 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors duration-200 text-sm">
                View Detailed Report
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};