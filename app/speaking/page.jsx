"use client"

import { useState, useRef, useEffect } from "react"
import {
  Mic,
  Play,
  Pause,
  Square,
  RotateCcw,
  Save,
  Volume2,
  Clock,
  Award,
  CheckCircle,
  AlertCircle,
  ArrowLeft,
  Zap,
} from "lucide-react"
import Navbar from "../../components/Navbar"
import Footer from "../../components/Footer"

const SpeakingPage = () => {
  const [isRecording, setIsRecording] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [recordingTime, setRecordingTime] = useState(0)
  const [audioBlob, setAudioBlob] = useState(null)
  const [transcript, setTranscript] = useState("")
  const [feedback, setFeedback] = useState(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [currentTopic, setCurrentTopic] = useState({
    title: "Describe a memorable journey you have taken",
    description:
      "You should say: Where you went, Who you went with, What you did there, And explain why it was memorable",
    timeLimit: 120, // 2 minutes
  })

  const mediaRecorderRef = useRef(null)
  const audioRef = useRef(null)
  const timerRef = useRef(null)

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current)
      }
    }
  }, [])

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      const mediaRecorder = new MediaRecorder(stream)
      mediaRecorderRef.current = mediaRecorder

      const chunks = []
      mediaRecorder.ondataavailable = (event) => {
        chunks.push(event.data)
      }

      mediaRecorder.onstop = () => {
        const blob = new Blob(chunks, { type: "audio/wav" })
        setAudioBlob(blob)
        stream.getTracks().forEach((track) => track.stop())
      }

      mediaRecorder.start()
      setIsRecording(true)
      setRecordingTime(0)

      timerRef.current = setInterval(() => {
        setRecordingTime((prev) => {
          if (prev >= currentTopic.timeLimit) {
            stopRecording()
            return prev
          }
          return prev + 1
        })
      }, 1000)
    } catch (error) {
      console.error("Error accessing microphone:", error)
    }
  }

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop()
      setIsRecording(false)
      if (timerRef.current) {
        clearInterval(timerRef.current)
      }
    }
  }

  const playRecording = () => {
    if (audioBlob && audioRef.current) {
      const audioUrl = URL.createObjectURL(audioBlob)
      audioRef.current.src = audioUrl
      audioRef.current.play()
      setIsPlaying(true)
    }
  }

  const pauseRecording = () => {
    if (audioRef.current) {
      audioRef.current.pause()
      setIsPlaying(false)
    }
  }

  const resetRecording = () => {
    setAudioBlob(null)
    setTranscript("")
    setFeedback(null)
    setRecordingTime(0)
    setIsPlaying(false)
    if (audioRef.current) {
      audioRef.current.src = ""
    }
  }

  const analyzeRecording = async () => {
    if (!audioBlob) return

    setIsAnalyzing(true)

    // Simulate AI analysis
    setTimeout(() => {
      setTranscript(
        "I went to Japan last year with my family. It was an amazing experience because we visited many beautiful places like Tokyo and Kyoto. The temples were incredible and the food was delicious. What made it most memorable was spending quality time with my loved ones and experiencing a completely different culture.",
      )

      setFeedback({
        overallScore: 6.5,
        pronunciation: {
          score: 6.0,
          feedback: "Generally clear pronunciation with some minor issues with word stress.",
          suggestions: ["Practice stress patterns in multi-syllable words", "Work on intonation for questions"],
        },
        fluency: {
          score: 7.0,
          feedback: "Good flow with minimal hesitation. Natural pace maintained throughout.",
          suggestions: [
            "Continue practicing to maintain consistency",
            "Use more linking words for smoother transitions",
          ],
        },
        vocabulary: {
          score: 6.5,
          feedback: "Appropriate vocabulary range with some good descriptive words.",
          suggestions: ["Expand descriptive adjectives", "Use more varied expressions for emotions"],
        },
        grammar: {
          score: 6.5,
          feedback: "Mostly accurate with good use of past tense. Some minor errors.",
          suggestions: ["Review past perfect tense usage", "Practice complex sentence structures"],
        },
      })

      setIsAnalyzing(false)
    }, 3000)
  }

  const saveResult = () => {
    // Save to Supabase
    console.log("Saving result to database...")
    alert("Result saved successfully!")
  }

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  return (
    <div className="min-h-screen bg-gray-900">
      <Navbar />

      <div className="relative min-h-screen py-8 overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 right-20 w-64 h-64 bg-blue-500/5 rounded-full animate-float"></div>
          <div className="absolute bottom-20 left-20 w-64 h-64 bg-purple-500/5 rounded-full animate-float delay-1000"></div>
        </div>

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8 animate-fade-in-up">
            <div className="flex items-center mb-4">
              <button
                onClick={() => window.history.back()}
                className="flex items-center text-gray-400 hover:text-blue-400 transition-smooth mr-4 hover-lift"
              >
                <ArrowLeft className="h-5 w-5 mr-2" />
                Back to Dashboard
              </button>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2 flex items-center">
              <Mic className="h-8 w-8 mr-3 text-blue-400 icon-fade" />
              Speaking Practice
            </h1>
            <p className="text-gray-400">Practice speaking and get AI-powered feedback on your performance</p>
          </div>

          {/* Topic Card */}
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700 mb-8 card-hover hover-glow animate-fade-in-up delay-200">
            <h2 className="text-xl font-semibold text-white mb-3 flex items-center">
              <Volume2 className="h-5 w-5 mr-2 text-blue-400 icon-fade" />
              Speaking Topic
            </h2>
            <div className="bg-gray-700/30 rounded-lg p-4">
              <h3 className="text-lg font-medium text-blue-400 mb-2">{currentTopic.title}</h3>
              <p className="text-gray-300 mb-3">{currentTopic.description}</p>
              <div className="flex items-center text-sm text-gray-400">
                <Clock className="h-4 w-4 mr-1 icon-fade" />
                Time limit: {formatTime(currentTopic.timeLimit)}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Recording Section */}
            <div className="animate-fade-in-up delay-400">
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700 card-hover hover-glow">
                <h2 className="text-xl font-semibold text-white mb-6">Recording</h2>

                {/* Timer */}
                <div className="text-center mb-6">
                  <div className="text-4xl font-bold text-blue-400 mb-2 animate-fade-glow">
                    {formatTime(recordingTime)}
                  </div>
                  <div className="text-gray-400">
                    {isRecording ? "Recording..." : audioBlob ? "Recording complete" : "Ready to record"}
                  </div>
                </div>

                {/* Recording Controls */}
                <div className="flex justify-center space-x-4 mb-6">
                  {!isRecording && !audioBlob && (
                    <button
                      onClick={startRecording}
                      className="group bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white p-4 rounded-full transition-smooth hover-lift shadow-lg hover:shadow-red-500/25 btn-animate animate-breathing"
                    >
                      <Mic className="h-8 w-8 group-hover:icon-fade" />
                    </button>
                  )}

                  {isRecording && (
                    <button
                      onClick={stopRecording}
                      className="group bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 text-white p-4 rounded-full transition-smooth hover-lift btn-animate"
                    >
                      <Square className="h-8 w-8" />
                    </button>
                  )}

                  {audioBlob && !isRecording && (
                    <>
                      <button
                        onClick={isPlaying ? pauseRecording : playRecording}
                        className="group bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white p-4 rounded-full transition-smooth hover-lift btn-animate"
                      >
                        {isPlaying ? <Pause className="h-8 w-8" /> : <Play className="h-8 w-8 group-hover:icon-fade" />}
                      </button>
                      <button
                        onClick={resetRecording}
                        className="group bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white p-4 rounded-full transition-smooth hover-lift btn-animate"
                      >
                        <RotateCcw className="h-8 w-8 group-hover:rotate-180 transition-smooth" />
                      </button>
                    </>
                  )}
                </div>

                {/* Analyze Button */}
                {audioBlob && !feedback && (
                  <div className="text-center">
                    <button
                      onClick={analyzeRecording}
                      disabled={isAnalyzing}
                      className="group bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white px-6 py-3 rounded-lg transition-smooth hover-lift disabled:opacity-50 disabled:cursor-not-allowed flex items-center mx-auto btn-animate"
                    >
                      {isAnalyzing ? (
                        <>
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                          Analyzing...
                        </>
                      ) : (
                        <>
                          <Zap className="h-5 w-5 mr-2 group-hover:icon-fade" />
                          Analyze Recording
                        </>
                      )}
                    </button>
                  </div>
                )}

                <audio ref={audioRef} onEnded={() => setIsPlaying(false)} className="hidden" />
              </div>
            </div>

            {/* Results Section */}
            <div className="animate-fade-in-up delay-600">
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700 card-hover hover-glow">
                <h2 className="text-xl font-semibold text-white mb-6">Analysis Results</h2>

                {!feedback && !isAnalyzing && (
                  <div className="text-center py-12">
                    <AlertCircle className="h-12 w-12 text-gray-500 mx-auto mb-4 animate-float" />
                    <p className="text-gray-400">Record your speech and click analyze to see results</p>
                  </div>
                )}

                {isAnalyzing && (
                  <div className="text-center py-12">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-400 mx-auto mb-4"></div>
                    <p className="text-gray-400">Analyzing your speech...</p>
                  </div>
                )}

                {feedback && (
                  <div className="space-y-6 animate-scale-in">
                    {/* Overall Score */}
                    <div className="text-center bg-gray-700/30 rounded-lg p-4 animate-fade-glow">
                      <div className="text-3xl font-bold text-blue-400 mb-2">{feedback.overallScore}</div>
                      <div className="text-gray-400">Overall Band Score</div>
                    </div>

                    {/* Detailed Scores */}
                    <div className="space-y-4">
                      {Object.entries(feedback)
                        .filter(([key]) => key !== "overallScore")
                        .map(([category, data], index) => (
                          <div
                            key={category}
                            className="bg-gray-700/30 rounded-lg p-4 card-hover animate-slide-in-up"
                            style={{ animationDelay: `${index * 100}ms` }}
                          >
                            <div className="flex items-center justify-between mb-2">
                              <h3 className="text-white font-medium capitalize">{category}</h3>
                              <div className="flex items-center">
                                <Award className="h-4 w-4 text-yellow-400 mr-1 icon-fade" />
                                <span className="text-blue-400 font-semibold">{data.score}</span>
                              </div>
                            </div>
                            <p className="text-gray-300 text-sm mb-3">{data.feedback}</p>
                            <div className="space-y-1">
                              {data.suggestions.map((suggestion, index) => (
                                <div key={index} className="flex items-start text-sm text-gray-400">
                                  <CheckCircle className="h-4 w-4 text-green-400 mr-2 mt-0.5 flex-shrink-0 icon-fade" />
                                  {suggestion}
                                </div>
                              ))}
                            </div>
                          </div>
                        ))}
                    </div>

                    {/* Transcript */}
                    {transcript && (
                      <div className="bg-gray-700/30 rounded-lg p-4 card-hover">
                        <h3 className="text-white font-medium mb-2">Transcript</h3>
                        <p className="text-gray-300 text-sm leading-relaxed">{transcript}</p>
                      </div>
                    )}

                    {/* Save Button */}
                    <div className="text-center">
                      <button
                        onClick={saveResult}
                        className="group bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white px-6 py-3 rounded-lg transition-smooth hover-lift flex items-center mx-auto btn-animate"
                      >
                        <Save className="h-5 w-5 mr-2 group-hover:icon-fade" />
                        Save Result
                      </button>
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

export default SpeakingPage
