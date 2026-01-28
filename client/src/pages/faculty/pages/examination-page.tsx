import { Calendar, Clock, Users, FileText, Plus, Search, Filter } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'
import { Button } from '../components/ui/button'
import { Badge } from '../components/ui/badge'
import { Input } from '../components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/table'
import { KPICard } from '../components/kpi-card'

const upcomingExams = [
  {
    id: '1',
    subject: 'Data Structures',
    date: '2024-03-15',
    time: '09:00 AM - 12:00 PM',
    duration: '3 hours',
    students: 45,
    venue: 'Hall A',
    status: 'scheduled'
  },
  {
    id: '2',
    subject: 'Database Management',
    date: '2024-03-18',
    time: '02:00 PM - 05:00 PM',
    duration: '3 hours',
    students: 52,
    venue: 'Hall B',
    status: 'scheduled'
  },
  {
    id: '3',
    subject: 'Software Engineering',
    date: '2024-03-20',
    time: '10:00 AM - 01:00 PM',
    duration: '3 hours',
    students: 38,
    venue: 'Hall C',
    status: 'draft'
  },
  {
    id: '4',
    subject: 'Computer Networks',
    date: '2024-03-22',
    time: '09:00 AM - 12:00 PM',
    duration: '3 hours',
    students: 41,
    venue: 'Lab 1',
    status: 'published'
  }
]

const getStatusColor = (status: string) => {
  switch (status) {
    case 'scheduled': return 'bg-gradient-to-r from-blue-400 to-blue-600 text-white'
    case 'published': return 'bg-gradient-to-r from-green-400 to-green-600 text-white'
    case 'draft': return 'bg-gradient-to-r from-yellow-400 to-yellow-600 text-white'
    case 'completed': return 'bg-gradient-to-r from-gray-400 to-gray-600 text-white'
    default: return 'bg-gradient-to-r from-gray-400 to-gray-600 text-white'
  }
}

export function ExaminationPage() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Examination Management
          </h1>
          <p className="text-muted-foreground mt-2">Schedule and manage examinations</p>
        </div>
        <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700">
          <Plus className="h-4 w-4 mr-2" />
          Schedule New Exam
        </Button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <KPICard
          title="Total Exams"
          value={12}
          icon={FileText}
          className="bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-blue-950/20 dark:to-indigo-950/20 border-blue-200 dark:border-blue-800"
        />
        <KPICard
          title="This Week"
          value={4}
          icon={Calendar}
          className="bg-gradient-to-br from-purple-50 to-violet-100 dark:from-purple-950/20 dark:to-violet-950/20 border-purple-200 dark:border-purple-800"
        />
        <KPICard
          title="Total Students"
          value={176}
          icon={Users}
          className="bg-gradient-to-br from-green-50 to-emerald-100 dark:from-green-950/20 dark:to-emerald-950/20 border-green-200 dark:border-green-800"
        />
        <KPICard
          title="Pending"
          value={3}
          icon={Clock}
          className="bg-gradient-to-br from-orange-50 to-amber-100 dark:from-orange-950/20 dark:to-amber-950/20 border-orange-200 dark:border-orange-800"
        />
      </div>

      {/* Exam Management */}
      <Card className="glass-card">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-blue-500" />
              Upcoming Examinations
            </CardTitle>
            <div className="flex items-center space-x-2">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search exams..." className="pl-8 w-64" />
              </div>
              <Select>
                <SelectTrigger className="w-32">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Filter" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="scheduled">Scheduled</SelectItem>
                  <SelectItem value="published">Published</SelectItem>
                  <SelectItem value="draft">Draft</SelectItem>
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
                  <TableHead>Subject</TableHead>
                  <TableHead>Date & Time</TableHead>
                  <TableHead>Duration</TableHead>
                  <TableHead>Students</TableHead>
                  <TableHead>Venue</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {upcomingExams.map((exam) => (
                  <TableRow key={exam.id} className="hover:bg-gradient-to-r hover:from-blue-50/50 hover:to-purple-50/50 dark:hover:from-blue-950/5 dark:hover:to-purple-950/5">
                    <TableCell className="font-medium">{exam.subject}</TableCell>
                    <TableCell>
                      <div>
                        <div>{new Date(exam.date).toLocaleDateString()}</div>
                        <div className="text-sm text-muted-foreground">{exam.time}</div>
                      </div>
                    </TableCell>
                    <TableCell>{exam.duration}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Users className="h-3 w-3 text-muted-foreground" />
                        {exam.students}
                      </div>
                    </TableCell>
                    <TableCell>{exam.venue}</TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(exam.status)}>
                        {exam.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          Edit
                        </Button>
                        <Button variant="outline" size="sm">
                          View
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="glass-card hover:shadow-lg transition-all duration-300 cursor-pointer group">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="p-3 rounded-full bg-gradient-to-r from-blue-400 to-blue-600">
                <Plus className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="font-semibold group-hover:text-blue-600 transition-colors">Create Exam</h3>
                <p className="text-sm text-muted-foreground">Schedule a new examination</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card hover:shadow-lg transition-all duration-300 cursor-pointer group">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="p-3 rounded-full bg-gradient-to-r from-purple-400 to-purple-600">
                <FileText className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="font-semibold group-hover:text-purple-600 transition-colors">Question Bank</h3>
                <p className="text-sm text-muted-foreground">Manage exam questions</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card hover:shadow-lg transition-all duration-300 cursor-pointer group">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="p-3 rounded-full bg-gradient-to-r from-green-400 to-green-600">
                <Calendar className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="font-semibold group-hover:text-green-600 transition-colors">Exam Calendar</h3>
                <p className="text-sm text-muted-foreground">View exam schedule</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}