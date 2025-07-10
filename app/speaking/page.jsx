"use client"

import { useState, useRef, useEffect } from "react"
import * as SpeechSDK from "microsoft-cognitiveservices-speech-sdk"
import ReactMarkdown from "react-markdown"
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
  AlertCircle,
  ArrowLeft,
  Zap,
  Settings,
} from "lucide-react"
import Navbar from "../../components/Navbar"
import Footer from "../../components/Footer"

const SpeakingPage = () => {
  const [isRecording, setIsRecording] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [recordingTime, setRecordingTime] = useState(0)
  const [transcript, setTranscript] = useState("")
  const [feedback, setFeedback] = useState("")
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [error, setError] = useState("")
  const [audioBlob, setAudioBlob] = useState(null)
  const [backendStatus, setBackendStatus] = useState("checking")
  const [currentTopic, setCurrentTopic] = useState({
    title: "Describe a memorable journey you have taken",
    description:
      "You should say: Where you went, Who you went with, What you did there, And explain why it was memorable",
    timeLimit: 120, // 2 minutes
  })

  const recognizerRef = useRef(null)
  const audioRef = useRef(null)
  const timerRef = useRef(null)
  const mediaRecorderRef = useRef(null)

  // Azure Speech SDK configuration
  const speechKey = process.env.NEXT_PUBLIC_AZURE_SPEECH_KEY
  const speechRegion = process.env.NEXT_PUBLIC_AZURE_SPEECH_REGION

  useEffect(() => {
    checkBackendStatus()
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current)
      }
      if (recognizerRef.current) {
        recognizerRef.current.close()
      }
    }
  }, [])

  const checkBackendStatus = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/speech/evaluate-transcript", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      })
      setBackendStatus(response.ok ? "connected" : "disconnected")
    } catch (error) {
      setBackendStatus("disconnected")
    }
  }

  const startRecording = async () => {
    setTranscript("")
    setFeedback("")
    setError("")
    setIsRecording(true)
    setRecordingTime(0)

    if (!speechKey || !speechRegion) {
      setIsRecording(false)
      setError("Azure Speech configuration missing. Please check your .env.local file.")
      return
    }

    try {
      // Start audio recording for playback
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

      // Configure Azure Speech SDK
      const speechConfig = SpeechSDK.SpeechConfig.fromSubscription(speechKey, speechRegion)
      speechConfig.speechRecognitionLanguage = "en-US"
      speechConfig.enableDictation()

      const audioConfig = SpeechSDK.AudioConfig.fromDefaultMicrophoneInput()
      const recognizer = new SpeechSDK.SpeechRecognizer(speechConfig, audioConfig)
      recognizerRef.current = recognizer

      let fullTranscript = ""

      // Handle continuous recognition
      recognizer.recognizing = (s, e) => {
        // Real-time partial results (optional)
      }

      recognizer.recognized = (s, e) => {
        if (e.result.reason === SpeechSDK.ResultReason.RecognizedSpeech) {
          fullTranscript += e.result.text + " "
          setTranscript(fullTranscript.trim())
        }
      }

      recognizer.canceled = (s, e) => {
        setIsRecording(false)
        if (e.reason === SpeechSDK.CancellationReason.Error) {
          setError(`Speech recognition error: ${e.errorDetails}`)
        }
        recognizer.stopContinuousRecognitionAsync()
      }

      recognizer.sessionStopped = (s, e) => {
        setIsRecording(false)
        recognizer.stopContinuousRecognitionAsync()
      }

      // Start continuous recognition
      recognizer.startContinuousRecognitionAsync()

      // Start timer
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
      setIsRecording(false)
      setError(`Error starting recording: ${error.message}`)
    }
  }

  const stopRecording = () => {
    setIsRecording(false)

    if (timerRef.current) {
      clearInterval(timerRef.current)
    }

    if (mediaRecorderRef.current && mediaRecorderRef.current.state === "recording") {
      mediaRecorderRef.current.stop()
    }

    if (recognizerRef.current) {
      recognizerRef.current.stopContinuousRecognitionAsync(
        () => {
          recognizerRef.current.close()
          recognizerRef.current = null
        },
        (err) => {
          setError(`Error stopping recognition: ${err}`)
          recognizerRef.current.close()
          recognizerRef.current = null
        },
      )
    }

    // Auto-analyze if we have transcript
    if (transcript.trim()) {
      setTimeout(() => analyzeTranscript(), 1000)
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
    setFeedback("")
    setRecordingTime(0)
    setIsPlaying(false)
    setError("")
    if (audioRef.current) {
      audioRef.current.src = ""
    }
  }

  const analyzeTranscript = async () => {
    if (!transcript.trim()) {
      setError("No transcript available for analysis")
      return
    }

    setIsAnalyzing(true)
    setFeedback("")
    setError("")

    try {
      const response = await fetch("http://localhost:8000/api/speech/evaluate-transcript", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ transcript: transcript.trim() }),
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      setFeedback(data.feedback || "No feedback received")
    } catch (error) {
      setError(`Analysis failed: ${error.message}. Make sure your backend server is running on http://localhost:8000`)
    } finally {
      setIsAnalyzing(false)
    }
  }

  const saveResult = async () => {
    if (!transcript || !feedback) {
      setError("No data to save")
      return
    }

    try {
      // Here you would typically save to your database
      console.log("Saving result:", { transcript, feedback, recordingTime })
      alert("Result saved successfully!")
    } catch (error) {
      setError(`Save failed: ${error.message}`)
    }
  }

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "connected":
        return "text-green-400"
      case "disconnected":
        return "text-red-400"
      default:
        return "text-yellow-400"
    }
  }

  const getStatusText = (status) => {
    switch (status) {
      case "connected":
        return "Backend Connected"
      case "disconnected":
        return "Backend Disconnected"
      default:
        return "Checking Backend..."
    }
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

              {/* Backend Status */}
              <div className="flex items-center space-x-2">
                <div className={`flex items-center ${getStatusColor(backendStatus)}`}>
                  <div
                    className={`w-2 h-2 rounded-full mr-2 ${
                      backendStatus === "connected"
                        ? "bg-green-400"
                        : backendStatus === "disconnected"
                          ? "bg-red-400"
                          : "bg-yellow-400"
                    }`}
                  ></div>
                  <span className="text-sm">{getStatusText(backendStatus)}</span>
                </div>
                <button onClick={checkBackendStatus} className="text-gray-400 hover:text-blue-400 transition-smooth">
                  <Settings className="h-4 w-4" />
                </button>
              </div>
            </div>

            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2 flex items-center">
              <Mic className="h-8 w-8 mr-3 text-blue-400 icon-fade" />
              Speaking Practice
            </h1>
            <p className="text-gray-400">Practice speaking with Azure Speech Recognition and get AI-powered feedback</p>
          </div>

          {/* Azure Configuration Check */}
          {(!speechKey || !speechRegion) && (
            <div className="bg-red-900/20 border border-red-500/50 rounded-2xl p-4 mb-8 animate-fade-in-up">
              <div className="flex items-center">
                <AlertCircle className="h-5 w-5 text-red-400 mr-2" />
                <span className="text-red-400 font-medium">Azure Speech SDK not configured</span>
              </div>
              <p className="text-red-300 text-sm mt-2">
                Please add NEXT_PUBLIC_AZURE_SPEECH_KEY and NEXT_PUBLIC_AZURE_SPEECH_REGION to your .env.local file
              </p>
            </div>
          )}

          {/* Topic Card */}
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700 mb-8 card-hover hover-glow animate-fade-in-up delay-200">
            <h2 className="text-xl font-semibold text-white mb-3 flex items-center">
              <Volume2 className="h-5 w-5 mr-2 text-blue-400 icon-fade" />
              Speaking Topic
            </h2>
            <div className="bg-gray-700/30 rounded-xl p-4">
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
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700 card-hover hover-glow">
                <h2 className="text-xl font-semibold text-white mb-6">Recording & Recognition</h2>

                {/* Timer */}
                <div className="text-center mb-6">
                  <div className="text-4xl font-bold text-blue-400 mb-2 animate-fade-glow">
                    {formatTime(recordingTime)}
                  </div>
                  <div className="text-gray-400">
                    {isRecording ? "Recording & Recognizing..." : audioBlob ? "Recording complete" : "Ready to record"}
                  </div>
                </div>

                {/* Recording Controls */}
                <div className="flex justify-center space-x-4 mb-6">
                  {!isRecording && !audioBlob && (
                    <button
                      onClick={startRecording}
                      disabled={!speechKey || !speechRegion}
                      className="group bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white p-4 rounded-full transition-smooth hover-lift shadow-lg hover:shadow-red-500/25 btn-animate animate-breathing disabled:opacity-50 disabled:cursor-not-allowed"
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

                {/* Real-time Transcript */}
                {transcript && (
                  <div className="bg-gray-700/30 rounded-xl p-4 mb-4">
                    <h3 className="text-white font-medium mb-2 flex items-center">
                      <Volume2 className="h-4 w-4 mr-2 text-blue-400" />
                      Live Transcript
                    </h3>
                    <p className="text-gray-300 text-sm leading-relaxed whitespace-pre-line">{transcript}</p>
                  </div>
                )}

                {/* Manual Analyze Button */}
                {transcript && !isAnalyzing && !feedback && (
                  <div className="text-center">
                    <button
                      onClick={analyzeTranscript}
                      disabled={backendStatus !== "connected"}
                      className="group bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white px-6 py-3 rounded-xl transition-smooth hover-lift disabled:opacity-50 disabled:cursor-not-allowed flex items-center mx-auto btn-animate"
                    >
                      <Zap className="h-5 w-5 mr-2 group-hover:icon-fade" />
                      Analyze Speech
                    </button>
                  </div>
                )}

                <audio ref={audioRef} onEnded={() => setIsPlaying(false)} className="hidden" />
              </div>
            </div>

            {/* Analysis Results Section */}
            <div className="animate-fade-in-up delay-600">
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700 card-hover hover-glow">
                <h2 className="text-xl font-semibold text-white mb-6">AI Analysis & Feedback</h2>

                {!feedback && !isAnalyzing && !transcript && (
                  <div className="text-center py-12">
                    <AlertCircle className="h-12 w-12 text-gray-500 mx-auto mb-4 animate-float" />
                    <p className="text-gray-400">Start recording to see real-time transcript and analysis</p>
                  </div>
                )}

                {!feedback && !isAnalyzing && transcript && (
                  <div className="text-center py-12">
                    <Zap className="h-12 w-12 text-blue-400 mx-auto mb-4 animate-float" />
                    <p className="text-gray-400">Transcript ready - click "Analyze Speech" to get feedback</p>
                  </div>
                )}

                {isAnalyzing && (
                  <div className="text-center py-12">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-400 mx-auto mb-4"></div>
                    <p className="text-gray-400">Analyzing your speech with AI...</p>
                  </div>
                )}

                {feedback && (
                  <div className="space-y-6 animate-scale-in">
                    <div className="bg-gray-700/30 rounded-xl p-4">
                      <h3 className="text-white font-medium mb-3 flex items-center">
                        <Award className="h-5 w-5 mr-2 text-yellow-400" />
                        Detailed Feedback
                      </h3>
                      <div className="prose prose-invert prose-sm max-w-none text-gray-300 leading-relaxed">
                        <ReactMarkdown
                          components={{
                            h1: ({ children }) => <h1 className="text-xl font-bold text-blue-400 mb-3">{children}</h1>,
                            h2: ({ children }) => (
                              <h2 className="text-lg font-semibold text-blue-300 mb-2 mt-4">{children}</h2>
                            ),
                            h3: ({ children }) => (
                              <h3 className="text-base font-medium text-blue-200 mb-2 mt-3">{children}</h3>
                            ),
                            p: ({ children }) => <p className="text-gray-300 mb-2">{children}</p>,
                            ul: ({ children }) => (
                              <ul className="list-disc list-inside text-gray-300 mb-2 space-y-1">{children}</ul>
                            ),
                            ol: ({ children }) => (
                              <ol className="list-decimal list-inside text-gray-300 mb-2 space-y-1">{children}</ol>
                            ),
                            li: ({ children }) => <li className="text-gray-300">{children}</li>,
                            strong: ({ children }) => <strong className="text-white font-semibold">{children}</strong>,
                            em: ({ children }) => <em className="text-blue-300">{children}</em>,
                          }}
                        >
                          {feedback}
                        </ReactMarkdown>
                      </div>
                    </div>

                    {/* Save Button */}
                    <div className="text-center">
                      <button
                        onClick={saveResult}
                        className="group bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white px-6 py-3 rounded-xl transition-smooth hover-lift flex items-center mx-auto btn-animate"
                      >
                        <Save className="h-5 w-5 mr-2 group-hover:icon-fade" />
                        Save Result
                      </button>
                    </div>
                  </div>
                )}

                {/* Error Display */}
                {error && (
                  <div className="bg-red-900/20 border border-red-500/50 rounded-xl p-4 animate-fade-in">
                    <div className="flex items-start">
                      <AlertCircle className="h-5 w-5 text-red-400 mr-2 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-red-400 font-medium">Error</p>
                        <p className="text-red-300 text-sm mt-1">{error}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Troubleshooting Section */}
          {backendStatus === "disconnected" && (
            <div className="mt-8 bg-yellow-900/20 border border-yellow-500/50 rounded-2xl p-6 animate-fade-in-up">
              <h3 className="text-yellow-400 font-semibold mb-3 flex items-center">
                <AlertCircle className="h-5 w-5 mr-2" />
                Backend Connection Issues
              </h3>
              <div className="text-yellow-300 text-sm space-y-2">
                <p>• Make sure your backend server is running on http://localhost:8000</p>
                <p>• Check if the /api/speech/evaluate-transcript endpoint is available</p>
                <p>• Verify your backend server supports CORS for this domain</p>
                <button
                  onClick={checkBackendStatus}
                  className="mt-3 bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded-lg text-sm transition-smooth"
                >
                  Test Connection
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default SpeakingPage
