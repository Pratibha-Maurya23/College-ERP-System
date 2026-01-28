import { useState } from 'react'
import { Search, Filter, Clock, CheckCircle, XCircle, Eye, FileText, Calendar, User } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { Badge } from '../components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/table'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../components/ui/dialog'
import { Textarea } from '../components/ui/textarea'
import { Label } from '../components/ui/label'
import { toast } from 'sonner'

interface ReEvaluationRequest {
  id: string
  studentName: string
  rollNumber: string
  subject: string
  examDate: string
  originalMarks: number
  requestDate: string
  status: 'pending' | 'approved' | 'rejected' | 'completed'
  reason: string
  faculty: string
  semester: string
  department: string
}

const mockReEvaluationData: ReEvaluationRequest[] = [
  {
    id: 'REV001',
    studentName: 'Alice Johnson',
    rollNumber: 'CS2021001',
    subject: 'Data Structures',
    examDate: '2024-03-15',
    originalMarks: 68,
    requestDate: '2024-03-20',
    status: 'pending',
    reason: 'Discrepancy in practical evaluation marks',
    faculty: 'Dr. Smith',
    semester: 'Spring 2024',
    department: 'Computer Science'
  },
  {
    id: 'REV002',
    studentName: 'Bob Chen',
    rollNumber: 'CS2021002',
    subject: 'Algorithms',
    examDate: '2024-03-18',
    originalMarks: 72,
    requestDate: '2024-03-22',
    status: 'approved',
    reason: 'Answer sheet scanning error suspected',
    faculty: 'Dr. Johnson',
    semester: 'Spring 2024',
    department: 'Computer Science'
  },
  {
    id: 'REV003',
    studentName: 'Carol Davis',
    rollNumber: 'EC2021001',
    subject: 'Digital Circuits',
    examDate: '2024-03-12',
    originalMarks: 65,
    requestDate: '2024-03-25',
    status: 'completed',
    reason: 'Marks calculation error',
    faculty: 'Prof. Wilson',
    semester: 'Spring 2024',
    department: 'Electronics'
  },
  {
    id: 'REV004',
    studentName: 'David Lee',
    rollNumber: 'ME2021001',
    subject: 'Thermodynamics',
    examDate: '2024-03-10',
    originalMarks: 58,
    requestDate: '2024-03-28',
    status: 'rejected',
    reason: 'Request for marks review',
    faculty: 'Dr. Brown',
    semester: 'Spring 2024',
    department: 'Mechanical'
  }
]

