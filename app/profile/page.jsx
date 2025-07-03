"use client"

import { useState } from "react"
import {
  User,
  Mail,
  Calendar,
  Target,
  Award,
  TrendingUp,
  Settings,
  Save,
  ArrowLeft,
  Trash2,
  Edit3,
  CheckCircle,
  AlertTriangle,
  BarChart3,
  Clock,
  BookOpen,
} from "lucide-react"
import Navbar from "../../components/Navbar"
import Footer from "../../components/Footer"

const ProfilePage = () => {
  const [isEditing, setIsEditing] = useState(false)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const [profileData, setProfileData] = useState({
    fullName: "Lenny Johnson",
    email: "lenny.johnson@email.com",
    joinDate: "2024-01-15",
    targetBand: 8.0,
    currentBand: 6.5,
    studyStreak: 15,
    totalStudyHours: 45,
    testsCompleted: 12,
  })

  const [progressData] = useState({
    overall: [
      { date: "Week 1", score: 5.5 },
      { date: "Week 2", score: 5.8 },
      { date: "Week 3", score: 6.0 },
      { date: "Week 4", score: 6.2 },
      { date: "Week 5", score: 6.5 },
    ],
    skills: {
      speaking: 6.0,
      writing: 7.0,
      reading: 6.5,
      listening: 6.5,
    },
    recentTests: [
      { type: "Speaking", score: 6.0, date: "2024-01-20", improvement: "+0.5" },
      { type: "Writing", score: 7.0, date: "2024-01-18", improvement: "+0.3" },
      { type: "Reading", score: 6.5, date: "2024-01-16", improvement: "+0.2" },
      { type: "Listening", score: 6.5, date: "2024-01-14", improvement: "+0.4" },
    ],
  })

  const achievements = [
    {
      title: "First Test Completed",
      description: "Completed your first practice test",
      earned: true,
      date: "2024-01-15",
    },
    { title: "Week Warrior", description: "Studied for 7 consecutive days", earned: true, date: "2024-01-22" },
    { title: "Speaking Star", description: "Achieved band 6+ in speaking", earned: true, date: "2024-01-20" },
    { title: "Writing Wizard", description: "Achieved band 7+ in writing", earned: true, date: "2024-01-18" },
    { title: "Perfect Score", description: "Achieve band 9 in any skill", earned: false, date: null },
    { title: "Target Achieved", description: "Reach your target band score", earned: false, date: null },
  ]

  const handleInputChange = (e) => {
    setProfileData({
      ...profileData,
      [e.target.name]: e.target.value,
    })
  }

  const saveProfile = () => {
    setIsEditing(false)
    // Save to database
    console.log("Saving profile data:", profileData)
    alert("Profile updated successfully!")
  }

  const deleteAccount = () => {
    // Delete account logic
    console.log("Deleting account...")
    alert("Account deletion initiated. You will receive a confirmation email.")
    setShowDeleteConfirm(false)
  }

  const skillColors = {
    speaking: "text-blue-400",
    writing: "text-green-400",
    reading: "text-orange-400",
    listening: "text-purple-400",
  }

  const skillIcons = {
    Speaking: BookOpen,
    Writing: Edit3,
    Reading: BookOpen,
    Listening: BookOpen,
  }

  return (
    <div className="min-h-screen bg-gray-900">
      <Navbar />

      <div className="relative min-h-screen py-8 overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 right-20 w-64 h-64 bg-blue-500/5 rounded-full animate-pulse"></div>
          <div className="absolute bottom-20 left-20 w-64 h-64 bg-purple-500/5 rounded-full animate-pulse delay-1000"></div>
        </div>

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8 animate-fade-in-up">
            <div className="flex items-center mb-4">
              <button
                onClick={() => window.history.back()}
                className="flex items-center text-gray-400 hover:text-blue-400 transition-colors duration-300 mr-4"
              >
                <ArrowLeft className="h-5 w-5 mr-2" />
                Back to Dashboard
              </button>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2 flex items-center">
              <User className="h-8 w-8 mr-3 text-blue-400" />
              Profile & Progress
            </h1>
            <p className="text-gray-400">Manage your account and track your IELTS preparation journey</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Profile Information */}
            <div className="lg:col-span-1 space-y-6">
              {/* Basic Info */}
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700 animate-fade-in-up delay-200">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-white flex items-center">
                    <Settings className="h-5 w-5 mr-2 text-blue-400" />
                    Profile Information
                  </h2>
                  <button
                    onClick={() => setIsEditing(!isEditing)}
                    className="text-blue-400 hover:text-blue-300 transition-colors duration-300"
                  >
                    <Edit3 className="h-5 w-5" />
                  </button>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Full Name</label>
                    {isEditing ? (
                      <input
                        type="text"
                        name="fullName"
                        value={profileData.fullName}
                        onChange={handleInputChange}
                        className="w-full p-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                      />
                    ) : (
                      <div className="p-3 bg-gray-700/30 rounded-lg text-white">{profileData.fullName}</div>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
                    {isEditing ? (
                      <input
                        type="email"
                        name="email"
                        value={profileData.email}
                        onChange={handleInputChange}
                        className="w-full p-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                      />
                    ) : (
                      <div className="p-3 bg-gray-700/30 rounded-lg text-white flex items-center">
                        <Mail className="h-4 w-4 mr-2 text-gray-400" />
                        {profileData.email}
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Target Band Score</label>
                    {isEditing ? (
                      <select
                        name="targetBand"
                        value={profileData.targetBand}
                        onChange={handleInputChange}
                        className="w-full p-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                      >
                        <option value="6.0">6.0</option>
                        <option value="6.5">6.5</option>
                        <option value="7.0">7.0</option>
                        <option value="7.5">7.5</option>
                        <option value="8.0">8.0</option>
                        <option value="8.5">8.5</option>
                        <option value="9.0">9.0</option>
                      </select>
                    ) : (
                      <div className="p-3 bg-gray-700/30 rounded-lg text-white flex items-center">
                        <Target className="h-4 w-4 mr-2 text-green-400" />
                        {profileData.targetBand}
                      </div>
                    )}
                  </div>

                  <div className="flex items-center text-sm text-gray-400">
                    <Calendar className="h-4 w-4 mr-2" />
                    Joined {new Date(profileData.joinDate).toLocaleDateString()}
                  </div>
                </div>

                {isEditing && (
                  <div className="mt-6 flex space-x-3">
                    <button
                      onClick={saveProfile}
                      className="flex-1 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white px-4 py-2 rounded-lg transition-all duration-300 flex items-center justify-center"
                    >
                      <Save className="h-4 w-4 mr-2" />
                      Save
                    </button>
                    <button
                      onClick={() => setIsEditing(false)}
                      className="flex-1 bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 text-white px-4 py-2 rounded-lg transition-all duration-300"
                    >
                      Cancel
                    </button>
                  </div>
                )}
              </div>

              {/* Quick Stats */}
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700 animate-fade-in-up delay-400">
                <h2 className="text-xl font-semibold text-white mb-4 flex items-center">
                  <BarChart3 className="h-5 w-5 mr-2 text-blue-400" />
                  Quick Stats
                </h2>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-700/30 rounded-lg p-3 text-center">
                    <div className="text-2xl font-bold text-blue-400 mb-1">{profileData.studyStreak}</div>
                    <div className="text-gray-400 text-xs">Day Streak</div>
                  </div>
                  <div className="bg-gray-700/30 rounded-lg p-3 text-center">
                    <div className="text-2xl font-bold text-green-400 mb-1">{profileData.totalStudyHours}</div>
                    <div className="text-gray-400 text-xs">Study Hours</div>
                  </div>
                  <div className="bg-gray-700/30 rounded-lg p-3 text-center">
                    <div className="text-2xl font-bold text-purple-400 mb-1">{profileData.testsCompleted}</div>
                    <div className="text-gray-400 text-xs">Tests Done</div>
                  </div>
                  <div className="bg-gray-700/30 rounded-lg p-3 text-center">
                    <div className="text-2xl font-bold text-orange-400 mb-1">{profileData.currentBand}</div>
                    <div className="text-gray-400 text-xs">Current Band</div>
                  </div>
                </div>
              </div>

              {/* Danger Zone */}
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-red-700/50 animate-fade-in-up delay-600">
                <h2 className="text-xl font-semibold text-red-400 mb-4 flex items-center">
                  <AlertTriangle className="h-5 w-5 mr-2" />
                  Danger Zone
                </h2>
                <p className="text-gray-400 text-sm mb-4">
                  Once you delete your account, there is no going back. Please be certain.
                </p>
                <button
                  onClick={() => setShowDeleteConfirm(true)}
                  className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-4 py-2 rounded-lg transition-all duration-300 flex items-center justify-center"
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete Account
                </button>
              </div>
            </div>

            {/* Progress & Achievements */}
            <div className="lg:col-span-2 space-y-6">
              {/* Progress Chart */}
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700 animate-fade-in-up delay-300">
                <h2 className="text-xl font-semibold text-white mb-6 flex items-center">
                  <TrendingUp className="h-5 w-5 mr-2 text-green-400" />
                  Progress Over Time
                </h2>
                <div className="h-64 bg-gray-700/30 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <BarChart3 className="h-12 w-12 text-gray-500 mx-auto mb-2" />
                    <p className="text-gray-400">Progress chart would be displayed here</p>
                    <p className="text-gray-500 text-sm">Integration with Chart.js or Recharts</p>
                  </div>
                </div>
              </div>

              {/* Skills Breakdown */}
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700 animate-fade-in-up delay-400">
                <h2 className="text-xl font-semibold text-white mb-6">Current Skill Levels</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {Object.entries(progressData.skills).map(([skill, score]) => (
                    <div key={skill} className="bg-gray-700/30 rounded-lg p-4 text-center">
                      <div className={`text-2xl font-bold ${skillColors[skill]} mb-2`}>{score}</div>
                      <div className="text-gray-400 text-sm capitalize">{skill}</div>
                      <div className="w-full bg-gray-600 rounded-full h-2 mt-2">
                        <div
                          className={`bg-gradient-to-r ${
                            skill === "speaking"
                              ? "from-blue-600 to-blue-400"
                              : skill === "writing"
                                ? "from-green-600 to-green-400"
                                : skill === "reading"
                                  ? "from-orange-600 to-orange-400"
                                  : "from-purple-600 to-purple-400"
                          } h-2 rounded-full transition-all duration-1000`}
                          style={{ width: `${(score / 9) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recent Tests */}
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700 animate-fade-in-up delay-500">
                <h2 className="text-xl font-semibold text-white mb-6 flex items-center">
                  <Clock className="h-5 w-5 mr-2 text-blue-400" />
                  Recent Test Results
                </h2>
                <div className="space-y-3">
                  {progressData.recentTests.map((test, index) => {
                    const IconComponent = skillIcons[test.type] || BookOpen
                    return (
                      <div
                        key={index}
                        className={`flex items-center justify-between p-4 bg-gray-700/30 rounded-lg animate-slide-in-right`}
                        style={{ animationDelay: `${index * 100}ms` }}
                      >
                        <div className="flex items-center">
                          <IconComponent className={`h-5 w-5 mr-3 ${skillColors[test.type.toLowerCase()]}`} />
                          <div>
                            <div className="text-white font-medium">{test.type}</div>
                            <div className="text-gray-400 text-sm">{test.date}</div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-white font-semibold">{test.score}</div>
                          <div className="text-green-400 text-sm">{test.improvement}</div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* Achievements */}
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700 animate-fade-in-up delay-600">
                <h2 className="text-xl font-semibold text-white mb-6 flex items-center">
                  <Award className="h-5 w-5 mr-2 text-yellow-400" />
                  Achievements
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {achievements.map((achievement, index) => (
                    <div
                      key={index}
                      className={`p-4 rounded-lg border transition-all duration-300 ${
                        achievement.earned
                          ? "bg-yellow-600/20 border-yellow-500/50"
                          : "bg-gray-700/30 border-gray-600 opacity-60"
                      } animate-fade-in-up`}
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <div className="flex items-center mb-2">
                        {achievement.earned ? (
                          <CheckCircle className="h-5 w-5 text-yellow-400 mr-2" />
                        ) : (
                          <div className="w-5 h-5 border-2 border-gray-500 rounded-full mr-2"></div>
                        )}
                        <h3 className="text-white font-medium">{achievement.title}</h3>
                      </div>
                      <p className="text-gray-400 text-sm mb-2">{achievement.description}</p>
                      {achievement.earned && achievement.date && (
                        <p className="text-yellow-400 text-xs">Earned on {achievement.date}</p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 animate-fade-in">
          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 max-w-md w-full mx-4 animate-slide-in-up">
            <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
              <AlertTriangle className="h-6 w-6 text-red-400 mr-2" />
              Confirm Account Deletion
            </h3>
            <p className="text-gray-300 mb-6">
              Are you absolutely sure you want to delete your account? This action cannot be undone and you will lose
              all your progress, test results, and study plans.
            </p>
            <div className="flex space-x-3">
              <button
                onClick={deleteAccount}
                className="flex-1 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-4 py-2 rounded-lg transition-all duration-300"
              >
                Yes, Delete Account
              </button>
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="flex-1 bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 text-white px-4 py-2 rounded-lg transition-all duration-300"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  )
}

export default ProfilePage
