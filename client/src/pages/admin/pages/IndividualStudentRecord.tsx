import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAdmin } from '../contexts/AdminContext';
import { 
  ArrowLeft, 
  Mail, 
  Phone, 
  Calendar, 
  MapPin, 
  User, 
  GraduationCap,
  Star,
  CreditCard,
  Building,
  Edit,
  Save,
  X,
  FileText,
  Award
} from 'lucide-react';
import { showToast } from '../../../utils/toast';

const IndividualStudentRecord: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { students, updateStudent, hostelRooms } = useAdmin();
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    phone: '',
    address: '',
    guardianName: '',
    guardianPhone: '',
    feeStatus: 'Paid' as 'Paid' | 'Pending' | 'Overdue',
    gpa: 0
  });

  const student = students.find(s => s.id === id);
  const studentRoom = hostelRooms.find(room => room.occupants.includes(student?.name || ''));

  if (!student) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Student Not Found
          </h1>
          <Link
            to="/admin/student-record"
            className="text-blue-600 hover:text-blue-700 dark:text-blue-400"
          >
            Back to Student Records
          </Link>
        </div>
      </div>
    );
  }

  const handleEdit = () => {
    setEditForm({
      phone: student.phone,
      address: student.address,
      guardianName: student.guardianName,
      guardianPhone: student.guardianPhone,
      feeStatus: student.feeStatus,
      gpa: student.gpa
    });
    setIsEditing(true);
  };

  const handleSave = () => {
    updateStudent(student.id, editForm);
    setIsEditing(false);
    showToast('Student information updated successfully!', 'success');
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditForm({
      phone: '',
      address: '',
      guardianName: '',
      guardianPhone: '',
      feeStatus: 'Paid',
      gpa: 0
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'Graduated':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'Inactive':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  const getFeeStatusColor = (status: string) => {
    switch (status) {
      case 'Paid':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'Overdue':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  const getGpaColor = (gpa: number) => {
    if (gpa >= 3.7) return 'text-green-600 dark:text-green-400';
    if (gpa >= 3.0) return 'text-yellow-600 dark:text-yellow-400';
    return 'text-red-600 dark:text-red-400';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link
              to="/admin/student-record"
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                {student.name}
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                {student.rollNumber} • {student.department}
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(student.status)}`}>
              {student.status}
            </span>
            {!isEditing ? (
              <button
                onClick={handleEdit}
                className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Edit className="w-4 h-4" />
                <span>Edit</span>
              </button>
            ) : (
              <div className="flex space-x-2">
                <button
                  onClick={handleSave}
                  className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                >
                  <Save className="w-4 h-4" />
                  <span>Save</span>
                </button>
                <button
                  onClick={handleCancel}
                  className="flex items-center space-x-2 bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
                >
                  <X className="w-4 h-4" />
                  <span>Cancel</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Personal Information */}
        <div className="lg:col-span-2 space-y-6">
          {/* Basic Info */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
              <User className="w-5 h-5 mr-2" />
              Personal Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Full Name
                </label>
                <p className="text-gray-900 dark:text-white">{student.name}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Email
                </label>
                <div className="flex items-center space-x-2">
                  <Mail className="w-4 h-4 text-gray-400" />
                  <p className="text-gray-900 dark:text-white">{student.email}</p>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Phone
                </label>
                {isEditing ? (
                  <input
                    type="tel"
                    value={editForm.phone}
                    onChange={(e) => setEditForm(prev => ({ ...prev, phone: e.target.value }))}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  />
                ) : (
                  <div className="flex items-center space-x-2">
                    <Phone className="w-4 h-4 text-gray-400" />
                    <p className="text-gray-900 dark:text-white">{student.phone}</p>
                  </div>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Date of Birth
                </label>
                <div className="flex items-center space-x-2">
                  <Calendar className="w-4 h-4 text-gray-400" />
                  <p className="text-gray-900 dark:text-white">
                    {new Date(student.dateOfBirth).toLocaleDateString()}
                  </p>
                </div>
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Address
                </label>
                {isEditing ? (
                  <textarea
                    value={editForm.address}
                    onChange={(e) => setEditForm(prev => ({ ...prev, address: e.target.value }))}
                    rows={2}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  />
                ) : (
                  <div className="flex items-start space-x-2">
                    <MapPin className="w-4 h-4 text-gray-400 mt-0.5" />
                    <p className="text-gray-900 dark:text-white">{student.address}</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Guardian Information */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
              <User className="w-5 h-5 mr-2" />
              Guardian Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Guardian Name
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    value={editForm.guardianName}
                    onChange={(e) => setEditForm(prev => ({ ...prev, guardianName: e.target.value }))}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  />
                ) : (
                  <p className="text-gray-900 dark:text-white">{student.guardianName}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Guardian Phone
                </label>
                {isEditing ? (
                  <input
                    type="tel"
                    value={editForm.guardianPhone}
                    onChange={(e) => setEditForm(prev => ({ ...prev, guardianPhone: e.target.value }))}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  />
                ) : (
                  <div className="flex items-center space-x-2">
                    <Phone className="w-4 h-4 text-gray-400" />
                    <p className="text-gray-900 dark:text-white">{student.guardianPhone}</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Hostel Information */}
          {studentRoom && (
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                <Building className="w-5 h-5 mr-2" />
                Hostel Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Hostel Name
                  </label>
                  <p className="text-gray-900 dark:text-white">{studentRoom.hostelName}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Room Number
                  </label>
                  <p className="text-gray-900 dark:text-white">{studentRoom.roomNumber}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Floor
                  </label>
                  <p className="text-gray-900 dark:text-white">Floor {studentRoom.floor}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Monthly Rent
                  </label>
                  <p className="text-gray-900 dark:text-white">₹{studentRoom.monthlyRent.toLocaleString()}</p>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Room Facilities
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {studentRoom.facilities.map((facility, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 rounded-full text-sm"
                      >
                        {facility}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Academic & Financial Info */}
        <div className="space-y-6">
          {/* Academic Information */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
              <GraduationCap className="w-5 h-5 mr-2" />
              Academic Information
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Roll Number
                </label>
                <p className="text-gray-900 dark:text-white font-mono">{student.rollNumber}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Department
                </label>
                <p className="text-gray-900 dark:text-white">{student.department}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Year
                </label>
                <p className="text-gray-900 dark:text-white">{student.year}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Current GPA
                </label>
                {isEditing ? (
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    max="4"
                    value={editForm.gpa}
                    onChange={(e) => setEditForm(prev => ({ ...prev, gpa: parseFloat(e.target.value) || 0 }))}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  />
                ) : (
                  <div className="flex items-center space-x-2">
                    <Star className="w-4 h-4 text-yellow-400" />
                    <span className={`text-xl font-bold ${getGpaColor(student.gpa)}`}>
                      {student.gpa.toFixed(1)}
                    </span>
                    <span className="text-sm text-gray-500 dark:text-gray-400">/ 4.0</span>
                  </div>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Admission Date
                </label>
                <div className="flex items-center space-x-2">
                  <Calendar className="w-4 h-4 text-gray-400" />
                  <p className="text-gray-900 dark:text-white">
                    {new Date(student.admissionDate).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Fee Information */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
              <CreditCard className="w-5 h-5 mr-2" />
              Fee Information
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Fee Status
                </label>
                {isEditing ? (
                  <select
                    value={editForm.feeStatus}
                    onChange={(e) => setEditForm(prev => ({ ...prev, feeStatus: e.target.value as any }))}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  >
                    <option value="Paid">Paid</option>
                    <option value="Pending">Pending</option>
                    <option value="Overdue">Overdue</option>
                  </select>
                ) : (
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getFeeStatusColor(student.feeStatus)}`}>
                    {student.feeStatus}
                  </span>
                )}
              </div>
              <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2">
                  <FileText className="w-4 h-4" />
                  <span>View Fee History</span>
                </button>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
              <Award className="w-5 h-5 mr-2" />
              Quick Actions
            </h2>
            <div className="space-y-3">
              <button className="w-full text-left px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                Generate ID Card
              </button>
              <button className="w-full text-left px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                View Academic Record
              </button>
              <button className="w-full text-left px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                Send Notification
              </button>
              <button className="w-full text-left px-4 py-2 border border-red-300 dark:border-red-600 text-red-600 dark:text-red-400 rounded-lg hover:bg-red-50 dark:hover:bg-red-900 transition-colors">
                Transfer Student
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IndividualStudentRecord;