export function ReEvaluationPage() {
  const [requests, setRequests] = useState<ReEvaluationRequest[]>(mockReEvaluationData)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [selectedRequest, setSelectedRequest] = useState<ReEvaluationRequest | null>(null)

  const filteredRequests = requests.filter(request => {
    const matchesSearch = request.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         request.rollNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         request.subject.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'all' || request.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const handleStatusUpdate = (requestId: string, newStatus: 'approved' | 'rejected' | 'completed') => {
    setRequests(prev => prev.map(req => 
      req.id === requestId ? { ...req, status: newStatus } : req
    ))
    toast.success(`Request ${newStatus} successfully`)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-gradient-to-r from-yellow-500 to-orange-500'
      case 'approved':
        return 'bg-gradient-to-r from-blue-500 to-cyan-500'
      case 'completed':
        return 'bg-gradient-to-r from-green-500 to-emerald-500'
      case 'rejected':
        return 'bg-gradient-to-r from-red-500 to-rose-500'
      default:
        return 'bg-gradient-to-r from-gray-500 to-slate-500'
    }
  }

  const statusCounts = {
    total: requests.length,
    pending: requests.filter(r => r.status === 'pending').length,
    approved: requests.filter(r => r.status === 'approved').length,
    completed: requests.filter(r => r.status === 'completed').length,
    rejected: requests.filter(r => r.status === 'rejected').length
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1>Re-evaluation Management</h1>
        <p className="text-muted-foreground">
          Manage student re-evaluation requests and review processes
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <Card className="glass-card hover-lift bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-blue-950/20 dark:to-indigo-950/20 border-blue-200 dark:border-blue-800">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-600 dark:text-blue-400">Total Requests</p>
                <p className="text-2xl font-medium text-blue-700 dark:text-blue-300">{statusCounts.total}</p>
              </div>
              <FileText className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card hover-lift bg-gradient-to-br from-yellow-50 to-orange-100 dark:from-yellow-950/20 dark:to-orange-950/20 border-yellow-200 dark:border-yellow-800">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-yellow-600 dark:text-yellow-400">Pending</p>
                <p className="text-2xl font-medium text-yellow-700 dark:text-yellow-300">{statusCounts.pending}</p>
              </div>
              <Clock className="h-8 w-8 text-yellow-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card hover-lift bg-gradient-to-br from-cyan-50 to-blue-100 dark:from-cyan-950/20 dark:to-blue-950/20 border-cyan-200 dark:border-cyan-800">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-cyan-600 dark:text-cyan-400">Approved</p>
                <p className="text-2xl font-medium text-cyan-700 dark:text-cyan-300">{statusCounts.approved}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-cyan-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card hover-lift bg-gradient-to-br from-green-50 to-emerald-100 dark:from-green-950/20 dark:to-emerald-950/20 border-green-200 dark:border-green-800">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-600 dark:text-green-400">Completed</p>
                <p className="text-2xl font-medium text-green-700 dark:text-green-300">{statusCounts.completed}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card hover-lift bg-gradient-to-br from-red-50 to-rose-100 dark:from-red-950/20 dark:to-rose-950/20 border-red-200 dark:border-red-800">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-red-600 dark:text-red-400">Rejected</p>
                <p className="text-2xl font-medium text-red-700 dark:text-red-300">{statusCounts.rejected}</p>
              </div>
              <XCircle className="h-8 w-8 text-red-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card className="glass-card">
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
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
              <SelectTrigger className="w-full sm:w-48">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="approved">Approved</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Re-evaluation Requests Table */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle>Re-evaluation Requests</CardTitle>
          <CardDescription>
            Review and manage student re-evaluation requests
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Request ID</TableHead>
                  <TableHead>Student</TableHead>
                  <TableHead>Subject</TableHead>
                  <TableHead>Original Marks</TableHead>
                  <TableHead>Request Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredRequests.map((request) => (
                  <TableRow key={request.id}>
                    <TableCell className="font-medium">{request.id}</TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">{request.studentName}</div>
                        <div className="text-sm text-muted-foreground">{request.rollNumber}</div>
                      </div>
                    </TableCell>
                    <TableCell>{request.subject}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="font-medium">
                        {request.originalMarks}/100
                      </Badge>
                    </TableCell>
                    <TableCell>{new Date(request.requestDate).toLocaleDateString()}</TableCell>
                    <TableCell>
                      <Badge className={`text-white ${getStatusColor(request.status)}`}>
                        {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => setSelectedRequest(request)}
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="sm:max-w-lg">
                            <DialogHeader>
                              <DialogTitle>Re-evaluation Request Details</DialogTitle>
                              <DialogDescription>
                                Review the re-evaluation request information
                              </DialogDescription>
                            </DialogHeader>
                            {selectedRequest && (
                              <div className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                  <div>
                                    <Label>Student Name</Label>
                                    <p className="text-sm font-medium">{selectedRequest.studentName}</p>
                                  </div>
                                  <div>
                                    <Label>Roll Number</Label>
                                    <p className="text-sm font-medium">{selectedRequest.rollNumber}</p>
                                  </div>
                                  <div>
                                    <Label>Subject</Label>
                                    <p className="text-sm font-medium">{selectedRequest.subject}</p>
                                  </div>
                                  <div>
                                    <Label>Department</Label>
                                    <p className="text-sm font-medium">{selectedRequest.department}</p>
                                  </div>
                                  <div>
                                    <Label>Original Marks</Label>
                                    <p className="text-sm font-medium">{selectedRequest.originalMarks}/100</p>
                                  </div>
                                  <div>
                                    <Label>Exam Date</Label>
                                    <p className="text-sm font-medium">{new Date(selectedRequest.examDate).toLocaleDateString()}</p>
                                  </div>
                                </div>
                                <div>
                                  <Label>Reason for Re-evaluation</Label>
                                  <p className="text-sm mt-1 p-3 bg-muted rounded-md">{selectedRequest.reason}</p>
                                </div>
                                {selectedRequest.status === 'pending' && (
                                  <div className="flex gap-2 pt-4">
                                    <Button
                                      className="flex-1 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600"
                                      onClick={() => handleStatusUpdate(selectedRequest.id, 'approved')}
                                    >
                                      <CheckCircle className="h-4 w-4 mr-2" />
                                      Approve
                                    </Button>
                                    <Button
                                      variant="destructive"
                                      className="flex-1"
                                      onClick={() => handleStatusUpdate(selectedRequest.id, 'rejected')}
                                    >
                                      <XCircle className="h-4 w-4 mr-2" />
                                      Reject
                                    </Button>
                                  </div>
                                )}
                              </div>
                            )}
                          </DialogContent>
                        </Dialog>
                        {request.status === 'approved' && (
                          <Button
                            size="sm"
                            className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600"
                            onClick={() => handleStatusUpdate(request.id, 'completed')}
                          >
                            Mark Complete
                          </Button>
                        )}
                      </div>
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