"use client"

import React from "react"
import { useState, useRef, useEffect } from "react"
import { createBrowserClient } from "@supabase/ssr"
import {
  BookOpen,
  Clock,
  CheckCircle,
  ArrowLeft,
  Send,
  Eye,
  Target,
  AlertTriangle,
  FileText,
  RotateCcw,
  Save,
} from "lucide-react"
import Navbar from "../../components/Navbar"
import Footer from "../../components/Footer"

const mockReadingQuiz = {
  id: "reading-practice-1",
  title: "Climate Change and Urban Planning",
  passage: `Climate change is one of the most pressing challenges of our time, and its effects are particularly pronounced in urban areas. Cities, which house more than half of the world's population, are both major contributors to greenhouse gas emissions and vulnerable to climate-related risks such as extreme heat, flooding, and air pollution.

Urban planning plays a crucial role in addressing these challenges. Traditional city designs, with their emphasis on car-dependent transportation and energy-intensive buildings, have contributed significantly to carbon emissions. However, innovative urban planning approaches are emerging that prioritize sustainability and resilience.

Green infrastructure is becoming increasingly important in modern urban planning. This includes the integration of parks, green roofs, urban forests, and sustainable drainage systems. These features not only help to mitigate climate change by absorbing carbon dioxide and reducing urban heat islands, but they also improve air quality and provide recreational spaces for residents.

Another key aspect of climate-conscious urban planning is the promotion of sustainable transportation. Cities are investing in public transit systems, cycling infrastructure, and pedestrian-friendly designs to reduce reliance on private vehicles. Some cities have implemented congestion pricing schemes to discourage car use in city centers, while others have created car-free zones to prioritize walking and cycling.

Energy efficiency in buildings is also a critical component of sustainable urban development. New construction standards require buildings to meet strict energy performance criteria, while retrofit programs help existing buildings reduce their energy consumption. The integration of renewable energy sources, such as solar panels on rooftops, is becoming more common in urban areas.

The concept of the "15-minute city" has gained popularity among urban planners. This approach aims to ensure that residents can access most of their daily needs – work, education, healthcare, shopping, and recreation – within a 15-minute walk or bike ride from their homes. This reduces the need for long commutes and helps create more livable, sustainable communities.`,
  questions: [
    {
      question: "According to the passage, cities are:",
      options: [
        "A. Only vulnerable to climate-related risks",
        "B. Both contributors to emissions and vulnerable to climate risks",
        "C. Primarily responsible for solving climate change",
        "D. Not significantly affected by climate change",
      ],
    },
    {
      question: "Green infrastructure includes all of the following EXCEPT:",
      options: [
        "A. Parks and urban forests",
        "B. Green roofs",
        "C. Sustainable drainage systems",
        "D. Congestion pricing schemes",
      ],
    },
    {
      question: "The '15-minute city' concept aims to:",
      options: [
        "A. Reduce building energy consumption",
        "B. Increase public transportation usage",
        "C. Allow residents to access daily needs within walking distance",
        "D. Implement car-free zones throughout the city",
      ],
    },
    {
      question: "Which of the following is mentioned as a way to discourage car use?",
      options: [
        "A. Building more parking spaces",
        "B. Congestion pricing schemes",
        "C. Increasing fuel subsidies",
        "D. Expanding highway networks",
      ],
    },
    {
      question: "According to the passage, green infrastructure helps with:",
      options: [
        "A. Only carbon dioxide absorption",
        "B. Only air quality improvement",
        "C. Carbon absorption, heat reduction, air quality, and recreation",
        "D. Only providing recreational spaces",
      ],
    },
  ],
  correct: ["B", "D", "C", "B", "C"],
  difficulty_level: "intermediate",
  duration_minutes: 60,
}

