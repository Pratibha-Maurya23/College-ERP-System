import React, { createContext, useContext, useState, useEffect } from 'react';
import { Student, Faculty, PendingApplication, HostelRoom } from '../../../types';
import { mockStudents, mockFaculty, mockApplications, mockHostelRooms } from '../../../data/mockData';

interface AdminContextType {
  isAuthenticated: boolean;
  admin: any;
  students: Student[];
  faculty: Faculty[];
  pendingApplications: PendingApplication[];
  hostelRooms: HostelRoom[];
  login: (credentials: { username: string; password: string }) => boolean;
  logout: () => void;
  approveApplication: (id: string) => void;
  rejectApplication: (id: string) => void;
  addFaculty: (faculty: Omit<Faculty, 'id'>) => void;
  updateFaculty: (id: string, faculty: Partial<Faculty>) => void;
  deleteFaculty: (id: string) => void;
  updateStudent: (id: string, student: Partial<Student>) => void;
  deleteStudent: (id: string) => void;
  updateHostelRoom: (id: string, room: Partial<HostelRoom>) => void;
  assignRoom: (studentId: string, roomId: string) => void;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export const AdminProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [admin, setAdmin] = useState(null);
  const [students, setStudents] = useState<Student[]>(mockStudents);
  const [faculty, setFaculty] = useState<Faculty[]>(mockFaculty);
  const [pendingApplications, setPendingApplications] = useState<PendingApplication[]>(mockApplications);
  const [hostelRooms, setHostelRooms] = useState<HostelRoom[]>(mockHostelRooms);

  useEffect(() => {
    const authStatus = localStorage.getItem('adminAuth');
    if (authStatus === 'true') {
      setIsAuthenticated(true);
      setAdmin({ username: 'admin', role: 'Administrator' });
    }
  }, []);

  const login = (credentials: { username: string; password: string }): boolean => {
    // Simple authentication - in real app, this would be an API call
    if (credentials.username === 'admin' && credentials.password === 'password') {
      setIsAuthenticated(true);
      setAdmin({ username: credentials.username, role: 'Administrator' });
      localStorage.setItem("token", "admin-token");
      localStorage.setItem("role", "admin");
      localStorage.setItem('adminAuth', 'true');
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
    setAdmin(null);

  // 🔥 CLEAR PRIVATE ROUTE AUTH
    localStorage.removeItem("token");
    localStorage.removeItem("role");

    localStorage.removeItem("adminAuth");
  };

  const approveApplication = (id: string) => {
    const application = pendingApplications.find(app => app.id === id);
    if (application) {
      // Move to students list
      const newStudent: Student = {
        id: `STU${Date.now()}`,
        name: application.studentName,
        email: application.email,
        phone: application.phone,
        department: application.department,
        year: application.year,
        rollNumber: `${application.department.slice(0, 2).toUpperCase()}${Date.now()}`,
        dateOfBirth: application.dateOfBirth,
        address: application.address,
        guardianName: application.guardianName,
        guardianPhone: application.guardianPhone,
        admissionDate: new Date().toISOString().split('T')[0],
        status: 'Active',
        gpa: 0,
        feeStatus: 'Pending'
      };
      
      setStudents(prev => [...prev, newStudent]);
      setPendingApplications(prev => prev.filter(app => app.id !== id));
    }
  };

  const rejectApplication = (id: string) => {
    setPendingApplications(prev => prev.filter(app => app.id !== id));
  };

  const addFaculty = (facultyData: Omit<Faculty, 'id'>) => {
    const newFaculty: Faculty = {
      ...facultyData,
      id: `FAC${Date.now()}`
    };
    setFaculty(prev => [...prev, newFaculty]);
  };

  const updateFaculty = (id: string, updates: Partial<Faculty>) => {
    setFaculty(prev => prev.map(f => f.id === id ? { ...f, ...updates } : f));
  };

  const deleteFaculty = (id: string) => {
    setFaculty(prev => prev.filter(f => f.id !== id));
  };

  const updateStudent = (id: string, updates: Partial<Student>) => {
    setStudents(prev => prev.map(s => s.id === id ? { ...s, ...updates } : s));
  };

  const deleteStudent = (id: string) => {
    setStudents(prev => prev.filter(s => s.id !== id));
  };

  const updateHostelRoom = (id: string, updates: Partial<HostelRoom>) => {
    setHostelRooms(prev => prev.map(r => r.id === id ? { ...r, ...updates } : r));
  };

  const assignRoom = (studentId: string, roomId: string) => {
    const student = students.find(s => s.id === studentId);
    const room = hostelRooms.find(r => r.id === roomId);
    
    if (student && room && room.currentOccupancy < room.capacity) {
      setHostelRooms(prev => prev.map(r => 
        r.id === roomId 
          ? { ...r, currentOccupancy: r.currentOccupancy + 1, occupants: [...r.occupants, student.name] }
          : r
      ));
    }
  };

  return (
    <AdminContext.Provider
      value={{
        isAuthenticated,
        admin,
        students,
        faculty,
        pendingApplications,
        hostelRooms,
        login,
        logout,
        approveApplication,
        rejectApplication,
        addFaculty,
        updateFaculty,
        deleteFaculty,
        updateStudent,
        deleteStudent,
        updateHostelRoom,
        assignRoom
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (context === undefined) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
};