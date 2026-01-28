import React, { useState } from 'react';
import { useAdmin } from '../contexts/AdminContext';
import { HostelRoom } from '../../../types';
import { 
  Search, 
  Filter, 
  Building, 
  Users, 
  Bed,
  Edit,
  Eye,
  UserPlus,
  Settings
} from 'lucide-react';
import { showToast } from '../../../utils/toast';

const HostelRecord: React.FC = () => {
  const { hostelRooms, students, updateHostelRoom, assignRoom } = useAdmin();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterHostel, setFilterHostel] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedRoom, setSelectedRoom] = useState<HostelRoom | null>(null);
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [selectedStudentId, setSelectedStudentId] = useState('');

  const hostels = [...new Set(hostelRooms.map(room => room.hostelName))];

  const filteredRooms = hostelRooms.filter((room) => {
    const matchesSearch = room.roomNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         room.hostelName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         room.occupants.some(occupant => occupant.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesHostel = filterHostel === 'all' || room.hostelName === filterHostel;
    const matchesStatus = filterStatus === 'all' || room.status === filterStatus;
    
    return matchesSearch && matchesHostel && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Available':
        return 'bg-green-100 text-green-800 ';
      case 'Full':
        return 'bg-red-100 text-red-800 ';
      case 'Maintenance':
        return 'bg-yellow-100 text-yellow-800 ';
      default:
        return 'bg-gray-100 text-gray-800 ';
    }
  };

  const getOccupancyColor = (current: number, total: number) => {
    const percentage = (current / total) * 100;
    if (percentage >= 100) return 'bg-red-500';
    if (percentage >= 80) return 'bg-orange-500';
    if (percentage >= 50) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  const handleAssignRoom = () => {
    if (selectedRoom && selectedStudentId) {
      assignRoom(selectedStudentId, selectedRoom.id);
      showToast('Room assigned successfully!', 'success');
      setShowAssignModal(false);
      setSelectedStudentId('');
      setSelectedRoom(null);
    }
  };

  const handleStatusChange = (roomId: string, newStatus: 'Available' | 'Full' | 'Maintenance') => {
    updateHostelRoom(roomId, { status: newStatus });
    showToast('Room status updated', 'success');
  };

  // Get unassigned students
  const unassignedStudents = students.filter(student => 
    !hostelRooms.some(room => room.occupants.includes(student.name))
  );

  const totalRooms = hostelRooms.length;
  const availableRooms = hostelRooms.filter(room => room.status === 'Available').length;
  const totalCapacity = hostelRooms.reduce((sum, room) => sum + room.capacity, 0);
  const totalOccupied = hostelRooms.reduce((sum, room) => sum + room.currentOccupancy, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white  p-6 rounded-lg shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900  mb-2">
              Hostel Records
            </h1>
            <p className="text-gray-600 ">
              Manage hostel rooms and occupancy
            </p>
          </div>
          <button
            onClick={() => setShowAssignModal(true)}
            className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            <UserPlus className="w-5 h-5" />
            <span>Assign Room</span>
          </button>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white  p-6 rounded-lg shadow-sm">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg ">
              <Building className="w-6 h-6 text-blue-600 " />
            </div>
            <div className="ml-4">
              <div className="text-2xl font-bold text-gray-900 ">{totalRooms}</div>
              <div className="text-sm text-gray-600 ">Total Rooms</div>
            </div>
          </div>
        </div>

        <div className="bg-white  p-6 rounded-lg shadow-sm">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg ">
              <Bed className="w-6 h-6 text-green-600 " />
            </div>
            <div className="ml-4">
              <div className="text-2xl font-bold text-gray-900 ">{availableRooms}</div>
              <div className="text-sm text-gray-600 ">Available</div>
            </div>
          </div>
        </div>

        <div className="bg-white  p-6 rounded-lg shadow-sm">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 rounded-lg ">
              <Users className="w-6 h-6 text-purple-600 " />
            </div>
            <div className="ml-4">
              <div className="text-2xl font-bold text-gray-900 ">{totalCapacity}</div>
              <div className="text-sm text-gray-600 ">Total Capacity</div>
            </div>
          </div>
        </div>

        <div className="bg-white  p-6 rounded-lg shadow-sm">
          <div className="flex items-center">
            <div className="p-2 bg-orange-100 rounded-lg ">
              <Users className="w-6 h-6 text-orange-600 " />
            </div>
            <div className="ml-4">
              <div className="text-2xl font-bold text-gray-900 ">{totalOccupied}</div>
              <div className="text-sm text-gray-600 ">Current Occupancy</div>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white  p-6 rounded-lg shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="md:col-span-2">
            <div className="relative">
              <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search by room number, hostel, or occupant..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
          
          <select
            value={filterHostel}
            onChange={(e) => setFilterHostel(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500  "
          >
            <option value="all">All Hostels</option>
            {hostels.map((hostel) => (
              <option key={hostel} value={hostel}>{hostel}</option>
            ))}
          </select>

          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500   "
          >
            <option value="all">All Status</option>
            <option value="Available">Available</option>
            <option value="Full">Full</option>
            <option value="Maintenance">Maintenance</option>
          </select>
        </div>
      </div>

      {/* Rooms Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredRooms.length === 0 ? (
          <div className="col-span-full bg-white  p-12 rounded-lg shadow-sm text-center">
            <Building className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900  mb-2">
              No rooms found
            </h3>
            <p className="text-gray-600 ">
              Try adjusting your search or filters
            </p>
          </div>
        ) : (
          filteredRooms.map((room) => (
            <div key={room.id} className="bg-white  p-6 rounded-lg shadow-sm">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 ">
                    Room {room.roomNumber}
                  </h3>
                  <p className="text-sm text-gray-600 ">
                    {room.hostelName} • Floor {room.floor}
                  </p>
                </div>
                <select
                  value={room.status}
                  onChange={(e) => handleStatusChange(room.id, e.target.value as any)}
                  className={`text-xs px-2 py-1 rounded-full font-medium border-0 focus:ring-2 focus:ring-blue-500 ${getStatusColor(room.status)}`}
                >
                  <option value="Available">Available</option>
                  <option value="Full">Full</option>
                  <option value="Maintenance">Maintenance</option>
                </select>
              </div>

              {/* Occupancy Bar */}
              <div className="mb-4">
                <div className="flex items-center justify-between text-sm text-gray-600  mb-1">
                  <span>Occupancy</span>
                  <span>{room.currentOccupancy}/{room.capacity}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 ">
                  <div
                    className={`h-2 rounded-full ${getOccupancyColor(room.currentOccupancy, room.capacity)}`}
                    style={{ width: `${(room.currentOccupancy / room.capacity) * 100}%` }}
                  ></div>
                </div>
              </div>

              {/* Room Details */}
              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 ">Type:</span>
                  <span className="text-gray-900 ">{room.type}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 ">Monthly Rent:</span>
                  <span className="text-gray-900 ">₹{room.monthlyRent.toLocaleString()}</span>
                </div>
              </div>

              {/* Facilities */}
              <div className="mb-4">
                <div className="text-sm text-gray-600  mb-2">Facilities:</div>
                <div className="flex flex-wrap gap-1">
                  {room.facilities.map((facility, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-blue-100 text-blue-800  rounded text-xs"
                    >
                      {facility}
                    </span>
                  ))}
                </div>
              </div>

              {/* Occupants */}
              <div className="mb-4">
                <div className="text-sm text-gray-600  mb-2">
                  Occupants ({room.occupants.length}):
                </div>
                {room.occupants.length > 0 ? (
                  <div className="space-y-1">
                    {room.occupants.map((occupant, index) => (
                      <div key={index} className="text-sm text-gray-900  bg-gray-50  px-2 py-1 rounded">
                        {occupant}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-sm text-gray-500  italic">
                    No occupants
                  </div>
                )}
              </div>

              {/* Actions */}
              <div className="flex space-x-2">
                <button
                  onClick={() => setSelectedRoom(room)}
                  className="flex-1 flex items-center justify-center space-x-1 px-3 py-2 border border-gray-300  rounded-lg hover:bg-gray-50  transition-colors text-sm"
                >
                  <Eye className="w-4 h-4" />
                  <span>View</span>
                </button>
                {room.status === 'Available' && room.currentOccupancy < room.capacity && (
                  <button
                    onClick={() => {
                      setSelectedRoom(room);
                      setShowAssignModal(true);
                    }}
                    className="flex-1 flex items-center justify-center space-x-1 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
                  >
                    <UserPlus className="w-4 h-4" />
                    <span>Assign</span>
                  </button>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Room Details Modal */}
      {selectedRoom && !showAssignModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white  rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900 ">
                  Room {selectedRoom.roomNumber} Details
                </h2>
                <button
                  onClick={() => setSelectedRoom(null)}
                  className="p-2 hover:bg-gray-100  rounded-lg"
                >
                  <Settings className="w-5 h-5" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900  mb-4">
                    Room Information
                  </h3>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 ">
                        Hostel Name
                      </label>
                      <p className="text-gray-900 ">{selectedRoom.hostelName}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 ">
                        Room Number
                      </label>
                      <p className="text-gray-900 ">{selectedRoom.roomNumber}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 ">
                        Floor
                      </label>
                      <p className="text-gray-900 ">{selectedRoom.floor}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 ">
                        Room Type
                      </label>
                      <p className="text-gray-900 ">{selectedRoom.type}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 ">
                        Capacity
                      </label>
                      <p className="text-gray-900 ">{selectedRoom.capacity} students</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 ">
                        Current Occupancy
                      </label>
                      <p className="text-gray-900 ">{selectedRoom.currentOccupancy} students</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 ">
                        Monthly Rent
                      </label>
                      <p className="text-gray-900 ">₹{selectedRoom.monthlyRent.toLocaleString()}</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900  mb-4">
                    Facilities & Occupants
                  </h3>
                  
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700  mb-2">
                      Facilities
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {selectedRoom.facilities.map((facility, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-blue-100 text-blue-800  rounded-full text-sm"
                        >
                          {facility}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700  mb-2">
                      Current Occupants
                    </label>
                    {selectedRoom.occupants.length > 0 ? (
                      <div className="space-y-2">
                        {selectedRoom.occupants.map((occupant, index) => (
                          <div key={index} className="flex items-center space-x-2 p-2 bg-gray-50  rounded">
                            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                              <Users className="w-4 h-4 text-white" />
                            </div>
                            <span className="text-gray-900 ">{occupant}</span>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-gray-500  italic">No occupants currently</p>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex justify-end space-x-3 mt-8">
                <button
                  onClick={() => setSelectedRoom(null)}
                  className="px-4 py-2 border border-gray-300  rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Close
                </button>
                {selectedRoom.status === 'Available' && selectedRoom.currentOccupancy < selectedRoom.capacity && (
                  <button
                    onClick={() => setShowAssignModal(true)}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Assign Student
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Assign Room Modal */}
      {showAssignModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white  rounded-lg max-w-md w-full">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900 ">
                  Assign Student to Room
                </h2>
                <button
                  onClick={() => {
                    setShowAssignModal(false);
                    setSelectedStudentId('');
                    if (!selectedRoom) setSelectedRoom(null);
                  }}
                  className="p-2 hover:bg-gray-100 drounded-lg"
                >
                  <Settings className="w-5 h-5" />
                </button>
              </div>

              {selectedRoom && (
                <div className="mb-4 p-4 bg-gray-50  rounded-lg">
                  <h3 className="font-medium text-gray-900 ">
                    Room {selectedRoom.roomNumber}
                  </h3>
                  <p className="text-sm text-gray-600 ">
                    {selectedRoom.hostelName} • {selectedRoom.currentOccupancy}/{selectedRoom.capacity} occupied
                  </p>
                </div>
              )}

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700  mb-2">
                  Select Student
                </label>
                <select
                  value={selectedStudentId}
                  onChange={(e) => setSelectedStudentId(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500   "
                >
                  <option value="">Choose a student...</option>
                  {unassignedStudents.map((student) => (
                    <option key={student.id} value={student.id}>
                      {student.name} ({student.rollNumber})
                    </option>
                  ))}
                </select>
                {unassignedStudents.length === 0 && (
                  <p className="text-sm text-gray-500  mt-2">
                    No unassigned students available
                  </p>
                )}
              </div>

              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => {
                    setShowAssignModal(false);
                    setSelectedStudentId('');
                    if (!selectedRoom) setSelectedRoom(null);
                  }}
                  className="px-4 py-2 border border-gray-300  rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAssignRoom}
                  disabled={!selectedStudentId}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Assign Room
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HostelRecord;