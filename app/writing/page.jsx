"use client"

import { useState, useRef, useEffect } from "react"
import {
  FileText,
  Send,
  ArrowLeft,
  Clock,
  CheckCircle,
  AlertTriangle,
  Lightbulb,
  Save,
  RotateCcw,
  ImageIcon,
  X,
  Brain,
  Star,
  TrendingUp,
  Copy,
  RefreshCw,
  BookOpen,
  Target,
  Award,
  Eye,
  PenTool,
  Timer,
} from "lucide-react"
import Navbar from "../../components/Navbar"
import Footer from "../../components/Footer"

const WritingPage = () => {
  const [essay, setEssay] = useState("")
  const [uploadedImage, setUploadedImage] = useState(null)
  const [feedback, setFeedback] = useState(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [wordCount, setWordCount] = useState(0)
  const [connectionStatus, setConnectionStatus] = useState("unknown")
  const [timeSpent, setTimeSpent] = useState(0)
  const [isTimerActive, setIsTimerActive] = useState(false)
  const fileInputRef = useRef(null)
  const timerRef = useRef(null)

  const essayPrompt = {
    type: "Task 2 - Opinion Essay",
    question:
      "Some people believe that technology has made our lives more complicated, while others think it has made life easier. Discuss both views and give your own opinion.",
    instructions: "Write at least 250 words. You should spend about 40 minutes on this task.",
    timeLimit: 40 * 60, // 40 minutes in seconds
    tips: [
      "Present both viewpoints clearly",
      "Support your arguments with examples",
      "State your own opinion clearly",
      "Use appropriate linking words",
      "Check grammar and vocabulary",
    ],
  }

  // Enhanced AI prompt for structured feedback
  const createAIPrompt = (essayText) => {
    return `You're an IELTS examiner. Evaluate the following Task 2 essay with clear, structured feedback under these sections:

1. **Task Response**
- Did the writer fully address the question?
- Was a clear position presented and supported?

2. **Coherence & Cohesion**
- Was the essay well organized?
- Were linking words and paragraphs used logically?

3. **Lexical Resource**
- Comment on vocabulary range, accuracy, and appropriateness.
- Note any strong or weak word choices.

4. **Grammar**
- Identify common grammar mistakes (tenses, structure, punctuation).
- Give 2–3 sentence corrections with explanations.

5. **Paragraph Feedback**
- Briefly review strengths & weaknesses of each paragraph.

6. **Tone**
- Was the style academic and formal enough?

7. **Band Score Estimate**
- Overall Band (1–9)
- Sub-scores: TR / CC / LR / GRA

8. **Word Count & Timing**
- Approx. word count?
- Was it too long/short for 40 mins?

9. **Recommendations**
- Suggest 3–4 practical tips for improvement (grammar, vocab, structure).

Essay:
"""${essayText}"""`
  }

  useEffect(() => {
    if (isTimerActive) {
      timerRef.current = setInterval(() => {
        setTimeSpent((prev) => prev + 1)
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
  }, [isTimerActive])

  const handleEssayChange = (e) => {
    const text = e.target.value
    setEssay(text)
    setWordCount(
      text
        .trim()
        .split(/\s+/)
        .filter((word) => word.length > 0).length,
    )

    // Start timer on first keystroke
    if (!isTimerActive && text.length > 0) {
      setIsTimerActive(true)
    }
  }

  const handleImageUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setUploadedImage(e.target.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const removeImage = () => {
    setUploadedImage(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const testConnection = async () => {
    try {
      setConnectionStatus("testing")
      const res = await fetch("http://localhost:8000/api/health", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })

      if (res.ok) {
        setConnectionStatus("connected")
      } else {
        setConnectionStatus("error")
      }
    } catch (error) {
      setConnectionStatus("error")
      console.error("Connection test failed:", error)
    }
  }

  const submitEssay = async () => {
    if (!essay.trim()) {
      alert("Please write your essay before submitting.")
      return
    }

    if (wordCount < 50) {
      const confirm = window.confirm(
        `Your essay is quite short (${wordCount} words). Are you sure you want to submit it for analysis?`,
      )
      if (!confirm) return
    }

    setIsAnalyzing(true)
    setIsTimerActive(false) // Stop timer when submitting
    setConnectionStatus("unknown")

    try {
      console.log("Submitting essay:", essay.substring(0, 100) + "...")

      // Use the enhanced structured prompt
      const structuredPrompt = createAIPrompt(essay.trim())

      const res = await fetch("http://localhost:8000/api/essay/evaluate-essay", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text: structuredPrompt, // Send the structured prompt instead of just the essay
          metadata: {
            wordCount: wordCount,
            taskType: "Task 2",
            timeSpent: timeSpent,
            timestamp: new Date().toISOString(),
            originalEssay: essay.trim(), // Keep the original essay for reference
          },
        }),
      })

      console.log("Response status:", res.status)

      if (!res.ok) {
        const errorText = await res.text()
        console.error("Server error:", errorText)
        throw new Error(`HTTP error! status: ${res.status}, message: ${errorText}`)
      }

      const data = await res.json()
      console.log("Received feedback:", data)

      if (!data.feedback) {
        throw new Error("No feedback received from server")
      }

      const parsedFeedback = parseAIFeedback(data.feedback)
      setFeedback(parsedFeedback)
      setConnectionStatus("connected")
    } catch (error) {
      console.error("Submission error:", error)
      setConnectionStatus("error")

      setFeedback({
        error: true,
        message: "There was an error analyzing your essay. Please check the details below.",
        details: error.message,
        troubleshooting: [
          "Make sure your backend server is running on http://localhost:8000",
          "Check if the /api/essay/evaluate-essay endpoint is working",
          "Verify your essay text is not empty",
          "Check browser console for detailed error messages",
        ],
      })
    } finally {
      setIsAnalyzing(false)
    }
  }

  const parseAIFeedback = (rawFeedback) => {
    console.log("Parsing feedback:", rawFeedback)

    const bandScore = extractBandScore(rawFeedback)
    const sections = parseAnalysisSections(rawFeedback)

    return {
      rawFeedback: rawFeedback,
      bandScore: bandScore,
      sections: sections,
      wordCount: extractWordCount(rawFeedback),
      timeEfficiency: extractTimeEfficiency(rawFeedback),
      recommendations: extractRecommendations(rawFeedback),
      subScores: extractSubScores(rawFeedback),
    }
  }

  const extractBandScore = (text) => {
    const patterns = [
      /overall\s*band[:\s]*(\d+\.?\d*)/i,
      /band\s*score\s*(?:estimation?)?\s*:?\s*(\d+\.?\d*)/i,
      /score\s*:?\s*(\d+\.?\d*)/i,
      /band\s*(\d+\.?\d*)/i,
    ]

    for (const pattern of patterns) {
      const match = text.match(pattern)
      if (match) {
        const score = Number.parseFloat(match[1])
        if (score >= 0 && score <= 9) {
          return score
        }
      }
    }

    if (text.toLowerCase().includes("not applicable") || text.toLowerCase().includes("n/a")) {
      return "N/A"
    }

    return null
  }

  const extractSubScores = (text) => {
    const subScores = {}

    // Look for sub-scores in format "TR: 6.5" or "Task Response: 6.5"
    const patterns = {
      taskResponse: /(?:TR|Task Response)[:\s]*(\d+\.?\d*)/i,
      coherenceCohesion: /(?:CC|Coherence.*?Cohesion)[:\s]*(\d+\.?\d*)/i,
      lexicalResource: /(?:LR|Lexical Resource)[:\s]*(\d+\.?\d*)/i,
      grammar: /(?:GRA|Grammar|Grammatical Range)[:\s]*(\d+\.?\d*)/i,
    }

    for (const [key, pattern] of Object.entries(patterns)) {
      const match = text.match(pattern)
      if (match) {
        const score = Number.parseFloat(match[1])
        if (score >= 0 && score <= 9) {
          subScores[key] = score
        }
      }
    }

    return subScores
  }

  const parseAnalysisSections = (text) => {
    const sections = []

    // Split by numbered sections or **Section Name**
    const sectionPatterns = [
      /\d+\.\s*\*\*([^*]+)\*\*(.*?)(?=\d+\.\s*\*\*|$)/gs,
      /\*\*(\d+\.\s*[^*]+)\*\*(.*?)(?=\*\*\d+\.|$)/gs,
    ]

    for (const pattern of sectionPatterns) {
      const matches = [...text.matchAll(pattern)]
      if (matches.length > 0) {
        matches.forEach((match) => {
          const title = match[1].replace(/^\d+\.\s*/, "").trim()
          const content = match[2].trim()

          if (title && content) {
            sections.push({
              title: title,
              content: content,
              points: extractBulletPoints(content),
            })
          }
        })
        break // Use the first pattern that matches
      }
    }

    // Fallback: look for common IELTS section headers
    if (sections.length === 0) {
      const commonHeaders = [
        "Task Response",
        "Coherence & Cohesion",
        "Coherence and Cohesion",
        "Lexical Resource",
        "Grammar",
        "Grammatical Range",
        "Paragraph Feedback",
        "Tone",
        "Band Score Estimate",
        "Word Count & Timing",
        "Recommendations",
      ]

      commonHeaders.forEach((header) => {
        const regex = new RegExp(`${header}[:\\s]*(.*?)(?=(?:${commonHeaders.join("|")})|$)`, "is")
        const match = text.match(regex)
        if (match && match[1].trim()) {
          sections.push({
            title: header,
            content: match[1].trim(),
            points: extractBulletPoints(match[1]),
          })
        }
      })
    }

    return sections
  }

  const extractBulletPoints = (text) => {
    const bulletPoints = []
    const lines = text.split("\n")

    lines.forEach((line) => {
      const trimmed = line.trim()
      if (trimmed.startsWith("-") || trimmed.startsWith("•") || trimmed.startsWith("*")) {
        bulletPoints.push(trimmed.substring(1).trim())
      }
    })

    return bulletPoints
  }

  const extractWordCount = (text) => {
    const wordCountMatch = text.match(/word\s*count[:\s]*(\d+)/i)
    return wordCountMatch ? Number.parseInt(wordCountMatch[1]) : null
  }

  const extractTimeEfficiency = (text) => {
    const timeMatch = text.match(/time\s*efficiency[:\s]*([^.]+)/i)
    return timeMatch ? timeMatch[1].trim() : null
  }

  const extractRecommendations = (text) => {
    const recommendations = []

    const recSection = text.match(/recommendations?\s*[:\s]*(.*?)(?=\n\n|\n[A-Z]|$)/is)
    if (recSection) {
      const recText = recSection[1]
      const bulletPoints = extractBulletPoints(recText)
      recommendations.push(...bulletPoints)
    }

    const improvementMatch = text.match(/improvements?[:\s]*(.*?)(?=\n\n|\n[A-Z]|$)/is)
    if (improvementMatch) {
      const impText = improvementMatch[1]
      const bulletPoints = extractBulletPoints(impText)
      recommendations.push(...bulletPoints)
    }

    return recommendations
  }

  const saveEssay = () => {
    console.log("Saving essay to database...")
    alert("Essay saved successfully!")
  }

  const resetEssay = () => {
    setEssay("")
    setUploadedImage(null)
    setFeedback(null)
    setWordCount(0)
    setTimeSpent(0)
    setIsTimerActive(false)
    setConnectionStatus("unknown")
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const copyEssayToClipboard = () => {
    navigator.clipboard.writeText(essay)
    alert("Essay copied to clipboard!")
  }

  const getBandScoreColor = (score) => {
    if (score === "N/A" || score === null) return "text-gray-400"
    if (score >= 8) return "text-green-400"
    if (score >= 7) return "text-blue-400"
    if (score >= 6) return "text-yellow-400"
    if (score >= 5) return "text-orange-400"
    return "text-red-400"
  }

  const getBandScoreLabel = (score) => {
    if (score === "N/A" || score === null) return "Not Applicable"
    if (score >= 8.5) return "Excellent"
    if (score >= 7.5) return "Very Good"
    if (score >= 6.5) return "Good"
    if (score >= 5.5) return "Competent"
    if (score >= 4.5) return "Modest"
    return "Limited"
  }

  const getConnectionStatusColor = () => {
    switch (connectionStatus) {
      case "connected":
        return "text-green-400"
      case "error":
        return "text-red-400"
      case "testing":
        return "text-yellow-400"
      default:
        return "text-gray-400"
    }
  }

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  const getWordCountStatus = () => {
    if (wordCount < 150) return { color: "text-red-400", status: "Too short" }
    if (wordCount < 250) return { color: "text-yellow-400", status: "Below minimum" }
    if (wordCount < 350) return { color: "text-green-400", status: "Good length" }
    return { color: "text-blue-400", status: "Excellent length" }
  }

  const wordStatus = getWordCountStatus()

  return (
    <div className="min-h-screen bg-gray-900">
      <Navbar />

      <div className="relative min-h-screen py-6 overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 right-20 w-96 h-96 bg-green-500/3 rounded-full animate-pulse"></div>
          <div className="absolute bottom-20 left-20 w-96 h-96 bg-blue-500/3 rounded-full animate-pulse delay-1000"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-6 animate-fade-in-up">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <button
                  onClick={() => window.history.back()}
                  className="flex items-center text-gray-400 hover:text-blue-400 transition-colors duration-300 mr-6 hover-lift"
                >
                  <ArrowLeft className="h-5 w-5 mr-2" />
                  Back to Dashboard
                </button>
              </div>

              {/* Connection Status */}
              <div className="flex items-center space-x-4">
                <span className={`text-sm ${getConnectionStatusColor()}`}>
                  AI Status:{" "}
                  {connectionStatus === "unknown"
                    ? "Ready"
                    : connectionStatus === "testing"
                      ? "Testing..."
                      : connectionStatus === "connected"
                        ? "Connected"
                        : "Disconnected"}
                </span>
                <button
                  onClick={testConnection}
                  disabled={connectionStatus === "testing"}
                  className="text-xs bg-gray-700 hover:bg-gray-600 text-white px-3 py-1 rounded transition-colors duration-300 disabled:opacity-50"
                >
                  Test AI
                </button>
              </div>
            </div>

            <div className="text-center mb-6">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-3 flex items-center justify-center">
                <PenTool className="h-10 w-10 mr-4 text-green-400 animate-float" />
                IELTS Writing Practice
              </h1>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
                Complete your essay and receive comprehensive AI-powered feedback with detailed band score analysis
              </p>
            </div>
          </div>

          {/* Stats Bar - Rectangular Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8 animate-fade-in-up delay-200">
            <div className="bg-gray-800/60 backdrop-blur-sm rounded-2xl p-6 border border-gray-700 text-center card-hover">
              <div className="flex items-center justify-center mb-3">
                <Timer className="h-6 w-6 text-blue-400 mr-3" />
                <span className="text-gray-400 font-medium">Time Spent</span>
              </div>
              <div className="text-3xl font-bold text-blue-400">{formatTime(timeSpent)}</div>
            </div>

            <div className="bg-gray-800/60 backdrop-blur-sm rounded-2xl p-6 border border-gray-700 text-center card-hover">
              <div className="flex items-center justify-center mb-3">
                <FileText className="h-6 w-6 text-green-400 mr-3" />
                <span className="text-gray-400 font-medium">Word Count</span>
              </div>
              <div className={`text-3xl font-bold ${wordStatus.color}`}>{wordCount}</div>
              <div className={`text-sm ${wordStatus.color} mt-1`}>{wordStatus.status}</div>
            </div>

            <div className="bg-gray-800/60 backdrop-blur-sm rounded-2xl p-6 border border-gray-700 text-center card-hover">
              <div className="flex items-center justify-center mb-3">
                <Target className="h-6 w-6 text-yellow-400 mr-3" />
                <span className="text-gray-400 font-medium">Target</span>
              </div>
              <div className="text-3xl font-bold text-yellow-400">250+</div>
              <div className="text-sm text-gray-400 mt-1">words</div>
            </div>

            <div className="bg-gray-800/60 backdrop-blur-sm rounded-2xl p-6 border border-gray-700 text-center card-hover">
              <div className="flex items-center justify-center mb-3">
                <Clock className="h-6 w-6 text-purple-400 mr-3" />
                <span className="text-gray-400 font-medium">Time Limit</span>
              </div>
              <div className="text-3xl font-bold text-purple-400">40</div>
              <div className="text-sm text-gray-400 mt-1">minutes</div>
            </div>
          </div>

          {/* Essay Prompt - Rectangular Card */}
          <div className="bg-gradient-to-r from-gray-800/70 to-gray-700/70 backdrop-blur-sm rounded-3xl p-10 border border-gray-600 mb-8 animate-fade-in-up delay-300 card-hover hover-glow">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center">
                <BookOpen className="h-7 w-7 mr-4 text-green-400" />
                <h2 className="text-3xl font-bold text-white">{essayPrompt.type}</h2>
              </div>
              <div className="flex items-center text-gray-400 bg-gray-700/50 px-6 py-3 rounded-2xl">
                <Clock className="h-5 w-5 mr-3" />
                <span className="font-medium">40 minutes recommended</span>
              </div>
            </div>

            <div className="bg-gray-900/50 rounded-2xl p-8 border border-gray-600 mb-8">
              <h3 className="text-xl font-semibold text-blue-400 mb-6">Essay Question:</h3>
              <p className="text-gray-200 text-xl leading-relaxed mb-6">{essayPrompt.question}</p>
              <p className="text-gray-400 font-medium text-lg">{essayPrompt.instructions}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-gray-900/30 rounded-2xl p-6 border border-gray-600">
                <h4 className="text-green-400 font-semibold mb-4 flex items-center text-lg">
                  <Lightbulb className="h-5 w-5 mr-3" />
                  Writing Tips
                </h4>
                <ul className="space-y-3">
                  {essayPrompt.tips.map((tip, index) => (
                    <li key={index} className="text-gray-300 flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-400 mr-3 mt-0.5 flex-shrink-0" />
                      {tip}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-gray-900/30 rounded-2xl p-6 border border-gray-600">
                <h4 className="text-blue-400 font-semibold mb-4 flex items-center text-lg">
                  <Award className="h-5 w-5 mr-3" />
                  Assessment Criteria
                </h4>
                <ul className="space-y-3 text-gray-300">
                  <li className="flex justify-between">
                    <span>Task Response</span>
                    <span className="text-blue-400 font-semibold">25%</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Coherence & Cohesion</span>
                    <span className="text-blue-400 font-semibold">25%</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Lexical Resource</span>
                    <span className="text-blue-400 font-semibold">25%</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Grammar & Accuracy</span>
                    <span className="text-blue-400 font-semibold">25%</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
            {/* Writing Section - Rectangular Card */}
            <div className="xl:col-span-2 animate-fade-in-up delay-400">
              <div className="bg-gray-800/60 backdrop-blur-sm rounded-3xl p-8 border border-gray-700 card-hover hover-glow">
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-2xl font-bold text-white flex items-center">
                    <Eye className="h-6 w-6 mr-3 text-green-400" />
                    Your Essay
                  </h2>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center bg-gray-700/50 px-4 py-2 rounded-xl">
                      <FileText className="h-4 w-4 mr-2 text-gray-400" />
                      <span className="text-gray-300 font-medium">{wordCount} words</span>
                    </div>
                    <div
                      className={`flex items-center px-4 py-2 rounded-xl ${wordCount >= 250 ? "bg-green-600/20 border border-green-500/30" : "bg-yellow-600/20 border border-yellow-500/30"}`}
                    >
                      <Target className="h-4 w-4 mr-2" />
                      <span className={`font-medium ${wordCount >= 250 ? "text-green-400" : "text-yellow-400"}`}>
                        {wordCount >= 250 ? "✓ Target reached" : `${250 - wordCount} more needed`}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="relative">
                  <textarea
                    value={essay}
                    onChange={handleEssayChange}
                    placeholder="Begin writing your essay here... Remember to address both viewpoints and give your own opinion with supporting examples."
                    className="w-full h-[500px] p-8 bg-gray-900/50 border-2 border-gray-600 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-300 resize-none text-lg leading-relaxed"
                    style={{ fontFamily: "Georgia, serif" }}
                  />

                  {/* Writing Progress Indicator */}
                  <div className="absolute bottom-6 right-6 bg-gray-800/80 backdrop-blur-sm rounded-xl px-4 py-3 border border-gray-600">
                    <div className="flex items-center space-x-3 text-sm text-gray-400">
                      <div
                        className={`w-3 h-3 rounded-full ${isTimerActive ? "bg-green-400 animate-pulse" : "bg-gray-500"}`}
                      ></div>
                      <span className="font-medium">{isTimerActive ? "Writing..." : "Paused"}</span>
                    </div>
                  </div>
                </div>

                {/* Image Upload Section - Rectangular Card */}
                <div className="mt-8 border-t border-gray-600 pt-8">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-semibold text-gray-300 flex items-center">
                      <ImageIcon className="h-6 w-6 mr-3 text-gray-400" />
                      Additional Notes (Optional)
                    </h3>
                    {uploadedImage && (
                      <button
                        onClick={removeImage}
                        className="text-red-400 hover:text-red-300 transition-colors duration-300 p-3 hover:bg-red-600/10 rounded-xl"
                      >
                        <X className="h-5 w-5" />
                      </button>
                    )}
                  </div>

                  {!uploadedImage ? (
                    <div
                      onClick={() => fileInputRef.current?.click()}
                      className="border-2 border-dashed border-gray-600 rounded-2xl p-10 text-center cursor-pointer hover:border-green-500 hover:bg-green-500/5 transition-all duration-300 group"
                    >
                      <ImageIcon className="h-12 w-12 text-gray-400 group-hover:text-green-400 mx-auto mb-4 transition-colors duration-300" />
                      <p className="text-gray-400 group-hover:text-green-400 transition-colors duration-300 font-medium text-lg">
                        Upload handwritten notes or diagrams
                      </p>
                      <p className="text-sm text-gray-500 mt-3">PNG, JPG up to 10MB</p>
                    </div>
                  ) : (
                    <div className="relative bg-gray-900/50 rounded-2xl p-6 border border-gray-600">
                      <img
                        src={uploadedImage || "/placeholder.svg"}
                        alt="Uploaded notes"
                        className="w-full max-h-64 object-contain rounded-xl"
                      />
                    </div>
                  )}

                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </div>

                {/* Action Buttons - Rectangular */}
                <div className="flex flex-wrap gap-4 mt-10 pt-8 border-t border-gray-600">
                  <button
                    onClick={submitEssay}
                    disabled={isAnalyzing || !essay.trim()}
                    className="group bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white px-10 py-4 rounded-2xl text-lg font-semibold transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center shadow-lg hover:shadow-green-500/25"
                  >
                    {isAnalyzing ? (
                      <>
                        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white mr-3"></div>
                        Analyzing Essay...
                      </>
                    ) : (
                      <>
                        <Send className="h-6 w-6 mr-3 group-hover:translate-x-1 transition-transform duration-300" />
                        Submit for AI Analysis
                      </>
                    )}
                  </button>

                  <button
                    onClick={saveEssay}
                    disabled={!essay.trim()}
                    className="group bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-8 py-4 rounded-2xl font-semibold transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                  >
                    <Save className="h-5 w-5 mr-2 group-hover:scale-110 transition-transform duration-300" />
                    Save Draft
                  </button>

                  <button
                    onClick={copyEssayToClipboard}
                    disabled={!essay.trim()}
                    className="group bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white px-8 py-4 rounded-2xl font-semibold transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                  >
                    <Copy className="h-5 w-5 mr-2 group-hover:scale-110 transition-transform duration-300" />
                    Copy Text
                  </button>

                  <button
                    onClick={resetEssay}
                    className="group bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 text-white px-8 py-4 rounded-2xl font-semibold transition-all duration-300 transform hover:scale-105 flex items-center"
                  >
                    <RotateCcw className="h-5 w-5 mr-2 group-hover:rotate-180 transition-transform duration-300" />
                    Reset
                  </button>
                </div>
              </div>
            </div>

            {/* Feedback Section - Rectangular Card */}
            <div className="xl:col-span-1 animate-fade-in-up delay-600">
              <div className="bg-gray-800/60 backdrop-blur-sm rounded-3xl p-8 border border-gray-700 sticky top-8 card-hover hover-glow">
                <h2 className="text-2xl font-bold text-white mb-8 flex items-center">
                  <Brain className="h-6 w-6 mr-3 text-blue-400 animate-pulse" />
                  AI Analysis & Feedback
                </h2>

                {!feedback && !isAnalyzing && (
                  <div className="text-center py-12">
                    <div className="bg-gray-700/30 rounded-2xl p-8 w-32 h-32 mx-auto mb-8 flex items-center justify-center">
                      <FileText className="h-16 w-16 text-gray-500 animate-float" />
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-4">Ready for Analysis</h3>
                    <p className="text-gray-400 mb-8 leading-relaxed">
                      Complete your essay and submit it to receive comprehensive AI-powered feedback including:
                    </p>
                    <div className="space-y-4 text-left">
                      <div className="flex items-center text-gray-300">
                        <Star className="h-5 w-5 text-yellow-400 mr-4" />
                        <span>Band score estimation</span>
                      </div>
                      <div className="flex items-center text-gray-300">
                        <TrendingUp className="h-5 w-5 text-green-400 mr-4" />
                        <span>Detailed skill analysis</span>
                      </div>
                      <div className="flex items-center text-gray-300">
                        <Lightbulb className="h-5 w-5 text-blue-400 mr-4" />
                        <span>Improvement suggestions</span>
                      </div>
                      <div className="flex items-center text-gray-300">
                        <Award className="h-5 w-5 text-purple-400 mr-4" />
                        <span>Strengths & weaknesses</span>
                      </div>
                    </div>
                  </div>
                )}

                {isAnalyzing && (
                  <div className="text-center py-16">
                    <div className="relative mb-8">
                      <div className="animate-spin rounded-full h-20 w-20 border-4 border-green-400 border-t-transparent mx-auto"></div>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Brain className="h-10 w-10 text-green-400 animate-pulse" />
                      </div>
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-4">Analyzing Your Essay</h3>
                    <p className="text-gray-400 mb-6">Our AI is carefully reviewing your writing...</p>
                    <div className="bg-gray-700/30 rounded-2xl p-6">
                      <div className="flex items-center justify-between text-sm text-gray-300 mb-3">
                        <span>Progress</span>
                        <span>Processing...</span>
                      </div>
                      <div className="w-full bg-gray-600 rounded-full h-3">
                        <div className="bg-gradient-to-r from-green-600 to-blue-600 h-3 rounded-full animate-pulse w-3/4"></div>
                      </div>
                    </div>
                  </div>
                )}

                {feedback && (
                  <div className="space-y-8">
                    {/* Error Display */}
                    {feedback.error ? (
                      <div className="bg-red-600/20 border-2 border-red-500 rounded-2xl p-8 animate-fade-in-up">
                        <div className="flex items-center mb-6">
                          <AlertTriangle className="h-6 w-6 text-red-400 mr-3" />
                          <h3 className="text-red-400 font-semibold text-xl">Analysis Error</h3>
                        </div>
                        <p className="text-gray-300 mb-6 leading-relaxed text-lg">{feedback.message}</p>

                        {feedback.troubleshooting && (
                          <div className="mb-6">
                            <p className="text-gray-400 font-medium mb-4 text-lg">Troubleshooting steps:</p>
                            <ul className="space-y-3">
                              {feedback.troubleshooting.map((step, index) => (
                                <li key={index} className="text-gray-400 flex items-start">
                                  <span className="text-red-400 mr-3 mt-1">•</span>
                                  {step}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                        <div className="flex flex-col space-y-3">
                          <button
                            onClick={() => setFeedback(null)}
                            className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-2xl font-semibold transition-smooth"
                          >
                            Try Again
                          </button>
                          <button
                            onClick={testConnection}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-2xl font-semibold transition-smooth flex items-center justify-center"
                          >
                            <RefreshCw className="h-5 w-5 mr-2" />
                            Test Connection
                          </button>
                        </div>
                      </div>
                    ) : (
                      <>
                        {/* Band Score Display */}
                        {feedback.bandScore !== null && (
                          <div className="text-center bg-gradient-to-r from-gray-700/50 to-gray-600/50 rounded-3xl p-10 border border-gray-600 animate-scale-in">
                            <div className="flex items-center justify-center mb-6">
                              <Star className="h-8 w-8 text-yellow-400 mr-3 animate-pulse" />
                              <h3 className="text-2xl font-bold text-white">Overall Band Score</h3>
                            </div>
                            <div
                              className={`text-7xl font-bold mb-6 animate-fade-glow ${getBandScoreColor(feedback.bandScore)}`}
                            >
                              {feedback.bandScore}
                            </div>
                            <div className={`text-xl font-semibold mb-3 ${getBandScoreColor(feedback.bandScore)}`}>
                              {getBandScoreLabel(feedback.bandScore)}
                            </div>
                            <div className="text-gray-400">Based on IELTS Writing Task 2 criteria</div>

                            {/* Sub-scores if available */}
                            {feedback.subScores && Object.keys(feedback.subScores).length > 0 && (
                              <div className="mt-8 grid grid-cols-2 gap-4">
                                {Object.entries(feedback.subScores).map(([skill, score]) => (
                                  <div key={skill} className="bg-gray-800/50 rounded-2xl p-4">
                                    <div className={`text-2xl font-bold ${getBandScoreColor(score)}`}>{score}</div>
                                    <div className="text-gray-400 text-sm capitalize">
                                      {skill.replace(/([A-Z])/g, " $1").trim()}
                                    </div>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        )}

                        {/* Analysis Sections */}
                        {feedback.sections && feedback.sections.length > 0 && (
                          <div className="space-y-6">
                            <h3 className="text-xl font-bold text-white flex items-center">
                              <TrendingUp className="h-5 w-5 mr-3 text-green-400" />
                              Detailed Assessment
                            </h3>
                            {feedback.sections.map((section, index) => (
                              <div
                                key={index}
                                className="bg-gray-700/40 rounded-2xl p-6 border border-gray-600 animate-fade-in-up card-hover"
                                style={{ animationDelay: `${index * 150}ms` }}
                              >
                                <h4 className="text-blue-400 font-semibold mb-4 text-lg flex items-center">
                                  <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-bold mr-3">
                                    {index + 1}
                                  </div>
                                  {section.title}
                                </h4>
                                <div className="text-gray-300 leading-relaxed mb-4 whitespace-pre-wrap">
                                  {section.content}
                                </div>
                                {section.points && section.points.length > 0 && (
                                  <ul className="space-y-2">
                                    {section.points.map((point, pointIndex) => (
                                      <li key={pointIndex} className="text-gray-400 text-sm flex items-start">
                                        <span className="text-blue-400 mr-3 mt-1">•</span>
                                        {point}
                                      </li>
                                    ))}
                                  </ul>
                                )}
                              </div>
                            ))}
                          </div>
                        )}

                        {/* Recommendations */}
                        {feedback.recommendations && feedback.recommendations.length > 0 && (
                          <div className="bg-gradient-to-r from-yellow-600/20 to-orange-600/20 rounded-2xl p-8 border border-yellow-500/30 animate-fade-in-up delay-300">
                            <h3 className="text-white font-bold mb-6 flex items-center text-xl">
                              <Lightbulb className="h-6 w-6 text-yellow-400 mr-3" />
                              Key Recommendations
                            </h3>
                            <ul className="space-y-4">
                              {feedback.recommendations.map((recommendation, index) => (
                                <li key={index} className="text-gray-300 flex items-start">
                                  <CheckCircle className="h-5 w-5 text-green-400 mr-3 mt-0.5 flex-shrink-0" />
                                  <span className="leading-relaxed">{recommendation}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {/* Raw Feedback (Collapsible) */}
                        {feedback.rawFeedback && (
                          <div className="bg-gray-700/30 rounded-2xl p-8 border border-gray-600 animate-fade-in-up delay-400">
                            <details>
                              <summary className="text-gray-400 cursor-pointer hover:text-gray-300 font-semibold mb-6 text-xl">
                                View Complete AI Analysis
                              </summary>
                              <div className="text-gray-300 text-sm leading-relaxed whitespace-pre-wrap mt-6 max-h-80 overflow-y-auto bg-gray-800/50 p-6 rounded-2xl border border-gray-600">
                                {feedback.rawFeedback}
                              </div>
                            </details>
                          </div>
                        )}
                      </>
                    )}
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

export default WritingPage
