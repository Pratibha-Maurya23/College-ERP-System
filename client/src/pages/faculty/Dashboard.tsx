import { useState } from 'react'
import { Users, TrendingUp, Clock, FileText, Calendar, Award } from 'lucide-react'
import { FacultyHeader } from './components/faculty-header'
import { FacultySidebar } from './components/faculty-sidebar'
import { KPICard } from './components/kpi-card'
import { QuickActions } from './components/quick-actions'
import { StudentTable } from './components/student-table'
import { StudentSlideOver } from './components/student-slide-over'
import { RecentActivity } from './components/recent-activity'
import { FacultyTasks } from './components/faculty-tasks'
import { FacultyCalendar } from './components/faculty-calendar'
import { DashboardCharts } from './components/dashboard-charts'

import { AttendancePage } from './pages/attendance-page'

import { ReEvaluationPage } from './pages/re-evaluation-page'
import { ExamMarksPage } from './pages/exam-marks-page'
import { PerformanceAnalyticsPage } from './pages/performance-analytics-page'
import { Toaster } from './components/ui/sonner'

interface Student {
  id: string
  name: string
  email: string
  rollNumber: string
  department: string
  year: string
  status: 'active' | 'inactive' | 'graduated' | 'suspended'
  attendance: number
  gpa: number
  feeStatus: 'paid' | 'pending' | 'overdue'
  avatar?: string
}

export default function Appfaculty() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null)
  const [studentSlideOverOpen, setStudentSlideOverOpen] = useState(false)
  const [currentPage, setCurrentPage] = useState('dashboard')

  const handleStudentSelect = (student: Student) => {
    setSelectedStudent(student)
    setStudentSlideOverOpen(true)
  }

  const handleCloseStudentSlideOver = () => {
    setStudentSlideOverOpen(false)
    setSelectedStudent(null)
  }

  const kpiData = [
    {
      title: 'My Students',
      value: 156,
      previousValue: 148,
      icon: Users,
      trend: 'up' as const,
      trendValue: 5.4,
     className: 'bg-gradient-to-br from-red-50 to-yellow-100 dark:from-red-950/20 dark:to-yellow-950/20 border-red-200 dark:border-red-800'
    },
    {
      title: 'Attendance Rate',
      value: 87.5,
      suffix: '%',
      previousValue: 85.2,
      icon: TrendingUp,
      trend: 'up' as const,
      trendValue: 2.7,
      className: 'bg-gradient-to-br from-emerald-50 to-teal-100 dark:from-emerald-950/20 dark:to-teal-950/20 border-emerald-200 dark:border-emerald-800'
    },
    {
      title: 'Pending Evaluations',
      value: 23,
      previousValue: 31,
      icon: Clock,
      trend: 'down' as const,
      trendValue: -25.8,
      className: 'bg-gradient-to-br from-orange-50 to-amber-100 dark:from-orange-950/20 dark:to-amber-950/20 border-orange-200 dark:border-orange-800'
    },
    {
      title: 'Average Score',
      value: 79.2,
      suffix: '%',
      previousValue: 76.8,
      icon: Award,
      trend: 'up' as const,
      trendValue: 3.1,
      className: 'bg-gradient-to-br from-purple-50 to-violet-100 dark:from-purple-950/20 dark:to-violet-950/20 border-purple-200 dark:border-purple-800'
    },
    {
      title: 'Scheduled Exams',
      value: 8,
      previousValue: 5,
      icon: Calendar,
      trend: 'up' as const,
      trendValue: 60,
      className: 'bg-gradient-to-br from-pink-50 to-rose-100 dark:from-pink-950/20 dark:to-rose-950/20 border-pink-200 dark:border-pink-800'
    },
    {
      title: 'Admit Cards',
      value: 142,
      previousValue: 98,
      icon: FileText,
      trend: 'up' as const,
      trendValue: 44.9,
      className: 'bg-gradient-to-br from-cyan-50 to-sky-100 dark:from-cyan-950/20 dark:to-sky-950/20 border-cyan-200 dark:border-cyan-800'
    },
  ]

  const renderPageContent = () => {
    switch (currentPage) {
     
     
      case 'attendance':
        return <AttendancePage />
    
      case 're-evaluation':
        return <ReEvaluationPage />
      case 'exam-marks':
        return <ExamMarksPage />
      case 'performance':
        return <PerformanceAnalyticsPage />
      default:
        return (
          <>
            {/* KPI Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
              {kpiData.map((kpi, index) => (
                <KPICard
                  key={index}
                  title={kpi.title}
                  value={kpi.value}
                  previousValue={kpi.previousValue}
                  suffix={kpi.suffix}
                  icon={kpi.icon}
                  trend={kpi.trend}
                  trendValue={kpi.trendValue}
                  animated={true}
                  className={kpi.className}
                />
              ))}
            </div>

            {/* Quick Actions */}
            <QuickActions />

            {/* Main Dashboard Grid */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
              {/* Left Column - Student Table */}
              <div className="xl:col-span-2 space-y-6">
                <StudentTable onStudentSelect={handleStudentSelect} />
                <DashboardCharts />
              </div>

              {/* Right Column - Sidebar Widgets */}
              <div className="space-y-6">
                <RecentActivity />
                <FacultyTasks />
                <FacultyCalendar />
              </div>
            </div>
          </>
        )
    }
  }

  return (
      <div className="flex h-screen bg-background overflow-hidden">
        {/* Sidebar */}
        <FacultySidebar 
          isCollapsed={sidebarCollapsed}
          onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
          activeItem={currentPage}
          onItemSelect={setCurrentPage}
        />

        {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Header */}
          <FacultyHeader onSidebarToggle={() => setSidebarCollapsed(!sidebarCollapsed)} />

          {/* Main Content */}
          <main className="flex-1 overflow-y-auto p-6 space-y-6">
            {renderPageContent()}
          </main>
        </div>

        {/* Student Slide Over */}
        <StudentSlideOver
          student={selectedStudent}
          isOpen={studentSlideOverOpen}
          onClose={handleCloseStudentSlideOver}
        />

        {/* Toast Notifications */}
        <Toaster />
      </div>
  )
}
