import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts'
import { TrendingUp, Users, Award, FileText, Eye, Download, Upload } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'
import { Button } from '../components/ui/button'
import { Badge } from '../components/ui/badge'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/table'
import { KPICard } from '../components/kpi-card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs'

const gradeDistribution = [
  { grade: 'A+', count: 28, percentage: 15.9, color: '#10b981' },
  { grade: 'A', count: 45, percentage: 25.6, color: '#3b82f6' },
  { grade: 'B+', count: 52, percentage: 29.5, color: '#8b5cf6' },
  { grade: 'B', count: 32, percentage: 18.2, color: '#f59e0b' },
  { grade: 'C+', count: 15, percentage: 8.5, color: '#ef4444' },
  { grade: 'C', count: 4, percentage: 2.3, color: '#6b7280' },
]

const subjectResults = [
  { subject: 'Data Structures', avgScore: 78.5, students: 45, published: true },
  { subject: 'Database Management', avgScore: 82.3, students: 52, published: true },
  { subject: 'Software Engineering', avgScore: 75.8, students: 38, published: false },
  { subject: 'Computer Networks', avgScore: 80.1, students: 41, published: true }
]

const trendData = [
  { exam: 'Quiz 1', average: 72.5 },
  { exam: 'Quiz 2', average: 75.8 },
  { exam: 'Mid-term', average: 78.2 },
  { exam: 'Quiz 3', average: 80.1 },
  { exam: 'Final', average: 82.5 }
]

const recentResults = [
  { id: '1', student: 'Alice Johnson', subject: 'Data Structures', score: 89, grade: 'A', date: '2024-03-10' },
  { id: '2', student: 'Bob Smith', subject: 'Database Management', score: 92, grade: 'A+', date: '2024-03-10' },
  { id: '3', student: 'Carol Davis', subject: 'Software Engineering', score: 85, grade: 'A', date: '2024-03-09' },
  { id: '4', student: 'David Wilson', subject: 'Computer Networks', score: 78, grade: 'B+', date: '2024-03-09' },
  { id: '5', student: 'Eva Brown', subject: 'Data Structures', score: 95, grade: 'A+', date: '2024-03-08' }
]

const getGradeColor = (grade: string) => {
  switch (grade) {
    case 'A+': return 'bg-gradient-to-r from-green-400 to-emerald-500 text-white'
    case 'A': return 'bg-gradient-to-r from-blue-400 to-blue-500 text-white'
    case 'B+': return 'bg-gradient-to-r from-purple-400 to-purple-500 text-white'
    case 'B': return 'bg-gradient-to-r from-yellow-400 to-yellow-500 text-white'
    case 'C+': return 'bg-gradient-to-r from-orange-400 to-orange-500 text-white'
    case 'C': return 'bg-gradient-to-r from-red-400 to-red-500 text-white'
    default: return 'bg-gradient-to-r from-gray-400 to-gray-500 text-white'
  }
}

