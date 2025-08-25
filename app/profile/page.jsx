"use client"

import { useState, useEffect } from "react"
import {
  User,
  Mail,
  Calendar,
  Target,
  Award,
  Settings,
  Save,
  ArrowLeft,
  Trash2,
  Edit3,
  CheckCircle,
  AlertTriangle,
  Clock,
  BookOpen,
  Phone,
  MapPin,
  GraduationCap,
  Globe,
} from "lucide-react"
import { createBrowserClient } from "@supabase/ssr"
import Navbar from "../../components/Navbar"
import Footer from "../../components/Footer"

const ProfilePage = () => {
  const [isEditing, setIsEditing] = useState(false)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const [loading, setLoading] = useState(true)
  const [profileData, setProfileData] = useState({
    full_name: "",
    email: "",
    phone_number: "",
    gender: "",
    date_of_birth: "",
    target_ielts_band_score: 7.0,
    exam_date: "",
    preferred_exam_type: "",
    study_plan_preference: "",
    current_education_level: "",
    country_of_residence: "",
    preferred_study_abroad_country: "",
    skill_focus_areas: [],
    daily_study_hours: 2,
    created_at: "",
  })

  const supabase = createBrowserClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)

  useEffect(() => {
    loadStudentInfo()
  }, [])

  const loadStudentInfo = async () => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      if (!user) return

      const { data, error } = await supabase.from("studentinfo").select("*").eq("user_id", user.id).single()

      if (error && error.code !== "PGRST116") {
        console.error("Error loading student info:", error)
        return
      }

      if (data) {
        setProfileData(data)
      }
    } catch (error) {
      console.error("Error:", error)
    } finally {
      setLoading(false)
    }
  }

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
      title: "Profile Completed",
      description: "Completed your student information profile",
      earned: true,
      date: profileData.created_at ? new Date(profileData.created_at).toLocaleDateString() : null,
    },
    {
      title: "Target Set",
      description: "Set your IELTS target band score",
      earned: !!profileData.target_ielts_band_score,
      date: null,
    },
    {
      title: "Study Plan Ready",
      description: "Selected your study plan preference",
      earned: !!profileData.study_plan_preference,
      date: null,
    },
    { title: "Exam Scheduled", description: "Set your exam date", earned: !!profileData.exam_date, date: null },
    { title: "Perfect Score", description: "Achieve band 9 in any skill", earned: false, date: null },
    { title: "Target Achieved", description: "Reach your target band score", earned: false, date: null },
  ]

  const handleInputChange = (e) => {
    const { name, value, type } = e.target
    if (type === "checkbox") {
      const currentAreas = profileData.skill_focus_areas || []
      const updatedAreas = e.target.checked ? [...currentAreas, value] : currentAreas.filter((area) => area !== value)
      setProfileData({
        ...profileData,
        skill_focus_areas: updatedAreas,
      })
    } else {
      setProfileData({
        ...profileData,
        [name]: value,
      })
    }
  }

  const saveProfile = async () => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      if (!user) return

      const { error } = await supabase.from("studentinfo").upsert({
        ...profileData,
        user_id: user.id,
        updated_at: new Date().toISOString(),
      })

      if (error) {
        console.error("Error saving profile:", error)
        alert("Error saving profile. Please try again.")
        return
      }

      setIsEditing(false)
      alert("Profile updated successfully!")
    } catch (error) {
      console.error("Error:", error)
      alert("Error saving profile. Please try again.")
    }
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

  const skillFocusOptions = ["Speaking", "Writing", "Reading", "Listening", "Grammar", "Vocabulary", "Pronunciation"]

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    )
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
              Student Profile
            </h1>
            <p className="text-gray-400">Manage your student information and track your IELTS preparation journey</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Profile Information */}
            <div className="lg:col-span-1 space-y-6">
              {/* Basic Info */}
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700 animate-fade-in-up delay-200">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-white flex items-center">
                    <Settings className="h-5 w-5 mr-2 text-blue-400" />
                    Personal Information
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
                        name="full_name"
                        value={profileData.full_name || ""}
                        onChange={handleInputChange}
                        className="w-full p-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                      />
                    ) : (
                      <div className="p-3 bg-gray-700/30 rounded-lg text-white">
                        {profileData.full_name || "Not set"}
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
                    {isEditing ? (
                      <input
                        type="email"
                        name="email"
                        value={profileData.email || ""}
                        onChange={handleInputChange}
                        className="w-full p-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                      />
                    ) : (
                      <div className="p-3 bg-gray-700/30 rounded-lg text-white flex items-center">
                        <Mail className="h-4 w-4 mr-2 text-gray-400" />
                        {profileData.email || "Not set"}
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Phone Number</label>
                    {isEditing ? (
                      <input
                        type="tel"
                        name="phone_number"
                        value={profileData.phone_number || ""}
                        onChange={handleInputChange}
                        className="w-full p-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                      />
                    ) : (
                      <div className="p-3 bg-gray-700/30 rounded-lg text-white flex items-center">
                        <Phone className="h-4 w-4 mr-2 text-gray-400" />
                        {profileData.phone_number || "Not set"}
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Gender</label>
                    {isEditing ? (
                      <select
                        name="gender"
                        value={profileData.gender || ""}
                        onChange={handleInputChange}
                        className="w-full p-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                      >
                        <option value="">Select Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                      </select>
                    ) : (
                      <div className="p-3 bg-gray-700/30 rounded-lg text-white">{profileData.gender || "Not set"}</div>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Date of Birth</label>
                    {isEditing ? (
                      <input
                        type="date"
                        name="date_of_birth"
                        value={profileData.date_of_birth || ""}
                        onChange={handleInputChange}
                        className="w-full p-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                      />
                    ) : (
                      <div className="p-3 bg-gray-700/30 rounded-lg text-white flex items-center">
                        <Calendar className="h-4 w-4 mr-2 text-gray-400" />
                        {profileData.date_of_birth
                          ? new Date(profileData.date_of_birth).toLocaleDateString()
                          : "Not set"}
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Country of Residence</label>
                    {isEditing ? (
                      <input
                        type="text"
                        name="country_of_residence"
                        value={profileData.country_of_residence || ""}
                        onChange={handleInputChange}
                        className="w-full p-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                      />
                    ) : (
                      <div className="p-3 bg-gray-700/30 rounded-lg text-white flex items-center">
                        <MapPin className="h-4 w-4 mr-2 text-gray-400" />
                        {profileData.country_of_residence || "Not set"}
                      </div>
                    )}
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

              {/* IELTS Goals */}
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700 animate-fade-in-up delay-300">
                <h2 className="text-xl font-semibold text-white mb-4 flex items-center">
                  <Target className="h-5 w-5 mr-2 text-green-400" />
                  IELTS Goals
                </h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Target Band Score</label>
                    {isEditing ? (
                      <select
                        name="target_ielts_band_score"
                        value={profileData.target_ielts_band_score || ""}
                        onChange={handleInputChange}
                        className="w-full p-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                      >
                        <option value="">Select Target</option>
                        <option value="6.0">6.0</option>
                        <option value="6.5">6.5</option>
                        <option value="7.0">7.0</option>
                        <option value="7.5">7.5</option>
                        <option value="8.0">8.0</option>
                        <option value="8.5">8.5</option>
                        <option value="9.0">9.0</option>
                      </select>
                    ) : (
                      <div className="p-3 bg-gray-700/30 rounded-lg text-white">
                        {profileData.target_ielts_band_score || "Not set"}
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Exam Date</label>
                    {isEditing ? (
                      <input
                        type="date"
                        name="exam_date"
                        value={profileData.exam_date || ""}
                        onChange={handleInputChange}
                        className="w-full p-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                      />
                    ) : (
                      <div className="p-3 bg-gray-700/30 rounded-lg text-white">
                        {profileData.exam_date ? new Date(profileData.exam_date).toLocaleDateString() : "Not set"}
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Exam Type</label>
                    {isEditing ? (
                      <select
                        name="preferred_exam_type"
                        value={profileData.preferred_exam_type || ""}
                        onChange={handleInputChange}
                        className="w-full p-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                      >
                        <option value="">Select Type</option>
                        <option value="Academic">Academic</option>
                        <option value="General Training">General Training</option>
                      </select>
                    ) : (
                      <div className="p-3 bg-gray-700/30 rounded-lg text-white">
                        {profileData.preferred_exam_type || "Not set"}
                      </div>
                    )}
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

            {/* Study Preferences & Progress */}
            <div className="lg:col-span-2 space-y-6">
              {/* Study Preferences */}
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700 animate-fade-in-up delay-300">
                <h2 className="text-xl font-semibold text-white mb-6 flex items-center">
                  <GraduationCap className="h-5 w-5 mr-2 text-blue-400" />
                  Study Preferences
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Education Level</label>
                    {isEditing ? (
                      <select
                        name="current_education_level"
                        value={profileData.current_education_level || ""}
                        onChange={handleInputChange}
                        className="w-full p-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                      >
                        <option value="">Select Level</option>
                        <option value="High School">High School</option>
                        <option value="Undergraduate">Undergraduate</option>
                        <option value="Graduate">Graduate</option>
                        <option value="Working Professional">Working Professional</option>
                      </select>
                    ) : (
                      <div className="p-3 bg-gray-700/30 rounded-lg text-white">
                        {profileData.current_education_level || "Not set"}
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Study Plan</label>
                    {isEditing ? (
                      <select
                        name="study_plan_preference"
                        value={profileData.study_plan_preference || ""}
                        onChange={handleInputChange}
                        className="w-full p-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                      >
                        <option value="">Select Plan</option>
                        <option value="Self-paced">Self-paced</option>
                        <option value="AI-planned schedule">AI-planned schedule</option>
                      </select>
                    ) : (
                      <div className="p-3 bg-gray-700/30 rounded-lg text-white">
                        {profileData.study_plan_preference || "Not set"}
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Daily Study Hours</label>
                    {isEditing ? (
                      <select
                        name="daily_study_hours"
                        value={profileData.daily_study_hours || ""}
                        onChange={handleInputChange}
                        className="w-full p-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                      >
                        <option value="">Select Hours</option>
                        {[1, 2, 3, 4, 5, 6, 7, 8].map((hour) => (
                          <option key={hour} value={hour}>
                            {hour} hour{hour > 1 ? "s" : ""}
                          </option>
                        ))}
                      </select>
                    ) : (
                      <div className="p-3 bg-gray-700/30 rounded-lg text-white flex items-center">
                        <Clock className="h-4 w-4 mr-2 text-gray-400" />
                        {profileData.daily_study_hours
                          ? `${profileData.daily_study_hours} hour${profileData.daily_study_hours > 1 ? "s" : ""}`
                          : "Not set"}
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Study Abroad Country</label>
                    {isEditing ? (
                      <input
                        type="text"
                        name="preferred_study_abroad_country"
                        value={profileData.preferred_study_abroad_country || ""}
                        onChange={handleInputChange}
                        className="w-full p-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                      />
                    ) : (
                      <div className="p-3 bg-gray-700/30 rounded-lg text-white flex items-center">
                        <Globe className="h-4 w-4 mr-2 text-gray-400" />
                        {profileData.preferred_study_abroad_country || "Not set"}
                      </div>
                    )}
                  </div>
                </div>

                {/* Skill Focus Areas */}
                <div className="mt-6">
                  <label className="block text-sm font-medium text-gray-300 mb-3">Skill Focus Areas</label>
                  {isEditing ? (
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      {skillFocusOptions.map((skill) => (
                        <label key={skill} className="flex items-center space-x-2 text-gray-300">
                          <input
                            type="checkbox"
                            value={skill}
                            checked={(profileData.skill_focus_areas || []).includes(skill)}
                            onChange={handleInputChange}
                            className="rounded border-gray-600 text-blue-600 focus:ring-blue-500 focus:ring-offset-gray-800"
                          />
                          <span className="text-sm">{skill}</span>
                        </label>
                      ))}
                    </div>
                  ) : (
                    <div className="p-3 bg-gray-700/30 rounded-lg text-white">
                      {profileData.skill_focus_areas && profileData.skill_focus_areas.length > 0
                        ? profileData.skill_focus_areas.join(", ")
                        : "Not set"}
                    </div>
                  )}
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
