import React, { useState } from 'react';
import { useAdmin } from '../contexts/AdminContext';
import { Faculty } from '../../../types';
import { 
  Search, 
  Filter, 
  Plus, 
  Edit, 
  Trash2, 
  Eye, 
  Phone, 
  Mail, 
  Calendar,
  GraduationCap,
  DollarSign
} from 'lucide-react';
import { showToast } from '../../../utils/toast';

const FacultyRecord: React.FC = () => {
  const { faculty, addFaculty, updateFaculty, deleteFaculty } = useAdmin();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDepartment, setFilterDepartment] = useState('all');
  const [showModal, setShowModal] = useState(false);
  const [editingFaculty, setEditingFaculty] = useState<Faculty | null>(null);
  const [selectedFaculty, setSelectedFaculty] = useState<Faculty | null>(null);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    department: '',
    designation: '',
    dateOfJoining: '',
    qualification: '',
    experience: 0,
    salary: 0,
    status: 'Active' as 'Active' | 'Inactive'
  });

  const departments = ['Computer Science', 'Mechanical Engineering', 'Electrical Engineering', 'Civil Engineering', 'Chemical Engineering'];
  const designations = ['Professor', 'Associate Professor', 'Assistant Professor', 'Lecturer', 'Senior Lecturer'];

  const filteredFaculty = faculty.filter((member) => {
    const matchesSearch = member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         member.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         member.department.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesDepartment = filterDepartment === 'all' || member.department === filterDepartment;
    
    return matchesSearch && matchesDepartment;
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingFaculty) {
      updateFaculty(editingFaculty.id, formData);
      showToast('Faculty member updated successfully!', 'success');
    } else {
      addFaculty(formData);
      showToast('Faculty member added successfully!', 'success');
    }
    
    handleCloseModal();
  };

  const handleEdit = (member: Faculty) => {
    setEditingFaculty(member);
    setFormData({
      name: member.name,
      email: member.email,
      phone: member.phone,
      department: member.department,
      designation: member.designation,
      dateOfJoining: member.dateOfJoining,
      qualification: member.qualification,
      experience: member.experience,
      salary: member.salary,
      status: member.status
    });
    setShowModal(true);
  };

  const handleDelete = (id: string, name: string) => {
    if (window.confirm(`Are you sure you want to delete ${name}?`)) {
      deleteFaculty(id);
      showToast('Faculty member deleted', 'error');
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingFaculty(null);
    setFormData({
      name: '',
      email: '',
      phone: '',
      department: '',
      designation: '',
      dateOfJoining: '',
      qualification: '',
      experience: 0,
      salary: 0,
      status: 'Active'
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'experience' || name === 'salary' ? Number(value) : value
    }));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white  p-6 rounded-lg shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              Faculty Records
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Manage faculty members and their information
            </p>
          </div>
          <button
            onClick={() => setShowModal(true)}
            className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus className="w-5 h-5" />
            <span>Add Faculty</span>
          </button>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search by name, email, or department..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:text-white"
              />
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Filter className="w-5 h-5 text-gray-400" />
            <select
              value={filterDepartment}
              onChange={(e) => setFilterDepartment(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500  dark:text-white"
            >
              <option value="all">All Departments</option>
              {departments.map((dept) => (
                <option key={dept} value={dept}>{dept}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Faculty Cards */}
      <div className="grid gap-6">
        {filteredFaculty.length === 0 ? (
          <div className="bg-white p-12 rounded-lg shadow-sm text-center">
            <GraduationCap className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              No faculty members found
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              {searchTerm || filterDepartment !== 'all' 
                ? 'Try adjusting your search or filters'
                : 'Add your first faculty member to get started'
              }
            </p>
          </div>
        ) : (
          filteredFaculty.map((member) => (
            <div key={member.id} className="bg-white  p-6 rounded-lg shadow-sm">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        {member.name}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {member.designation} • {member.department}
                      </p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      member.status === 'Active'
                        ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                        : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                    }`}>
                      {member.status}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                      <Mail className="w-4 h-4" />
                      <span>{member.email}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                      <Phone className="w-4 h-4" />
                      <span>{member.phone}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                      <Calendar className="w-4 h-4" />
                      <span>{new Date(member.dateOfJoining).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                      <DollarSign className="w-4 h-4" />
                      <span>${member.salary.toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-2">
                  <button
                    onClick={() => setSelectedFaculty(member)}
                    className="flex items-center justify-center space-x-2 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50transition-colors"
                  >
                    <Eye className="w-4 h-4" />
                    <span>View</span>
                  </button>
                  <button
                    onClick={() => handleEdit(member)}
                    className="flex items-center justify-center space-x-2 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <Edit className="w-4 h-4" />
                    <span>Edit</span>
                  </button>
                  <button
                    onClick={() => handleDelete(member.id, member.name)}
                    className="flex items-center justify-center space-x-2 px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                    <span>Delete</span>
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Add/Edit Faculty Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white  rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900 ">
                  {editingFaculty ? 'Edit Faculty Member' : 'Add New Faculty Member'}
                </h2>
                <button
                  onClick={handleCloseModal}
                  className="p-2 hover:bg-gray-100  rounded-lg"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700  mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500  "
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700  mb-1">
                      Email *
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500  "
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700  mb-1">
                      Phone *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500  "
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700  mb-1">
                      Department *
                    </label>
                    <select
                      name="department"
                      required
                      value={formData.department}
                      onChange={handleInputChange}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500  "
                    >
                      <option value="">Select Department</option>
                      {departments.map((dept) => (
                        <option key={dept} value={dept}>{dept}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700  mb-1">
                      Designation *
                    </label>
                    <select
                      name="designation"
                      required
                      value={formData.designation}
                      onChange={handleInputChange}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500  "
                    >
                      <option value="">Select Designation</option>
                      {designations.map((designation) => (
                        <option key={designation} value={designation}>{designation}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700  mb-1">
                      Date of Joining *
                    </label>
                    <input
                      type="date"
                      name="dateOfJoining"
                      required
                      value={formData.dateOfJoining}
                      onChange={handleInputChange}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500  "
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700  mb-1">
                      Qualification *
                    </label>
                    <input
                      type="text"
                      name="qualification"
                      required
                      value={formData.qualification}
                      onChange={handleInputChange}
                      placeholder="e.g., Ph.D. in Computer Science"
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500  "
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700  mb-1">
                      Experience (Years) *
                    </label>
                    <input
                      type="number"
                      name="experience"
                      required
                      min="0"
                      value={formData.experience}
                      onChange={handleInputChange}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500  "
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700  mb-1">
                      Salary *
                    </label>
                    <input
                      type="number"
                      name="salary"
                      required
                      min="0"
                      value={formData.salary}
                      onChange={handleInputChange}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500  "
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700  mb-1">
                      Status *
                    </label>
                    <select
                      name="status"
                      required
                      value={formData.status}
                      onChange={handleInputChange}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 "
                    >
                      <option value="Active">Active</option>
                      <option value="Inactive">Inactive</option>
                    </select>
                  </div>
                </div>

                <div className="flex justify-end space-x-3 mt-6">
                  <button
                    type="button"
                    onClick={handleCloseModal}
                    className="px-4 py-2 border border-gray-300  rounded-lg hover:bg-gray-50  transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    {editingFaculty ? 'Update Faculty' : 'Add Faculty'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Faculty Details Modal */}
      {selectedFaculty && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white  rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  Faculty Details
                </h2>
                <button
                  onClick={() => setSelectedFaculty(null)}
                  className="p-2 hover:bg-gray-100  rounded-lg"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700  mb-1">
                      Full Name
                    </label>
                    <p className="text-gray-900 ">{selectedFaculty.name}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700  mb-1">
                      Email
                    </label>
                    <p className="text-gray-900 ">{selectedFaculty.email}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700  mb-1">
                      Phone
                    </label>
                    <p className="text-gray-900 ">{selectedFaculty.phone}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700  mb-1">
                      Department
                    </label>
                    <p className="text-gray-900 ">{selectedFaculty.department}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700  mb-1">
                      Designation
                    </label>
                    <p className="text-gray-900 ">{selectedFaculty.designation}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700  mb-1">
                      Date of Joining
                    </label>
                    <p className="text-gray-900 ">
                      {new Date(selectedFaculty.dateOfJoining).toLocaleDateString()}
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700  mb-1">
                      Qualification
                    </label>
                    <p className="text-gray-900 ">{selectedFaculty.qualification}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700  mb-1">
                      Experience
                    </label>
                    <p className="text-gray-900 ">{selectedFaculty.experience} years</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700  mb-1">
                      Salary
                    </label>
                    <p className="text-gray-900 ">${selectedFaculty.salary.toLocaleString()}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700  mb-1">
                      Status
                    </label>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      selectedFaculty.status === 'Active'
                        ? 'bg-green-100 text-green-800 '
                        : 'bg-red-100 text-red-800 '
                    }`}>
                      {selectedFaculty.status}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex justify-end space-x-3 mt-8">
                <button
                  onClick={() => setSelectedFaculty(null)}
                  className="px-4 py-2 border border-gray-300  rounded-lg hover:bg-gray-50  transition-colors"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    handleEdit(selectedFaculty);
                    setSelectedFaculty(null);
                  }}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Edit Faculty
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FacultyRecord;