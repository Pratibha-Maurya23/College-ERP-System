import React, { useState } from 'react';
import { 
  FileText, 
  Upload, 
  Check, 
  Clock, 
  AlertCircle, 
  Download,
  Plus,
  MessageCircle
} from 'lucide-react';

interface AdmissionModuleProps {
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

export const AdmissionModule: React.FC<AdmissionModuleProps> = ({ student }) => {
  const [activeTab, setActiveTab] = useState<'registration' | 'documents' | 'service-tickets'>('registration');
  const [serviceTickets, setServiceTickets] = useState([
    {
      id: 'TKT001',
      title: 'Course Change Request',
      description: 'Request to change from CSE to IT',
      status: 'pending',
      priority: 'high',
      createdDate: '2024-01-10',
      category: 'academic'
    },
    {
      id: 'TKT002',
      title: 'Document Verification Issue',
      description: 'Birth certificate verification pending',
      status: 'in-progress',
      priority: 'medium',
      createdDate: '2024-01-08',
      category: 'document'
    }
  ]);

  const [newTicket, setNewTicket] = useState({
    title: '',
    description: '',
    category: 'general',
    priority: 'medium'
  });

  const registrationData = {
    currentYear: '2023-24',
    nextYear: '2024-25',
    registrationStatus: 'open',
    registrationDeadline: '2024-02-15',
    documentsRequired: [
      'Previous Year Mark Sheets',
      'Fee Receipt',
      'Medical Certificate',
      'Character Certificate'
    ]
  };

  const documents = [
    { name: 'Aadhaar Card', status: 'approved', uploadDate: '2024-01-05' },
    { name: '10th Mark Sheet', status: 'approved', uploadDate: '2024-01-05' },
    { name: '12th Mark Sheet', status: 'approved', uploadDate: '2024-01-05' },
    { name: 'Birth Certificate', status: 'pending', uploadDate: '2024-01-08' },
    { name: 'Caste Certificate', status: 'rejected', uploadDate: '2024-01-07', remarks: 'Invalid format - Please upload clear PDF' },
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved':
        return <Check className="h-4 w-4 text-green-600" />;
      case 'pending':
        return <Clock className="h-4 w-4 text-yellow-600" />;
      case 'rejected':
        return <AlertCircle className="h-4 w-4 text-red-600" />;
      default:
        return <FileText className="h-4 w-4 text-gray-600" />;
    }
  };

  const getStatusBadge = (status: string) => {
    const statusClasses = {
      approved: 'bg-green-100 text-green-700',
      pending: 'bg-yellow-100 text-yellow-700',
      rejected: 'bg-red-100 text-red-700',
      'in-progress': 'bg-blue-100 text-blue-700'
    };
    
    return (
      <span className={`px-2 py-1 text-xs rounded-full capitalize ${statusClasses[status as keyof typeof statusClasses] || 'bg-gray-100 text-gray-700'}`}>
        {status}
      </span>
    );
  };

