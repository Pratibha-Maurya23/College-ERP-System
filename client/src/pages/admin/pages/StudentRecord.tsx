import React, { useState } from 'react';
import { useAdmin } from '../contexts/AdminContext';
import { Link } from 'react-router-dom';
import { 
  Search, 
  Filter, 
  Eye, 
  Edit, 
  Trash2, 
  Phone, 
  Mail, 
  Calendar,
  GraduationCap,
  Star,
  Download,
  Users
} from 'lucide-react';
import { showToast } from '../../../utils/toast';

const StudentRecord: React.FC = () => {
  const { students, updateStudent, deleteStudent } = useAdmin();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDepartment, setFilterDepartment] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [sortBy, setSortBy] = useState('name');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const departments = ['Computer Science', 'Mechanical Engineering', 'Electrical Engineering', 'Civil Engineering'];

  const filteredStudents = students
    .filter((student) => {
      const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           student.rollNumber.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesDepartment = filterDepartment === 'all' || student.department === filterDepartment;
      const matchesStatus = filterStatus === 'all' || student.status === filterStatus;
      
      return matchesSearch && matchesDepartment && matchesStatus;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'rollNumber':
          return a.rollNumber.localeCompare(b.rollNumber);
        case 'gpa':
          return b.gpa - a.gpa;
        case 'admissionDate':
          return new Date(b.admissionDate).getTime() - new Date(a.admissionDate).getTime();
        default:
          return 0;
      }
    });

  const totalPages = Math.ceil(filteredStudents.length / itemsPerPage);
  const paginatedStudents = filteredStudents.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleDelete = (id: string, name: string) => {
    if (window.confirm(`Are you sure you want to delete ${name}?`)) {
      deleteStudent(id);
      showToast('Student deleted', 'error');
    }
  };

  const handleStatusChange = (id: string, newStatus: 'Active' | 'Inactive' | 'Graduated') => {
    updateStudent(id, { status: newStatus });
    showToast('Student status updated', 'success');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active':
        return 'bg-green-100 text-green-800 ';
      case 'Graduated':
        return 'bg-blue-100 text-blue-800 ';
      case 'Inactive':
        return 'bg-red-100 text-red-800 ';
      default:
        return 'bg-gray-100 text-gray-800  ';
    }
  };

  const getFeeStatusColor = (status: string) => {
    switch (status) {
      case 'Paid':
        return 'bg-green-100 text-green-800  ';
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800 ';
      case 'Overdue':
        return 'bg-red-100 text-red-800 ';
      default:
        return 'bg-gray-100 text-gray-800 ';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white  p-6 rounded-lg shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900  mb-2">
              Student Records
            </h1>
            <p className="text-gray-600 ">
              Manage all student information and records
            </p>
          </div>
          <div className="flex items-center space-x-3">
            <button className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
              <Download className="w-4 h-4" />
              <span>Export</span>
            </button>
            <div className="flex items-center space-x-2 text-sm text-gray-600 ">
              <Users className="w-4 h-4" />
              <span>{filteredStudents.length} students</span>
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white  p-6 rounded-lg shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          <div className="lg:col-span-2">
            <div className="relative">
              <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search by name, email, or roll number..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500  "
              />
            </div>
          </div>
          
          <select
            value={filterDepartment}
            onChange={(e) => setFilterDepartment(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 "
          >
            <option value="all">All Departments</option>
            {departments.map((dept) => (
              <option key={dept} value={dept}>{dept}</option>
            ))}
          </select>

          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 "
          >
            <option value="all">All Status</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
            <option value="Graduated">Graduated</option>
          </select>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 "
          >
            <option value="name">Sort by Name</option>
            <option value="rollNumber">Sort by Roll Number</option>
            <option value="gpa">Sort by GPA</option>
            <option value="admissionDate">Sort by Admission Date</option>
          </select>
        </div>
      </div>

      {/* Students Table */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden">
        {paginatedStudents.length === 0 ? (
          <div className="p-12 text-center">
            <GraduationCap className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900  mb-2">
              No students found
            </h3>
            <p className="text-gray-600 ">
              {searchTerm || filterDepartment !== 'all' || filterStatus !== 'all'
                ? 'Try adjusting your search or filters'
                : 'No students registered yet'
              }
            </p>
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 ">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500  uppercase tracking-wider">
                      Student Info
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500  uppercase tracking-wider">
                      Department & Year
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500  uppercase tracking-wider">
                      Academic
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500  uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500  uppercase tracking-wider">
                      Fee Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500  uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 ">
                  {paginatedStudents.map((student) => (
                    <tr key={student.id} className="hover:bg-gray-50 ">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-gray-900 ">
                            {student.name}
                          </div>
                          <div className="text-sm text-gray-500 ">
                            {student.email}
                          </div>
                          <div className="text-xs text-gray-500 ">
                            Roll: {student.rollNumber}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900 ">
                          {student.department}
                        </div>
                        <div className="text-sm text-gray-500 ">
                          {student.year}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center space-x-1">
                          <Star className="w-4 h-4 text-yellow-400" />
                          <span className="text-sm font-medium text-gray-900 ">
                            {student.gpa.toFixed(1)}
                          </span>
                        </div>
                        <div className="text-xs text-gray-500 ">
                          Admitted: {new Date(student.admissionDate).toLocaleDateString()}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <select
                          value={student.status}
                          onChange={(e) => handleStatusChange(student.id, e.target.value as any)}
                          className={`text-xs px-2 py-1 rounded-full font-medium border-0 focus:ring-2 focus:ring-blue-500 ${getStatusColor(student.status)}`}
                        >
                          <option value="Active">Active</option>
                          <option value="Inactive">Inactive</option>
                          <option value="Graduated">Graduated</option>
                        </select>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getFeeStatusColor(student.feeStatus)}`}>
                          {student.feeStatus}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-2">
                          <Link
                            to={`/admin/individual-student/${student.id}`}
                            className="text-blue-600 hover:text-blue-900 "
                          >
                            <Eye className="w-4 h-4" />
                          </Link>
                          <button
                            onClick={() => handleDelete(student.id, student.name)}
                            className="text-red-600 hover:text-red-900 "
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="bg-white  px-4 py-3 border-t border-gray-200  flex items-center justify-between">
                <div className="text-sm text-gray-700 ">
                  Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, filteredStudents.length)} of {filteredStudents.length} students
                </div>
                <div className="flex space-x-1">
                  <button
                    onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                    className="px-3 py-1 border border-gray-300  rounded text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 "
                  >
                    Previous
                  </button>
                  
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`px-3 py-1 border rounded text-sm ${
                        currentPage === page
                          ? 'bg-blue-600 text-white border-blue-600'
                          : 'border-gray-300  hover:bg-gray-50 '
                      }`}
                    >
                      {page}
                    </button>
                  ))}
                  
                  <button
                    onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                    disabled={currentPage === totalPages}
                    className="px-3 py-1 border border-gray-300  rounded text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 "
                  >
                    Next
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default StudentRecord;