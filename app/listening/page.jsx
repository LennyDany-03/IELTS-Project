"use client"

import { useState, useRef, useEffect } from "react"
import { Headphones, Play, Pause, RotateCcw, Clock, CheckCircle, ArrowLeft, Volume2, Award, Send } from "lucide-react"
import Navbar from "../../components/Navbar"
import Footer from "../../components/Footer"

const ListeningPage = () => {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [timeRemaining, setTimeRemaining] = useState(30 * 60) // 30 minutes
  const [answers, setAnswers] = useState({})
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [score, setScore] = useState(null)
  const audioRef = useRef(null)
  const timerRef = useRef(null)

  const audioSrc = "/placeholder-audio.mp3" // This would be a real audio file

  const questions = [
    {
      id: 1,
      question: "What is the main topic of the conversation?",
      options: [
        "Planning a vacation",
        "Discussing work schedules",
        "Arranging a business meeting",
        "Talking about weekend plans",
      ],
      correct: 2,
    },
    {
      id: 2,
      question: "When is the meeting scheduled to take place?",
      options: ["Monday morning", "Tuesday afternoon", "Wednesday evening", "Thursday morning"],
      correct: 1,
    },
    {
      id: 3,
      question: "How many people will attend the meeting?",
      options: ["5 people", "7 people", "9 people", "12 people"],
      correct: 1,
    },
    {
      id: 4,
      question: "What documents should participants bring?",
      options: ["Financial reports only", "Project proposals and budgets", "Marketing materials", "Employee contracts"],
      correct: 1,
    },
    {
      id: 5,
      question: "Where will the meeting be held?",
      options: ["Conference room A", "Main auditorium", "Executive boardroom", "Training center"],
      correct: 2,
    },
  ]

  useEffect(() => {
    // Start countdown timer
    timerRef.current = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          handleSubmit()
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current)
      }
    }
  }, [])

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

  const handleAnswerChange = (questionId, answerIndex) => {
    setAnswers({
      ...answers,
      [questionId]: answerIndex,
    })
  }

  const handleSubmit = () => {
    setIsSubmitted(true)
    if (timerRef.current) {
      clearInterval(timerRef.current)
    }

    // Calculate score
    let correctAnswers = 0
    questions.forEach((question) => {
      if (answers[question.id] === question.correct) {
        correctAnswers++
      }
    })

    const percentage = (correctAnswers / questions.length) * 100
    let bandScore = 0

    // IELTS band score calculation (simplified)
    if (percentage >= 90) bandScore = 9.0
    else if (percentage >= 80) bandScore = 8.0
    else if (percentage >= 70) bandScore = 7.0
    else if (percentage >= 60) bandScore = 6.0
    else if (percentage >= 50) bandScore = 5.0
    else if (percentage >= 40) bandScore = 4.0
    else bandScore = 3.0

    setScore({
      correct: correctAnswers,
      total: questions.length,
      percentage,
      bandScore,
    })
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

  return (
    <div className="min-h-screen bg-gray-900">
      <Navbar />

      <div className="relative min-h-screen py-8 overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 right-20 w-64 h-64 bg-purple-500/5 rounded-full animate-pulse"></div>
          <div className="absolute bottom-20 left-20 w-64 h-64 bg-blue-500/5 rounded-full animate-pulse delay-1000"></div>
        </div>

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
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
              <Headphones className="h-8 w-8 mr-3 text-purple-400" />
              Listening Test
            </h1>
            <p className="text-gray-400">Listen to the audio and answer the multiple choice questions</p>
          </div>

          {/* Timer */}
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-4 border border-gray-700 mb-8 animate-fade-in-up delay-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Clock className="h-5 w-5 text-purple-400 mr-2" />
                <span className="text-white font-medium">Time Remaining</span>
              </div>
              <div className={`text-2xl font-bold ${timeRemaining < 300 ? "text-red-400" : "text-purple-400"}`}>
                {formatTime(timeRemaining)}
              </div>
            </div>
          </div>

          {/* Audio Player */}
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700 mb-8 animate-fade-in-up delay-400">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center">
              <Volume2 className="h-5 w-5 mr-2 text-purple-400" />
              Audio Player
            </h2>

            <div className="bg-gray-700/30 rounded-lg p-4">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-4">
                  <button
                    onClick={togglePlayPause}
                    className="group bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white p-3 rounded-full transition-all duration-300 transform hover:scale-110"
                  >
                    {isPlaying ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6" />}
                  </button>
                  <button
                    onClick={restartAudio}
                    className="group bg-gray-600 hover:bg-gray-700 text-white p-3 rounded-full transition-all duration-300 transform hover:scale-110"
                  >
                    <RotateCcw className="h-6 w-6 group-hover:rotate-180 transition-transform duration-300" />
                  </button>
                </div>
                <div className="text-gray-400 text-sm">
                  {formatAudioTime(currentTime)} / {formatAudioTime(duration)}
                </div>
              </div>

              {/* Progress Bar */}
              <div className="w-full bg-gray-600 rounded-full h-2">
                <div
                  className="bg-gradient-to-r from-purple-600 to-purple-400 h-2 rounded-full transition-all duration-300"
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
                <source src={audioSrc} type="audio/mpeg" />
                Your browser does not support the audio element.
              </audio>
            </div>
          </div>

          {/* Questions */}
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700 mb-8 animate-fade-in-up delay-600">
            <h2 className="text-xl font-semibold text-white mb-6">Questions</h2>

            <div className="space-y-6">
              {questions.map((question, index) => (
                <div
                  key={question.id}
                  className={`bg-gray-700/30 rounded-lg p-4 animate-slide-in-up`}
                  style={{ animationDelay: `${600 + index * 100}ms` }}
                >
                  <h3 className="text-white font-medium mb-4">
                    {question.id}. {question.question}
                  </h3>
                  <div className="space-y-2">
                    {question.options.map((option, optionIndex) => (
                      <label
                        key={optionIndex}
                        className={`flex items-center p-3 rounded-lg cursor-pointer transition-all duration-300 ${
                          answers[question.id] === optionIndex
                            ? "bg-purple-600/20 border border-purple-500"
                            : "bg-gray-600/20 hover:bg-gray-600/30 border border-transparent"
                        } ${
                          isSubmitted
                            ? optionIndex === question.correct
                              ? "bg-green-600/20 border-green-500"
                              : answers[question.id] === optionIndex && optionIndex !== question.correct
                                ? "bg-red-600/20 border-red-500"
                                : ""
                            : ""
                        }`}
                      >
                        <input
                          type="radio"
                          name={`question-${question.id}`}
                          value={optionIndex}
                          checked={answers[question.id] === optionIndex}
                          onChange={() => handleAnswerChange(question.id, optionIndex)}
                          disabled={isSubmitted}
                          className="sr-only"
                        />
                        <div
                          className={`w-4 h-4 rounded-full border-2 mr-3 flex items-center justify-center ${
                            answers[question.id] === optionIndex ? "border-purple-400 bg-purple-400" : "border-gray-400"
                          }`}
                        >
                          {answers[question.id] === optionIndex && (
                            <div className="w-2 h-2 rounded-full bg-white"></div>
                          )}
                        </div>
                        <span className="text-gray-300">{option}</span>
                        {isSubmitted && optionIndex === question.correct && (
                          <CheckCircle className="h-5 w-5 text-green-400 ml-auto" />
                        )}
                      </label>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Submit Button or Results */}
          {!isSubmitted ? (
            <div className="text-center animate-fade-in-up delay-800">
              <button
                onClick={handleSubmit}
                disabled={Object.keys(answers).length !== questions.length}
                className="group bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center mx-auto"
              >
                <Send className="h-5 w-5 mr-2 group-hover:translate-x-1 transition-transform duration-300" />
                Submit Test
              </button>
              <p className="text-gray-400 text-sm mt-2">
                Answer all questions before submitting ({Object.keys(answers).length}/{questions.length} completed)
              </p>
            </div>
          ) : (
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700 text-center animate-fade-in-up delay-800">
              <h2 className="text-2xl font-bold text-white mb-4">Test Results</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div className="bg-gray-700/30 rounded-lg p-4">
                  <div className="text-2xl font-bold text-purple-400 mb-2">{score?.bandScore}</div>
                  <div className="text-gray-400">Band Score</div>
                </div>
                <div className="bg-gray-700/30 rounded-lg p-4">
                  <div className="text-2xl font-bold text-green-400 mb-2">
                    {score?.correct}/{score?.total}
                  </div>
                  <div className="text-gray-400">Correct Answers</div>
                </div>
                <div className="bg-gray-700/30 rounded-lg p-4">
                  <div className="text-2xl font-bold text-blue-400 mb-2">{score?.percentage.toFixed(0)}%</div>
                  <div className="text-gray-400">Accuracy</div>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <Award className="h-6 w-6 text-yellow-400 mr-2" />
                <span className="text-white">
                  {score?.bandScore >= 7 ? "Excellent work!" : score?.bandScore >= 6 ? "Good job!" : "Keep practicing!"}
                </span>
              </div>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default ListeningPage
