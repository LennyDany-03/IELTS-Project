"use client"

import { useState, useEffect } from "react"
import { createBrowserClient } from "@supabase/ssr"
import { useRouter } from "next/navigation"
import { User, Target, BookOpen, Globe, Save, Loader2 } from "lucide-react"

const StudentInfoPage = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [user, setUser] = useState(null)
  const router = useRouter()

  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    phone_number: "",
    gender: "",
    date_of_birth: "",
    target_ielts_band_score: "",
    exam_date: "",
    preferred_exam_type: "",
    study_plan_preference: "",
    current_education_level: "",
    country_of_residence: "",
    preferred_study_abroad_country: "",
    skill_focus_areas: [],
    daily_study_hours: "",
  })

  const supabase = createBrowserClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      if (user) {
        setUser(user)
        // Auto-fill from Google data
        setFormData((prev) => ({
          ...prev,
          full_name: user.user_metadata?.full_name || user.user_metadata?.name || "",
          email: user.email || "",
        }))
      } else {
        router.push("/register")
      }
    }
    getUser()
  }, [])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSkillFocusChange = (skill) => {
    setFormData((prev) => ({
      ...prev,
      skill_focus_areas: prev.skill_focus_areas.includes(skill)
        ? prev.skill_focus_areas.filter((s) => s !== skill)
        : [...prev.skill_focus_areas, skill],
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const { error } = await supabase.from("studentinfo").insert([
        {
          user_id: user.id,
          ...formData,
          target_ielts_band_score: Number.parseFloat(formData.target_ielts_band_score),
          daily_study_hours: Number.parseInt(formData.daily_study_hours),
        },
      ])

      if (error) {
        console.error("Error saving student info:", error)
        alert("Error saving information. Please try again.")
      } else {
        router.push("/dashboard")
      }
    } catch (error) {
      console.error("Unexpected error:", error)
      alert("An unexpected error occurred. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-blue-400" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900/50 to-gray-900 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl shadow-2xl p-8 border border-gray-700">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full mb-4">
              <User className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">Complete Your Profile</h1>
            <p className="text-gray-400">Help us personalize your IELTS preparation journey</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Personal Information */}
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-white flex items-center">
                <User className="h-5 w-5 mr-2 text-blue-400" />
                Personal Information
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Full Name</label>
                  <input
                    type="text"
                    name="full_name"
                    value={formData.full_name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    disabled
                    className="w-full px-4 py-3 bg-gray-600/50 border border-gray-600 rounded-lg text-gray-400 cursor-not-allowed"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Phone Number</label>
                  <input
                    type="tel"
                    name="phone_number"
                    value={formData.phone_number}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Gender</label>
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Date of Birth</label>
                  <input
                    type="date"
                    name="date_of_birth"
                    value={formData.date_of_birth}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>

            {/* IELTS Preparation Details */}
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-white flex items-center">
                <Target className="h-5 w-5 mr-2 text-green-400" />
                IELTS Preparation Details
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Target IELTS Band Score</label>
                  <select
                    name="target_ielts_band_score"
                    value={formData.target_ielts_band_score}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select Target Score</option>
                    <option value="6.0">6.0</option>
                    <option value="6.5">6.5</option>
                    <option value="7.0">7.0</option>
                    <option value="7.5">7.5</option>
                    <option value="8.0">8.0</option>
                    <option value="8.5">8.5</option>
                    <option value="9.0">9.0</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Exam Date (if booked)</label>
                  <input
                    type="date"
                    name="exam_date"
                    value={formData.exam_date}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Preferred Exam Type</label>
                  <select
                    name="preferred_exam_type"
                    value={formData.preferred_exam_type}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select Exam Type</option>
                    <option value="Academic">Academic</option>
                    <option value="General Training">General Training</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Study Plan Preference</label>
                  <select
                    name="study_plan_preference"
                    value={formData.study_plan_preference}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select Study Plan</option>
                    <option value="Self-paced">Self-paced</option>
                    <option value="AI-planned schedule">AI-planned schedule</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Education & Background */}
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-white flex items-center">
                <BookOpen className="h-5 w-5 mr-2 text-purple-400" />
                Education & Background
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Current Education Level</label>
                  <select
                    name="current_education_level"
                    value={formData.current_education_level}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select Education Level</option>
                    <option value="High School">High School</option>
                    <option value="Undergraduate">Undergraduate</option>
                    <option value="Graduate">Graduate</option>
                    <option value="Working Professional">Working Professional</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Country of Residence</label>
                  <input
                    type="text"
                    name="country_of_residence"
                    value={formData.country_of_residence}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-300 mb-2">Preferred Study Abroad Country</label>
                  <input
                    type="text"
                    name="preferred_study_abroad_country"
                    value={formData.preferred_study_abroad_country}
                    onChange={handleInputChange}
                    placeholder="e.g., UK, Canada, Australia, USA"
                    className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>

            {/* Dashboard Personalization */}
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-white flex items-center">
                <Globe className="h-5 w-5 mr-2 text-orange-400" />
                Dashboard Personalization
              </h2>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-4">
                  Skill Focus Areas (select multiple)
                </label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {["Reading", "Writing", "Listening", "Speaking"].map((skill) => (
                    <label key={skill} className="flex items-center space-x-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.skill_focus_areas.includes(skill)}
                        onChange={() => handleSkillFocusChange(skill)}
                        className="w-5 h-5 text-blue-600 bg-gray-700 border-gray-600 rounded focus:ring-blue-500 focus:ring-2"
                      />
                      <span className="text-gray-300">{skill}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Daily Study Hours Available</label>
                <select
                  name="daily_study_hours"
                  value={formData.daily_study_hours}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select Study Hours</option>
                  <option value="1">1 hour</option>
                  <option value="2">2 hours</option>
                  <option value="3">3 hours</option>
                  <option value="4">4 hours</option>
                  <option value="5">5+ hours</option>
                </select>
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-6">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-4 px-6 rounded-lg transition-all duration-200 flex items-center justify-center space-x-3 shadow-lg hover:shadow-xl transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {isLoading ? (
                  <Loader2 className="h-6 w-6 animate-spin" />
                ) : (
                  <>
                    <Save className="h-6 w-6" />
                    <span>Complete Setup & Go to Dashboard</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default StudentInfoPage
