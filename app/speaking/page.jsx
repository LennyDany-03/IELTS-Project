"use client"

import { useState, useRef, useEffect } from "react"
import * as SpeechSDK from "microsoft-cognitiveservices-speech-sdk"
import ReactMarkdown from "react-markdown"
import { createBrowserClient } from "@supabase/ssr"
import { useRouter } from "next/navigation"
import {
  Mic,
  Play,
  Pause,
  Square,
  RotateCcw,
  Save,
  Volume2,
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
  const [isSaving, setIsSaving] = useState(false)
  const [error, setError] = useState("")
  const [audioBlob, setAudioBlob] = useState(null)
  const [backendStatus, setBackendStatus] = useState("checking")
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
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
  const router = useRouter()

  const supabase = createBrowserClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)

  const speechKey = process.env.NEXT_PUBLIC_AZURE_SPEECH_KEY
  const speechRegion = process.env.NEXT_PUBLIC_AZURE_SPEECH_REGION

  useEffect(() => {
    checkAuth()
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

  const checkAuth = async () => {
    try {
      const {
        data: { session },
        error,
      } = await supabase.auth.getSession()

      if (error) {
        console.error("[v0] Auth error:", error)
        router.push("/auth")
        return
      }

      if (!session) {
        console.log("[v0] No session found, redirecting to auth")
        router.push("/auth")
        return
      }

      setUser(session.user)
      console.log("[v0] User authenticated:", session.user.email)
    } catch (error) {
      console.error("[v0] Auth check failed:", error)
      router.push("/auth")
    } finally {
      setIsLoading(false)
    }
  }

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

      const speechConfig = SpeechSDK.SpeechConfig.fromSubscription(speechKey, speechRegion)
      speechConfig.speechRecognitionLanguage = "en-US"
      speechConfig.enableDictation()

      const audioConfig = SpeechSDK.AudioConfig.fromDefaultMicrophoneInput()
      const recognizer = new SpeechSDK.SpeechRecognizer(speechConfig, audioConfig)
      recognizerRef.current = recognizer

      let fullTranscript = ""

      recognizer.recognizing = (s, e) => {}

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

      recognizer.startContinuousRecognitionAsync()

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

    setIsSaving(true)
    setError("")

    try {
      console.log("[v0] Starting save process...")

      if (!user) {
        throw new Error("User not authenticated. Please sign in again.")
      }

      console.log("[v0] User authenticated, getting student info...")

      const { data: studentInfo, error: studentError } = await supabase
        .from("studentinfo")
        .select("id")
        .eq("user_id", user.id)
        .single()

      console.log("[v0] Student info:", studentInfo)
      console.log("[v0] Student error:", studentError)

      if (studentError) {
        if (studentError.code === "PGRST116") {
          throw new Error("Student profile not found. Please complete your profile in the Student Info page first.")
        }
        throw new Error(`Database error: ${studentError.message}`)
      }

      if (!studentInfo) {
        throw new Error("Student information not found. Please complete your profile first.")
      }

      console.log("[v0] Extracting scores from feedback...")
      console.log("[v0] Full feedback text:", feedback)

      let bandScore = null

      const bandScorePatterns = [
        /\*\*Band\s*Score\*\*[:\s]*(\d+(?:\.\d+)?)/gi, // Matches **Band Score**: 4
        /Band\s*Score[:\s]+(\d+(?:\.\d+)?)/gi, // Matches Band Score: 4 (with required colon/space)
        /Overall\s*Band[:\s]+(\d+(?:\.\d+)?)/gi, // Matches Overall Band: 4
        /(?:^|\s)Band[:\s]+(\d+(?:\.\d+)?)/gi, // Matches Band: 4 at start of line or after space
      ]

      // Try each pattern
      for (let i = 0; i < bandScorePatterns.length; i++) {
        const pattern = bandScorePatterns[i]
        pattern.lastIndex = 0 // Reset regex state
        const match = pattern.exec(feedback)
        console.log(`[v0] Pattern ${i + 1} (${pattern}):`, match)
        if (match && match[1]) {
          const score = Number.parseFloat(match[1])
          // Validate it's a reasonable IELTS band score
          if (score >= 1 && score <= 9) {
            bandScore = score
            console.log("[v0] Band score found with pattern:", pattern, "Full match:", match[0], "Score:", bandScore)
            break
          }
        }
      }

      if (!bandScore) {
        console.log("[v0] No pattern matched, trying line-by-line search...")
        const lines = feedback.split(/[\n\r]+/)
        for (let i = 0; i < lines.length; i++) {
          const line = lines[i].trim()
          console.log(`[v0] Checking line ${i + 1}:`, line)

          if (line.toLowerCase().includes("band") && line.toLowerCase().includes("score")) {
            console.log("[v0] Found band score line:", line)
            // Look for pattern like "Band Score: 4" or "**Band Score**: 4"
            const lineMatch = line.match(/band\s*score[:\s]*(\d+(?:\.\d+)?)/i)
            if (lineMatch && lineMatch[1]) {
              const score = Number.parseFloat(lineMatch[1])
              if (score >= 1 && score <= 9) {
                bandScore = score
                console.log("[v0] Band score extracted from line:", line, "Score:", bandScore)
                break
              }
            }
          }
        }
      }

      if (!bandScore) {
        console.log("[v0] Still no band score, trying final fallback...")
        const scoreMatches = feedback.match(/score[:\s]*(\d+(?:\.\d+)?)/gi)
        console.log("[v0] Score matches found:", scoreMatches)
        if (scoreMatches && scoreMatches.length > 0) {
          for (const match of scoreMatches) {
            const numberMatch = match.match(/(\d+(?:\.\d+)?)/g)
            if (numberMatch) {
              const score = Number.parseFloat(numberMatch[0])
              if (score >= 1 && score <= 9) {
                bandScore = score
                console.log("[v0] Using fallback band score:", bandScore)
                break
              }
            }
          }
        }
      }

      const fluencyPatterns = [/Fluency\s*&?\s*Coherence[:\s]*(\d+(?:\.\d+)?)/i, /Fluency[:\s]*(\d+(?:\.\d+)?)/i]

      const lexicalPatterns = [
        /Lexical\s*Resource[:\s]*(\d+(?:\.\d+)?)/i,
        /Vocabulary[:\s]*(\d+(?:\.\d+)?)/i,
        /Lexical[:\s]*(\d+(?:\.\d+)?)/i,
      ]

      const grammarPatterns = [/Grammar[:\s]*(\d+(?:\.\d+)?)/i, /Grammatical[:\s]*Range[:\s]*(\d+(?:\.\d+)?)/i]

      const pronunciationPatterns = [/Pronunciation[:\s]*(\d+(?:\.\d+)?)/i]

      let fluencyScore = null,
        lexicalScore = null,
        grammarScore = null,
        pronunciationScore = null

      // Extract fluency score
      for (const pattern of fluencyPatterns) {
        const match = feedback.match(pattern)
        if (match) {
          fluencyScore = Number.parseFloat(match[1])
          break
        }
      }

      // Extract lexical score
      for (const pattern of lexicalPatterns) {
        const match = feedback.match(pattern)
        if (match) {
          lexicalScore = Number.parseFloat(match[1])
          break
        }
      }

      // Extract grammar score
      for (const pattern of grammarPatterns) {
        const match = feedback.match(pattern)
        if (match) {
          grammarScore = Number.parseFloat(match[1])
          break
        }
      }

      // Extract pronunciation score
      for (const pattern of pronunciationPatterns) {
        const match = feedback.match(pattern)
        if (match) {
          pronunciationScore = Number.parseFloat(match[1])
          break
        }
      }

      console.log("[v0] Final extracted scores:", {
        bandScore,
        fluencyScore,
        lexicalScore,
        grammarScore,
        pronunciationScore,
      })

      if (!bandScore) {
        console.warn("[v0] WARNING: Band score could not be extracted from feedback")
        console.log("[v0] Feedback preview:", feedback.substring(0, 200) + "...")
      }

      const { data, error: insertError } = await supabase
        .from("speaking_results")
        .insert({
          student_id: studentInfo.id,
          topic_title: currentTopic.title,
          topic_description: currentTopic.description,
          transcript: transcript.trim(),
          ai_feedback: feedback,
          band_score: bandScore,
          fluency_score: fluencyScore,
          lexical_score: lexicalScore,
          grammar_score: grammarScore,
          pronunciation_score: pronunciationScore,
          recording_duration: recordingTime,
        })
        .select()

      console.log("[v0] Insert result:", data)
      console.log("[v0] Insert error:", insertError)

      if (insertError) {
        throw new Error(`Database error: ${insertError.message}`)
      }

      setError("")
      alert("Speaking practice result saved successfully!")
      console.log("[v0] Save completed successfully")

      // Optional: Reset the form for next practice
      // resetRecording()
    } catch (error) {
      console.error("[v0] Save error:", error)
      setError(`Save failed: ${error.message}`)
    } finally {
      setIsSaving(false)
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

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-400 mx-auto mb-4"></div>
          <p className="text-gray-400">Loading...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-900">
      <Navbar />

      <div className="relative min-h-screen py-8 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 right-20 w-64 h-64 bg-blue-500/5 rounded-full animate-float"></div>
          <div className="absolute bottom-20 left-20 w-64 h-64 bg-purple-500/5 rounded-full animate-float delay-1000"></div>
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

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="animate-fade-in-up delay-400">
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700 card-hover hover-glow">
                <h2 className="text-xl font-semibold text-white mb-6">Recording & Recognition</h2>

                <div className="text-center mb-6">
                  <div className="text-4xl font-bold text-blue-400 mb-2 animate-fade-glow">
                    {formatTime(recordingTime)}
                  </div>
                  <div className="text-gray-400">
                    {isRecording ? "Recording & Recognizing..." : audioBlob ? "Recording complete" : "Ready to record"}
                  </div>
                </div>

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

                {transcript && (
                  <div className="bg-gray-700/30 rounded-xl p-4 mb-4">
                    <h3 className="text-white font-medium mb-2 flex items-center">
                      <Volume2 className="h-4 w-4 mr-2 text-blue-400" />
                      Live Transcript
                    </h3>
                    <p className="text-gray-300 text-sm leading-relaxed whitespace-pre-line">{transcript}</p>
                  </div>
                )}

                {!feedback && !isAnalyzing && transcript && (
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

                    <div className="text-center">
                      <button
                        onClick={saveResult}
                        disabled={isSaving}
                        className="group bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white px-6 py-3 rounded-xl transition-smooth hover-lift flex items-center mx-auto btn-animate disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isSaving ? (
                          <>
                            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                            Saving...
                          </>
                        ) : (
                          <>
                            <Save className="h-5 w-5 mr-2 group-hover:icon-fade" />
                            Save Result
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                )}

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
