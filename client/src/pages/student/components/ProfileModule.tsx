import React, { useState } from 'react';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  BookOpen, 
  Edit3,
  Camera,
  Save,
  X
} from 'lucide-react';

interface ProfileModuleProps {
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
  onUpdateStudent: (student: any) => void;
}

export const ProfileModule: React.FC<ProfileModuleProps> = ({ student, onUpdateStudent }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedStudent, setEditedStudent] = useState({
    ...student,
    phone: '+91 9876543210',
    address: '123 Student Hostel, ABC Engineering College',
    dateOfBirth: '2002-05-15',
    fatherName: 'Ramesh Sharma',
    motherName: 'Sunita Sharma',
    guardianPhone: '+91 9876543211',
    bloodGroup: 'B+',
    category: 'General',
    admissionDate: '2021-08-15'
  });

  const academicInfo = {
    currentCGPA: 8.7,
    completedCredits: 120,
    totalCredits: 160,
    expectedGraduation: 'May 2025',
    specialization: 'Artificial Intelligence & Machine Learning'
  };

  const emergencyContact = {
    name: 'Ramesh Sharma (Father)',
    phone: '+91 9876543211',
    relation: 'Father',
    address: '456 Home Address, City, State - 123456'
  };

  const handleSave = () => {
    onUpdateStudent(editedStudent);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedStudent({ ...student });
    setIsEditing(false);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Preet Chauhan</h1>
            <p className="text-gray-600">Manage your personal information and academic details</p>
          </div>
          {!isEditing ? (
            <button
              onClick={() => setIsEditing(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center"
            >
              <Edit3 className="h-4 w-4 mr-2" />
              Edit Profile
            </button>
          ) : (
            <div className="flex space-x-2">
              <button
                onClick={handleSave}
                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors duration-200 flex items-center"
              >
                <Save className="h-4 w-4 mr-2" />
                Save
              </button>
              <button
                onClick={handleCancel}
                className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors duration-200 flex items-center"
              >
                <X className="h-4 w-4 mr-2" />
                Cancel
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Photo & Basic Info */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="text-center">
              <div className="relative inline-block">
                {editedStudent.profileImage ? (
                  <img 
                    src={editedStudent.profileImage} 
                    alt={editedStudent.name}
                    className="w-32 h-32 rounded-full object-cover mx-auto border-4 border-gray-200"
                  />
                ) : (
                  <div className="w-32 h-32 bg-gray-300 rounded-full flex items-center justify-center mx-auto border-4 border-gray-200">
                    <User className="h-12 w-12 text-gray-600" />
                  </div>
                )}
                {isEditing && (
                  <button className="absolute bottom-0 right-0 bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 transition-colors duration-200">
                    <Camera className="h-4 w-4" />
                  </button>
                )}
              </div>
              
              <div className="mt-4">
                <h2 className="text-xl font-bold text-gray-900">{editedStudent.name}</h2>
                <p className="text-gray-600">{editedStudent.rollNumber}</p>
                <p className="text-sm text-gray-500 mt-1">{editedStudent.course}</p>
              </div>
            </div>

            <div className="mt-6 space-y-3">
              <div className="bg-blue-50 rounded-lg p-4">
                <div className="flex items-center mb-2">
                  <BookOpen className="h-5 w-5 text-blue-600 mr-2" />
                  <h3 className="font-semibold text-blue-900">Academic Status</h3>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-blue-700">Current CGPA:</span>
                    <span className="font-semibold text-blue-900">{academicInfo.currentCGPA}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-blue-700">Credits:</span>
                    <span className="font-semibold text-blue-900">
                      {academicInfo.completedCredits}/{academicInfo.totalCredits}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-blue-700">Expected Graduation:</span>
                    <span className="font-semibold text-blue-900">{academicInfo.expectedGraduation}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Personal Information */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Personal Information</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={editedStudent.name}
                    onChange={(e) => setEditedStudent({ ...editedStudent, name: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                ) : (
                  <p className="text-gray-900 bg-gray-50 px-3 py-2 rounded-lg">{editedStudent.name}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                {isEditing ? (
                  <input
                    type="email"
                    value={editedStudent.email}
                    onChange={(e) => setEditedStudent({ ...editedStudent, email: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                ) : (
                  <div className="flex items-center text-gray-900 bg-gray-50 px-3 py-2 rounded-lg">
                    <Mail className="h-4 w-4 text-gray-500 mr-2" />
                    {editedStudent.email}
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                {isEditing ? (
                  <input
                    type="tel"
                    value={editedStudent.phone}
                    onChange={(e) => setEditedStudent({ ...editedStudent, phone: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                ) : (
                  <div className="flex items-center text-gray-900 bg-gray-50 px-3 py-2 rounded-lg">
                    <Phone className="h-4 w-4 text-gray-500 mr-2" />
                    {editedStudent.phone}
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Date of Birth</label>
                {isEditing ? (
                  <input
                    type="date"
                    value={editedStudent.dateOfBirth}
                    onChange={(e) => setEditedStudent({ ...editedStudent, dateOfBirth: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                ) : (
                  <div className="flex items-center text-gray-900 bg-gray-50 px-3 py-2 rounded-lg">
                    <Calendar className="h-4 w-4 text-gray-500 mr-2" />
                    {editedStudent.dateOfBirth}
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Blood Group</label>
                {isEditing ? (
                  <select
                    value={editedStudent.bloodGroup}
                    onChange={(e) => setEditedStudent({ ...editedStudent, bloodGroup: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="A+">A+</option>
                    <option value="A-">A-</option>
                    <option value="B+">B+</option>
                    <option value="B-">B-</option>
                    <option value="AB+">AB+</option>
                    <option value="AB-">AB-</option>
                    <option value="O+">O+</option>
                    <option value="O-">O-</option>
                  </select>
                ) : (
                  <p className="text-gray-900 bg-gray-50 px-3 py-2 rounded-lg">{editedStudent.bloodGroup}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                {isEditing ? (
                  <select
                    value={editedStudent.category}
                    onChange={(e) => setEditedStudent({ ...editedStudent, category: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="General">General</option>
                    <option value="OBC">OBC</option>
                    <option value="SC">SC</option>
                    <option value="ST">ST</option>
                    <option value="EWS">EWS</option>
                  </select>
                ) : (
                  <p className="text-gray-900 bg-gray-50 px-3 py-2 rounded-lg">{editedStudent.category}</p>
                )}
              </div>
            </div>

            <div className="mt-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
              {isEditing ? (
                <textarea
                  value={editedStudent.address}
                  onChange={(e) => setEditedStudent({ ...editedStudent, address: e.target.value })}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              ) : (
                <div className="flex items-start text-gray-900 bg-gray-50 px-3 py-2 rounded-lg">
                  <MapPin className="h-4 w-4 text-gray-500 mr-2 mt-1 flex-shrink-0" />
                  {editedStudent.address}
                </div>
              )}
            </div>
          </div>

          {/* Academic Information */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Academic Information</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Course</label>
                <p className="text-gray-900 bg-gray-50 px-3 py-2 rounded-lg">{editedStudent.course}</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Roll Number</label>
                <p className="text-gray-900 bg-gray-50 px-3 py-2 rounded-lg">{editedStudent.rollNumber}</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Current Year</label>
                <p className="text-gray-900 bg-gray-50 px-3 py-2 rounded-lg">{editedStudent.year}</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Current Semester</label>
                <p className="text-gray-900 bg-gray-50 px-3 py-2 rounded-lg">{editedStudent.semester}</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Specialization</label>
                <p className="text-gray-900 bg-gray-50 px-3 py-2 rounded-lg">{academicInfo.specialization}</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Admission Date</label>
                <p className="text-gray-900 bg-gray-50 px-3 py-2 rounded-lg">{editedStudent.admissionDate}</p>
              </div>
            </div>
          </div>

          {/* Family Information */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Family Information</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Father's Name</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={editedStudent.fatherName}
                    onChange={(e) => setEditedStudent({ ...editedStudent, fatherName: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                ) : (
                  <p className="text-gray-900 bg-gray-50 px-3 py-2 rounded-lg">{editedStudent.fatherName}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Mother's Name</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={editedStudent.motherName}
                    onChange={(e) => setEditedStudent({ ...editedStudent, motherName: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                ) : (
                  <p className="text-gray-900 bg-gray-50 px-3 py-2 rounded-lg">{editedStudent.motherName}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Guardian Phone</label>
                {isEditing ? (
                  <input
                    type="tel"
                    value={editedStudent.guardianPhone}
                    onChange={(e) => setEditedStudent({ ...editedStudent, guardianPhone: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                ) : (
                  <div className="flex items-center text-gray-900 bg-gray-50 px-3 py-2 rounded-lg">
                    <Phone className="h-4 w-4 text-gray-500 mr-2" />
                    {editedStudent.guardianPhone}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Emergency Contact */}
          <div className="bg-red-50 border border-red-200 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-red-900 mb-4">Emergency Contact</h3>
            
            <div className="space-y-3">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <span className="text-sm text-red-700">Contact Person:</span>
                  <p className="font-medium text-red-900">{emergencyContact.name}</p>
                </div>
                <div>
                  <span className="text-sm text-red-700">Phone:</span>
                  <p className="font-medium text-red-900">{emergencyContact.phone}</p>
                </div>
              </div>
              <div>
                <span className="text-sm text-red-700">Address:</span>
                <p className="font-medium text-red-900">{emergencyContact.address}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};