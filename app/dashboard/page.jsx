"use client"

import { useState, useEffect } from "react"
import {
  Mic,
  FileText,
  Headphones,
  BookOpen,
  Calendar,
  TrendingUp,
  Target,
  Award,
  Clock,
  Zap,
  ArrowRight,
  BarChart3,
  User,
  Settings,
  LogOut,
} from "lucide-react"
import Navbar from "../../components/Navbar"
import Footer from "../../components/Footer"

const Dashboard = () => {
  const [userName] = useState("Lenny") // This would come from auth context
  const [currentTime, setCurrentTime] = useState(new Date())
  const [progressData] = useState({
    overall: 6.5,
    speaking: 6.0,
    writing: 7.0,
    listening: 6.5,
    reading: 7.0,
  })

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  const modules = [
    {
      title: "Speaking Practice",
      description: "Practice with AI and get instant feedback",
      icon: Mic,
      color: "from-blue-600 to-blue-700",
      href: "/speaking",
      progress: 75,
      delay: "0",
    },
    {
      title: "Essay Feedback",
      description: "Submit essays for detailed analysis",
      icon: FileText,
      color: "from-green-600 to-green-700",
      href: "/writing",
      progress: 60,
      delay: "100",
    },
    {
      title: "Listening Test",
      description: "Improve comprehension with audio tests",
      icon: Headphones,
      color: "from-purple-600 to-purple-700",
      href: "/listening",
      progress: 80,
      delay: "200",
    },
    {
      title: "Reading Quiz",
      description: "Practice reading comprehension",
      icon: BookOpen,
      color: "from-orange-600 to-orange-700",
      href: "/reading",
      progress: 85,
      delay: "300",
    },
    {
      title: "Study Plan",
      description: "Get personalized study schedule",
      icon: Calendar,
      color: "from-indigo-600 to-indigo-700",
      href: "/planner",
      progress: 45,
      delay: "400",
    },
    {
      title: "Progress Chart",
      description: "Track your improvement over time",
      icon: TrendingUp,
      color: "from-pink-600 to-pink-700",
      href: "/profile",
      progress: 90,
      delay: "500",
    },
  ]

  const recentActivities = [
    { type: "Speaking", score: 6.5, date: "2 hours ago", icon: Mic },
    { type: "Writing", score: 7.0, date: "1 day ago", icon: FileText },
    { type: "Listening", score: 6.0, date: "2 days ago", icon: Headphones },
  ]

  const getGreeting = () => {
    const hour = currentTime.getHours()
    if (hour < 12) return "Good morning"
    if (hour < 18) return "Good afternoon"
    return "Good evening"
  }

  return (
    <div className="min-h-screen bg-gray-900">
      <Navbar />

      <div className="relative min-h-screen py-8 overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 right-20 w-64 h-64 bg-blue-500/5 rounded-full animate-float"></div>
          <div className="absolute bottom-20 left-20 w-64 h-64 bg-purple-500/5 rounded-full animate-float delay-1000"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Welcome Section */}
          <div className="mb-8 animate-fade-in-up">
            <div className="bg-gradient-to-r from-gray-800/50 to-gray-700/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700 shadow-2xl card-hover hover-glow">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                    {getGreeting()}, {userName}! 👋
                  </h1>
                  <p className="text-xl text-gray-300 mb-4">Ready to boost your IELTS score?</p>
                  <div className="flex items-center space-x-6 text-gray-400">
                    <div className="flex items-center group">
                      <Target className="h-5 w-5 mr-2 text-blue-400 group-hover:icon-fade transition-smooth" />
                      <span>Target: Band 8.0</span>
                    </div>
                    <div className="flex items-center group">
                      <Award className="h-5 w-5 mr-2 text-green-400 group-hover:icon-fade transition-smooth" />
                      <span>Current: Band {progressData.overall}</span>
                    </div>
                    <div className="flex items-center group">
                      <Clock className="h-5 w-5 mr-2 text-purple-400 group-hover:icon-fade transition-smooth" />
                      <span>{currentTime.toLocaleTimeString()}</span>
                    </div>
                  </div>
                </div>
                <div className="hidden md:block">
                  <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-4 rounded-full animate-fade-glow">
                    <Zap className="h-12 w-12 text-white animate-float" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {/* Modules Grid */}
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-white mb-6 animate-fade-in-up delay-200">Practice Modules</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {modules.map((module, index) => (
                    <div
                      key={module.title}
                      className={`group bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700 hover:border-blue-500/50 transition-smooth cursor-pointer card-hover hover-glow animate-fade-in-up`}
                      style={{ animationDelay: `${module.delay}ms` }}
                      onClick={() => (window.location.href = module.href)}
                    >
                      <div className="flex items-center mb-4">
                        <div
                          className={`bg-gradient-to-r ${module.color} p-3 rounded-lg mr-4 group-hover:animate-fade-glow transition-smooth`}
                        >
                          <module.icon className="h-6 w-6 text-white" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-white group-hover:text-blue-400 transition-smooth">
                            {module.title}
                          </h3>
                          <p className="text-gray-400 text-sm">{module.description}</p>
                        </div>
                        <ArrowRight className="h-5 w-5 text-gray-400 group-hover:text-blue-400 group-hover:translate-x-2 transition-smooth" />
                      </div>

                      {/* Progress Bar */}
                      <div className="mb-2">
                        <div className="flex justify-between text-sm text-gray-400 mb-1">
                          <span>Progress</span>
                          <span>{module.progress}%</span>
                        </div>
                        <div className="w-full bg-gray-700 rounded-full h-2">
                          <div
                            className={`bg-gradient-to-r ${module.color} h-2 rounded-full progress-fade`}
                            style={{ width: `${module.progress}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Stats */}
              <div className="animate-fade-in-up delay-600">
                <h2 className="text-2xl font-bold text-white mb-6">Quick Stats</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { label: "Speaking", score: progressData.speaking, color: "text-blue-400" },
                    { label: "Writing", score: progressData.writing, color: "text-green-400" },
                    { label: "Listening", score: progressData.listening, color: "text-purple-400" },
                    { label: "Reading", score: progressData.reading, color: "text-orange-400" },
                  ].map((stat, index) => (
                    <div
                      key={stat.label}
                      className={`bg-gray-800/50 backdrop-blur-sm rounded-lg p-4 border border-gray-700 text-center card-hover hover-glow animate-slide-in-up`}
                      style={{ animationDelay: `${600 + index * 100}ms` }}
                    >
                      <div className={`text-2xl font-bold ${stat.color} mb-1`}>{stat.score}</div>
                      <div className="text-gray-400 text-sm">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Overall Progress */}
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700 card-hover hover-glow animate-fade-in-up delay-400">
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                  <BarChart3 className="h-5 w-5 mr-2 text-blue-400 icon-fade" />
                  Overall Progress
                </h3>
                <div className="text-center mb-4">
                  <div className="text-3xl font-bold text-blue-400 mb-2 animate-fade-glow">{progressData.overall}</div>
                  <div className="text-gray-400">Current Band Score</div>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Target: 8.0</span>
                    <span className="text-green-400">+1.5 to go</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-blue-600 to-green-600 h-2 rounded-full progress-fade"
                      style={{ width: `${(progressData.overall / 8.0) * 100}%` }}
                    ></div>
                  </div>
                </div>
              </div>

              {/* Recent Activity */}
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700 card-hover hover-glow animate-fade-in-up delay-500">
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                  <Clock className="h-5 w-5 mr-2 text-purple-400 icon-fade" />
                  Recent Activity
                </h3>
                <div className="space-y-3">
                  {recentActivities.map((activity, index) => (
                    <div
                      key={index}
                      className={`flex items-center p-3 bg-gray-700/30 rounded-lg hover-lift transition-smooth animate-slide-in-right`}
                      style={{ animationDelay: `${500 + index * 100}ms` }}
                    >
                      <div className="bg-gray-700 p-2 rounded-lg mr-3">
                        <activity.icon className="h-4 w-4 text-blue-400" />
                      </div>
                      <div className="flex-1">
                        <div className="text-white text-sm font-medium">{activity.type}</div>
                        <div className="text-gray-400 text-xs">{activity.date}</div>
                      </div>
                      <div className="text-blue-400 font-semibold">{activity.score}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Actions */}
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700 card-hover hover-glow animate-fade-in-up delay-600">
                <h3 className="text-lg font-semibold text-white mb-4">Quick Actions</h3>
                <div className="space-y-3">
                  <button className="w-full flex items-center p-3 bg-blue-600/20 hover:bg-blue-600/30 rounded-lg transition-smooth hover-lift group btn-animate">
                    <User className="h-5 w-5 text-blue-400 mr-3 group-hover:icon-fade" />
                    <span className="text-white">View Profile</span>
                  </button>
                  <button className="w-full flex items-center p-3 bg-gray-700/30 hover:bg-gray-600/30 rounded-lg transition-smooth hover-lift group btn-animate">
                    <Settings className="h-5 w-5 text-gray-400 mr-3 group-hover:icon-fade" />
                    <span className="text-white">Settings</span>
                  </button>
                  <button className="w-full flex items-center p-3 bg-red-600/20 hover:bg-red-600/30 rounded-lg transition-smooth hover-lift group btn-animate">
                    <LogOut className="h-5 w-5 text-red-400 mr-3 group-hover:icon-fade" />
                    <span className="text-white">Sign Out</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default Dashboard
