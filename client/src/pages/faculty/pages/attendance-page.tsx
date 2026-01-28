import { Calendar, Users, CheckCircle, XCircle, Clock, Filter, Search, Download } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'
import { Button } from '../components/ui/button'
import { Badge } from '../components/ui/badge'
import { Input } from '../components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/table'
import { KPICard } from '../components/kpi-card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Label } from 'recharts'

const attendanceData = [
  { date: '2024-03-01', present: 42, absent: 8, total: 50 },
  { date: '2024-03-04', present: 38, absent: 12, total: 50 },
  { date: '2024-03-06', present: 45, absent: 5, total: 50 },
  { date: '2024-03-08', present: 41, absent: 9, total: 50 },
  { date: '2024-03-11', present: 47, absent: 3, total: 50 },
  { date: '2024-03-13', present: 44, absent: 6, total: 50 },
  { date: '2024-03-15', present: 43, absent: 7, total: 50 }
]

const subjectAttendance = [
  { subject: 'Data Structures', present: 42, absent: 8, percentage: 84.0 },
  { subject: 'Database Management', present: 48, absent: 4, percentage: 92.3 },
  { subject: 'Software Engineering', present: 35, absent: 3, percentage: 92.1 },
  { subject: 'Computer Networks', present: 38, absent: 3, percentage: 92.7 }
]

const studentAttendance = [
  { id: '1', name: 'Alice Johnson', rollNo: 'CS21001', present: 28, total: 30, percentage: 93.3, status: 'excellent' },
  { id: '2', name: 'Bob Smith', rollNo: 'CS21002', present: 25, total: 30, percentage: 83.3, status: 'good' },
  { id: '3', name: 'Carol Davis', rollNo: 'CS21003', present: 29, total: 30, percentage: 96.7, status: 'excellent' },
  { id: '4', name: 'David Wilson', rollNo: 'CS21004', present: 22, total: 30, percentage: 73.3, status: 'warning' },
  { id: '5', name: 'Eva Brown', rollNo: 'CS21005', present: 18, total: 30, percentage: 60.0, status: 'critical' }
]

const getAttendanceStatus = (percentage: number) => {
  if (percentage >= 90) return { status: 'excellent', color: 'bg-gradient-to-r from-green-400 to-emerald-500 text-white' }
  if (percentage >= 80) return { status: 'good', color: 'bg-gradient-to-r from-blue-400 to-blue-500 text-white' }
  if (percentage >= 70) return { status: 'warning', color: 'bg-gradient-to-r from-yellow-400 to-orange-500 text-white' }
  return { status: 'critical', color: 'bg-gradient-to-r from-red-400 to-red-500 text-white' }
}

