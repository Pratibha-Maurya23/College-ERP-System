import { useState } from 'react'
import { TrendingUp, TrendingDown, Users, Award, BookOpen, Calendar, BarChart3, PieChart, Activity } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'
import { Button } from '../components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs'
import { Progress } from '../components/ui/progress'
import { Badge } from '../components/ui/badge'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart as RechartsPieChart, Cell, Area, AreaChart, Pie } from 'recharts'

// Mock data for performance analytics
const semesterPerformance = [
  { semester: 'Fall 2023', average: 78.5, attendance: 85, students: 145 },
  { semester: 'Spring 2024', average: 82.3, attendance: 88, students: 156 },
  { semester: 'Summer 2024', average: 79.8, attendance: 92, students: 134 },
]

const subjectPerformance = [
  { subject: 'Data Structures', average: 85.2, students: 45, passRate: 92 },
  { subject: 'Algorithms', average: 79.8, students: 42, passRate: 88 },
  { subject: 'Database Systems', average: 82.5, students: 38, passRate: 95 },
  { subject: 'Web Development', average: 88.3, students: 31, passRate: 97 },
  { subject: 'Software Engineering', average: 76.4, students: 35, passRate: 86 },
]

const gradeDistribution = [
  { name: 'A+', value: 15, color: '#10b981' },
  { name: 'A', value: 25, color: '#3b82f6' },
  { name: 'B+', value: 30, color: '#8b5cf6' },
  { name: 'B', value: 18, color: '#f59e0b' },
  { name: 'C+', value: 8, color: '#ef4444' },
  { name: 'C', value: 3, color: '#6b7280' },
  { name: 'F', value: 1, color: '#374151' },
]

const attendanceAnalytics = [
  { month: 'Jan', rate: 85 },
  { month: 'Feb', rate: 88 },
  { month: 'Mar', rate: 92 },
  { month: 'Apr', rate: 89 },
  { month: 'May', rate: 94 },
  { month: 'Jun', rate: 91 },
]

const topPerformers = [
  { name: 'Alice Johnson', rollNumber: 'CS2021001', gpa: 9.8, improvement: '+0.3' },
  { name: 'Carol Davis', rollNumber: 'CS2021003', gpa: 9.6, improvement: '+0.5' },
  { name: 'David Lee', rollNumber: 'CS2021004', gpa: 9.4, improvement: '+0.2' },
  { name: 'Emma Wilson', rollNumber: 'CS2021005', gpa: 9.2, improvement: '+0.4' },
  { name: 'Bob Chen', rollNumber: 'CS2021002', gpa: 9.1, improvement: '+0.1' },
]

const improvementNeeded = [
  { name: 'John Smith', rollNumber: 'CS2021006', gpa: 6.2, decline: '-0.5' },
  { name: 'Sarah Brown', rollNumber: 'CS2021007', gpa: 6.8, decline: '-0.3' },
  { name: 'Mike Davis', rollNumber: 'CS2021008', gpa: 7.1, decline: '-0.2' },
]

