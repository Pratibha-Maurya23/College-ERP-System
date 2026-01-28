import  { useState, useEffect } from 'react';
import { Navigate } from "react-router-dom";
import { Home } from './components/Home';
import { Navigation } from './components/Navigation';
import { AdmissionModule } from './components/AdmissionModule';
import { HostelModule } from './components/HostelModule';
import { ExaminationModule } from './components/ExaminationModule';
import { AttendanceModule } from './components/AttendanceModule';
import { LibraryModule } from './components/LibraryModule';
import { ProfileModule } from './components/ProfileModule';

export type ModuleType = 'dashboard' | 'admission' | 'hostel' | 'examination' | 'attendance' | 'library' | 'profile';

interface Student {
  id: string;
  name: string;
  email: string;
  course: string;
  year: string;
  semester: string;
  rollNumber: string;
  profileImage?: string;
}
const Dashboard = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentModule, setCurrentModule] = useState<ModuleType>('dashboard');
  const [student, setStudent] = useState<Student | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedSession = localStorage.getItem('studentSession');
    if (savedSession) {
      const sessionData = JSON.parse(savedSession);
      setStudent(sessionData.student);
      setIsAuthenticated(true);
    }
    setLoading(false);
  }, []);

  const handleLogout = () => {
    setIsAuthenticated(false);
    setStudent(null);
    setCurrentModule('dashboard');
    localStorage.removeItem('studentSession');
  };

  const renderCurrentModule = () => {
    if (!student) return null;

    switch (currentModule) {
      case 'dashboard':
        return <Home student={student} onModuleChange={setCurrentModule} />;
      case 'admission':
        return <AdmissionModule student={student} />;
      case 'hostel':
        return <HostelModule student={student} />;
      case 'examination':
        return <ExaminationModule student={student} />;
      case 'attendance':
        return <AttendanceModule student={student} />;
      case 'library':
        return <LibraryModule student={student} />;
      case 'profile':
        return <ProfileModule student={student} onUpdateStudent={setStudent} />;
      default:
        return <Home student={student} onModuleChange={setCurrentModule} />;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  // Remove this block, assume user is authenticated on this page after login redirect
  // if (!isAuthenticated) {
  //   return <LoginForm onLogin={handleLogin} />;
  // }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Navigation
        student={student!}
        currentModule={currentModule}
        onModuleChange={setCurrentModule}
        onLogout={handleLogout}
      />
      <main className="pt-16">{renderCurrentModule()}</main>
    </div>
  );
}
export default Dashboard;
