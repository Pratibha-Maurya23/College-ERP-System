import React, { useState } from 'react';
import { 
  Calendar, 
  FileText, 
  Trophy, 
  Download, 
  Clock, 
  CheckCircle, 
  AlertCircle,
  BookOpen,
  User,
  MapPin
} from 'lucide-react';

interface ExaminationModuleProps {
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

export const ExaminationModule: React.FC<ExaminationModuleProps> = ({ student }) => {
  const [activeTab, setActiveTab] = useState<'registration' | 'admit-card' | 'results' | 're-evaluation'>('registration');

  const examSchedule = [
    {
      subject: 'Data Structures and Algorithms',
      code: 'CSE301',
      date: '2024-01-20',
      time: '09:30 AM - 12:30 PM',
      duration: '3 hours',
      hall: 'Block A, Hall 101',
      status: 'registered'
    },
    {
      subject: 'Database Management Systems',
      code: 'CSE302',
      date: '2024-01-22',
      time: '09:30 AM - 12:30 PM',
      duration: '3 hours',
      hall: 'Block A, Hall 102',
      status: 'registered'
    },
    {
      subject: 'Computer Networks',
      code: 'CSE303',
      date: '2024-01-24',
      time: '02:00 PM - 05:00 PM',
      duration: '3 hours',
      hall: 'Block B, Hall 201',
      status: 'registered'
    },
    {
      subject: 'Operating Systems',
      code: 'CSE304',
      date: '2024-01-26',
      time: '09:30 AM - 12:30 PM',
      duration: '3 hours',
      hall: 'Block A, Hall 103',
      status: 'registered'
    },
    {
      subject: 'Software Engineering',
      code: 'CSE305',
      date: '2024-01-28',
      time: '02:00 PM - 05:00 PM',
      duration: '3 hours',
      hall: 'Block B, Hall 202',
      status: 'registered'
    }
  ];

  const previousResults = [
    {
      semester: '5th Semester',
      year: '2023',
      subjects: [
        { name: 'Machine Learning', code: 'CSE401', credits: 4, grade: 'A', points: 9 },
        { name: 'Compiler Design', code: 'CSE402', credits: 4, grade: 'A+', points: 10 },
        { name: 'Computer Graphics', code: 'CSE403', credits: 3, grade: 'B+', points: 8 },
        { name: 'Web Technologies', code: 'CSE404', credits: 3, grade: 'A', points: 9 },
        { name: 'Mobile App Development', code: 'CSE405', credits: 2, grade: 'A+', points: 10 }
      ],
      cgpa: 9.1,
      sgpa: 9.2
    }
  ];

  const reEvaluationRequests = [
    {
      id: 'RE001',
      subject: 'Computer Graphics',
      code: 'CSE403',
      originalGrade: 'B+',
      requestDate: '2024-01-05',
      status: 'under-review',
      fee: '₹500'
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'registered':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'pending':
        return <Clock className="h-4 w-4 text-yellow-600" />;
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-blue-600" />;
      default:
        return <AlertCircle className="h-4 w-4 text-gray-600" />;
    }
  };

  const getStatusBadge = (status: string) => {
    const statusClasses = {
      'registered': 'bg-green-100 text-green-700',
      'pending': 'bg-yellow-100 text-yellow-700',
      'completed': 'bg-blue-100 text-blue-700',
      'under-review': 'bg-orange-100 text-orange-700',
      'approved': 'bg-green-100 text-green-700',
      'rejected': 'bg-red-100 text-red-700'
    };
    
    return (
      <span className={`px-2 py-1 text-xs rounded-full capitalize ${statusClasses[status as keyof typeof statusClasses] || 'bg-gray-100 text-gray-700'}`}>
        {status.replace('-', ' ')}
      </span>
    );
  };

  const getGradeColor = (grade: string) => {
    const gradeColors = {
      'A+': 'text-green-600',
      'A': 'text-green-500',
      'B+': 'text-blue-600',
      'B': 'text-blue-500',
      'C+': 'text-yellow-600',
      'C': 'text-yellow-500',
      'D': 'text-red-500',
      'F': 'text-red-600'
    };
    return gradeColors[grade as keyof typeof gradeColors] || 'text-gray-600';
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Examination Portal</h1>
        <p className="text-gray-600">Manage your exam registration, admit cards, results, and re-evaluation requests</p>
      </div>

      {/* Tab Navigation */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-6">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {[
              { key: 'registration', label: 'Registration' },
              { key: 'admit-card', label: 'Admit Card' },
              { key: 'results', label: 'Results' },
              { key: 're-evaluation', label: 'Re-Evaluation' }
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
                <h3 className="text-lg font-semibold text-blue-900 mb-2">Exam Registration Status</h3>
                <p className="text-blue-700">
                  You are registered for {student.semester} End Semester Examinations
                </p>
                <p className="text-sm text-blue-600 mt-2">
                  Registration Date: 15th December 2023 - 20th December 2023
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <Calendar className="h-5 w-5 mr-2 text-purple-600" />
                  Exam Schedule
                </h3>
                <div className="space-y-4">
                  {examSchedule.map((exam, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow duration-200">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <BookOpen className="h-5 w-5 text-gray-600" />
                            <h4 className="font-semibold text-gray-900">{exam.subject}</h4>
                            {getStatusIcon(exam.status)}
                          </div>
                          <p className="text-sm text-gray-600 mb-2">Course Code: {exam.code}</p>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                            <div className="flex items-center">
                              <Calendar className="h-4 w-4 text-gray-400 mr-2" />
                              <span>{exam.date}</span>
                            </div>
                            <div className="flex items-center">
                              <Clock className="h-4 w-4 text-gray-400 mr-2" />
                              <span>{exam.time}</span>
                            </div>
                            <div className="flex items-center">
                              <MapPin className="h-4 w-4 text-gray-400 mr-2" />
                              <span>{exam.hall}</span>
                            </div>
                          </div>
                        </div>
                        <div className="ml-4">
                          {getStatusBadge(exam.status)}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <h4 className="font-medium text-yellow-800 mb-2">Important Instructions</h4>
                <ul className="text-sm text-yellow-700 space-y-1">
                  <li>• Report to exam hall 30 minutes before exam time</li>
                  <li>• Bring valid ID card and admit card</li>
                  <li>• Use only blue/black ballpoint pen</li>
                  <li>• Mobile phones and electronic devices are strictly prohibited</li>
                  <li>• Follow university dress code guidelines</li>
                </ul>
              </div>
            </div>
          )}

          {activeTab === 'admit-card' && (
            <div className="space-y-6">
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-green-900 mb-2">Admit Card Available</h3>
                    <p className="text-green-700">
                      Your admit card for {student.semester} End Semester Examinations is ready for download
                    </p>
                  </div>
                  <button className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors duration-200 flex items-center">
                    <Download className="h-4 w-4 mr-2" />
                    Download Admit Card
                  </button>
                </div>
              </div>

              {/* Admit Card Preview */}
              <div className="bg-white border-2 border-gray-300 rounded-lg p-8 max-w-2xl">
                <div className="text-center mb-6">
                  <h2 className="text-xl font-bold text-gray-900">ABC ENGINEERING COLLEGE</h2>
                  <p className="text-gray-600">End Semester Examination - {student.semester}</p>
                  <p className="text-gray-600">Academic Year: 2023-24</p>
                </div>

                <div className="grid grid-cols-2 gap-6 mb-6">
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-3">Student Details</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Name:</span>
                        <span className="font-medium">{student.name}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Roll Number:</span>
                        <span className="font-medium">{student.rollNumber}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Course:</span>
                        <span className="font-medium">{student.course}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Semester:</span>
                        <span className="font-medium">{student.semester}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-center">
                    <div className="w-32 h-40 bg-gray-200 rounded border-2 border-gray-300 flex items-center justify-center">
                      <User className="h-12 w-12 text-gray-400" />
                    </div>
                  </div>
                </div>

                <div className="border-t border-gray-200 pt-4">
                  <h4 className="font-semibold text-gray-900 mb-3">Exam Schedule</h4>
                  <div className="space-y-2 text-xs">
                    {examSchedule.slice(0, 3).map((exam, index) => (
                      <div key={index} className="flex justify-between items-center py-1">
                        <span>{exam.subject} ({exam.code})</span>
                        <span>{exam.date} | {exam.time}</span>
                        <span>{exam.hall}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="border-t border-gray-200 pt-4 mt-4">
                  <p className="text-xs text-gray-600 text-center">
                    This is a computer generated admit card. No signature required.
                  </p>
                </div>
              </div>

              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <h4 className="font-medium text-red-800 mb-2">Important Notes</h4>
                <ul className="text-sm text-red-700 space-y-1">
                  <li>• This admit card must be presented at the examination hall</li>
                  <li>• Admission will be denied without proper admit card</li>
                  <li>• Verify all details before the exam date</li>
                  <li>• Contact examination office for any discrepancies</li>
                </ul>
              </div>
            </div>
          )}

          {activeTab === 'results' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-1">
                  <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-xl p-6">
                    <div className="flex items-center mb-4">
                      <Trophy className="h-8 w-8 mr-3" />
                      <h3 className="text-xl font-bold">Academic Performance</h3>
                    </div>
                    <div className="space-y-3">
                      <div>
                        <p className="text-blue-100">Current CGPA</p>
                        <p className="text-3xl font-bold">8.7</p>
                      </div>
                      <div>
                        <p className="text-blue-100">Class Rank</p>
                        <p className="text-xl font-semibold">12/120</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-2">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Previous Semester Results</h3>
                  {previousResults.map((result, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-6">
                      <div className="flex items-center justify-between mb-4">
                        <h4 className="text-lg font-semibold text-gray-900">
                          {result.semester} - {result.year}
                        </h4>
                        <div className="text-right">
                          <p className="text-sm text-gray-600">SGPA: <span className="font-bold text-blue-600">{result.sgpa}</span></p>
                          <p className="text-sm text-gray-600">CGPA: <span className="font-bold text-blue-600">{result.cgpa}</span></p>
                        </div>
                      </div>

                      <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                          <thead>
                            <tr className="border-b border-gray-200">
                              <th className="text-left py-2">Subject</th>
                              <th className="text-center py-2">Code</th>
                              <th className="text-center py-2">Credits</th>
                              <th className="text-center py-2">Grade</th>
                              <th className="text-center py-2">Points</th>
                            </tr>
                          </thead>
                          <tbody>
                            {result.subjects.map((subject, idx) => (
                              <tr key={idx} className="border-b border-gray-100">
                                <td className="py-2">{subject.name}</td>
                                <td className="text-center py-2">{subject.code}</td>
                                <td className="text-center py-2">{subject.credits}</td>
                                <td className={`text-center py-2 font-bold ${getGradeColor(subject.grade)}`}>
                                  {subject.grade}
                                </td>
                                <td className="text-center py-2">{subject.points}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex space-x-4">
                <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center">
                  <Download className="h-4 w-4 mr-2" />
                  Download Transcript
                </button>
                <button className="bg-gray-100 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-200 transition-colors duration-200 flex items-center">
                  <FileText className="h-4 w-4 mr-2" />
                  Detailed Mark Sheet
                </button>
              </div>
            </div>
          )}

          {activeTab === 're-evaluation' && (
            <div className="space-y-6">
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-yellow-900 mb-2">Re-Evaluation Process</h3>
                <p className="text-yellow-700 mb-2">
                  You can apply for re-evaluation of your answer sheets within 15 days of result declaration.
                </p>
                <p className="text-sm text-yellow-600">
                  Re-evaluation fee: ₹500 per subject
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Re-Evaluation Requests</h3>
                {reEvaluationRequests.length > 0 ? (
                  <div className="space-y-4">
                    {reEvaluationRequests.map((request) => (
                      <div key={request.id} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center space-x-3 mb-2">
                              <h4 className="font-semibold text-gray-900">{request.subject}</h4>
                              {getStatusBadge(request.status)}
                            </div>
                            <p className="text-sm text-gray-600 mb-2">
                              Course Code: {request.code} | Original Grade: {request.originalGrade}
                            </p>
                            <p className="text-sm text-gray-500">
                              Request ID: {request.id} | Applied: {request.requestDate} | Fee: {request.fee}
                            </p>
                          </div>
                          <button className="ml-4 bg-gray-100 text-gray-700 px-3 py-1 rounded text-sm hover:bg-gray-200 transition-colors duration-200">
                            Track Status
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    No re-evaluation requests found
                  </div>
                )}
              </div>

              <div className="border-t border-gray-200 pt-6">
                <h4 className="text-lg font-semibold text-gray-900 mb-4">Apply for Re-Evaluation</h4>
                <form className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Select Subject
                      </label>
                      <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                        <option value="">Choose a subject</option>
                        {previousResults[0]?.subjects.map((subject, index) => (
                          <option key={index} value={subject.code}>
                            {subject.name} ({subject.code}) - Grade: {subject.grade}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Reason for Re-Evaluation
                      </label>
                      <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                        <option value="">Select reason</option>
                        <option value="totaling-error">Totaling Error</option>
                        <option value="answer-not-evaluated">Answer Not Evaluated</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Additional Comments
                    </label>
                    <textarea
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Provide any additional information..."
                    />
                  </div>

                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-sm text-gray-600">
                      <strong>Total Fee:</strong> ₹500 per subject<br />
                      <strong>Processing Time:</strong> 10-15 working days<br />
                      <strong>Note:</strong> Fee will be refunded only if grade changes in your favor
                    </p>
                  </div>

                  <button
                    type="submit"
                    className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200"
                  >
                    Submit Re-Evaluation Request
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