import { useState } from 'react'
import { Search, Filter, Plus, Download, Upload, Save, Edit3, Check, X } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { Badge } from '../components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/table'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../components/ui/dialog'
import { Label } from '../components/ui/label'
import { Progress } from '../components/ui/progress'
import { toast } from 'sonner'

interface ExamMark {
  id: string
  studentName: string
  rollNumber: string
  subject: string
  examType: 'midterm' | 'final' | 'quiz' | 'assignment'
  totalMarks: number
  obtainedMarks: number
  percentage: number
  grade: string
  status: 'pending' | 'submitted' | 'approved'
  examDate: string
  department: string
  semester: string
}

const mockExamMarks: ExamMark[] = [
  {
    id: 'EX001',
    studentName: 'Alice Johnson',
    rollNumber: 'CS2021001',
    subject: 'Data Structures',
    examType: 'midterm',
    totalMarks: 100,
    obtainedMarks: 85,
    percentage: 85,
    grade: 'A',
    status: 'submitted',
    examDate: '2024-03-15',
    department: 'Computer Science',
    semester: 'Spring 2024'
  },
  {
    id: 'EX002',
    studentName: 'Bob Chen',
    rollNumber: 'CS2021002',
    subject: 'Data Structures',
    examType: 'midterm',
    totalMarks: 100,
    obtainedMarks: 0,
    percentage: 0,
    grade: 'F',
    status: 'pending',
    examDate: '2024-03-15',
    department: 'Computer Science',
    semester: 'Spring 2024'
  },
  {
    id: 'EX003',
    studentName: 'Carol Davis',
    rollNumber: 'CS2021003',
    subject: 'Data Structures',
    examType: 'midterm',
    totalMarks: 100,
    obtainedMarks: 92,
    percentage: 92,
    grade: 'A+',
    status: 'approved',
    examDate: '2024-03-15',
    department: 'Computer Science',
    semester: 'Spring 2024'
  },
  {
    id: 'EX004',
    studentName: 'David Lee',
    rollNumber: 'CS2021004',
    subject: 'Data Structures',
    examType: 'midterm',
    totalMarks: 100,
    obtainedMarks: 78,
    percentage: 78,
    grade: 'B+',
    status: 'submitted',
    examDate: '2024-03-15',
    department: 'Computer Science',
    semester: 'Spring 2024'
  }
]

