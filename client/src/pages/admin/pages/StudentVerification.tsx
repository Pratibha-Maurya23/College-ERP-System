import React, { useState } from 'react';
import { useAdmin } from '../contexts/AdminContext';
import { Search, Filter, Eye, Check, X, FileText, Phone, Mail, Calendar } from 'lucide-react';
import { showToast } from '../../../utils/toast';

const StudentVerification: React.FC = () => {
  const { pendingApplications, approveApplication, rejectApplication } = useAdmin();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedApplication, setSelectedApplication] = useState<string | null>(null);

  const filteredApplications = pendingApplications.filter((app) => {
    const matchesSearch = app.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         app.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         app.department.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = filterStatus === 'all' || app.status.toLowerCase() === filterStatus;
    
    return matchesSearch && matchesFilter;
  });

  const handleApprove = (id: string) => {
    approveApplication(id);
    showToast('Application approved successfully!', 'success');
    setSelectedApplication(null);
  };

  const handleReject = (id: string) => {
    rejectApplication(id);
    showToast('Application rejected', 'error');
    setSelectedApplication(null);
  };

  const selectedApp = pendingApplications.find(app => app.id === selectedApplication);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white  p-6 rounded-lg shadow-sm">
        <h1 className="text-2xl font-bold text-gray-900  mb-2">
          Student Verification
        </h1>
        <p className="text-gray-600 ">
          Review and verify pending student applications
        </p>
      </div>

      {/* Search and Filter */}
      <div className="bg-white  p-6 rounded-lg shadow-sm">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search by name, email, or department..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500   "
              />
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Filter className="w-5 h-5 text-gray-400" />
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500   "
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="under review">Under Review</option>
            </select>
          </div>
        </div>
      </div>

      {/* Applications Grid */}
      <div className="grid gap-6">
        {filteredApplications.length === 0 ? (
          <div className="bg-white  p-12 rounded-lg shadow-sm text-center">
            <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900  mb-2">
              No applications found
            </h3>
            <p className="text-gray-600 ">
              {searchTerm || filterStatus !== 'all' 
                ? 'Try adjusting your search or filters'
                : 'No pending applications at the moment'
              }
            </p>
          </div>
        ) : (
          filteredApplications.map((application) => (
            <div key={application.id} className="bg-white  p-6 rounded-lg shadow-sm">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 ">
                        {application.studentName}
                      </h3>
                      <p className="text-sm text-gray-600 ">
                        Applied for {application.department} • {application.year}
                      </p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      application.status === 'Pending'
                        ? 'bg-yellow-100 text-yellow-800  '
                        : 'bg-blue-100 text-blue-800'
                    }`}>
                      {application.status}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div className="flex items-center space-x-2 text-sm text-gray-600 ">
                      <Mail className="w-4 h-4" />
                      <span>{application.email}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-gray-600 ">
                      <Phone className="w-4 h-4" />
                      <span>{application.phone}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-gray-600 ">
                      <Calendar className="w-4 h-4" />
                      <span>{new Date(application.applicationDate).toLocaleDateString()}</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {application.documents.map((doc, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-gray-100  text-gray-700  rounded text-xs"
                      >
                        {doc}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={() => setSelectedApplication(application.id)}
                    className="flex items-center justify-center space-x-2 px-4 py-2 border border-gray-300  rounded-lg hover:bg-gray-50  transition-colors"
                  >
                    <Eye className="w-4 h-4" />
                    <span>View Details</span>
                  </button>
                  <button
                    onClick={() => handleApprove(application.id)}
                    className="flex items-center justify-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                  >
                    <Check className="w-4 h-4" />
                    <span>Approve</span>
                  </button>
                  <button
                    onClick={() => handleReject(application.id)}
                    className="flex items-center justify-center space-x-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                  >
                    <X className="w-4 h-4" />
                    <span>Reject</span>
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Application Details Modal */}
      {selectedApp && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white  rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900 ">
                  Application Details
                </h2>
                <button
                  onClick={() => setSelectedApplication(null)}
                  className="p-2 hover:bg-gray-100  rounded-lg"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700  mb-1">
                      Student Name
                    </label>
                    <p className="text-gray-900 ">{selectedApp.studentName}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700  mb-1">
                      Email
                    </label>
                    <p className="text-gray-900 ">{selectedApp.email}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700  mb-1">
                      Phone
                    </label>
                    <p className="text-gray-900 ">{selectedApp.phone}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700  mb-1">
                      Department
                    </label>
                    <p className="text-gray-900 ">{selectedApp.department}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700  mb-1">
                      Year
                    </label>
                    <p className="text-gray-900 ">{selectedApp.year}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700  mb-1">
                      Date of Birth
                    </label>
                    <p className="text-gray-900 ">
                      {new Date(selectedApp.dateOfBirth).toLocaleDateString()}
                    </p>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700  mb-1">
                    Address
                  </label>
                  <p className="text-gray-900 ">{selectedApp.address}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700  mb-1">
                      Guardian Name
                    </label>
                    <p className="text-gray-900 ">{selectedApp.guardianName}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700  mb-1">
                      Guardian Phone
                    </label>
                    <p className="text-gray-900 ">{selectedApp.guardianPhone}</p>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700  mb-2">
                    Submitted Documents
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {selectedApp.documents.map((doc, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                      >
                        {doc}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex justify-end space-x-3 mt-8">
                <button
                  onClick={() => setSelectedApplication(null)}
                  className="px-4 py-2 border border-gray-300  rounded-lg hover:bg-gray-50  transition-colors"
                >
                  Close
                </button>
                <button
                  onClick={() => handleReject(selectedApp.id)}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  Reject
                </button>
                <button
                  onClick={() => handleApprove(selectedApp.id)}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  Approve
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentVerification;