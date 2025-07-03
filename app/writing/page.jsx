"use client"

import { useState, useRef } from "react"
import {
  FileText,
  Send,
  ArrowLeft,
  Clock,
  Award,
  CheckCircle,
  AlertTriangle,
  Lightbulb,
  Save,
  RotateCcw,
  ImageIcon,
  X,
} from "lucide-react"
import Navbar from "../../components/Navbar"
import Footer from "../../components/Footer"

const WritingPage = () => {
  const [essay, setEssay] = useState("")
  const [uploadedImage, setUploadedImage] = useState(null)
  const [feedback, setFeedback] = useState(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [wordCount, setWordCount] = useState(0)
  const [timeSpent, setTimeSpent] = useState(0)
  const fileInputRef = useRef(null)

  const essayPrompt = {
    type: "Task 2",
    question:
      "Some people believe that technology has made our lives more complicated, while others think it has made life easier. Discuss both views and give your own opinion.",
    instructions: "Write at least 250 words. You should spend about 40 minutes on this task.",
    timeLimit: 40 * 60, // 40 minutes in seconds
  }

  const handleEssayChange = (e) => {
    const text = e.target.value
    setEssay(text)
    setWordCount(
      text
        .trim()
        .split(/\s+/)
        .filter((word) => word.length > 0).length,
    )
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

  const submitEssay = async () => {
    if (!essay.trim()) {
      alert("Please write your essay before submitting.")
      return
    }

    setIsAnalyzing(true)

    // Simulate FastAPI call
    setTimeout(() => {
      setFeedback({
        overallBand: 6.5,
        taskAchievement: {
          score: 6.0,
          feedback:
            "The essay addresses the task adequately with relevant ideas, though some aspects could be developed further.",
          strengths: ["Clear position stated", "Both views discussed", "Relevant examples provided"],
          weaknesses: ["Some ideas lack full development", "Could provide more specific examples"],
        },
        coherenceCohesion: {
          score: 7.0,
          feedback: "Good overall organization with clear progression of ideas and effective use of cohesive devices.",
          strengths: ["Clear paragraph structure", "Good use of linking words", "Logical flow of ideas"],
          weaknesses: ["Some repetitive cohesive devices", "Could vary sentence beginnings more"],
        },
        lexicalResource: {
          score: 6.5,
          feedback:
            "Adequate range of vocabulary with some good word choices, though more variety would improve the score.",
          strengths: ["Appropriate topic vocabulary", "Some less common words used", "Generally accurate word choice"],
          weaknesses: [
            "Limited range of synonyms",
            "Some repetition of key terms",
            "Could use more precise vocabulary",
          ],
        },
        grammaticalRange: {
          score: 6.5,
          feedback: "Mix of simple and complex sentences with generally good accuracy, though some errors present.",
          strengths: ["Variety of sentence structures", "Good use of complex sentences", "Generally accurate grammar"],
          weaknesses: [
            "Some minor grammatical errors",
            "Could use more varied sentence beginnings",
            "Occasional awkward phrasing",
          ],
        },
        suggestions: [
          "Develop your main points with more specific examples and explanations",
          "Use a wider range of vocabulary and avoid repetition of key terms",
          "Vary your sentence structures and beginnings for better flow",
          "Proofread for minor grammatical errors and awkward phrasing",
          "Consider adding more sophisticated linking devices",
        ],
      })
      setIsAnalyzing(false)
    }, 3000)
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
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
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
          <div className="absolute top-20 right-20 w-64 h-64 bg-green-500/5 rounded-full animate-pulse"></div>
          <div className="absolute bottom-20 left-20 w-64 h-64 bg-blue-500/5 rounded-full animate-pulse delay-1000"></div>
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
              <FileText className="h-8 w-8 mr-3 text-green-400" />
              Writing Practice
            </h1>
            <p className="text-gray-400">
              Submit your essay for detailed AI-powered feedback and band score estimation
            </p>
          </div>

          {/* Essay Prompt */}
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700 mb-8 animate-fade-in-up delay-200">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-white flex items-center">
                <FileText className="h-5 w-5 mr-2 text-green-400" />
                {essayPrompt.type}
              </h2>
              <div className="flex items-center text-gray-400">
                <Clock className="h-4 w-4 mr-1" />
                {essayPrompt.instructions.split(".")[1]}
              </div>
            </div>
            <div className="bg-gray-700/30 rounded-lg p-4">
              <p className="text-gray-300 mb-3 leading-relaxed">{essayPrompt.question}</p>
              <p className="text-sm text-gray-400">{essayPrompt.instructions}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Writing Section */}
            <div className="lg:col-span-2 animate-fade-in-up delay-400">
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold text-white">Your Essay</h2>
                  <div className="flex items-center space-x-4 text-sm text-gray-400">
                    <span>Words: {wordCount}</span>
                    <span className={wordCount >= 250 ? "text-green-400" : "text-yellow-400"}>
                      {wordCount >= 250 ? "✓ Minimum reached" : `${250 - wordCount} more needed`}
                    </span>
                  </div>
                </div>

                <textarea
                  value={essay}
                  onChange={handleEssayChange}
                  placeholder="Start writing your essay here..."
                  className="w-full h-96 p-4 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300 resize-none"
                />

                {/* Image Upload */}
                <div className="mt-4">
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-sm font-medium text-gray-300">Upload Handwritten Notes (Optional)</label>
                    {uploadedImage && (
                      <button
                        onClick={removeImage}
                        className="text-red-400 hover:text-red-300 transition-colors duration-300"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    )}
                  </div>

                  {!uploadedImage ? (
                    <div
                      onClick={() => fileInputRef.current?.click()}
                      className="border-2 border-dashed border-gray-600 rounded-lg p-6 text-center cursor-pointer hover:border-green-500 transition-colors duration-300 group"
                    >
                      <ImageIcon className="h-8 w-8 text-gray-400 group-hover:text-green-400 mx-auto mb-2 transition-colors duration-300" />
                      <p className="text-gray-400 group-hover:text-green-400 transition-colors duration-300">
                        Click to upload handwritten notes
                      </p>
                      <p className="text-xs text-gray-500 mt-1">PNG, JPG up to 10MB</p>
                    </div>
                  ) : (
                    <div className="relative">
                      <img
                        src={uploadedImage || "/placeholder.svg"}
                        alt="Uploaded notes"
                        className="w-full max-h-48 object-contain bg-gray-700 rounded-lg"
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

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-3 mt-6">
                  <button
                    onClick={submitEssay}
                    disabled={isAnalyzing || !essay.trim()}
                    className="group bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white px-6 py-3 rounded-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                  >
                    {isAnalyzing ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                        Analyzing...
                      </>
                    ) : (
                      <>
                        <Send className="h-5 w-5 mr-2 group-hover:translate-x-1 transition-transform duration-300" />
                        Submit for Feedback
                      </>
                    )}
                  </button>

                  <button
                    onClick={saveEssay}
                    disabled={!essay.trim()}
                    className="group bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-6 py-3 rounded-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                  >
                    <Save className="h-5 w-5 mr-2 group-hover:scale-110 transition-transform duration-300" />
                    Save Draft
                  </button>

                  <button
                    onClick={resetEssay}
                    className="group bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 text-white px-6 py-3 rounded-lg transition-all duration-300 transform hover:scale-105 flex items-center"
                  >
                    <RotateCcw className="h-5 w-5 mr-2 group-hover:rotate-180 transition-transform duration-300" />
                    Reset
                  </button>
                </div>
              </div>
            </div>

            {/* Feedback Section */}
            <div className="animate-fade-in-up delay-600">
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700 sticky top-8">
                <h2 className="text-xl font-semibold text-white mb-6">AI Feedback</h2>

                {!feedback && !isAnalyzing && (
                  <div className="text-center py-12">
                    <FileText className="h-12 w-12 text-gray-500 mx-auto mb-4" />
                    <p className="text-gray-400">Submit your essay to receive detailed feedback</p>
                  </div>
                )}

                {isAnalyzing && (
                  <div className="text-center py-12">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-400 mx-auto mb-4"></div>
                    <p className="text-gray-400">Analyzing your essay...</p>
                  </div>
                )}

                {feedback && (
                  <div className="space-y-6">
                    {/* Overall Band Score */}
                    <div className="text-center bg-gray-700/30 rounded-lg p-4">
                      <div className="text-3xl font-bold text-green-400 mb-2">{feedback.overallBand}</div>
                      <div className="text-gray-400">Overall Band Score</div>
                    </div>

                    {/* Detailed Scores */}
                    <div className="space-y-4">
                      {Object.entries(feedback)
                        .filter(([key]) => !["overallBand", "suggestions"].includes(key))
                        .map(([category, data]) => (
                          <div key={category} className="bg-gray-700/30 rounded-lg p-4">
                            <div className="flex items-center justify-between mb-2">
                              <h3 className="text-white font-medium text-sm">
                                {category.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase())}
                              </h3>
                              <div className="flex items-center">
                                <Award className="h-4 w-4 text-yellow-400 mr-1" />
                                <span className="text-green-400 font-semibold">{data.score}</span>
                              </div>
                            </div>
                            <p className="text-gray-300 text-xs mb-3">{data.feedback}</p>

                            {/* Strengths */}
                            <div className="mb-3">
                              <h4 className="text-green-400 text-xs font-medium mb-1 flex items-center">
                                <CheckCircle className="h-3 w-3 mr-1" />
                                Strengths
                              </h4>
                              <ul className="space-y-1">
                                {data.strengths.map((strength, index) => (
                                  <li key={index} className="text-gray-400 text-xs flex items-start">
                                    <span className="text-green-400 mr-1">•</span>
                                    {strength}
                                  </li>
                                ))}
                              </ul>
                            </div>

                            {/* Weaknesses */}
                            <div>
                              <h4 className="text-yellow-400 text-xs font-medium mb-1 flex items-center">
                                <AlertTriangle className="h-3 w-3 mr-1" />
                                Areas for Improvement
                              </h4>
                              <ul className="space-y-1">
                                {data.weaknesses.map((weakness, index) => (
                                  <li key={index} className="text-gray-400 text-xs flex items-start">
                                    <span className="text-yellow-400 mr-1">•</span>
                                    {weakness}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        ))}
                    </div>

                    {/* Suggestions */}
                    <div className="bg-gray-700/30 rounded-lg p-4">
                      <h3 className="text-white font-medium mb-3 flex items-center">
                        <Lightbulb className="h-4 w-4 text-yellow-400 mr-2" />
                        Suggestions for Improvement
                      </h3>
                      <ul className="space-y-2">
                        {feedback.suggestions.map((suggestion, index) => (
                          <li key={index} className="text-gray-300 text-sm flex items-start">
                            <span className="text-blue-400 mr-2 mt-1">•</span>
                            {suggestion}
                          </li>
                        ))}
                      </ul>
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

export default WritingPage
