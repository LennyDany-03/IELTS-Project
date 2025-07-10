"use client"

import React from "react"

import { useState, useRef, useEffect } from "react"
import {
  Headphones,
  Play,
  Pause,
  RotateCcw,
  Clock,
  CheckCircle,
  ArrowLeft,
  Volume2,
  Award,
  Send,
  AlertTriangle,
  RefreshCw,
  Wifi,
  WifiOff,
  Target,
} from "lucide-react"
import Navbar from "../../components/Navbar"
import Footer from "../../components/Footer"

const ListeningPage = () => {
  // Backend quiz state
  const [quiz, setQuiz] = useState(null)
  const [answers, setAnswers] = useState([])
  const [submitted, setSubmitted] = useState(false)
  const [feedback, setFeedback] = useState([])
  const [backendError, setBackendError] = useState("")
  const [connectionStatus, setConnectionStatus] = useState("checking")

  // Audio state
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const audioRef = useRef(null)

  // Timer state
  const [timeRemaining, setTimeRemaining] = useState(30 * 60) // 30 minutes
  const [timeSpent, setTimeSpent] = useState(0)
  const [isTimerActive, setIsTimerActive] = useState(false)
  const timerRef = useRef(null)

  // Load quiz from backend
  useEffect(() => {
    const loadQuiz = async () => {
      try {
        setConnectionStatus("connecting")
        const response = await fetch("http://localhost:8000/api/listening/practice")

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }

        const data = await response.json()
        console.log("Fetched quiz:", data)

        if (!data || !data.questions || !Array.isArray(data.questions)) {
          throw new Error("Invalid quiz format")
        }

        setQuiz(data)
        setAnswers(new Array(data.questions.length).fill(""))
        setConnectionStatus("connected")
        setBackendError("")

        // Start timer when quiz loads
        setIsTimerActive(true)
      } catch (error) {
        console.error("Failed to load listening quiz:", error)
        setBackendError(
          "Failed to load listening quiz from backend. Please check if your server is running on http://localhost:8000",
        )
        setConnectionStatus("disconnected")
      }
    }

    loadQuiz()
  }, [])

  // Timer effect
  useEffect(() => {
    if (isTimerActive && !submitted) {
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
  }, [isTimerActive, submitted])

  const handleOptionChange = (questionIndex, optionValue) => {
    if (submitted) return

    const letter = optionValue.split(".")[0] // Extract "C" from "C. 1923"
    const newAnswers = [...answers]
    newAnswers[questionIndex] = letter
    setAnswers(newAnswers)
  }

  const handleSubmit = async () => {
    if (!quiz || submitted) return

    setSubmitted(true)
    setIsTimerActive(false)
    setBackendError("")

    try {
      const response = await fetch("http://localhost:8000/api/listening/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: quiz.id,
          answers,
          timeSpent: timeSpent,
        }),
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const result = await response.json()
      console.log("Submission result:", result)

      if (Array.isArray(result.feedback)) {
        setFeedback(result.feedback)
      } else {
        // Fallback feedback generation
        const correct = quiz.correct || []
        const fallbackFeedback = correct.map((correctAnswer, i) => (answers[i] === correctAnswer ? "✅" : "❌"))
        setFeedback(fallbackFeedback)
      }

      setConnectionStatus("connected")
    } catch (error) {
      console.error("Submission error:", error)
      setBackendError("Error submitting answers. Please check your connection.")
      setConnectionStatus("disconnected")
    }
  }

  const handleAutoSubmit = () => {
    if (!submitted) {
      handleSubmit()
    }
  }

  const togglePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause()
      } else {
        audioRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  const restartAudio = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0
      setCurrentTime(0)
    }
  }

  const resetQuiz = async () => {
    setSubmitted(false)
    setFeedback([])
    setBackendError("")
    setTimeSpent(0)
    setTimeRemaining(30 * 60)
    setIsTimerActive(false)
    setCurrentTime(0)
    setIsPlaying(false)

    // Reload quiz from backend
    try {
      setConnectionStatus("connecting")
      const response = await fetch("https://ielts-backend-t6sq.onrender.com/api/listening/practice")
      const data = await response.json()

      if (data && data.questions && Array.isArray(data.questions)) {
        setQuiz(data)
        setAnswers(new Array(data.questions.length).fill(""))
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
      const response = await fetch("http://localhost:8000/api/listening/practice")
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

  const formatAudioTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
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
    if (!feedback.length) return null

    const correct = feedback.filter((f) => f === "✅").length
    const total = feedback.length
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
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-purple-400 mx-auto mb-4"></div>
            <h2 className="text-xl font-semibold text-white mb-2">Loading Listening Quiz</h2>
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
                    <li>• Check if the /api/listening/practice endpoint is available</li>
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
          <div className="absolute top-20 right-20 w-64 h-64 bg-purple-500/5 rounded-full animate-float"></div>
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
              <Headphones className="h-8 w-8 mr-3 text-purple-400 icon-fade" />
              IELTS Listening Practice
            </h1>
            <p className="text-gray-400">Listen to the audio and answer the multiple choice questions</p>
          </div>

          {/* Timer and Progress */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-4 border border-gray-700 animate-fade-in-up delay-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Clock className="h-5 w-5 text-purple-400 mr-2 icon-fade" />
                  <span className="text-white font-medium">Time Remaining</span>
                </div>
                <div
                  className={`text-2xl font-bold ${timeRemaining < 300 ? "text-red-400" : "text-purple-400"} animate-fade-glow`}
                >
                  {formatTime(timeRemaining)}
                </div>
              </div>
            </div>

            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-4 border border-gray-700 animate-fade-in-up delay-300">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Volume2 className="h-5 w-5 text-blue-400 mr-2 icon-fade" />
                  <span className="text-white font-medium">Audio Progress</span>
                </div>
                <span className="text-blue-400 font-semibold">
                  {formatAudioTime(currentTime)} / {formatAudioTime(duration)}
                </span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2 mt-2">
                <div
                  className="bg-gradient-to-r from-purple-600 to-purple-400 h-2 rounded-full progress-fade"
                  style={{ width: `${duration ? (currentTime / duration) * 100 : 0}%` }}
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
                  {answers.filter((a) => a !== "").length}/{quiz?.questions?.length || 0}
                </span>
              </div>
            </div>
          </div>

          {/* Audio Player */}
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700 mb-8 animate-fade-in-up delay-400 card-hover hover-glow">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center">
              <Volume2 className="h-5 w-5 mr-2 text-purple-400 icon-fade" />
              Audio Player
            </h2>

            <div className="bg-gray-700/30 rounded-lg p-4">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-4">
                  <button
                    onClick={togglePlayPause}
                    className="group bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white p-3 rounded-full transition-smooth transform hover:scale-110 hover-lift"
                  >
                    {isPlaying ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6 group-hover:icon-fade" />}
                  </button>
                  <button
                    onClick={restartAudio}
                    className="group bg-gray-600 hover:bg-gray-700 text-white p-3 rounded-full transition-smooth transform hover:scale-110 hover-lift"
                  >
                    <RotateCcw className="h-6 w-6 group-hover:rotate-180 transition-smooth" />
                  </button>
                </div>
                <div className="text-gray-400 text-sm">
                  {formatAudioTime(currentTime)} / {formatAudioTime(duration)}
                </div>
              </div>

              {/* Progress Bar */}
              <div className="w-full bg-gray-600 rounded-full h-2">
                <div
                  className="bg-gradient-to-r from-purple-600 to-purple-400 h-2 rounded-full progress-fade"
                  style={{ width: `${duration ? (currentTime / duration) * 100 : 0}%` }}
                ></div>
              </div>

              <audio
                ref={audioRef}
                onTimeUpdate={(e) => setCurrentTime(e.target.currentTime)}
                onLoadedMetadata={(e) => setDuration(e.target.duration)}
                onEnded={() => setIsPlaying(false)}
                className="hidden"
              >
                {quiz?.audio_url && <source src={quiz.audio_url} type="audio/mpeg" />}
                Your browser does not support the audio element.
              </audio>
            </div>
          </div>

          {/* Questions */}
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700 mb-8 animate-fade-in-up delay-600 card-hover hover-glow">
            <h2 className="text-xl font-semibold text-white mb-6 flex items-center">
              <Target className="h-5 w-5 mr-2 text-purple-400 icon-fade" />
              Questions
            </h2>

            <div className="space-y-6">
              {quiz?.questions?.map((question, index) => (
                <div
                  key={index}
                  className="bg-gray-700/30 rounded-lg p-4 animate-slide-in-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <h3 className="text-white font-medium mb-4">
                    {index + 1}. {question.question}
                  </h3>
                  <div className="space-y-2">
                    {question.options?.map((option, optionIndex) => {
                      const optionLetter = option.split(".")[0]
                      const isSelected = answers[index] === optionLetter
                      const isCorrect = submitted && feedback[index] === "✅"
                      const isIncorrect = submitted && feedback[index] === "❌" && isSelected

                      return (
                        <label
                          key={optionIndex}
                          className={`flex items-center p-3 rounded-lg cursor-pointer transition-smooth hover-lift ${
                            isSelected && !submitted
                              ? "bg-purple-600/20 border border-purple-500"
                              : !submitted
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
                            name={`question-${index}`}
                            value={option}
                            checked={isSelected}
                            onChange={() => handleOptionChange(index, option)}
                            disabled={submitted}
                            className="sr-only"
                          />
                          <div
                            className={`w-4 h-4 rounded-full border-2 mr-3 flex items-center justify-center ${
                              isSelected ? "border-purple-400 bg-purple-400" : "border-gray-400"
                            }`}
                          >
                            {isSelected && <div className="w-2 h-2 rounded-full bg-white"></div>}
                          </div>
                          <span className="text-gray-300 flex-1">{option}</span>
                          {submitted && isCorrect && (
                            <CheckCircle className="h-5 w-5 text-green-400 ml-auto icon-fade" />
                          )}
                        </label>
                      )
                    })}
                  </div>

                  {/* Feedback Display */}
                  {submitted && feedback[index] && (
                    <div
                      className={`mt-3 p-2 rounded-lg text-sm font-medium ${
                        feedback[index] === "✅" ? "bg-green-600/20 text-green-400" : "bg-red-600/20 text-red-400"
                      }`}
                    >
                      {feedback[index] === "✅" ? "✅ Correct!" : "❌ Incorrect"}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Submit Button or Results */}
            {!submitted ? (
              <div className="mt-6 text-center">
                <button
                  onClick={handleSubmit}
                  disabled={!quiz || answers.filter((a) => a !== "").length === 0}
                  className="group bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-smooth transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center mx-auto btn-animate hover-lift"
                >
                  <Send className="h-5 w-5 mr-2 group-hover:translate-x-1 transition-smooth icon-fade" />
                  Submit Test
                </button>
                <p className="text-gray-400 text-sm mt-2">
                  Answer all questions before submitting ({answers.filter((a) => a !== "").length}/
                  {quiz?.questions?.length || 0} completed)
                </p>
              </div>
            ) : (
              <div className="mt-6 space-y-4">
                {/* Results Summary */}
                {score && (
                  <div className="bg-gray-700/30 rounded-lg p-6 text-center animate-scale-in">
                    <h2 className="text-2xl font-bold text-white mb-4">Test Results</h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                      <div className="bg-gray-600/30 rounded-lg p-3">
                        <div className="text-2xl font-bold text-purple-400 mb-1 animate-fade-glow">
                          {score.bandScore}
                        </div>
                        <div className="text-gray-400 text-sm">Band Score</div>
                      </div>
                      <div className="bg-gray-600/30 rounded-lg p-3">
                        <div className="text-2xl font-bold text-green-400 mb-1">
                          {score.correct}/{score.total}
                        </div>
                        <div className="text-gray-400 text-sm">Correct Answers</div>
                      </div>
                      <div className="bg-gray-600/30 rounded-lg p-3">
                        <div className="text-2xl font-bold text-blue-400 mb-1">{score.percentage.toFixed(0)}%</div>
                        <div className="text-gray-400 text-sm">Accuracy</div>
                      </div>
                      <div className="bg-gray-600/30 rounded-lg p-3">
                        <div className="text-2xl font-bold text-orange-400 mb-1">{formatTime(timeSpent)}</div>
                        <div className="text-gray-400 text-sm">Time Used</div>
                      </div>
                    </div>
                    <div className="flex items-center justify-center">
                      <Award className="h-6 w-6 text-yellow-400 mr-2 icon-fade" />
                      <span className="text-white">
                        {score.bandScore >= 7
                          ? "Excellent work!"
                          : score.bandScore >= 6
                            ? "Good job!"
                            : "Keep practicing!"}
                      </span>
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
                    Take Another Test
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

      <Footer />
    </div>
  )
}

export default ListeningPage