export function ExamMarksPage() {
  const [marks, setMarks] = useState<ExamMark[]>(mockExamMarks)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [examTypeFilter, setExamTypeFilter] = useState<string>('all')
  const [editingMark, setEditingMark] = useState<string | null>(null)
  const [editValue, setEditValue] = useState<number>(0)

  const filteredMarks = marks.filter(mark => {
    const matchesSearch = mark.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         mark.rollNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         mark.subject.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'all' || mark.status === statusFilter
    const matchesExamType = examTypeFilter === 'all' || mark.examType === examTypeFilter
    return matchesSearch && matchesStatus && matchesExamType
  })

  const handleMarksEdit = (markId: string, newMarks: number) => {
    const percentage = (newMarks / 100) * 100
    let grade = 'F'
    if (percentage >= 90) grade = 'A+'
    else if (percentage >= 85) grade = 'A'
    else if (percentage >= 80) grade = 'B+'
    else if (percentage >= 75) grade = 'B'
    else if (percentage >= 70) grade = 'C+'
    else if (percentage >= 65) grade = 'C'
    else if (percentage >= 60) grade = 'D'

    setMarks(prev => prev.map(mark => 
      mark.id === markId 
        ? { ...mark, obtainedMarks: newMarks, percentage, grade, status: 'submitted' as const }
        : mark
    ))
    setEditingMark(null)
    toast.success('Marks updated successfully')
  }

  const handleStatusUpdate = (markId: string, newStatus: 'submitted' | 'approved') => {
    setMarks(prev => prev.map(mark => 
      mark.id === markId ? { ...mark, status: newStatus } : mark
    ))
    toast.success(`Status updated to ${newStatus}`)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-gradient-to-r from-yellow-500 to-orange-500'
      case 'submitted':
        return 'bg-gradient-to-r from-blue-500 to-cyan-500'
      case 'approved':
        return 'bg-gradient-to-r from-green-500 to-emerald-500'
      default:
        return 'bg-gradient-to-r from-gray-500 to-slate-500'
    }
  }

  const getGradeColor = (grade: string) => {
    switch (grade) {
      case 'A+':
      case 'A':
        return 'text-green-600 bg-green-50 dark:text-green-400 dark:bg-green-950'
      case 'B+':
      case 'B':
        return 'text-blue-600 bg-blue-50 dark:text-blue-400 dark:bg-blue-950'
      case 'C+':
      case 'C':
        return 'text-yellow-600 bg-yellow-50 dark:text-yellow-400 dark:bg-yellow-950'
      case 'D':
        return 'text-orange-600 bg-orange-50 dark:text-orange-400 dark:bg-orange-950'
      case 'F':
        return 'text-red-600 bg-red-50 dark:text-red-400 dark:bg-red-950'
      default:
        return 'text-gray-600 bg-gray-50 dark:text-gray-400 dark:bg-gray-950'
    }
  }

  const stats = {
    total: marks.length,
    submitted: marks.filter(m => m.status === 'submitted').length,
    pending: marks.filter(m => m.status === 'pending').length,
    approved: marks.filter(m => m.status === 'approved').length,
    averageMarks: marks.reduce((acc, m) => acc + m.obtainedMarks, 0) / marks.length
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1>Exam Marks Management</h1>
          <p className="text-muted-foreground">
            Enter, review, and manage student exam marks
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2">
            <Upload className="h-4 w-4" />
            Import Marks
          </Button>
          <Button variant="outline" className="gap-2">
            <Download className="h-4 w-4" />
            Export Results
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <Card className="glass-card hover-lift bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-blue-950/20 dark:to-indigo-950/20 border-blue-200 dark:border-blue-800">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-600 dark:text-blue-400">Total Students</p>
                <p className="text-2xl font-medium text-blue-700 dark:text-blue-300">{stats.total}</p>
              </div>
              <div className="text-blue-500 text-2xl font-bold">👥</div>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card hover-lift bg-gradient-to-br from-yellow-50 to-orange-100 dark:from-yellow-950/20 dark:to-orange-950/20 border-yellow-200 dark:border-yellow-800">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-yellow-600 dark:text-yellow-400">Pending</p>
                <p className="text-2xl font-medium text-yellow-700 dark:text-yellow-300">{stats.pending}</p>
              </div>
              <div className="text-yellow-500 text-2xl font-bold">⏳</div>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card hover-lift bg-gradient-to-br from-cyan-50 to-blue-100 dark:from-cyan-950/20 dark:to-blue-950/20 border-cyan-200 dark:border-cyan-800">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-cyan-600 dark:text-cyan-400">Submitted</p>
                <p className="text-2xl font-medium text-cyan-700 dark:text-cyan-300">{stats.submitted}</p>
              </div>
              <div className="text-cyan-500 text-2xl font-bold">📝</div>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card hover-lift bg-gradient-to-br from-green-50 to-emerald-100 dark:from-green-950/20 dark:to-emerald-950/20 border-green-200 dark:border-green-800">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-600 dark:text-green-400">Approved</p>
                <p className="text-2xl font-medium text-green-700 dark:text-green-300">{stats.approved}</p>
              </div>
              <div className="text-green-500 text-2xl font-bold">✅</div>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card hover-lift bg-gradient-to-br from-purple-50 to-violet-100 dark:from-purple-950/20 dark:to-violet-950/20 border-purple-200 dark:border-purple-800">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-600 dark:text-purple-400">Average</p>
                <p className="text-2xl font-medium text-purple-700 dark:text-purple-300">{stats.averageMarks.toFixed(1)}%</p>
              </div>
              <div className="text-purple-500 text-2xl font-bold">📊</div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card className="glass-card">
        <CardContent className="p-4">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search by student name, roll number, or subject..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full lg:w-48">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="submitted">Submitted</SelectItem>
                <SelectItem value="approved">Approved</SelectItem>
              </SelectContent>
            </Select>
            <Select value={examTypeFilter} onValueChange={setExamTypeFilter}>
              <SelectTrigger className="w-full lg:w-48">
                <SelectValue placeholder="Filter by exam type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="midterm">Midterm</SelectItem>
                <SelectItem value="final">Final</SelectItem>
                <SelectItem value="quiz">Quiz</SelectItem>
                <SelectItem value="assignment">Assignment</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Exam Marks Table */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle>Exam Marks</CardTitle>
          <CardDescription>
            Enter and manage student exam marks
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Student</TableHead>
                  <TableHead>Subject</TableHead>
                  <TableHead>Exam Type</TableHead>
                  <TableHead>Marks</TableHead>
                  <TableHead>Percentage</TableHead>
                  <TableHead>Grade</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredMarks.map((mark) => (
                  <TableRow key={mark.id}>
                    <TableCell>
                      <div>
                        <div className="font-medium">{mark.studentName}</div>
                        <div className="text-sm text-muted-foreground">{mark.rollNumber}</div>
                      </div>
                    </TableCell>
                    <TableCell className="font-medium">{mark.subject}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="capitalize">
                        {mark.examType}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {editingMark === mark.id ? (
                        <div className="flex items-center gap-2">
                          <Input
                            type="number"
                            min="0"
                            max="100"
                            value={editValue}
                            onChange={(e) => setEditValue(Number(e.target.value))}
                            className="w-20"
                          />
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleMarksEdit(mark.id, editValue)}
                          >
                            <Check className="h-4 w-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => setEditingMark(null)}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{mark.obtainedMarks}/{mark.totalMarks}</span>
                          {mark.status === 'pending' && (
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => {
                                setEditingMark(mark.id)
                                setEditValue(mark.obtainedMarks)
                              }}
                            >
                              <Edit3 className="h-4 w-4" />
                            </Button>
                          )}
                        </div>
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Progress value={mark.percentage} className="w-16" />
                        <span className="text-sm font-medium">{mark.percentage}%</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={getGradeColor(mark.grade)}>
                        {mark.grade}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className={`text-white ${getStatusColor(mark.status)}`}>
                        {mark.status.charAt(0).toUpperCase() + mark.status.slice(1)}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {mark.status === 'submitted' && (
                        <Button
                          size="sm"
                          className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600"
                          onClick={() => handleStatusUpdate(mark.id, 'approved')}
                        >
                          <Check className="h-4 w-4 mr-1" />
                          Approve
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}