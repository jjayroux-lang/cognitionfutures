'use client'

import { useState, useEffect } from 'react'
import { Brain, Users, FileText, Calendar, Plus, Search, Bell, User } from 'lucide-react'
import { Button } from '@/components/ui/button'
import SimpleKanban from '@/components/simple-kanban'
import { mockBoards, mockUsers } from '@/lib/mock-data'

export default function Dashboard() {
  const [activeBoard, setActiveBoard] = useState(mockBoards[0])
  const [searchQuery, setSearchQuery] = useState('')
  const [notifications, setNotifications] = useState(3)

  // Mock data for now - will be replaced with Supabase
  const stats = {
    totalProjects: 4,
    activeTasks: 12,
    completedThisWeek: 8,
    teamMembers: 3,
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
        <div className="flex h-16 items-center justify-between px-6">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Brain className="h-8 w-8 text-cf-blue-600" />
              <div>
                <h1 className="text-xl font-bold text-gray-900">CognitionFutures</h1>
                <p className="text-xs text-gray-500">Internal Platform</p>
              </div>
            </div>
            
            <div className="hidden md:flex items-center gap-6 ml-8">
              <Button variant="ghost" className="gap-2">
                <FileText className="h-4 w-4" />
                Projects
              </Button>
              <Button variant="ghost" className="gap-2">
                <Users className="h-4 w-4" />
                Team
              </Button>
              <Button variant="ghost" className="gap-2">
                <Calendar className="h-4 w-4" />
                Calendar
              </Button>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <input
                type="search"
                placeholder="Search projects, tasks, documents..."
                className="pl-10 pr-4 py-2 w-64 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-cf-blue-500 focus:border-transparent"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              {notifications > 0 && (
                <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-red-500 text-xs text-white flex items-center justify-center">
                  {notifications}
                </span>
              )}
            </Button>

            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-full bg-cf-blue-100 flex items-center justify-center">
                <User className="h-4 w-4 text-cf-blue-600" />
              </div>
              <div className="hidden md:block">
                <p className="text-sm font-medium">Jay</p>
                <p className="text-xs text-gray-500">Admin</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Stats Bar */}
      <div className="border-b bg-white">
        <div className="px-6 py-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-cf-blue-50 p-4 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Projects</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.totalProjects}</p>
                </div>
                <FileText className="h-8 w-8 text-cf-blue-500" />
              </div>
            </div>
            
            <div className="bg-cf-purple-50 p-4 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Active Tasks</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.activeTasks}</p>
                </div>
                <Calendar className="h-8 w-8 text-cf-purple-500" />
              </div>
            </div>
            
            <div className="bg-cf-green-50 p-4 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Completed This Week</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.completedThisWeek}</p>
                </div>
                <Brain className="h-8 w-8 text-cf-green-500" />
              </div>
            </div>
            
            <div className="bg-amber-50 p-4 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Team Members</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.teamMembers}</p>
                </div>
                <Users className="h-8 w-8 text-amber-500" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="px-6 py-8">
        {/* Board Tabs */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-gray-900">Project Boards</h2>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              New Board
            </Button>
          </div>
          
          <div className="flex gap-2 overflow-x-auto pb-2">
            {mockBoards.map((board) => (
              <button
                key={board.id}
                onClick={() => setActiveBoard(board)}
                className={`px-4 py-2 rounded-lg whitespace-nowrap transition-colors ${
                  activeBoard.id === board.id
                    ? 'bg-cf-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {board.name}
                <span className="ml-2 text-xs opacity-75">
                  {board.columns.reduce((acc, col) => acc + col.cards.length, 0)}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Kanban Board */}
        <div className="bg-white rounded-xl border shadow-sm p-6">
          <SimpleKanban board={activeBoard} />
        </div>

        {/* Team Section */}
        <div className="mt-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Team</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {mockUsers.map((user) => (
              <div key={user.id} className="bg-white border rounded-lg p-4 flex items-center gap-3">
                <div className={`h-10 w-10 rounded-full flex items-center justify-center ${
                  user.role === 'admin' ? 'bg-cf-blue-100' :
                  user.role === 'agent' ? 'bg-cf-purple-100' :
                  'bg-gray-100'
                }`}>
                  <span className={`font-medium ${
                    user.role === 'admin' ? 'text-cf-blue-600' :
                    user.role === 'agent' ? 'text-cf-purple-600' :
                    'text-gray-600'
                  }`}>
                    {user.name.charAt(0)}
                  </span>
                </div>
                <div className="flex-1">
                  <p className="font-medium">{user.name}</p>
                  <p className="text-sm text-gray-500 capitalize">{user.role}</p>
                </div>
                <div className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-600">
                  {user.status}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gradient-to-r from-cf-blue-50 to-cf-purple-50 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Quick Actions</h3>
            <div className="space-y-3">
              <Button variant="outline" className="w-full justify-start gap-2">
                <Plus className="h-4 w-4" />
                Create new project
              </Button>
              <Button variant="outline" className="w-full justify-start gap-2">
                <FileText className="h-4 w-4" />
                Upload documents
              </Button>
              <Button variant="outline" className="w-full justify-start gap-2">
                <Users className="h-4 w-4" />
                Invite team member
              </Button>
            </div>
          </div>
          
          <div className="bg-white border rounded-xl p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Recent Activity</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-sm">
                <div className="h-8 w-8 rounded-full bg-cf-blue-100 flex items-center justify-center">
                  <User className="h-4 w-4 text-cf-blue-600" />
                </div>
                <div>
                  <p><span className="font-medium">Jay</span> created a new card in Research</p>
                  <p className="text-gray-500">2 hours ago</p>
                </div>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <div className="h-8 w-8 rounded-full bg-cf-purple-100 flex items-center justify-center">
                  <Brain className="h-4 w-4 text-cf-purple-600" />
                </div>
                <div>
                  <p><span className="font-medium">Dao</span> completed 3 tasks</p>
                  <p className="text-gray-500">4 hours ago</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t bg-white py-6 px-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-sm text-gray-600">
            © 2024 CognitionFutures. All rights reserved.
          </div>
          <div className="flex items-center gap-6 mt-4 md:mt-0">
            <Button variant="ghost" size="sm">Privacy</Button>
            <Button variant="ghost" size="sm">Terms</Button>
            <Button variant="ghost" size="sm">Support</Button>
            <div className="text-sm text-gray-500">
              v0.1 • Built with Next.js & Supabase
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}