  const handleCreateTicket = (e: React.FormEvent) => {
    e.preventDefault();
    const ticket = {
      id: `TKT${String(serviceTickets.length + 1).padStart(3, '0')}`,
      ...newTicket,
      status: 'pending',
      createdDate: new Date().toISOString().split('T')[0]
    };
    setServiceTickets([...serviceTickets, ticket]);
    setNewTicket({ title: '', description: '', category: 'general', priority: 'medium' });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Admission Management</h1>
        <p className="text-gray-600">Manage your admission process, registration, and documents</p>
      </div>

      {/* Tab Navigation */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-6">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {[
              { key: 'registration', label: 'Next Year Registration' },
              { key: 'documents', label: 'Documents' },
              { key: 'service-tickets', label: 'Service Tickets' }
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key as any)}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${
                  activeTab === tab.key
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        <div className="p-6">
          {activeTab === 'registration' && (
            <div className="space-y-6">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-blue-900 mb-2">Registration Status</h3>
                <p className="text-blue-700">
                  Registration for {registrationData.nextYear} is now {registrationData.registrationStatus}!
                </p>
                <p className="text-sm text-blue-600 mt-2">
                  Deadline: {registrationData.registrationDeadline}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">Registration Details</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Current Academic Year:</span>
                      <span className="font-medium">{registrationData.currentYear}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Next Academic Year:</span>
                      <span className="font-medium">{registrationData.nextYear}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Course:</span>
                      <span className="font-medium">{student.course}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Current Year:</span>
                      <span className="font-medium">{student.year}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">Documents Required</h4>
                  <ul className="space-y-2">
                    {registrationData.documentsRequired.map((doc, index) => (
                      <li key={index} className="flex items-center text-sm text-gray-700">
                        <FileText className="h-4 w-4 text-gray-400 mr-2" />
                        {doc}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="flex space-x-4">
                <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200">
                  Start Registration
                </button>
                <button className="bg-gray-100 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-200 transition-colors duration-200">
                  Download Form
                </button>
              </div>
            </div>
          )}

          {activeTab === 'documents' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-gray-900">Document Status</h3>
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center">
                  <Upload className="h-4 w-4 mr-2" />
                  Upload New Document
                </button>
              </div>

              <div className="grid gap-4">
                {documents.map((doc, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        {getStatusIcon(doc.status)}
                        <div>
                          <h4 className="font-medium text-gray-900">{doc.name}</h4>
                          <p className="text-sm text-gray-500">Uploaded: {doc.uploadDate}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        {getStatusBadge(doc.status)}
                        <button className="p-2 text-gray-600 hover:text-blue-600">
                          <Download className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                    {doc.status === 'rejected' && (
                      <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-lg">
                        <p className="text-sm text-red-700">
                          <strong>Rejection Reason:</strong> {doc.remarks}
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'service-tickets' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-gray-900">Service Tickets</h3>
                <button 
                  onClick={() => {
                    const element = document.getElementById('new-ticket-form');
                    element?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Create Ticket
                </button>
              </div>

              {/* Existing Tickets */}
              <div className="space-y-4">
                {serviceTickets.map((ticket) => (
                  <div key={ticket.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h4 className="font-medium text-gray-900">{ticket.title}</h4>
                          {getStatusBadge(ticket.status)}
                          <span className={`px-2 py-1 text-xs rounded-full ${
                            ticket.priority === 'high' ? 'bg-red-100 text-red-700' :
                            ticket.priority === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                            'bg-green-100 text-green-700'
                          }`}>
                            {ticket.priority} priority
                          </span>
                        </div>
                        <p className="text-gray-600 mb-2">{ticket.description}</p>
                        <p className="text-sm text-gray-500">
                          Ticket ID: {ticket.id} • Created: {ticket.createdDate}
                        </p>
                      </div>
                      <button className="ml-4 p-2 text-gray-600 hover:text-blue-600">
                        <MessageCircle className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* New Ticket Form */}
              <div id="new-ticket-form" className="border-t border-gray-200 pt-6">
                <h4 className="text-lg font-semibold text-gray-900 mb-4">Create New Service Ticket</h4>
                <form onSubmit={handleCreateTicket} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Ticket Title
                    </label>
                    <input
                      type="text"
                      value={newTicket.title}
                      onChange={(e) => setNewTicket({ ...newTicket, title: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Brief description of your request"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Description
                    </label>
                    <textarea
                      value={newTicket.description}
                      onChange={(e) => setNewTicket({ ...newTicket, description: e.target.value })}
                      rows={4}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Provide detailed information about your request"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Category
                      </label>
                      <select
                        value={newTicket.category}
                        onChange={(e) => setNewTicket({ ...newTicket, category: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="general">General</option>
                        <option value="academic">Academic</option>
                        <option value="document">Document</option>
                        <option value="fee">Fee Related</option>
                        <option value="technical">Technical Support</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Priority
                      </label>
                      <select
                        value={newTicket.priority}
                        onChange={(e) => setNewTicket({ ...newTicket, priority: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                      </select>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200"
                  >
                    Create Ticket
                  </button>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};