export function PerformanceAnalyticsPage() {
  const [selectedPeriod, setSelectedPeriod] = useState('semester')
  const [selectedSubject, setSelectedSubject] = useState('all')

  const overallStats = {
    totalStudents: 156,
    averageGPA: 8.2,
    attendanceRate: 88.5,
    passRate: 92.3,
    improvementRate: 15.2
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1>Performance Analytics</h1>
          <p className="text-muted-foreground">
            Comprehensive insights into student performance and academic trends
          </p>
        </div>
        <div className="flex gap-2">
          <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Select period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="semester">Current Semester</SelectItem>
              <SelectItem value="year">Academic Year</SelectItem>
              <SelectItem value="all">All Time</SelectItem>
            </SelectContent>
          </Select>
          <Button className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600">
            Generate Report
          </Button>
        </div>
      </div>

      {/* Key Performance Indicators */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <Card className="glass-card hover-lift bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-blue-950/20 dark:to-indigo-950/20 border-blue-200 dark:border-blue-800">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-600 dark:text-blue-400">Total Students</p>
                <p className="text-2xl font-medium text-blue-700 dark:text-blue-300">{overallStats.totalStudents}</p>
                <div className="flex items-center text-sm text-green-600 dark:text-green-400">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  +8 this semester
                </div>
              </div>
              <Users className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card hover-lift bg-gradient-to-br from-emerald-50 to-green-100 dark:from-emerald-950/20 dark:to-green-950/20 border-emerald-200 dark:border-emerald-800">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-emerald-600 dark:text-emerald-400">Average GPA</p>
                <p className="text-2xl font-medium text-emerald-700 dark:text-emerald-300">{overallStats.averageGPA}</p>
                <div className="flex items-center text-sm text-green-600 dark:text-green-400">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  +0.3 improvement
                </div>
              </div>
              <Award className="h-8 w-8 text-emerald-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card hover-lift bg-gradient-to-br from-cyan-50 to-blue-100 dark:from-cyan-950/20 dark:to-blue-950/20 border-cyan-200 dark:border-cyan-800">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-cyan-600 dark:text-cyan-400">Attendance Rate</p>
                <p className="text-2xl font-medium text-cyan-700 dark:text-cyan-300">{overallStats.attendanceRate}%</p>
                <div className="flex items-center text-sm text-green-600 dark:text-green-400">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  +2.5% this month
                </div>
              </div>
              <Calendar className="h-8 w-8 text-cyan-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card hover-lift bg-gradient-to-br from-purple-50 to-violet-100 dark:from-purple-950/20 dark:to-violet-950/20 border-purple-200 dark:border-purple-800">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-600 dark:text-purple-400">Pass Rate</p>
                <p className="text-2xl font-medium text-purple-700 dark:text-purple-300">{overallStats.passRate}%</p>
                <div className="flex items-center text-sm text-green-600 dark:text-green-400">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  +1.2% vs last sem
                </div>
              </div>
              <BookOpen className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card hover-lift bg-gradient-to-br from-orange-50 to-amber-100 dark:from-orange-950/20 dark:to-amber-950/20 border-orange-200 dark:border-orange-800">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-orange-600 dark:text-orange-400">Improvement Rate</p>
                <p className="text-2xl font-medium text-orange-700 dark:text-orange-300">{overallStats.improvementRate}%</p>
                <div className="flex items-center text-sm text-green-600 dark:text-green-400">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  Students improving
                </div>
              </div>
              <Activity className="h-8 w-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Analytics Tabs */}
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="subjects">Subject Analysis</TabsTrigger>
          <TabsTrigger value="trends">Trends</TabsTrigger>
          <TabsTrigger value="students">Student Insights</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Semester Performance Chart */}
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  Semester Performance Trends
                </CardTitle>
                <CardDescription>
                  Academic performance across recent semesters
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={semesterPerformance}>
                    <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                    <XAxis dataKey="semester" />
                    <YAxis />
                    <Tooltip 
                      contentStyle={{
                        backgroundColor: 'rgba(255, 255, 255, 0.95)',
                        border: '1px solid rgba(0, 0, 0, 0.1)',
                        borderRadius: '8px',
                        backdropFilter: 'blur(10px)'
                      }}
                    />
                    <Bar dataKey="average" fill="url(#gradient1)" radius={[4, 4, 0, 0]} />
                    <defs>
                      <linearGradient id="gradient1" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#3b82f6" />
                        <stop offset="100%" stopColor="#8b5cf6" />
                      </linearGradient>
                    </defs>
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Grade Distribution */}
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <PieChart className="h-5 w-5" />
                  Grade Distribution
                </CardTitle>
                <CardDescription>
                  Current semester grade breakdown
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-center">
                  <ResponsiveContainer width="100%" height={300}>
                    <RechartsPieChart>
                      <Pie
                        data={gradeDistribution}
                        cx="50%"
                        cy="50%"
                        outerRadius={100}
                        dataKey="value"
                        label={({ name, value }: { name: string; value: number }) => `${name}: ${value}%`}
                      >
                        {gradeDistribution.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </RechartsPieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Attendance Analytics */}
          <Card className="glass-card">
            <CardHeader>
              <CardTitle>Attendance Analytics</CardTitle>
              <CardDescription>
                Monthly attendance trends and patterns
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={attendanceAnalytics}>
                  <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: 'rgba(255, 255, 255, 0.95)',
                      border: '1px solid rgba(0, 0, 0, 0.1)',
                      borderRadius: '8px',
                      backdropFilter: 'blur(10px)'
                    }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="rate" 
                    stroke="#10b981" 
                    fill="url(#attendanceGradient)" 
                    strokeWidth={2}
                  />
                  <defs>
                    <linearGradient id="attendanceGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#10b981" stopOpacity={0.3} />
                      <stop offset="100%" stopColor="#10b981" stopOpacity={0.1} />
                    </linearGradient>
                  </defs>
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="subjects" className="space-y-6">
          <Card className="glass-card">
            <CardHeader>
              <CardTitle>Subject-wise Performance Analysis</CardTitle>
              <CardDescription>
                Detailed performance metrics for each subject
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {subjectPerformance.map((subject, index) => (
                  <div key={index} className="p-4 rounded-lg bg-gradient-to-r from-white/50 to-gray-50/50 dark:from-gray-800/50 dark:to-gray-900/50 border border-border">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h4 className="font-medium">{subject.subject}</h4>
                        <p className="text-sm text-muted-foreground">{subject.students} students enrolled</p>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-medium">{subject.average}%</div>
                        <Badge variant="outline" className="text-xs">
                          {subject.passRate}% pass rate
                        </Badge>
                      </div>
                    </div>
                    <Progress value={subject.average} className="h-2" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="trends" className="space-y-6">
          <Card className="glass-card">
            <CardHeader>
              <CardTitle>Performance Trends</CardTitle>
              <CardDescription>
                Long-term academic performance patterns
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={semesterPerformance}>
                  <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                  <XAxis dataKey="semester" />
                  <YAxis />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: 'rgba(255, 255, 255, 0.95)',
                      border: '1px solid rgba(0, 0, 0, 0.1)',
                      borderRadius: '8px',
                      backdropFilter: 'blur(10px)'
                    }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="average" 
                    stroke="#3b82f6" 
                    strokeWidth={3}
                    dot={{ fill: '#3b82f6', strokeWidth: 2, r: 6 }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="attendance" 
                    stroke="#10b981" 
                    strokeWidth={3}
                    dot={{ fill: '#10b981', strokeWidth: 2, r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="students" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Top Performers */}
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="h-5 w-5 text-yellow-500" />
                  Top Performers
                </CardTitle>
                <CardDescription>
                  Students with highest academic performance
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {topPerformers.map((student, index) => (
                    <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-gradient-to-r from-green-50/50 to-emerald-50/50 dark:from-green-950/20 dark:to-emerald-950/20 border border-green-200 dark:border-green-800">
                      <div>
                        <div className="font-medium">{student.name}</div>
                        <div className="text-sm text-muted-foreground">{student.rollNumber}</div>
                      </div>
                      <div className="text-right">
                        <div className="font-medium">{student.gpa} GPA</div>
                        <div className="text-sm text-green-600 dark:text-green-400">{student.improvement}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Students Needing Support */}
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingDown className="h-5 w-5 text-orange-500" />
                  Needs Attention
                </CardTitle>
                <CardDescription>
                  Students who may benefit from additional support
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {improvementNeeded.map((student, index) => (
                    <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-gradient-to-r from-orange-50/50 to-red-50/50 dark:from-orange-950/20 dark:to-red-950/20 border border-orange-200 dark:border-orange-800">
                      <div>
                        <div className="font-medium">{student.name}</div>
                        <div className="text-sm text-muted-foreground">{student.rollNumber}</div>
                      </div>
                      <div className="text-right">
                        <div className="font-medium">{student.gpa} GPA</div>
                        <div className="text-sm text-orange-600 dark:text-orange-400">{student.decline}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}