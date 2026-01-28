import React, { useState } from 'react';
import { 
  Building, 
  Bed, 
  Utensils, 
  Wifi, 
  Car, 
  Shield, 
  Users, 
  Calendar,
  MessageCircle,
  Phone,
  MapPin,
  Star
} from 'lucide-react';

interface HostelModuleProps {
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

export const HostelModule: React.FC<HostelModuleProps> = ({ student }) => {
  const [activeTab, setActiveTab] = useState<'allocation' | 'mess' | 'facilities' | 'complaints'>('allocation');

  const roomDetails = {
    hostelName: 'Harmony Hostel - Block H3',
    roomNumber: '205A',
    roomType: 'Twin Sharing',
    floor: '2nd Floor',
    allottedDate: '2024-01-15',
    roommates: [
      {
        name: 'Rahul Kumar',
        course: 'CSE',
        year: '3rd Year',
        contact: '+91 9876543210'
      }
    ],
    rent: '₹8,000/month',
    securityDeposit: '₹5,000',
    status: 'Active'
  };

  const facilities = [
    { name: 'Wi-Fi Internet', icon: Wifi, available: true, description: '24/7 High-Speed Internet' },
    { name: 'Parking', icon: Car, available: true, description: 'Dedicated parking for students' },
    { name: 'Security', icon: Shield, available: true, description: '24x7 Security with CCTV' },
    { name: 'Common Room', icon: Users, available: true, description: 'Recreation and study area' },
    { name: 'Laundry', icon: Building, available: true, description: 'Washing machines available' },
  ];

  const messMenu = {
    monday: {
      breakfast: 'Poha, Tea, Banana',
      lunch: 'Rice, Dal, Sabji, Roti, Salad',
      dinner: 'Rice, Rajma, Roti, Pickle'
    },
    tuesday: {
      breakfast: 'Upma, Coffee, Apple',
      lunch: 'Rice, Sambar, Dry Sabji, Roti, Curd',
      dinner: 'Rice, Chole, Roti, Papad'
    },
    wednesday: {
      breakfast: 'Aloo Paratha, Tea, Orange',
      lunch: 'Rice, Dal Fry, Mix Veg, Roti, Salad',
      dinner: 'Rice, Paneer Curry, Roti, Pickle'
    },
    thursday: {
      breakfast: 'Bread Omelette, Tea, Banana',
      lunch: 'Rice, Rasam, Potato Curry, Roti, Buttermilk',
      dinner: 'Rice, Dal Tadka, Roti, Papad'
    },
    friday: {
      breakfast: 'Dosa, Chutney, Coffee, Apple',
      lunch: 'Rice, Chicken Curry, Dry Sabji, Roti, Salad',
      dinner: 'Rice, Fish Curry, Roti, Pickle'
    },
    saturday: {
      breakfast: 'Puri Sabji, Tea, Banana',
      lunch: 'Biryani, Raita, Boiled Egg, Pickle',
      dinner: 'Rice, Dal, Aloo Gobi, Roti'
    },
    sunday: {
      breakfast: 'Pancakes, Tea/Coffee, Fruit',
      lunch: 'Special Thali (Regional)',
      dinner: 'Rice, Special Curry, Roti, Sweet'
    }
  };

  const complaints = [
    {
      id: 'CMP001',
      title: 'AC not working properly',
      category: 'Maintenance',
      status: 'In Progress',
      priority: 'High',
      date: '2024-01-10',
      description: 'Air conditioning unit in room 205A is not cooling properly'
    },
    {
      id: 'CMP002',
      title: 'Wi-Fi connectivity issues',
      category: 'Technical',
      status: 'Resolved',
      priority: 'Medium',
      date: '2024-01-08',
      description: 'Intermittent Wi-Fi connection in common areas'
    }
  ];

  const getDayName = (day: string) => {
    return day.charAt(0).toUpperCase() + day.slice(1);
  };

  const getStatusBadge = (status: string) => {
    const statusClasses = {
      'Active': 'bg-green-100 text-green-700',
      'In Progress': 'bg-blue-100 text-blue-700',
      'Resolved': 'bg-green-100 text-green-700',
      'Pending': 'bg-yellow-100 text-yellow-700'
    };
    
    return (
      <span className={`px-2 py-1 text-xs rounded-full ${statusClasses[status as keyof typeof statusClasses] || 'bg-gray-100 text-gray-700'}`}>
        {status}
      </span>
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Hostel Management</h1>
        <p className="text-gray-600">Manage your hostel allocation, mess, facilities, and services</p>
      </div>

      {/* Current Allocation Overview */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Current Allocation</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <p className="text-sm text-gray-600">Hostel</p>
                <p className="font-medium">{roomDetails.hostelName}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Room</p>
                <p className="font-medium">{roomDetails.roomNumber}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Type</p>
                <p className="font-medium">{roomDetails.roomType}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Status</p>
                {getStatusBadge(roomDetails.status)}
              </div>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-600">Monthly Rent</p>
            <p className="text-xl font-bold text-gray-900">{roomDetails.rent}</p>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-6">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {[
              { key: 'allocation', label: 'Room Details' },
              { key: 'mess', label: 'Mess Menu' },
              { key: 'facilities', label: 'Facilities' },
              { key: 'complaints', label: 'Complaints' }
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
          {activeTab === 'allocation' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <Bed className="h-5 w-5 mr-2 text-blue-600" />
                    Room Information
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Room Number:</span>
                      <span className="font-medium">{roomDetails.roomNumber}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Room Type:</span>
                      <span className="font-medium">{roomDetails.roomType}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Floor:</span>
                      <span className="font-medium">{roomDetails.floor}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Allotted Date:</span>
                      <span className="font-medium">{roomDetails.allottedDate}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Security Deposit:</span>
                      <span className="font-medium">{roomDetails.securityDeposit}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <Users className="h-5 w-5 mr-2 text-green-600" />
                    Roommate Information
                  </h3>
                  {roomDetails.roommates.map((roommate, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-start justify-between">
                        <div>
                          <h4 className="font-medium text-gray-900">{roommate.name}</h4>
                          <p className="text-sm text-gray-600">{roommate.course} • {roommate.year}</p>
                        </div>
                        <button className="p-2 text-gray-600 hover:text-blue-600">
                          <Phone className="h-4 w-4" />
                        </button>
                      </div>
                      <p className="text-sm text-gray-500 mt-2">{roommate.contact}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center mb-3">
                  <MapPin className="h-5 w-5 text-gray-600 mr-2" />
                  <h4 className="font-medium text-gray-900">Hostel Address</h4>
                </div>
                <p className="text-gray-600">
                  {roomDetails.hostelName}, ABC Engineering College Campus,<br />
                  Sector 15, Tech City, State 123456
                </p>
              </div>

              <div className="flex space-x-4">
                <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200">
                  Request Room Change
                </button>
                <button className="bg-gray-100 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-200 transition-colors duration-200">
                  Download Allotment Letter
                </button>
              </div>
            </div>
          )}

          {activeTab === 'mess' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                  <Utensils className="h-5 w-5 mr-2 text-orange-600" />
                  Weekly Mess Menu
                </h3>
                <div className="flex items-center space-x-2">
                  <Star className="h-4 w-4 text-yellow-500" />
                  <span className="text-sm text-gray-600">Rate Today's Food</span>
                </div>
              </div>

              <div className="grid gap-4">
                {Object.entries(messMenu).map(([day, meals]) => (
                  <div key={day} className="border border-gray-200 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                      <Calendar className="h-4 w-4 mr-2" />
                      {getDayName(day)}
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <h5 className="text-sm font-medium text-gray-700 mb-1">Breakfast</h5>
                        <p className="text-sm text-gray-600">{meals.breakfast}</p>
                      </div>
                      <div>
                        <h5 className="text-sm font-medium text-gray-700 mb-1">Lunch</h5>
                        <p className="text-sm text-gray-600">{meals.lunch}</p>
                      </div>
                      <div>
                        <h5 className="text-sm font-medium text-gray-700 mb-1">Dinner</h5>
                        <p className="text-sm text-gray-600">{meals.dinner}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <h4 className="font-medium text-yellow-800 mb-2">Mess Timings</h4>
                <div className="grid grid-cols-3 gap-4 text-sm text-yellow-700">
                  <div>Breakfast: 7:00 AM - 9:30 AM</div>
                  <div>Lunch: 12:00 PM - 2:30 PM</div>
                  <div>Dinner: 7:00 PM - 10:00 PM</div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'facilities' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">Available Facilities</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {facilities.map((facility, index) => {
                  const Icon = facility.icon;
                  return (
                    <div key={index} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-start space-x-4">
                        <div className={`p-3 rounded-lg ${facility.available ? 'bg-green-100' : 'bg-red-100'}`}>
                          <Icon className={`h-6 w-6 ${facility.available ? 'text-green-600' : 'text-red-600'}`} />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900">{facility.name}</h4>
                          <p className="text-sm text-gray-600 mt-1">{facility.description}</p>
                          <span className={`inline-block px-2 py-1 text-xs rounded-full mt-2 ${
                            facility.available ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                          }`}>
                            {facility.available ? 'Available' : 'Not Available'}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="font-medium text-blue-800 mb-2">Important Guidelines</h4>
                <ul className="text-sm text-blue-700 space-y-1">
                  <li>• Visiting hours: 10:00 AM - 7:00 PM</li>
                  <li>• Night curfew: 11:00 PM for all residents</li>
                  <li>• Guests must register at reception</li>
                  <li>• Maintain cleanliness in common areas</li>
                </ul>
              </div>
            </div>
          )}

          {activeTab === 'complaints' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-gray-900">Complaints & Requests</h3>
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center">
                  <MessageCircle className="h-4 w-4 mr-2" />
                  New Complaint
                </button>
              </div>

              <div className="space-y-4">
                {complaints.map((complaint) => (
                  <div key={complaint.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h4 className="font-medium text-gray-900">{complaint.title}</h4>
                          {getStatusBadge(complaint.status)}
                          <span className={`px-2 py-1 text-xs rounded-full ${
                            complaint.priority === 'High' ? 'bg-red-100 text-red-700' :
                            complaint.priority === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                            'bg-green-100 text-green-700'
                          }`}>
                            {complaint.priority} Priority
                          </span>
                        </div>
                        <p className="text-gray-600 mb-2">{complaint.description}</p>
                        <p className="text-sm text-gray-500">
                          ID: {complaint.id} • Category: {complaint.category} • Date: {complaint.date}
                        </p>
                      </div>
                      <button className="ml-4 p-2 text-gray-600 hover:text-blue-600">
                        <MessageCircle className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-medium text-gray-900 mb-2">Emergency Contacts</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-600">Hostel Warden: <span className="font-medium">+91 9876543210</span></p>
                    <p className="text-gray-600">Security: <span className="font-medium">+91 9876543211</span></p>
                  </div>
                  <div>
                    <p className="text-gray-600">Maintenance: <span className="font-medium">+91 9876543212</span></p>
                    <p className="text-gray-600">Emergency: <span className="font-medium">108</span></p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};