export function ResultsPage() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
            Results & Analytics
          </h1>
          <p className="text-muted-foreground mt-2">View and analyze student performance</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Upload className="h-4 w-4 mr-2" />
            Import Results
          </Button>
          <Button className="bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700">
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <KPICard
          title="Average Score"
          value={79.2}
          suffix="%"
          icon={TrendingUp}
          trend="up"
          trendValue={3.5}
          className="bg-gradient-to-br from-green-50 to-emerald-100 dark:from-green-950/20 dark:to-emerald-950/20 border-green-200 dark:border-green-800"
        />
        <KPICard
          title="Students Evaluated"
          value={176}
          icon={Users}
          className="bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-blue-950/20 dark:to-indigo-950/20 border-blue-200 dark:border-blue-800"
        />
        <KPICard
          title="Pass Rate"
          value={92.5}
          suffix="%"
          icon={Award}
          trend="up"
          trendValue={2.1}
          className="bg-gradient-to-br from-purple-50 to-violet-100 dark:from-purple-950/20 dark:to-violet-950/20 border-purple-200 dark:border-purple-800"
        />
        <KPICard
          title="Published Results"
          value={8}
          icon={FileText}
          className="bg-gradient-to-br from-orange-50 to-amber-100 dark:from-orange-950/20 dark:to-amber-950/20 border-orange-200 dark:border-orange-800"
        />
      </div>

      <Tabs defaultValue="analytics" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="subjects">Subject Results</TabsTrigger>
          <TabsTrigger value="recent">Recent Results</TabsTrigger>
        </TabsList>

        <TabsContent value="analytics" className="space-y-6">
          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Grade Distribution */}
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="h-5 w-5 text-green-500" />
                  Grade Distribution
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={gradeDistribution}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={120}
                      paddingAngle={5}
                      dataKey="count"
                    >
                      {gradeDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value: number, name: string, props: any) => [
                      `${value} students (${props.payload.percentage}%)`,
                      props.payload.grade
                    ]} />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Performance Trend */}
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-blue-500" />
                  Performance Trend
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={trendData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="exam" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                    <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                    <Tooltip 
                      contentStyle={{
                        backgroundColor: 'hsl(var(--background))',
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '8px',
                      }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="average" 
                      stroke="url(#gradient1)"
                      strokeWidth={3}
                      dot={{ fill: '#3b82f6', strokeWidth: 2, r: 6 }}
                      activeDot={{ r: 8, stroke: '#3b82f6', strokeWidth: 2 }}
                    />
                    <defs>
                      <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#3b82f6" />
                        <stop offset="100%" stopColor="#8b5cf6" />
                      </linearGradient>
                    </defs>
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Detailed Grade Distribution Bar Chart */}
          <Card className="glass-card">
            <CardHeader>
              <CardTitle>Detailed Grade Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={gradeDistribution}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="grade" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                  <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: 'hsl(var(--background))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px',
                    }}
                    formatter={(value: number, name: string, props: any) => [
                      `${value} students (${props.payload.percentage}%)`,
                      'Count'
                    ]}
                  />
                  <Bar 
                    dataKey="count" 
                    radius={[8, 8, 0, 0]}
                    fill="url(#colorGradient)"
                  />
                  <defs>
                    <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#3b82f6" />
                      <stop offset="50%" stopColor="#8b5cf6" />
                      <stop offset="100%" stopColor="#06b6d4" />
                    </linearGradient>
                  </defs>
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="subjects" className="space-y-6">
          <Card className="glass-card">
            <CardHeader>
              <CardTitle>Subject-wise Results</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="rounded-lg border overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-950/10 dark:to-blue-950/10">
                      <TableHead>Subject</TableHead>
                      <TableHead>Average Score</TableHead>
                      <TableHead>Students</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {subjectResults.map((subject, index) => (
                      <TableRow key={index} className="hover:bg-gradient-to-r hover:from-green-50/50 hover:to-blue-50/50 dark:hover:from-green-950/5 dark:hover:to-blue-950/5">
                        <TableCell className="font-medium">{subject.subject}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <span className="font-semibold">{subject.avgScore}%</span>
                            <div className="w-20 bg-muted rounded-full h-2">
                              <div
                                className="bg-gradient-to-r from-green-400 to-blue-500 h-2 rounded-full transition-all duration-500"
                                style={{ width: `${(subject.avgScore / 100) * 100}%` }}
                              />
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <Users className="h-3 w-3 text-muted-foreground" />
                            {subject.students}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge className={subject.published 
                            ? 'bg-gradient-to-r from-green-400 to-green-600 text-white' 
                            : 'bg-gradient-to-r from-yellow-400 to-yellow-600 text-white'
                          }>
                            {subject.published ? 'Published' : 'Draft'}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm">
                              <Eye className="h-3 w-3 mr-1" />
                              View
                            </Button>
                            <Button variant="outline" size="sm">
                              <Download className="h-3 w-3 mr-1" />
                              Export
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
        </TabsContent>

        <TabsContent value="recent" className="space-y-6">
          <Card className="glass-card">
            <CardHeader>
              <CardTitle>Recent Individual Results</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="rounded-lg border overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/10 dark:to-purple-950/10">
                      <TableHead>Student</TableHead>
                      <TableHead>Subject</TableHead>
                      <TableHead>Score</TableHead>
                      <TableHead>Grade</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {recentResults.map((result) => (
                      <TableRow key={result.id} className="hover:bg-gradient-to-r hover:from-blue-50/50 hover:to-purple-50/50 dark:hover:from-blue-950/5 dark:hover:to-purple-950/5">
                        <TableCell className="font-medium">{result.student}</TableCell>
                        <TableCell>{result.subject}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <span className="font-semibold">{result.score}%</span>
                            <div className="w-16 bg-muted rounded-full h-1.5">
                              <div
                                className="bg-gradient-to-r from-blue-400 to-purple-500 h-1.5 rounded-full"
                                style={{ width: `${result.score}%` }}
                              />
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge className={getGradeColor(result.grade)}>
                            {result.grade}
                          </Badge>
                        </TableCell>
                        <TableCell>{new Date(result.date).toLocaleDateString()}</TableCell>
                        <TableCell>
                          <Button variant="outline" size="sm">
                            <Eye className="h-3 w-3 mr-1" />
                            Details
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
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