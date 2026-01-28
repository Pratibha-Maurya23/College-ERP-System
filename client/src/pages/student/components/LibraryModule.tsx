import React, { useState } from 'react';
import { 
  BookOpen, 
  Search, 
  Calendar, 
  AlertCircle,
  CheckCircle,
  Clock,
  Star,
  Download,
  RefreshCw,
  Plus
} from 'lucide-react';

interface LibraryModuleProps {
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

export const LibraryModule: React.FC<LibraryModuleProps> = ({ student }) => {
  const [activeTab, setActiveTab] = useState<'search' | 'issued' | 'history' | 'fines'>('search');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchFilter, setSearchFilter] = useState('all');

  const issuedBooks = [
    {
      id: 'B001',
      title: 'Introduction to Algorithms',
      author: 'Thomas H. Cormen',
      isbn: '978-0262033848',
      issueDate: '2024-01-10',
      dueDate: '2024-02-10',
      renewalCount: 1,
      maxRenewals: 2,
      status: 'active',
      fine: 0
    },
    {
      id: 'B002',
      title: 'Database System Concepts',
      author: 'Abraham Silberschatz',
      isbn: '978-0073523323',
      issueDate: '2024-01-05',
      dueDate: '2024-01-25',
      renewalCount: 0,
      maxRenewals: 2,
      status: 'overdue',
      fine: 50
    },
    {
      id: 'B003',
      title: 'Computer Networks',
      author: 'Andrew S. Tanenbaum',
      isbn: '978-0132126953',
      issueDate: '2024-01-12',
      dueDate: '2024-02-12',
      renewalCount: 0,
      maxRenewals: 2,
      status: 'active',
      fine: 0
    }
  ];

  const bookHistory = [
    {
      id: 'H001',
      title: 'Operating System Concepts',
      author: 'Abraham Silberschatz',
      issueDate: '2023-12-01',
      returnDate: '2023-12-28',
      status: 'returned',
      rating: 4
    },
    {
      id: 'H002',
      title: 'Software Engineering',
      author: 'Ian Sommerville',
      issueDate: '2023-11-15',
      returnDate: '2023-12-10',
      status: 'returned',
      rating: 5
    },
    {
      id: 'H003',
      title: 'Data Mining Concepts',
      author: 'Jiawei Han',
      issueDate: '2023-11-01',
      returnDate: '2023-11-25',
      status: 'returned',
      rating: 3
    }
  ];

  const searchResults = [
    {
      id: 'S001',
      title: 'Machine Learning',
      author: 'Tom M. Mitchell',
      publisher: 'McGraw-Hill',
      year: '1997',
      isbn: '978-0070428072',
      category: 'Computer Science',
      availability: 'available',
      totalCopies: 5,
      availableCopies: 2,
      rating: 4.5,
      location: 'Section A, Shelf 15'
    },
    {
      id: 'S002',
      title: 'Artificial Intelligence: A Modern Approach',
      author: 'Stuart Russell, Peter Norvig',
      publisher: 'Pearson',
      year: '2020',
      isbn: '978-0134610993',
      category: 'Computer Science',
      availability: 'available',
      totalCopies: 3,
      availableCopies: 1,
      rating: 4.8,
      location: 'Section A, Shelf 12'
    },
    {
      id: 'S003',
      title: 'Deep Learning',
      author: 'Ian Goodfellow',
      publisher: 'MIT Press',
      year: '2016',
      isbn: '978-0262035613',
      category: 'Computer Science',
      availability: 'not-available',
      totalCopies: 2,
      availableCopies: 0,
      rating: 4.7,
      location: 'Section A, Shelf 18'
    }
  ];

  const fines = [
    {
      id: 'F001',
      bookTitle: 'Database System Concepts',
      fine: 50,
      reason: 'Overdue (5 days)',
      date: '2024-01-16',
      status: 'pending'
    }
  ];

  const libraryStats = {
    totalBooksIssued: 15,
    currentlyIssued: 3,
    totalFines: 50,
    booksReturned: 12
  };