const ReadingPage = () => {
  const [supabase] = useState(() =>
    createBrowserClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY),
  )
  const [user, setUser] = useState(null)
  const [studentProfile, setStudentProfile] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)

  const [quiz, setQuiz] = useState(null)
  const [backendAnswers, setBackendAnswers] = useState([])
  const [backendSubmitted, setBackendSubmitted] = useState(false)
  const [backendFeedback, setBackendFeedback] = useState([])
  const [backendError, setBackendError] = useState("")
  const [connectionStatus, setConnectionStatus] = useState("connected") // Always show connected since we're using Supabase

  const [timeRemaining, setTimeRemaining] = useState(60 * 60) // 60 minutes
  const [timeSpent, setTimeSpent] = useState(0)
  const [isTimerActive, setIsTimerActive] = useState(false)
  const [readingProgress, setReadingProgress] = useState(0)
  const timerRef = useRef(null)
  const passageRef = useRef(null)

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser()

        if (!user) {
          window.location.href = "/auth"
          return
        }

        setUser(user)

        const { data: profile, error } = await supabase.from("studentinfo").select("*").eq("user_id", user.id).single()

        if (error) {
          console.error("Error fetching student profile:", error)
          setBackendError("Please complete your student profile first")
          return
        }

        setStudentProfile(profile)
        setIsLoading(false)
      } catch (error) {
        console.error("Authentication error:", error)
        setBackendError("Authentication error")
        setIsLoading(false)
      }
    }

    checkAuth()
  }, [supabase])

  useEffect(() => {
    const loadQuiz = async () => {
      if (!studentProfile) return

      try {
        setConnectionStatus("connecting")

        const { data: quizData, error } = await supabase.from("reading_quizzes").select("*").limit(1).single()

        if (error) {
          console.error("Error fetching quiz:", error)
          setQuiz(mockReadingQuiz)
          setBackendAnswers(new Array(mockReadingQuiz.questions.length).fill(""))
        } else {
          setQuiz(quizData)
          setBackendAnswers(new Array(quizData.questions.length).fill(""))
        }

        setConnectionStatus("connected")
        setBackendError("")
        setIsTimerActive(true)
      } catch (error) {
        console.error("Failed to load reading quiz:", error)
        setBackendError("Failed to load reading quiz")
        setConnectionStatus("disconnected")

        setQuiz(mockReadingQuiz)
        setBackendAnswers(new Array(mockReadingQuiz.questions.length).fill(""))
      }
    }

    loadQuiz()
  }, [studentProfile, supabase])

  useEffect(() => {
    if (isTimerActive && !backendSubmitted) {
      timerRef.current = setInterval(() => {
        setTimeSpent((prev) => prev + 1)
        setTimeRemaining((prev) => {
          if (prev <= 1) {
            handleAutoSubmit()
            return 0
          }
          return prev - 1
        })
      }, 1000)
    } else {
      if (timerRef.current) {
        clearInterval(timerRef.current)
      }
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current)
      }
    }
  }, [isTimerActive, backendSubmitted])

  useEffect(() => {
    const handleScroll = () => {
      if (passageRef.current) {
        const { scrollTop, scrollHeight, clientHeight } = passageRef.current
        const progress = (scrollTop / (scrollHeight - clientHeight)) * 100
        setReadingProgress(Math.min(progress, 100))
      }
    }

    const passageElement = passageRef.current
    if (passageElement) {
      passageElement.addEventListener("scroll", handleScroll)
      return () => passageElement.removeEventListener("scroll", handleScroll)
    }
  }, [quiz])

  const handleOptionChange = (questionIndex, optionValue) => {
    if (backendSubmitted) return

    const letter = optionValue.split(".")[0]
    const newAnswers = [...backendAnswers]
    newAnswers[questionIndex] = letter
    setBackendAnswers(newAnswers)
  }

  const handleSubmit = async () => {
    if (!quiz || backendSubmitted) return

    setBackendSubmitted(true)
    setIsTimerActive(false)
    setBackendError("")

    try {
      const correct = quiz.correct || []
      const feedback = correct.map((correctAnswer, i) => (backendAnswers[i] === correctAnswer ? "✅" : "❌"))

      setBackendFeedback(feedback)
      setConnectionStatus("connected")
    } catch (error) {
      console.error("Submission error:", error)
      setBackendError("Error processing answers")
      setConnectionStatus("disconnected")
    }
  }

  const handleAutoSubmit = () => {
    if (!backendSubmitted) {
      handleSubmit()
    }
  }

  const resetQuiz = async () => {
    setBackendSubmitted(false)
    setBackendFeedback([])
    setBackendError("")
    setTimeSpent(0)
    setTimeRemaining(60 * 60)
    setReadingProgress(0)
    setIsTimerActive(false)

    try {
      const { data: quizData, error } = await supabase.from("reading_quizzes").select("*").limit(1).single()

      if (error || !quizData) {
        setQuiz(mockReadingQuiz)
        setBackendAnswers(new Array(mockReadingQuiz.questions.length).fill(""))
      } else {
        setQuiz(quizData)
        setBackendAnswers(new Array(quizData.questions.length).fill(""))
      }
    } catch (error) {
      setQuiz(mockReadingQuiz)
      setBackendAnswers(new Array(mockReadingQuiz.questions.length).fill(""))
    }

    setConnectionStatus("connected")
    setIsTimerActive(true)
  }

  const saveResult = async () => {
    if (!studentProfile || !quiz || !backendSubmitted) return

    setIsSaving(true)

    try {
      const score = calculateScore()
      if (!score) {
        throw new Error("No score calculated")
      }

      const { data, error } = await supabase.from("reading_results").insert({
        student_id: studentProfile.id,
        quiz_id: quiz.id,
        passage_title: quiz.title,
        user_answers: JSON.stringify(backendAnswers),
        correct_answers: score.correct,
        total_questions: score.total,
        score_percentage: score.percentage,
        band_score: score.bandScore,
        time_spent_minutes: Math.ceil(timeSpent / 60),
        reading_progress: Math.round(readingProgress),
      })

      if (error) {
        throw error
      }

      alert("Results saved successfully!")
    } catch (error) {
      console.error("Save error:", error)
      alert(`Save failed: ${error.message}`)
    } finally {
      setIsSaving(false)
    }
  }

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  const getConnectionStatusColor = () => {
    switch (connectionStatus) {
      case "connected":
        return "text-green-400"
      case "disconnected":
        return "text-red-400"
      case "connecting":
        return "text-yellow-400"
      default:
        return "text-gray-400"
    }
  }

  const getConnectionIcon = () => {
    return connectionStatus === "connected" ? Save : AlertTriangle
  }

  const calculateScore = () => {
    if (!backendFeedback.length) return null

    const correct = backendFeedback.filter((f) => f === "✅").length
    const total = backendFeedback.length
    const percentage = (correct / total) * 100

    let bandScore = 0
    if (correct >= 39) bandScore = 9.0
    else if (correct >= 37) bandScore = 8.5
    else if (correct >= 35) bandScore = 8.0
    else if (correct >= 32) bandScore = 7.5
    else if (correct >= 30) bandScore = 7.0
    else if (correct >= 26) bandScore = 6.5
    else if (correct >= 23) bandScore = 6.0
    else if (correct >= 18) bandScore = 5.5
    else if (correct >= 16) bandScore = 5.0
    else if (correct >= 13) bandScore = 4.5
    else if (correct >= 10) bandScore = 4.0
    else if (correct >= 7) bandScore = 3.5
    else if (correct >= 5) bandScore = 3.0
    else if (correct >= 3) bandScore = 2.5
    else bandScore = 2.0

    return { correct, total, percentage, bandScore }
  }

  const score = calculateScore()

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-900">
        <Navbar />
        <div className="relative min-h-screen py-8 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-400 mx-auto mb-4"></div>
            <h2 className="text-xl font-semibold text-white mb-2">Loading...</h2>
            <p className="text-gray-400">Checking authentication...</p>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  if (backendError && !quiz) {
    return (
      <div className="min-h-screen bg-gray-900">
        <Navbar />
        <div className="relative min-h-screen py-8">
          <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-8">
              <button
                onClick={() => window.history.back()}
                className="flex items-center text-gray-400 hover:text-blue-400 transition-colors duration-300 mb-4"
              >
                <ArrowLeft className="h-5 w-5 mr-2" />
                Back to Dashboard
              </button>
            </div>

            <div className="bg-red-900/20 border border-red-500/50 rounded-xl p-8 text-center">
              <AlertTriangle className="h-16 w-16 text-red-400 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-white mb-4">Loading Error</h2>
              <p className="text-red-300 mb-6">{backendError}</p>

              <div className="space-y-4">
                <div className="text-left bg-gray-800/50 rounded-lg p-4">
                  <h3 className="text-white font-semibold mb-2">Troubleshooting:</h3>
                  <ul className="text-gray-300 text-sm space-y-1">
                    <li>• Make sure your Supabase connection is working</li>
                    <li>• Check if the reading_quizzes table has data</li>
                    <li>• Verify your student profile is complete</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-900">
      <Navbar />

      <div className="relative min-h-screen py-8 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 right-20 w-64 h-64 bg-orange-500/5 rounded-full animate-float"></div>
          <div className="absolute bottom-20 left-20 w-64 h-64 bg-blue-500/5 rounded-full animate-float delay-1000"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8 animate-fade-in-up">
            <div className="flex items-center justify-between mb-4">
              <button
                onClick={() => window.history.back()}
                className="flex items-center text-gray-400 hover:text-blue-400 transition-smooth mr-4 hover-lift"
              >
                <ArrowLeft className="h-5 w-5 mr-2" />
                Back to Dashboard
              </button>

              <div className="flex items-center space-x-4">
                <div className={`flex items-center ${getConnectionStatusColor()}`}>
                  {React.createElement(getConnectionIcon(), { className: "h-4 w-4 mr-2" })}
                  <span className="text-sm font-medium">
                    {connectionStatus === "connected"
                      ? "Database Connected"
                      : connectionStatus === "disconnected"
                        ? "Database Disconnected"
                        : "Connecting..."}
                  </span>
                </div>
              </div>
            </div>

            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2 flex items-center">
              <BookOpen className="h-8 w-8 mr-3 text-orange-400 icon-fade" />
              IELTS Reading Practice
            </h1>
            <p className="text-gray-400">Complete the reading comprehension quiz with database-powered evaluation</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-4 border border-gray-700 animate-fade-in-up delay-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Clock className="h-5 w-5 text-orange-400 mr-2 icon-fade" />
                  <span className="text-white font-medium">Time Remaining</span>
                </div>
                <div
                  className={`text-2xl font-bold ${timeRemaining < 600 ? "text-red-400" : "text-orange-400"} animate-fade-glow`}
                >
                  {formatTime(timeRemaining)}
                </div>
              </div>
            </div>

            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-4 border border-gray-700 animate-fade-in-up delay-300">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Eye className="h-5 w-5 text-blue-400 mr-2 icon-fade" />
                  <span className="text-white font-medium">Progress</span>
                </div>
                <span className="text-blue-400 font-semibold">{Math.round(readingProgress)}%</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2 mt-2">
                <div
                  className="bg-gradient-to-r from-blue-600 to-blue-400 h-2 rounded-full progress-fade"
                  style={{ width: `${readingProgress}%` }}
                ></div>
              </div>
            </div>

            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-4 border border-gray-700 animate-fade-in-up delay-400">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Target className="h-5 w-5 text-green-400 mr-2 icon-fade" />
                  <span className="text-white font-medium">Questions</span>
                </div>
                <span className="text-green-400 font-semibold">
                  {backendAnswers.filter((a) => a !== "").length}/{quiz?.questions?.length || 0}
                </span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="animate-fade-in-up delay-400">
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700 sticky top-8 card-hover hover-glow">
                <h2 className="text-xl font-semibold text-white mb-4 flex items-center">
                  <FileText className="h-5 w-5 mr-2 text-orange-400 icon-fade" />
                  Reading Passage
                </h2>

                <div ref={passageRef} className="bg-gray-700/30 rounded-lg p-6 max-h-96 overflow-y-auto">
                  {quiz?.passage ? (
                    <div className="text-gray-300 leading-relaxed space-y-4 text-justify">
                      {quiz.passage.split("\n\n").map((paragraph, index) => (
                        <p key={index} className="animate-fade-in-up" style={{ animationDelay: `${index * 100}ms` }}>
                          {paragraph}
                        </p>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <FileText className="h-12 w-12 text-gray-500 mx-auto mb-4" />
                      <p className="text-gray-400">Loading passage...</p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="animate-fade-in-up delay-600">
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700 card-hover hover-glow">
                <h2 className="text-xl font-semibold text-white mb-6 flex items-center">
                  <Target className="h-5 w-5 mr-2 text-orange-400 icon-fade" />
                  Questions
                </h2>

                <div className="space-y-6 max-h-96 overflow-y-auto">
                  {quiz?.questions?.map((question, questionIndex) => (
                    <div
                      key={questionIndex}
                      className="bg-gray-700/30 rounded-lg p-4 animate-slide-in-up"
                      style={{ animationDelay: `${questionIndex * 100}ms` }}
                    >
                      <h3 className="text-white font-medium mb-4">
                        {questionIndex + 1}. {question.question}
                      </h3>

                      <div className="space-y-2">
                        {question.options?.map((option, optionIndex) => {
                          const optionLetter = option.split(".")[0]
                          const isSelected = backendAnswers[questionIndex] === optionLetter
                          const isCorrect = backendSubmitted && backendFeedback[questionIndex] === "✅"
                          const isIncorrect = backendSubmitted && backendFeedback[questionIndex] === "❌" && isSelected

                          return (
                            <label
                              key={optionIndex}
                              className={`flex items-center p-3 rounded-lg cursor-pointer transition-smooth hover-lift ${
                                isSelected && !backendSubmitted
                                  ? "bg-orange-600/20 border border-orange-500"
                                  : !backendSubmitted
                                    ? "bg-gray-600/20 hover:bg-gray-600/30 border border-transparent"
                                    : isCorrect
                                      ? "bg-green-600/20 border border-green-500"
                                      : isIncorrect
                                        ? "bg-red-600/20 border border-red-500"
                                        : "bg-gray-600/20 border border-transparent"
                              }`}
                            >
                              <input
                                type="radio"
                                name={`question-${questionIndex}`}
                                value={option}
                                checked={isSelected}
                                onChange={() => handleOptionChange(questionIndex, option)}
                                disabled={backendSubmitted}
                                className="sr-only"
                              />
                              <div
                                className={`w-4 h-4 rounded-full border-2 mr-3 flex items-center justify-center ${
                                  isSelected ? "border-orange-400 bg-orange-400" : "border-gray-400"
                                }`}
                              >
                                {isSelected && <div className="w-2 h-2 rounded-full bg-white"></div>}
                              </div>
                              <span className="text-gray-300 flex-1">{option}</span>
                              {backendSubmitted && isCorrect && (
                                <CheckCircle className="h-5 w-5 text-green-400 ml-auto icon-fade" />
                              )}
                            </label>
                          )
                        })}
                      </div>

                      {backendSubmitted && backendFeedback[questionIndex] && (
                        <div
                          className={`mt-3 p-2 rounded-lg text-sm font-medium ${
                            backendFeedback[questionIndex] === "✅"
                              ? "bg-green-600/20 text-green-400"
                              : "bg-red-600/20 text-red-400"
                          }`}
                        >
                          {backendFeedback[questionIndex] === "✅" ? "✅ Correct!" : "❌ Incorrect"}
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                {!backendSubmitted ? (
                  <div className="mt-6 text-center">
                    <button
                      onClick={handleSubmit}
                      disabled={!quiz || backendAnswers.filter((a) => a !== "").length === 0}
                      className="group bg-gradient-to-r from-orange-600 to-orange-700 hover:from-orange-700 hover:to-orange-800 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-smooth transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center mx-auto btn-animate hover-lift"
                    >
                      <Send className="h-5 w-5 mr-2 group-hover:translate-x-1 transition-smooth icon-fade" />
                      Submit Quiz
                    </button>
                    <p className="text-gray-400 text-sm mt-2">
                      Answered: {backendAnswers.filter((a) => a !== "").length}/{quiz?.questions?.length || 0} questions
                    </p>
                  </div>
                ) : (
                  <div className="mt-6 space-y-4">
                    {score && (
                      <div className="bg-gray-700/30 rounded-lg p-6 text-center animate-scale-in">
                        <h3 className="text-xl font-bold text-white mb-4">Quiz Results</h3>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                          <div className="bg-gray-600/30 rounded-lg p-3">
                            <div className="text-2xl font-bold text-orange-400 mb-1 animate-fade-glow">
                              {score.bandScore}
                            </div>
                            <div className="text-gray-400 text-sm">Band Score</div>
                          </div>
                          <div className="bg-gray-600/30 rounded-lg p-3">
                            <div className="text-2xl font-bold text-green-400 mb-1">
                              {score.correct}/{score.total}
                            </div>
                            <div className="text-gray-400 text-sm">Correct</div>
                          </div>
                          <div className="bg-gray-600/30 rounded-lg p-3">
                            <div className="text-2xl font-bold text-blue-400 mb-1">{score.percentage.toFixed(0)}%</div>
                            <div className="text-gray-400 text-sm">Accuracy</div>
                          </div>
                          <div className="bg-gray-600/30 rounded-lg p-3">
                            <div className="text-2xl font-bold text-purple-400 mb-1">{formatTime(timeSpent)}</div>
                            <div className="text-gray-400 text-sm">Time Used</div>
                          </div>
                        </div>

                        <div className="flex justify-center space-x-4 mt-4">
                          <button
                            onClick={saveResult}
                            disabled={isSaving}
                            className="group bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white px-6 py-3 rounded-lg transition-smooth hover-lift flex items-center btn-animate disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            <Save className="h-5 w-5 mr-2 group-hover:scale-110 transition-smooth icon-fade" />
                            {isSaving ? "Saving..." : "Save Result"}
                          </button>
                        </div>
                      </div>
                    )}

                    <div className="text-center">
                      <button
                        onClick={resetQuiz}
                        className="group bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-6 py-3 rounded-lg transition-smooth hover-lift flex items-center mx-auto btn-animate"
                      >
                        <RotateCcw className="h-5 w-5 mr-2 group-hover:rotate-180 transition-smooth" />
                        Take Another Quiz
                      </button>
                    </div>
                  </div>
                )}

                {backendError && (
                  <div className="mt-4 bg-red-900/20 border border-red-500/50 rounded-lg p-4 animate-fade-in">
                    <div className="flex items-start">
                      <AlertTriangle className="h-5 w-5 text-red-400 mr-2 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-red-400 font-medium">Error</p>
                        <p className="text-red-300 text-sm mt-1">{backendError}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default ReadingPage
