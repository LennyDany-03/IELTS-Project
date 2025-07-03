"use client"

import { useState } from "react"
import {
  Calendar,
  Target,
  Clock,
  User,
  ArrowLeft,
  RefreshCw,
  CheckCircle,
  BookOpen,
  Mic,
  FileText,
  Headphones,
  Award,
  TrendingUp,
} from "lucide-react"
import Navbar from "../../components/Navbar"
import Footer from "../../components/Footer"

const StudyPlannerPage = () => {
  const [formData, setFormData] = useState({
    targetBand: "",
    currentLevel: "",
    timeline: "",
    weakestSkill: "",
    studyHours: "",
  })
  const [studyPlan, setStudyPlan] = useState(null)
  const [isGenerating, setIsGenerating] = useState(false)

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const generatePlan = async () => {
    if (!formData.targetBand || !formData.currentLevel || !formData.timeline) {
      alert("Please fill in all required fields")
      return
    }

    setIsGenerating(true)

    // Simulate AI plan generation
    setTimeout(() => {
      const plan = {
        overview: {
          targetBand: Number.parseFloat(formData.targetBand),
          currentLevel: Number.parseFloat(formData.currentLevel),
          improvement: Number.parseFloat(formData.targetBand) - Number.parseFloat(formData.currentLevel),
          timeline: Number.parseInt(formData.timeline),
          studyHours: Number.parseInt(formData.studyHours),
        },
        weeklyPlan: generateWeeklyPlan(),
        milestones: generateMilestones(),
        recommendations: generateRecommendations(),
      }
      setStudyPlan(plan)
      setIsGenerating(false)
    }, 2000)
  }

  const generateWeeklyPlan = () => {
    const weeks = Number.parseInt(formData.timeline)
    const plan = []

    for (let week = 1; week <= Math.min(weeks, 8); week++) {
      plan.push({
        week,
        focus: getWeeklyFocus(week),
        tasks: getWeeklyTasks(week),
        goals: getWeeklyGoals(week),
      })
    }

    return plan
  }

  const getWeeklyFocus = (week) => {
    const focuses = [
      "Foundation Building",
      "Speaking Confidence",
      "Writing Structure",
      "Listening Accuracy",
      "Reading Speed",
      "Vocabulary Expansion",
      "Grammar Mastery",
      "Mock Tests & Review",
    ]
    return focuses[(week - 1) % focuses.length]
  }

  const getWeeklyTasks = (week) => {
    const taskSets = [
      [
        { skill: "Speaking", task: "Daily pronunciation practice (15 min)", icon: Mic },
        { skill: "Writing", task: "Learn essay structure basics", icon: FileText },
        { skill: "Reading", task: "Read 2 academic articles", icon: BookOpen },
        { skill: "Listening", task: "Listen to 3 TED talks", icon: Headphones },
      ],
      [
        { skill: "Speaking", task: "Record yourself speaking daily", icon: Mic },
        { skill: "Writing", task: "Write 1 Task 1 essay", icon: FileText },
        { skill: "Reading", task: "Practice skimming techniques", icon: BookOpen },
        { skill: "Listening", task: "Note-taking practice", icon: Headphones },
      ],
      [
        { skill: "Speaking", task: "Practice Part 2 topics", icon: Mic },
        { skill: "Writing", task: "Write 1 Task 2 essay", icon: FileText },
        { skill: "Reading", task: "Time-based reading practice", icon: BookOpen },
        { skill: "Listening", task: "Multiple choice questions", icon: Headphones },
      ],
    ]
    return taskSets[(week - 1) % taskSets.length]
  }

  const getWeeklyGoals = (week) => {
    const goals = [
      "Establish daily study routine",
      "Improve speaking fluency by 20%",
      "Master essay introduction structure",
      "Increase listening accuracy to 70%",
      "Read 300 words per minute",
      "Learn 50 new academic words",
      "Reduce grammar errors by 50%",
      "Complete full mock test",
    ]
    return goals[(week - 1) % goals.length]
  }

  const generateMilestones = () => {
    return [
      { week: 2, milestone: "Complete first speaking assessment", achieved: false },
      { week: 4, milestone: "Write first complete essay", achieved: false },
      { week: 6, milestone: "Achieve 75% listening accuracy", achieved: false },
      { week: 8, milestone: "Complete full practice test", achieved: false },
    ]
  }

  const generateRecommendations = () => {
    return [
      "Focus extra time on your weakest skill: " + (formData.weakestSkill || "Speaking"),
      "Practice with authentic IELTS materials daily",
      "Join online study groups for motivation",
      "Take a mock test every 2 weeks to track progress",
      "Review and analyze your mistakes regularly",
    ]
  }

  const resetForm = () => {
    setFormData({
      targetBand: "",
      currentLevel: "",
      timeline: "",
      weakestSkill: "",
      studyHours: "",
    })
    setStudyPlan(null)
  }

  const skillColors = {
    Speaking: "text-blue-400",
    Writing: "text-green-400",
    Reading: "text-orange-400",
    Listening: "text-purple-400",
  }

  return (
    <div className="min-h-screen bg-gray-900">
      <Navbar />

      <div className="relative min-h-screen py-8 overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 right-20 w-64 h-64 bg-indigo-500/5 rounded-full animate-pulse"></div>
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
              <Calendar className="h-8 w-8 mr-3 text-indigo-400" />
              Study Planner
            </h1>
            <p className="text-gray-400">Create a personalized study plan to achieve your target IELTS band score</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Input Form */}
            <div className="lg:col-span-1 animate-fade-in-up delay-200">
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700 sticky top-8">
                <h2 className="text-xl font-semibold text-white mb-6 flex items-center">
                  <User className="h-5 w-5 mr-2 text-indigo-400" />
                  Your Information
                </h2>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Target Band Score *</label>
                    <select
                      name="targetBand"
                      value={formData.targetBand}
                      onChange={handleInputChange}
                      className="w-full p-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300"
                    >
                      <option value="">Select target band</option>
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
                    <label className="block text-sm font-medium text-gray-300 mb-2">Current Level *</label>
                    <select
                      name="currentLevel"
                      value={formData.currentLevel}
                      onChange={handleInputChange}
                      className="w-full p-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300"
                    >
                      <option value="">Select current level</option>
                      <option value="4.0">4.0</option>
                      <option value="4.5">4.5</option>
                      <option value="5.0">5.0</option>
                      <option value="5.5">5.5</option>
                      <option value="6.0">6.0</option>
                      <option value="6.5">6.5</option>
                      <option value="7.0">7.0</option>
                      <option value="7.5">7.5</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Study Timeline *</label>
                    <select
                      name="timeline"
                      value={formData.timeline}
                      onChange={handleInputChange}
                      className="w-full p-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300"
                    >
                      <option value="">Select timeline</option>
                      <option value="4">4 weeks</option>
                      <option value="8">8 weeks</option>
                      <option value="12">12 weeks</option>
                      <option value="16">16 weeks</option>
                      <option value="24">24 weeks</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Weakest Skill</label>
                    <select
                      name="weakestSkill"
                      value={formData.weakestSkill}
                      onChange={handleInputChange}
                      className="w-full p-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300"
                    >
                      <option value="">Select weakest skill</option>
                      <option value="Speaking">Speaking</option>
                      <option value="Writing">Writing</option>
                      <option value="Reading">Reading</option>
                      <option value="Listening">Listening</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Daily Study Hours</label>
                    <select
                      name="studyHours"
                      value={formData.studyHours}
                      onChange={handleInputChange}
                      className="w-full p-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300"
                    >
                      <option value="">Select study hours</option>
                      <option value="1">1 hour</option>
                      <option value="2">2 hours</option>
                      <option value="3">3 hours</option>
                      <option value="4">4 hours</option>
                      <option value="5">5+ hours</option>
                    </select>
                  </div>
                </div>

                <div className="mt-6 space-y-3">
                  <button
                    onClick={generatePlan}
                    disabled={isGenerating}
                    className="w-full group bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white px-6 py-3 rounded-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                  >
                    {isGenerating ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                        Generating Plan...
                      </>
                    ) : (
                      <>
                        <Target className="h-5 w-5 mr-2 group-hover:scale-110 transition-transform duration-300" />
                        Generate Study Plan
                      </>
                    )}
                  </button>

                  <button
                    onClick={resetForm}
                    className="w-full group bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 text-white px-6 py-3 rounded-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center"
                  >
                    <RefreshCw className="h-5 w-5 mr-2 group-hover:rotate-180 transition-transform duration-300" />
                    Reset Form
                  </button>
                </div>
              </div>
            </div>

            {/* Study Plan Display */}
            <div className="lg:col-span-2 animate-fade-in-up delay-400">
              {!studyPlan && !isGenerating && (
                <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-12 border border-gray-700 text-center">
                  <Calendar className="h-16 w-16 text-gray-500 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-white mb-2">No Study Plan Yet</h3>
                  <p className="text-gray-400">
                    Fill in your information and click "Generate Study Plan" to get started
                  </p>
                </div>
              )}

              {isGenerating && (
                <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-12 border border-gray-700 text-center">
                  <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-indigo-400 mx-auto mb-4"></div>
                  <h3 className="text-xl font-semibold text-white mb-2">Creating Your Personalized Plan</h3>
                  <p className="text-gray-400">
                    Our AI is analyzing your goals and creating the perfect study schedule...
                  </p>
                </div>
              )}

              {studyPlan && (
                <div className="space-y-6">
                  {/* Plan Overview */}
                  <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
                    <h2 className="text-xl font-semibold text-white mb-4 flex items-center">
                      <TrendingUp className="h-5 w-5 mr-2 text-indigo-400" />
                      Plan Overview
                    </h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="bg-gray-700/30 rounded-lg p-4 text-center">
                        <div className="text-2xl font-bold text-indigo-400 mb-1">{studyPlan.overview.targetBand}</div>
                        <div className="text-gray-400 text-sm">Target Band</div>
                      </div>
                      <div className="bg-gray-700/30 rounded-lg p-4 text-center">
                        <div className="text-2xl font-bold text-green-400 mb-1">+{studyPlan.overview.improvement}</div>
                        <div className="text-gray-400 text-sm">Improvement</div>
                      </div>
                      <div className="bg-gray-700/30 rounded-lg p-4 text-center">
                        <div className="text-2xl font-bold text-blue-400 mb-1">{studyPlan.overview.timeline}</div>
                        <div className="text-gray-400 text-sm">Weeks</div>
                      </div>
                      <div className="bg-gray-700/30 rounded-lg p-4 text-center">
                        <div className="text-2xl font-bold text-purple-400 mb-1">{studyPlan.overview.studyHours}</div>
                        <div className="text-gray-400 text-sm">Hours/Day</div>
                      </div>
                    </div>
                  </div>

                  {/* Weekly Plan */}
                  <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
                    <h2 className="text-xl font-semibold text-white mb-6 flex items-center">
                      <Calendar className="h-5 w-5 mr-2 text-indigo-400" />
                      Weekly Study Plan
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {studyPlan.weeklyPlan.map((week, index) => (
                        <div
                          key={week.week}
                          className={`bg-gray-700/30 rounded-lg p-4 animate-slide-in-up`}
                          style={{ animationDelay: `${index * 100}ms` }}
                        >
                          <div className="flex items-center justify-between mb-3">
                            <h3 className="text-white font-medium">Week {week.week}</h3>
                            <span className="text-indigo-400 text-sm font-medium">{week.focus}</span>
                          </div>
                          <div className="space-y-2 mb-3">
                            {week.tasks.map((task, taskIndex) => (
                              <div key={taskIndex} className="flex items-center text-sm">
                                <task.icon className={`h-4 w-4 mr-2 ${skillColors[task.skill]}`} />
                                <span className="text-gray-300">{task.task}</span>
                              </div>
                            ))}
                          </div>
                          <div className="bg-gray-600/30 rounded p-2">
                            <div className="text-xs text-gray-400 mb-1">Weekly Goal:</div>
                            <div className="text-sm text-white">{week.goals}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Milestones */}
                  <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
                    <h2 className="text-xl font-semibold text-white mb-6 flex items-center">
                      <Award className="h-5 w-5 mr-2 text-indigo-400" />
                      Key Milestones
                    </h2>
                    <div className="space-y-3">
                      {studyPlan.milestones.map((milestone, index) => (
                        <div
                          key={index}
                          className={`flex items-center p-3 rounded-lg ${
                            milestone.achieved ? "bg-green-600/20 border border-green-500" : "bg-gray-700/30"
                          } animate-slide-in-left`}
                          style={{ animationDelay: `${index * 100}ms` }}
                        >
                          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-indigo-600 text-white text-sm font-medium mr-3">
                            {milestone.week}
                          </div>
                          <span className="text-gray-300 flex-1">{milestone.milestone}</span>
                          {milestone.achieved ? (
                            <CheckCircle className="h-5 w-5 text-green-400" />
                          ) : (
                            <Clock className="h-5 w-5 text-gray-400" />
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Recommendations */}
                  <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
                    <h2 className="text-xl font-semibold text-white mb-6 flex items-center">
                      <Target className="h-5 w-5 mr-2 text-indigo-400" />
                      Personalized Recommendations
                    </h2>
                    <div className="space-y-3">
                      {studyPlan.recommendations.map((recommendation, index) => (
                        <div
                          key={index}
                          className={`flex items-start p-3 bg-gray-700/30 rounded-lg animate-fade-in-up`}
                          style={{ animationDelay: `${index * 100}ms` }}
                        >
                          <CheckCircle className="h-5 w-5 text-indigo-400 mr-3 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-300">{recommendation}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default StudyPlannerPage