  const getStatusBadge = (status: string) => {
    const statusClasses = {
      'active': 'bg-green-100 text-green-700',
      'overdue': 'bg-red-100 text-red-700',
      'returned': 'bg-blue-100 text-blue-700',
      'available': 'bg-green-100 text-green-700',
      'not-available': 'bg-red-100 text-red-700',
      'pending': 'bg-yellow-100 text-yellow-700',
      'paid': 'bg-green-100 text-green-700'
    };
    
    return (
      <span className={`px-2 py-1 text-xs rounded-full capitalize ${statusClasses[status as keyof typeof statusClasses] || 'bg-gray-100 text-gray-700'}`}>
        {status.replace('-', ' ')}
      </span>
    );
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'overdue':
        return <AlertCircle className="h-4 w-4 text-red-600" />;
      case 'returned':
        return <CheckCircle className="h-4 w-4 text-blue-600" />;
      default:
        return <Clock className="h-4 w-4 text-gray-600" />;
    }
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star 
        key={i} 
        className={`h-4 w-4 ${i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
      />
    ));
  };

  const isOverdue = (dueDate: string) => {
    return new Date(dueDate) < new Date();
  };

  const getDaysOverdue = (dueDate: string) => {
    const due = new Date(dueDate);
    const now = new Date();
    const diffTime = now.getTime() - due.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return Math.max(0, diffDays);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Library Management</h1>
        <p className="text-gray-600">Search books, manage issued books, track due dates, and pay fines</p>
      </div>

      {/* Library Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Currently Issued</p>
              <p className="text-2xl font-bold text-blue-600">{libraryStats.currentlyIssued}</p>
            </div>
            <div className="p-3 rounded-lg bg-blue-100">
              <BookOpen className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Total Issued</p>
              <p className="text-2xl font-bold text-gray-900">{libraryStats.totalBooksIssued}</p>
            </div>
            <div className="p-3 rounded-lg bg-green-100">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Books Returned</p>
              <p className="text-2xl font-bold text-gray-900">{libraryStats.booksReturned}</p>
            </div>
            <div className="p-3 rounded-lg bg-purple-100">
              <RefreshCw className="h-6 w-6 text-purple-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Total Fines</p>
              <p className={`text-2xl font-bold ${libraryStats.totalFines > 0 ? 'text-red-600' : 'text-gray-900'}`}>
                ₹{libraryStats.totalFines}
              </p>
            </div>
            <div className={`p-3 rounded-lg ${libraryStats.totalFines > 0 ? 'bg-red-100' : 'bg-gray-100'}`}>
              <AlertCircle className={`h-6 w-6 ${libraryStats.totalFines > 0 ? 'text-red-600' : 'text-gray-600'}`} />
            </div>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-6">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {[
              { key: 'search', label: 'Search Books' },
              { key: 'issued', label: 'Issued Books' },
              { key: 'history', label: 'History' },
              { key: 'fines', label: 'Fines' }
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
                {tab.key === 'fines' && libraryStats.totalFines > 0 && (
                  <span className="ml-2 bg-red-100 text-red-600 text-xs px-2 py-1 rounded-full">
                    ₹{libraryStats.totalFines}
                  </span>
                )}
              </button>
            ))}
          </nav>
        </div>

        <div className="p-6">
          {activeTab === 'search' && (
            <div className="space-y-6">
              {/* Search Interface */}
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search by title, author, ISBN..."
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <select
                  value={searchFilter}
                  onChange={(e) => setSearchFilter(e.target.value)}
                  className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="all">All Categories</option>
                  <option value="computer-science">Computer Science</option>
                  <option value="mathematics">Mathematics</option>
                  <option value="physics">Physics</option>
                  <option value="electronics">Electronics</option>
                </select>
                <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-200">
                  Search
                </button>
              </div>

              {/* Search Results */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900">Search Results</h3>
                {searchResults.map((book) => (
                  <div key={book.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow duration-200">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h4 className="text-lg font-semibold text-gray-900">{book.title}</h4>
                          {getStatusBadge(book.availability)}
                        </div>
                        <p className="text-gray-600 mb-2">by {book.author}</p>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600 mb-3">
                          <div>Publisher: {book.publisher}</div>
                          <div>Year: {book.year}</div>
                          <div>ISBN: {book.isbn}</div>
                          <div>Location: {book.location}</div>
                        </div>
                        <div className="flex items-center space-x-4 text-sm">
                          <div className="flex items-center">
                            {renderStars(Math.floor(book.rating))}
                            <span className="ml-1 text-gray-600">({book.rating})</span>
                          </div>
                          <div className="text-gray-600">
                            Available: {book.availableCopies}/{book.totalCopies}
                          </div>
                        </div>
                      </div>
                      <div className="ml-4 flex flex-col space-y-2">
                        <button
                          disabled={book.availability === 'not-available'}
                          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                            book.availability === 'available'
                              ? 'bg-blue-600 text-white hover:bg-blue-700'
                              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                          }`}
                        >
                          {book.availability === 'available' ? 'Request Book' : 'Not Available'}
                        </button>
                        <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm hover:bg-gray-200 transition-colors duration-200">
                          Add to Wishlist
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'issued' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-gray-900">Currently Issued Books</h3>
                <p className="text-sm text-gray-600">
                  {issuedBooks.length} book(s) issued • Max limit: 5 books
                </p>
              </div>

