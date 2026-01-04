import React, { useState, useEffect } from 'react'
import Login from './components/Login'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'
import {
  Home,
  BarChart3,
  Users,
  Settings,
  Calendar,
  FileText,
  Bell,
  Search,
  LogOut,
  User,
  Shield,
  CreditCard,
  HelpCircle
} from 'lucide-react'

const App = () => {
  const [token, setToken] = useState(localStorage.getItem("token"))
  const [user, setUser] = useState(null)
  const [sidebarOpen, setSidebarOpen] = useState(true)

  // Mock user data - replace with actual API call
  useEffect(() => {
    if (token) {
      // In real app, fetch user data with token
      setUser({
        name: "John Doe",
        email: "john@example.com",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
        role: "Administrator"
      })
    }
  }, [token])

  const handleLogout = () => {
    localStorage.removeItem("token")
    setToken('')
    setUser(null)
  }

  if (!token) {
    return <Login setToken={setToken} />
  }

  // Dashboard components
  const Sidebar = () => (
    <aside className={`bg-gradient-to-b from-gray-900 to-black text-white transition-all duration-300 ${sidebarOpen ? 'w-64' : 'w-20'} min-h-screen p-6 flex flex-col`}>
      <div className="flex items-center justify-between mb-10">
        <div className={`flex items-center gap-3 ${!sidebarOpen && 'justify-center'}`}>
          <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
            <Shield className="w-6 h-6" />
          </div>
          {sidebarOpen && <h1 className="text-xl font-bold">Dashboard</h1>}
        </div>
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 hover:bg-gray-800 rounded-lg"
        >
          <div className="w-6 h-6">
            <div className={`h-0.5 bg-white mb-1 transition-all ${sidebarOpen ? 'w-4' : 'w-3'}`}></div>
            <div className={`h-0.5 bg-white mb-1 transition-all ${sidebarOpen ? 'w-6' : 'w-4'}`}></div>
            <div className={`h-0.5 bg-white transition-all ${sidebarOpen ? 'w-4' : 'w-3'}`}></div>
          </div>
        </button>
      </div>

      <nav className="flex-1 space-y-2">
        {[
          { icon: Home, label: "Dashboard", active: true },
          { icon: BarChart3, label: "Analytics" },
          { icon: Users, label: "Team" },
          { icon: FileText, label: "Projects" },
          { icon: Calendar, label: "Calendar" },
          { icon: CreditCard, label: "Billing" },
          { icon: Settings, label: "Settings" }
        ].map((item) => (
          <button
            key={item.label}
            className={`w-full flex items-center gap-3 p-3 rounded-lg transition-all hover:bg-gray-800 ${item.active ? 'bg-gradient-to-r from-blue-600 to-purple-600' : ''}`}
          >
            <item.icon className="w-5 h-5" />
            {sidebarOpen && <span>{item.label}</span>}
          </button>
        ))}
      </nav>

      <div className="pt-6 border-t border-gray-800">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-gray-800 transition-colors"
        >
          <LogOut className="w-5 h-5" />
          {sidebarOpen && <span>Logout</span>}
        </button>
      </div>
    </aside>
  )

  const Header = () => (
    <header className="bg-white border-b border-gray-200 px-8 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4 flex-1">
          <div className="relative flex-1 max-w-2xl">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search anything..."
              className="w-full pl-10 pr-4 py-2 bg-gray-100 rounded-lg border-none focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
        </div>

        <div className="flex items-center gap-6">
          <button className="relative p-2 hover:bg-gray-100 rounded-full">
            <Bell className="w-6 h-6 text-gray-600" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>
          
          <div className="flex items-center gap-3">
            <img
              src={user?.avatar}
              alt="Profile"
              className="w-10 h-10 rounded-full border-2 border-blue-500"
            />
            <div className="hidden md:block">
              <p className="font-semibold text-gray-900">{user?.name}</p>
              <p className="text-sm text-gray-500">{user?.role}</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  )

  const StatsCard = ({ icon: Icon, title, value, change, color }) => (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between mb-4">
        <div className={`p-3 rounded-lg ${color}`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
        <span className="text-sm font-medium text-gray-500">{title}</span>
      </div>
      <div className="flex items-end justify-between">
        <h3 className="text-3xl font-bold text-gray-900">{value}</h3>
        <span className={`text-sm font-medium ${change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
          {change >= 0 ? '↑' : '↓'} {Math.abs(change)}%
        </span>
      </div>
    </div>
  )

  const RecentActivity = () => (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
      <h2 className="text-xl font-bold text-gray-900 mb-6">Recent Activity</h2>
      <div className="space-y-4">
        {[
          { user: "Alex Johnson", action: "uploaded new files", time: "2 min ago", color: "bg-blue-500" },
          { user: "Sarah Miller", action: "commented on project", time: "1 hour ago", color: "bg-green-500" },
          { user: "Mike Wilson", action: "created new task", time: "3 hours ago", color: "bg-purple-500" },
          { user: "Emma Davis", action: "updated profile", time: "5 hours ago", color: "bg-yellow-500" },
        ].map((activity, index) => (
          <div key={index} className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg transition-colors">
            <div className={`w-10 h-10 rounded-full ${activity.color} flex items-center justify-center`}>
              <User className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1">
              <p className="font-medium text-gray-900">
                <span className="font-semibold">{activity.user}</span> {activity.action}
              </p>
              <p className="text-sm text-gray-500">{activity.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )

  const QuickActions = () => (
    <div className="bg-gradient-to-br from-blue-600 to-purple-700 rounded-xl p-6 text-white">
      <h2 className="text-xl font-bold mb-6">Quick Actions</h2>
      <div className="grid grid-cols-2 gap-4">
        <button className="bg-white/10 hover:bg-white/20 p-4 rounded-lg flex flex-col items-center gap-2 transition-colors">
          <FileText className="w-6 h-6" />
          <span className="text-sm font-medium">New Report</span>
        </button>
        <button className="bg-white/10 hover:bg-white/20 p-4 rounded-lg flex flex-col items-center gap-2 transition-colors">
          <Users className="w-6 h-6" />
          <span className="text-sm font-medium">Add Team</span>
        </button>
        <button className="bg-white/10 hover:bg-white/20 p-4 rounded-lg flex flex-col items-center gap-2 transition-colors">
          <Settings className="w-6 h-6" />
          <span className="text-sm font-medium">Settings</span>
        </button>
        <button className="bg-white/10 hover:bg-white/20 p-4 rounded-lg flex flex-col items-center gap-2 transition-colors">
          <HelpCircle className="w-6 h-6" />
          <span className="text-sm font-medium">Help</span>
        </button>
      </div>
    </div>
  )

  return (
    <Router>
      <div className="flex min-h-screen bg-gray-50">
        <Sidebar />
        
        <div className="flex-1 flex flex-col overflow-hidden">
          <Header />
          
          <main className="flex-1 overflow-y-auto p-8">
            <div className="max-w-7xl mx-auto">
              {/* Welcome Section */}
              <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900">Welcome back, {user?.name}!</h1>
                <p className="text-gray-600 mt-2">Here's what's happening with your projects today.</p>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <StatsCard 
                  icon={BarChart3}
                  title="Total Revenue"
                  value="$24,580"
                  change={12.5}
                  color="bg-gradient-to-r from-green-500 to-emerald-600"
                />
                <StatsCard 
                  icon={Users}
                  title="New Users"
                  value="1,248"
                  change={8.2}
                  color="bg-gradient-to-r from-blue-500 to-cyan-600"
                />
                <StatsCard 
                  icon={FileText}
                  title="Projects"
                  value="84"
                  change={-3.1}
                  color="bg-gradient-to-r from-purple-500 to-pink-600"
                />
                <StatsCard 
                  icon={Calendar}
                  title="Tasks"
                  value="327"
                  change={24.7}
                  color="bg-gradient-to-r from-orange-500 to-red-600"
                />
              </div>

              {/* Main Content Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                  <RecentActivity />
                  <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                    <h2 className="text-xl font-bold text-gray-900 mb-6">Performance Chart</h2>
                    <div className="h-64 flex items-center justify-center bg-gradient-to-b from-gray-50 to-white rounded-lg">
                      <div className="text-center">
                        <BarChart3 className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                        <p className="text-gray-500">Chart visualization would appear here</p>
                        <p className="text-sm text-gray-400 mt-2">Integrate with your preferred charting library</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-6">
                  <QuickActions />
                  <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                    <h2 className="text-xl font-bold text-gray-900 mb-6">Upcoming Events</h2>
                    <div className="space-y-4">
                      {[
                        { title: "Team Meeting", time: "10:00 AM", color: "bg-blue-100 text-blue-800" },
                        { title: "Client Call", time: "2:30 PM", color: "bg-green-100 text-green-800" },
                        { title: "Project Review", time: "4:00 PM", color: "bg-purple-100 text-purple-800" },
                      ].map((event, index) => (
                        <div key={index} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg">
                          <div className="flex items-center gap-3">
                            <div className={`w-2 h-2 rounded-full ${event.color.split(' ')[0]}`}></div>
                            <div>
                              <p className="font-medium text-gray-900">{event.title}</p>
                              <p className="text-sm text-gray-500">{event.time}</p>
                            </div>
                          </div>
                          <button className="text-gray-400 hover:text-gray-600">
                            <Calendar className="w-5 h-5" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>

          {/* Footer */}
          <footer className="bg-white border-t border-gray-200 px-8 py-4">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between text-sm text-gray-600">
              <p>© 2024 Dashboard Pro. All rights reserved.</p>
              <div className="flex items-center gap-6 mt-4 md:mt-0">
                <button className="hover:text-gray-900">Privacy Policy</button>
                <button className="hover:text-gray-900">Terms of Service</button>
                <button className="hover:text-gray-900">Support</button>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </Router>
  )
}

export default App