import { Bell, Plus, Search, User } from 'lucide-react'
import { Button } from './ui/button'
import { Input } from './ui/input'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { Badge } from './ui/badge';
import { useNavigate } from "react-router-dom";


interface FacultyHeaderProps {
  onSidebarToggle: () => void
}

export function FacultyHeader({ onSidebarToggle }: FacultyHeaderProps) {
  const navigate = useNavigate();

  const handleLogout = () => {
    const role = localStorage.getItem("role") || "faculty";

    // Clear auth/session
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("userId");

    // Optional: clear faculty-specific data if you add later
    // localStorage.removeItem("facultySession");

    // Redirect to role-based login
    navigate(`/login?role=${role}`, { replace: true });
  };
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-14 items-center px-4">
        {/* Left - Logo and Title */}
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden"
            onClick={onSidebarToggle}
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </Button>
          <div className="flex items-center space-x-2">
            <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
              <span className="text-white font-bold text-sm">VM</span>
            </div>
            <div className="hidden sm:block">
              <h1 className="font-semibold">Vikash Maurya</h1>
              <p className="text-xs text-muted-foreground">Faculty Dashboard</p>
            </div>
          </div>
        </div>

        {/* Center - Search */}
        <div className="flex-1 mx-4 max-w-md">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search students, faculty, or records..."
              className="pl-8 w-full"
            />
          </div>
        </div>

        {/* Right - Actions */}
        <div className="flex items-center space-x-2">
          
          {/* Quick Add Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="w-9 px-0">
                <Plus className="h-4 w-4" />
                <span className="sr-only">Quick add</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Quick Actions</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Add Student</DropdownMenuItem>
              <DropdownMenuItem>Create Exam</DropdownMenuItem>
              <DropdownMenuItem>Send Notification</DropdownMenuItem>
              <DropdownMenuItem>Generate Report</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Notifications */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="w-9 px-0 relative">
                <Bell className="h-4 w-4" />
                <Badge className="absolute -top-1 -right-1 h-4 w-4 rounded-full p-0 text-xs flex items-center justify-center bg-red-500">
                  3
                </Badge>
                <span className="sr-only">Notifications</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80">
              <DropdownMenuLabel>Notifications</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <div className="max-h-64 overflow-y-auto">
                <DropdownMenuItem className="flex-col items-start p-4">
                  <div className="font-medium">New student registration</div>
                  <div className="text-sm text-muted-foreground">John Doe has submitted application</div>
                  <div className="text-xs text-muted-foreground mt-1">2 minutes ago</div>
                </DropdownMenuItem>
                <DropdownMenuItem className="flex-col items-start p-4">
                  <div className="font-medium">Fee payment overdue</div>
                  <div className="text-sm text-muted-foreground">5 students have pending payments</div>
                  <div className="text-xs text-muted-foreground mt-1">1 hour ago</div>
                </DropdownMenuItem>
                <DropdownMenuItem className="flex-col items-start p-4">
                  <div className="font-medium">Exam results ready</div>
                  <div className="text-sm text-muted-foreground">Mid-term results are available</div>
                  <div className="text-xs text-muted-foreground mt-1">3 hours ago</div>
                </DropdownMenuItem>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Profile Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="" alt="@faculty" />
                  <AvatarFallback>
                    <User className="h-4 w-4" />
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="font-medium">Dr. Sarah Johnson</p>
                  <p className="text-xs text-muted-foreground">
                    sarah.johnson@university.edu
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>Help & Support</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout}>Log out</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}