export function AttendancePage() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-cyan-600 bg-clip-text text-transparent">
            Attendance Management
          </h1>
          <p className="text-muted-foreground mt-2">Track and manage student attendance</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
          <Button className="bg-gradient-to-r from-emerald-500 to-cyan-600 hover:from-emerald-600 hover:to-cyan-700">
            <CheckCircle className="h-4 w-4 mr-2" />
            Mark Attendance
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <KPICard
          title="Overall Attendance"
          value={87.5}
          suffix="%"
          icon={Users}
          trend="up"
          trendValue={2.3}
          className="bg-gradient-to-br from-emerald-50 to-teal-100 dark:from-emerald-950/20 dark:to-teal-950/20 border-emerald-200 dark:border-emerald-800"
        />
        <KPICard
          title="Present Today"
          value={43}
          icon={CheckCircle}
          className="bg-gradient-to-br from-green-50 to-emerald-100 dark:from-green-950/20 dark:to-emerald-950/20 border-green-200 dark:border-green-800"
        />
        <KPICard
          title="Absent Today"
          value={7}
          icon={XCircle}
          className="bg-gradient-to-br from-red-50 to-pink-100 dark:from-red-950/20 dark:to-pink-950/20 border-red-200 dark:border-red-800"
        />
        <KPICard
          title="Low Attendance"
          value={5}
          icon={Clock}
          className="bg-gradient-to-br from-orange-50 to-amber-100 dark:from-orange-950/20 dark:to-amber-950/20 border-orange-200 dark:border-orange-800"
        />
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="subjects">Subject-wise</TabsTrigger>
          <TabsTrigger value="students">Student Records</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Attendance Trend */}
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-emerald-500" />
                  Attendance Trend
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={attendanceData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis 
                      dataKey="date" 
                      stroke={labelColor} // Applied here
                      fontSize={12}
                      tickFormatter={(value) => new Date(value).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                    />
                    <YAxis 
                      stroke={labelColor} // Applied here
                      fontSize={12} 
                    >
                      <Label 
                        value="Number of Students" 
                        angle={-90} 
                        position="insideLeft" 
                        style={{ textAnchor: 'middle', fill: labelColor }} // Applied here
                      />
                    </YAxis>
                    <Tooltip 
                      contentStyle={{
                        backgroundColor: 'hsl(var(--card))',
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '8px',
                        color: labelColor // Applied here
                      }}
                      labelFormatter={(value) => new Date(value).toLocaleDateString()}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="present" 
                      stroke="url(#attendanceGradient)"
                      strokeWidth={3}
                      dot={{ fill: '#10b981', strokeWidth: 2, r: 6 }}
                      activeDot={{ r: 8, stroke: '#10b981', strokeWidth: 2 }}
                      name="Present"
                    />
                    <defs>
                      <linearGradient id="attendanceGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#10b981" />
                        <stop offset="100%" stopColor="#06b6d4" />
                      </linearGradient>
                    </defs>
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Subject-wise Attendance */}
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-cyan-500" />
                  Subject Attendance
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={subjectAttendance} layout="horizontal">
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis 
                      type="number" 
                      stroke={labelColor} // Applied here
                      fontSize={12} 
                    />
                    <YAxis 
                      dataKey="subject" 
                      type="category" 
                      stroke={labelColor} // Applied here
                      fontSize={10}
                      width={100}
                    />
                    <Tooltip 
                      contentStyle={{
                        backgroundColor: 'hsl(var(--card))',
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '8px',
                        color: labelColor // Applied here
                      }}
                      formatter={(value: number, name: string) => [
                        `${value}%`,
                        'Attendance'
                      ]}
                    />
                    <Bar 
                      dataKey="percentage" 
                      radius={[0, 8, 8, 0]}
                      fill="url(#subjectGradient)"
                    />
                    <defs>
                      <linearGradient id="subjectGradient" x1="0" y1="0" x2="1" y2="0">
                        <stop offset="0%" stopColor="#06b6d4" />
                        <stop offset="50%" stopColor="#3b82f6" />
                        <stop offset="100%" stopColor="#8b5cf6" />
                      </linearGradient>
                    </defs>
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Daily Attendance Stats */}
          <Card className="glass-card">
            <CardHeader>
              <CardTitle>Recent Attendance Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-7 gap-4">
                {attendanceData.slice(-7).map((day, index) => {
                  const percentage = (day.present / day.total) * 100
                  return (
                    <div key={index} className="text-center p-4 rounded-lg bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900/20 dark:to-slate-800/20">
                      <div className="text-sm text-muted-foreground mb-2">
                        {new Date(day.date).toLocaleDateString('en-US', { weekday: 'short' })}
                      </div>
                      <div className="text-2xl font-bold mb-1">{percentage.toFixed(0)}%</div>
                      <div className="text-xs text-muted-foreground">
                        {day.present}/{day.total}
                      </div>
                      <div className="mt-2 w-full bg-muted rounded-full h-2">
                        <div
                          className="bg-gradient-to-r from-emerald-400 to-cyan-500 h-2 rounded-full transition-all duration-500"
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="subjects" className="space-y-6">
          <Card className="glass-card">
            <CardHeader>
              <CardTitle>Subject-wise Attendance Details</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="rounded-lg border overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-gradient-to-r from-emerald-50 to-cyan-50 dark:from-emerald-950/10 dark:to-cyan-950/10">
                      <TableHead>Subject</TableHead>
                      <TableHead>Present</TableHead>
                      <TableHead>Absent</TableHead>
                      <TableHead>Percentage</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {subjectAttendance.map((subject, index) => {
                      const statusInfo = getAttendanceStatus(subject.percentage)
                      return (
                        <TableRow key={index} className="hover:bg-gradient-to-r hover:from-emerald-50/50 hover:to-cyan-50/50 dark:hover:from-emerald-950/5 dark:hover:to-cyan-950/5">
                          <TableCell className="font-medium">{subject.subject}</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-1 text-green-600">
                              <CheckCircle className="h-3 w-3" />
                              {subject.present}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-1 text-red-600">
                              <XCircle className="h-3 w-3" />
                              {subject.absent}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <span className="font-semibold">{subject.percentage.toFixed(1)}%</span>
                              <div className="w-20 bg-muted rounded-full h-2">
                                <div
                                  className="bg-gradient-to-r from-emerald-400 to-cyan-500 h-2 rounded-full transition-all duration-500"
                                  style={{ width: `${subject.percentage}%` }}
                                />
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge className={statusInfo.color}>
                              {statusInfo.status}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Button variant="outline" size="sm">
                              View Details
                            </Button>
                          </TableCell>
                        </TableRow>
                      )
                    })}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="students" className="space-y-6">
          <Card className="glass-card">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Student Attendance Records</CardTitle>
                <div className="flex items-center space-x-2">
                  <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="Search students..." className="pl-8 w-64" />
                  </div>
                  <Select>
                    <SelectTrigger className="w-32">
                      <Filter className="h-4 w-4 mr-2" />
                      <SelectValue placeholder="Filter" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Students</SelectItem>
                      <SelectItem value="excellent">Excellent (90%+)</SelectItem>
                      <SelectItem value="good">Good (80-89%)</SelectItem>
                      <SelectItem value="warning">Warning (70-79%)</SelectItem>
                      <SelectItem value="critical">Critical (&lt;70%)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="rounded-lg border overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/10 dark:to-purple-950/10">
                      <TableHead>Student</TableHead>
                      <TableHead>Roll Number</TableHead>
                      <TableHead>Present/Total</TableHead>
                      <TableHead>Percentage</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {studentAttendance.map((student) => {
                      const statusInfo = getAttendanceStatus(student.percentage)
                      return (
                        <TableRow key={student.id} className="hover:bg-gradient-to-r hover:from-blue-50/50 hover:to-purple-50/50 dark:hover:from-blue-950/5 dark:hover:to-purple-950/5">
                          <TableCell className="font-medium">{student.name}</TableCell>
                          <TableCell className="font-mono text-sm">{student.rollNo}</TableCell>
                          <TableCell>
                            <span className="font-semibold">{student.present}/{student.total}</span>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <span className="font-semibold">{student.percentage.toFixed(1)}%</span>
                              <div className="w-16 bg-muted rounded-full h-2">
                                <div
                                  className="bg-gradient-to-r from-blue-400 to-purple-500 h-2 rounded-full transition-all duration-500"
                                  style={{ width: `${student.percentage}%` }}
                                />
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge className={statusInfo.color}>
                              {statusInfo.status}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex gap-2">
                              <Button variant="outline" size="sm">
                                Details
                              </Button>
                              <Button variant="outline" size="sm">
                                Contact
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      )
                    })}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}