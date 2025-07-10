"use client"

import React from "react"

import { useState, useRef, useEffect } from "react"
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
  RefreshCw,
  Wifi,
  WifiOff,
} from "lucide-react"
import Navbar from "../../components/Navbar"
import Footer from "../../components/Footer"

const ReadingPage = () => {
  // Backend quiz state
  const [quiz, setQuiz] = useState(null)
  const [backendAnswers, setBackendAnswers] = useState([])
  const [backendSubmitted, setBackendSubmitted] = useState(false)
  const [backendFeedback, setBackendFeedback] = useState([])
  const [backendError, setBackendError] = useState("")
  const [connectionStatus, setConnectionStatus] = useState("checking")

  // Timer and UI state
  const [timeRemaining, setTimeRemaining] = useState(60 * 60) // 60 minutes
  const [timeSpent, setTimeSpent] = useState(0)
  const [isTimerActive, setIsTimerActive] = useState(false)
  const [readingProgress, setReadingProgress] = useState(0)
  const timerRef = useRef(null)
  const passageRef = useRef(null)

  // Check backend connection and load quiz
  useEffect(() => {
    const loadQuiz = async () => {
      try {
        setConnectionStatus("connecting")
        const response = await fetch("http://localhost:8000/api/reading/practice")

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }

        const data = await response.json()

        if (!data || !data.questions || !Array.isArray(data.questions)) {
          throw new Error("Invalid reading quiz format")
        }

        setQuiz(data)
        setBackendAnswers(new Array(data.questions.length).fill(""))
        setConnectionStatus("connected")
        setBackendError("")

        // Start timer when quiz loads
        setIsTimerActive(true)
      } catch (error) {
        console.error("Failed to load reading quiz:", error)
        setBackendError(
          "Failed to load reading quiz from backend. Please check if your server is running on http://localhost:8000",
        )
        setConnectionStatus("disconnected")
      }
    }

    loadQuiz()
  }, [])

  // Timer effect
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

  // Track reading progress
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
      const response = await fetch("http://localhost:8000/api/reading/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: quiz.id,
          answers: backendAnswers,
          timeSpent: timeSpent,
          readingProgress: readingProgress,
        }),
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const result = await response.json()

      if (Array.isArray(result.feedback)) {
        setBackendFeedback(result.feedback)
      } else {
        // Fallback feedback generation
        const correct = quiz.correct || []
        const fallbackFeedback = correct.map((correctAnswer, i) => (backendAnswers[i] === correctAnswer ? "✅" : "❌"))
        setBackendFeedback(fallbackFeedback)
      }

      setConnectionStatus("connected")
    } catch (error) {
      console.error("Submission error:", error)
      setBackendError("Error submitting answers. Please check your connection.")
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

    // Reload quiz from backend
    try {
      setConnectionStatus("connecting")
      const response = await fetch("http://localhost:8000/api/reading/practice")
      const data = await response.json()

      if (data && data.questions && Array.isArray(data.questions)) {
        setQuiz(data)
        setBackendAnswers(new Array(data.questions.length).fill(""))
        setConnectionStatus("connected")
        setIsTimerActive(true)
      }
    } catch (error) {
      setBackendError("Failed to reload quiz")
      setConnectionStatus("disconnected")
    }
  }

  const testConnection = async () => {
    try {
      setConnectionStatus("connecting")
      const response = await fetch("https://ielts-backend-t6sq.onrender.com/api/reading/practice")
      if (response.ok) {
        setConnectionStatus("connected")
        setBackendError("")
      } else {
        setConnectionStatus("disconnected")
      }
    } catch (error) {
      setConnectionStatus("disconnected")
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
    return connectionStatus === "connected" ? Wifi : WifiOff
  }

  const calculateScore = () => {
    if (!backendFeedback.length) return null

    const correct = backendFeedback.filter((f) => f === "✅").length
    const total = backendFeedback.length
    const percentage = (correct / total) * 100

    let bandScore = 0
    if (percentage >= 90) bandScore = 9.0
    else if (percentage >= 80) bandScore = 8.0
    else if (percentage >= 70) bandScore = 7.0
    else if (percentage >= 60) bandScore = 6.0
    else if (percentage >= 50) bandScore = 5.0
    else if (percentage >= 40) bandScore = 4.0
    else if (percentage >= 30) bandScore = 3.0
    else bandScore = 2.0

    return { correct, total, percentage, bandScore }
  }

  const score = calculateScore()

  // Loading state
  if (connectionStatus === "checking" || connectionStatus === "connecting") {
    return (
      <div className="min-h-screen bg-gray-900">
        <Navbar />
        <div className="relative min-h-screen py-8 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-400 mx-auto mb-4"></div>
            <h2 className="text-xl font-semibold text-white mb-2">Loading Reading Quiz</h2>
            <p className="text-gray-400">Connecting to backend server...</p>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  // Error state
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
              <h2 className="text-2xl font-bold text-white mb-4">Connection Error</h2>
              <p className="text-red-300 mb-6">{backendError}</p>

              <div className="space-y-4">
                <div className="text-left bg-gray-800/50 rounded-lg p-4">
                  <h3 className="text-white font-semibold mb-2">Troubleshooting:</h3>
                  <ul className="text-gray-300 text-sm space-y-1">
                    <li>• Make sure your backend server is running on http://localhost:8000</li>
                    <li>• Check if the /api/reading/practice endpoint is available</li>
                    <li>• Verify CORS settings allow requests from this domain</li>
                  </ul>
                </div>

                <button
                  onClick={testConnection}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors duration-300 flex items-center mx-auto"
                >
                  <RefreshCw className="h-5 w-5 mr-2" />
                  Test Connection
                </button>
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
        {/* Animated Background */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 right-20 w-64 h-64 bg-orange-500/5 rounded-full animate-float"></div>
          <div className="absolute bottom-20 left-20 w-64 h-64 bg-blue-500/5 rounded-full animate-float delay-1000"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8 animate-fade-in-up">
            <div className="flex items-center justify-between mb-4">
              <button
                onClick={() => window.history.back()}
                className="flex items-center text-gray-400 hover:text-blue-400 transition-smooth mr-4 hover-lift"
              >
                <ArrowLeft className="h-5 w-5 mr-2" />
                Back to Dashboard
              </button>

              {/* Connection Status */}
              <div className="flex items-center space-x-4">
                <div className={`flex items-center ${getConnectionStatusColor()}`}>
                  {React.createElement(getConnectionIcon(), { className: "h-4 w-4 mr-2" })}
                  <span className="text-sm font-medium">
                    {connectionStatus === "connected"
                      ? "Backend Connected"
                      : connectionStatus === "disconnected"
                        ? "Backend Disconnected"
                        : "Connecting..."}
                  </span>
                </div>
                <button
                  onClick={testConnection}
                  className="text-xs bg-gray-700 hover:bg-gray-600 text-white px-3 py-1 rounded transition-colors duration-300"
                >
                  Test
                </button>
              </div>
            </div>

            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2 flex items-center">
              <BookOpen className="h-8 w-8 mr-3 text-orange-400 icon-fade" />
              IELTS Reading Practice
            </h1>
            <p className="text-gray-400">Complete the reading comprehension quiz with AI-powered backend evaluation</p>
          </div>

          {/* Timer and Progress */}
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
            {/* Reading Passage */}
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

            {/* Questions */}
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

                      {/* Feedback Display */}
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

                {/* Submit Button or Results */}
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
                    {/* Results Summary */}
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
                      </div>
                    )}

                    {/* Reset Button */}
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

                {/* Error Display */}
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