              {issuedBooks.map((book) => (
                <div key={book.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        {getStatusIcon(book.status)}
                        <h4 className="text-lg font-semibold text-gray-900">{book.title}</h4>
                        {getStatusBadge(book.status)}
                        {book.fine > 0 && (
                          <span className="bg-red-100 text-red-700 text-xs px-2 py-1 rounded-full">
                            Fine: ₹{book.fine}
                          </span>
                        )}
                      </div>
                      <p className="text-gray-600 mb-3">by {book.author}</p>
                      
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div>
                          <span className="text-gray-600">Issue Date:</span>
                          <p className="font-medium">{book.issueDate}</p>
                        </div>
                        <div>
                          <span className="text-gray-600">Due Date:</span>
                          <p className={`font-medium ${isOverdue(book.dueDate) ? 'text-red-600' : 'text-gray-900'}`}>
                            {book.dueDate}
                            {isOverdue(book.dueDate) && (
                              <span className="text-red-600 text-xs block">
                                {getDaysOverdue(book.dueDate)} days overdue
                              </span>
                            )}
                          </p>
                        </div>
                        <div>
                          <span className="text-gray-600">Renewals:</span>
                          <p className="font-medium">{book.renewalCount}/{book.maxRenewals}</p>
                        </div>
                        <div>
                          <span className="text-gray-600">ISBN:</span>
                          <p className="font-medium">{book.isbn}</p>
                        </div>
                      </div>
                    </div>

                    <div className="ml-4 flex flex-col space-y-2">
                      <button
                        disabled={book.renewalCount >= book.maxRenewals || book.status === 'overdue'}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                          book.renewalCount < book.maxRenewals && book.status !== 'overdue'
                            ? 'bg-green-600 text-white hover:bg-green-700'
                            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        }`}
                      >
                        <RefreshCw className="h-4 w-4 mr-2 inline" />
                        Renew
                      </button>
                      <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 transition-colors duration-200">
                        Request Return
                      </button>
                      {book.fine > 0 && (
                        <button className="px-4 py-2 bg-red-600 text-white rounded-lg text-sm hover:bg-red-700 transition-colors duration-200">
                          Pay Fine
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}

              {issuedBooks.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  <BookOpen className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                  <p>No books currently issued</p>
                </div>
              )}
            </div>
          )}

          {activeTab === 'history' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">Book History</h3>
              
              <div className="space-y-4">
                {bookHistory.map((book) => (
                  <div key={book.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          {getStatusIcon(book.status)}
                          <h4 className="text-lg font-semibold text-gray-900">{book.title}</h4>
                          {getStatusBadge(book.status)}
                        </div>
                        <p className="text-gray-600 mb-3">by {book.author}</p>
                        
                        <div className="grid grid-cols-3 gap-4 text-sm">
                          <div>
                            <span className="text-gray-600">Issue Date:</span>
                            <p className="font-medium">{book.issueDate}</p>
                          </div>
                          <div>
                            <span className="text-gray-600">Return Date:</span>
                            <p className="font-medium">{book.returnDate}</p>
                          </div>
                          <div>
                            <span className="text-gray-600">Your Rating:</span>
                            <div className="flex items-center mt-1">
                              {renderStars(book.rating)}
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="ml-4">
                        <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm hover:bg-gray-200 transition-colors duration-200">
                          <Download className="h-4 w-4 mr-2 inline" />
                          Receipt
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex justify-center">
                <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200">
                  Load More History
                </button>
              </div>
            </div>
          )}

          {activeTab === 'fines' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-gray-900">Library Fines</h3>
                <div className="text-right">
                  <p className="text-sm text-gray-600">Total Outstanding</p>
                  <p className="text-xl font-bold text-red-600">₹{libraryStats.totalFines}</p>
                </div>
              </div>

              {fines.length > 0 ? (
                <div className="space-y-4">
                  {fines.map((fine) => (
                    <div key={fine.id} className="border border-red-200 rounded-lg p-4 bg-red-50">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <AlertCircle className="h-5 w-5 text-red-600" />
                            <h4 className="font-semibold text-gray-900">{fine.bookTitle}</h4>
                            {getStatusBadge(fine.status)}
                          </div>
                          <p className="text-sm text-gray-600 mb-2">{fine.reason}</p>
                          <p className="text-xs text-gray-500">Fine Date: {fine.date}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-xl font-bold text-red-600 mb-2">₹{fine.fine}</p>
                          <button className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors duration-200 text-sm">
                            Pay Now
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}

                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                    <h4 className="font-medium text-yellow-800 mb-2">Payment Instructions</h4>
                    <ul className="text-sm text-yellow-700 space-y-1">
                      <li>• Pay fines at the library counter or online</li>
                      <li>• Overdue fines: ₹10 per day per book</li>
                      <li>• Lost book fine: Full cost of book + ₹50 processing fee</li>
                      <li>• Books cannot be renewed if fines are pending</li>
                    </ul>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8">
                  <CheckCircle className="h-12 w-12 mx-auto mb-4 text-green-500" />
                  <p className="text-gray-500">No outstanding fines!</p>
                  <p className="text-sm text-gray-400 mt-1">Keep up the good work with timely returns</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};