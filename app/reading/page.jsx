"use client"

import { useState, useEffect, useRef } from "react"
import {
  BookOpen,
  Clock,
  CheckCircle,
  ArrowLeft,
  Send,
  Award,
  Eye,
  Target,
  AlertTriangle,
  TrendingUp,
  FileText,
  Lightbulb,
  RotateCcw,
} from "lucide-react"
import Navbar from "../../components/Navbar"
import Footer from "../../components/Footer"

const ReadingPage = () => {
  const [timeRemaining, setTimeRemaining] = useState(60 * 60) // 60 minutes
  const [answers, setAnswers] = useState({})
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [score, setScore] = useState(null)
  const [currentPassage, setCurrentPassage] = useState(0)
  const [readingProgress, setReadingProgress] = useState(0)
  const timerRef = useRef(null)
  const passageRef = useRef(null)

  const passages = [
    {
      title: "The Evolution of Artificial Intelligence in Healthcare",
      text: `Artificial Intelligence (AI) has emerged as a transformative force in healthcare, revolutionizing how medical professionals diagnose, treat, and prevent diseases. The integration of AI technologies into healthcare systems represents one of the most significant advances in medical science since the discovery of antibiotics.

The journey of AI in healthcare began in the 1970s with expert systems designed to assist in medical diagnosis. These early systems, such as MYCIN for bacterial infection diagnosis, laid the groundwork for today's sophisticated AI applications. However, it wasn't until the advent of machine learning and deep learning algorithms in the 21st century that AI truly began to realize its potential in healthcare.

Modern AI applications in healthcare are diverse and far-reaching. In diagnostic imaging, AI algorithms can now detect abnormalities in X-rays, MRIs, and CT scans with accuracy that often surpasses human radiologists. For instance, Google's DeepMind has developed an AI system that can diagnose over 50 eye diseases with 94% accuracy, potentially preventing blindness in millions of patients worldwide.

Drug discovery, traditionally a process that takes 10-15 years and costs billions of dollars, is being revolutionized by AI. Machine learning algorithms can analyze vast databases of molecular structures and predict which compounds are most likely to become effective medications. This has already led to the identification of potential treatments for diseases like Alzheimer's and cancer in a fraction of the traditional time.

Personalized medicine represents another frontier where AI is making significant strides. By analyzing genetic data, lifestyle factors, and medical history, AI systems can predict individual patient responses to treatments and recommend personalized therapy plans. This approach not only improves treatment outcomes but also reduces adverse drug reactions and healthcare costs.

The implementation of AI in healthcare is not without challenges. Privacy concerns regarding patient data, the need for regulatory approval, and the requirement for extensive validation studies all present obstacles. Additionally, there are concerns about the potential for AI to replace human healthcare workers, though most experts believe AI will augment rather than replace medical professionals.

Looking toward the future, AI promises to make healthcare more accessible, accurate, and affordable. Telemedicine platforms powered by AI can provide medical consultations to remote areas, while predictive analytics can help prevent disease outbreaks. As AI technology continues to evolve, its integration into healthcare systems worldwide will likely accelerate, bringing us closer to a future where precision medicine is the norm rather than the exception.

The ethical implications of AI in healthcare also deserve consideration. Questions about algorithmic bias, informed consent for AI-driven treatments, and the responsibility for AI-made medical decisions are becoming increasingly important as these technologies become more prevalent. Healthcare institutions must develop robust frameworks to ensure that AI is implemented responsibly and equitably.

Despite these challenges, the potential benefits of AI in healthcare are immense. From early disease detection to personalized treatment plans, AI has the power to save lives, reduce suffering, and improve the quality of healthcare for people around the world. As we continue to navigate this technological revolution, collaboration between technologists, healthcare professionals, and policymakers will be essential to realize AI's full potential while addressing its inherent risks.`,
      wordCount: 487,
    },
    {
      title: "Climate Change and Urban Planning: Adapting Cities for the Future",
      text: `As climate change continues to reshape our planet's environmental landscape, urban planners worldwide are grappling with the challenge of creating resilient cities that can withstand extreme weather events while maintaining livability for their inhabitants. The intersection of climate science and urban development has become one of the most critical areas of focus for sustainable development in the 21st century.

Cities are particularly vulnerable to climate change impacts due to their high population density, extensive infrastructure, and the urban heat island effect. This phenomenon, where urban areas experience significantly higher temperatures than surrounding rural areas, is exacerbated by climate change and poses serious health risks to urban populations. Heat waves, which are becoming more frequent and intense, can be deadly, particularly for vulnerable populations such as the elderly and those with pre-existing health conditions.

Flooding represents another major challenge for urban areas. As sea levels rise and extreme precipitation events become more common, cities must develop comprehensive flood management strategies. Traditional approaches, such as building higher seawalls and expanding drainage systems, are proving insufficient. Instead, planners are embracing nature-based solutions, including the creation of urban wetlands, permeable pavements, and green roofs that can absorb excess water while providing additional environmental benefits.

The concept of "sponge cities" has gained traction in recent years, particularly in China, where rapid urbanization has led to severe flooding problems. These cities are designed to absorb, store, and purify rainwater through natural processes, reducing flood risk while improving water quality. Features include bioswales, retention ponds, and green infrastructure that work together to manage stormwater naturally.

Transportation systems in cities are also being reimagined in response to climate change. The shift toward electric vehicles, expanded public transit networks, and bicycle-friendly infrastructure not only reduces greenhouse gas emissions but also improves air quality and public health. Cities like Copenhagen and Amsterdam have demonstrated how prioritizing cycling and public transportation can create more livable, sustainable urban environments.

Energy efficiency in buildings has become a cornerstone of climate-adaptive urban planning. Green building standards, such as LEED and BREEAM, are being implemented worldwide to reduce energy consumption and carbon emissions. Innovative technologies, including smart grids, solar panels, and energy-efficient HVAC systems, are being integrated into both new construction and retrofitted existing buildings.

Urban agriculture is emerging as another important component of climate-resilient cities. Vertical farms, rooftop gardens, and community food forests not only provide fresh produce to urban populations but also help mitigate the urban heat island effect, improve air quality, and reduce the carbon footprint associated with food transportation.

The social dimensions of climate adaptation cannot be overlooked. Climate change disproportionately affects low-income communities, who often live in areas most vulnerable to flooding, heat, and air pollution. Equitable urban planning must ensure that climate adaptation measures benefit all residents, not just those in affluent neighborhoods.

Technology plays an increasingly important role in climate-adaptive urban planning. Smart city technologies, including sensors, data analytics, and artificial intelligence, enable real-time monitoring of environmental conditions and more responsive urban management. These tools can help cities optimize energy use, manage traffic flow, and respond quickly to climate-related emergencies.

International cooperation and knowledge sharing are essential for advancing climate-adaptive urban planning. Cities around the world are learning from each other's successes and failures, sharing best practices through networks like C40 Cities and ICLEI. This collaborative approach accelerates innovation and helps cities avoid costly mistakes in their adaptation efforts.`,
      wordCount: 542,
    },
  ]

  const questions = [
    // Passage 1 Questions
    {
      id: 1,
      passage: 0,
      question: "According to the passage, when did AI in healthcare begin to realize its true potential?",
      options: [
        "In the 1970s with expert systems",
        "With the discovery of antibiotics",
        "In the 21st century with machine learning",
        "When Google developed DeepMind",
      ],
      correct: 2,
      type: "multiple-choice",
      explanation:
        "The passage states that 'it wasn't until the advent of machine learning and deep learning algorithms in the 21st century that AI truly began to realize its potential in healthcare.'",
    },
    {
      id: 2,
      passage: 0,
      question: "What accuracy rate does Google's DeepMind achieve in diagnosing eye diseases?",
      options: ["84%", "94%", "90%", "99%"],
      correct: 1,
      type: "multiple-choice",
      explanation:
        "The text explicitly mentions that 'Google's DeepMind has developed an AI system that can diagnose over 50 eye diseases with 94% accuracy.'",
    },
    {
      id: 3,
      passage: 0,
      question: "How long does traditional drug discovery typically take?",
      options: ["5-8 years", "10-15 years", "15-20 years", "20-25 years"],
      correct: 1,
      type: "multiple-choice",
      explanation:
        "The passage states that 'Drug discovery, traditionally a process that takes 10-15 years and costs billions of dollars, is being revolutionized by AI.'",
    },
    {
      id: 4,
      passage: 0,
      question: "True or False: The passage suggests AI will completely replace human healthcare workers.",
      options: ["True", "False"],
      correct: 1,
      type: "true-false",
      explanation:
        "The passage states that 'most experts believe AI will augment rather than replace medical professionals,' indicating AI will assist rather than replace humans.",
    },
    {
      id: 5,
      passage: 0,
      question: "Which of the following is NOT mentioned as a challenge for AI implementation in healthcare?",
      options: [
        "Privacy concerns regarding patient data",
        "Need for regulatory approval",
        "High cost of AI technology",
        "Requirement for extensive validation studies",
      ],
      correct: 2,
      type: "multiple-choice",
      explanation:
        "The passage mentions privacy concerns, regulatory approval, and validation studies as challenges, but does not specifically mention the high cost of AI technology as a challenge.",
    },

    // Passage 2 Questions
    {
      id: 6,
      passage: 1,
      question: "What is the urban heat island effect?",
      options: [
        "A natural cooling system in cities",
        "Urban areas experiencing higher temperatures than rural areas",
        "The effect of air conditioning on city temperatures",
        "A method of urban planning",
      ],
      correct: 1,
      type: "multiple-choice",
      explanation:
        "The passage defines the urban heat island effect as 'where urban areas experience significantly higher temperatures than surrounding rural areas.'",
    },
    {
      id: 7,
      passage: 1,
      question: "Which countries are specifically mentioned as examples of bicycle-friendly cities?",
      options: ["Germany and Netherlands", "Denmark and Netherlands", "Sweden and Denmark", "Netherlands and Belgium"],
      correct: 1,
      type: "multiple-choice",
      explanation:
        "The passage mentions 'Cities like Copenhagen and Amsterdam have demonstrated how prioritizing cycling and public transportation can create more livable, sustainable urban environments.' Copenhagen is in Denmark and Amsterdam is in the Netherlands.",
    },
    {
      id: 8,
      passage: 1,
      question: "What are 'sponge cities' designed to do?",
      options: [
        "Absorb pollution from the air",
        "Absorb, store, and purify rainwater",
        "Absorb noise pollution",
        "Absorb excess population",
      ],
      correct: 1,
      type: "multiple-choice",
      explanation:
        "The passage explains that sponge cities 'are designed to absorb, store, and purify rainwater through natural processes, reducing flood risk while improving water quality.'",
    },
    {
      id: 9,
      passage: 1,
      question: "True or False: Climate change affects all urban communities equally.",
      options: ["True", "False"],
      correct: 1,
      type: "true-false",
      explanation:
        "The passage states that 'Climate change disproportionately affects low-income communities, who often live in areas most vulnerable to flooding, heat, and air pollution,' indicating unequal impacts.",
    },
    {
      id: 10,
      passage: 1,
      question: "Which building standards are mentioned in the passage?",
      options: ["LEED and ENERGY STAR", "LEED and BREEAM", "BREEAM and GREEN GLOBE", "ENERGY STAR and GREEN GLOBE"],
      correct: 1,
      type: "multiple-choice",
      explanation:
        "The passage specifically mentions 'Green building standards, such as LEED and BREEAM, are being implemented worldwide.'",
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
  }, [currentPassage])

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

    // IELTS Reading band score calculation
    if (percentage >= 90) bandScore = 9.0
    else if (percentage >= 80) bandScore = 8.0
    else if (percentage >= 70) bandScore = 7.0
    else if (percentage >= 60) bandScore = 6.0
    else if (percentage >= 50) bandScore = 5.0
    else if (percentage >= 40) bandScore = 4.0
    else if (percentage >= 30) bandScore = 3.0
    else bandScore = 2.0

    setScore({
      correct: correctAnswers,
      total: questions.length,
      percentage,
      bandScore,
      timeUsed: 60 * 60 - timeRemaining,
      readingSpeed: calculateReadingSpeed(),
      strengths: getStrengths(correctAnswers, questions.length),
      weaknesses: getWeaknesses(correctAnswers, questions.length),
      recommendations: getRecommendations(bandScore),
    })
  }

  const calculateReadingSpeed = () => {
    const totalWords = passages.reduce((sum, passage) => sum + passage.wordCount, 0)
    const timeUsedMinutes = (60 * 60 - timeRemaining) / 60
    return Math.round(totalWords / timeUsedMinutes)
  }

  const getStrengths = (correct, total) => {
    const percentage = (correct / total) * 100
    const strengths = []

    if (percentage >= 70) {
      strengths.push("Strong overall comprehension")
      strengths.push("Good attention to detail")
    }
    if (percentage >= 60) {
      strengths.push("Adequate understanding of main ideas")
    }
    if (readingProgress > 80) {
      strengths.push("Thorough reading approach")
    }

    return strengths.length > 0 ? strengths : ["Shows potential for improvement"]
  }

  const getWeaknesses = (correct, total) => {
    const percentage = (correct / total) * 100
    const weaknesses = []

    if (percentage < 50) {
      weaknesses.push("Difficulty with detailed comprehension")
      weaknesses.push("May need to improve vocabulary")
    }
    if (percentage < 70) {
      weaknesses.push("Could benefit from more practice with inference questions")
    }
    if (timeRemaining < 300) {
      weaknesses.push("Time management needs improvement")
    }

    return weaknesses.length > 0 ? weaknesses : ["Minor areas for refinement"]
  }

  const getRecommendations = (bandScore) => {
    if (bandScore >= 8.0) {
      return [
        "Maintain your excellent reading skills with regular practice",
        "Focus on advanced vocabulary and complex text structures",
        "Practice with academic and technical texts",
      ]
    } else if (bandScore >= 6.0) {
      return [
        "Practice skimming and scanning techniques",
        "Work on identifying main ideas and supporting details",
        "Expand academic vocabulary through reading",
      ]
    } else {
      return [
        "Focus on basic comprehension skills",
        "Build vocabulary through extensive reading",
        "Practice with shorter texts before attempting longer passages",
      ]
    }
  }

  const resetTest = () => {
    setAnswers({})
    setIsSubmitted(false)
    setScore(null)
    setCurrentPassage(0)
    setTimeRemaining(60 * 60)
    setReadingProgress(0)

    if (timerRef.current) {
      clearInterval(timerRef.current)
    }

    // Restart timer
    timerRef.current = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          handleSubmit()
          return 0
        }
        return prev - 1
      })
    }, 1000)
  }

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  const formatTimeUsed = (seconds) => {
    const mins = Math.floor(seconds / 60)
    return `${mins} minutes`
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
              <BookOpen className="h-8 w-8 mr-3 text-orange-400 icon-fade" />
              Reading Comprehension Test
            </h1>
            <p className="text-gray-400">Read the passages carefully and answer the questions that follow</p>
          </div>

          {/* Timer and Progress */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            {/* Timer */}
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

            {/* Reading Progress */}
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-4 border border-gray-700 animate-fade-in-up delay-300">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center">
                  <Eye className="h-5 w-5 text-blue-400 mr-2 icon-fade" />
                  <span className="text-white font-medium">Reading Progress</span>
                </div>
                <span className="text-blue-400 font-semibold">{Math.round(readingProgress)}%</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div
                  className="bg-gradient-to-r from-blue-600 to-blue-400 h-2 rounded-full progress-fade"
                  style={{ width: `${readingProgress}%` }}
                ></div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Reading Passage */}
            <div className="animate-fade-in-up delay-400">
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700 sticky top-8 card-hover hover-glow">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold text-white flex items-center">
                    <FileText className="h-5 w-5 mr-2 text-orange-400 icon-fade" />
                    Reading Passage
                  </h2>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-400">
                      Passage {currentPassage + 1} of {passages.length}
                    </span>
                    {passages.length > 1 && (
                      <div className="flex space-x-1">
                        {passages.map((_, index) => (
                          <button
                            key={index}
                            onClick={() => setCurrentPassage(index)}
                            className={`w-3 h-3 rounded-full transition-smooth ${
                              index === currentPassage ? "bg-orange-400" : "bg-gray-600 hover:bg-gray-500"
                            }`}
                          />
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                <div ref={passageRef} className="bg-gray-700/30 rounded-lg p-4 max-h-96 overflow-y-auto">
                  <h3 className="text-lg font-medium text-orange-400 mb-4">{passages[currentPassage].title}</h3>
                  <div className="text-gray-300 leading-relaxed space-y-4 text-justify">
                    {passages[currentPassage].text.split("\n\n").map((paragraph, index) => (
                      <p key={index} className="animate-fade-in-up" style={{ animationDelay: `${index * 100}ms` }}>
                        {paragraph}
                      </p>
                    ))}
                  </div>
                  <div className="mt-4 text-sm text-gray-500 text-center">
                    Word count: {passages[currentPassage].wordCount} words
                  </div>
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
                  {questions
                    .filter((q) => q.passage === currentPassage)
                    .map((question, index) => (
                      <div
                        key={question.id}
                        className={`bg-gray-700/30 rounded-lg p-4 animate-slide-in-up`}
                        style={{ animationDelay: `${index * 100}ms` }}
                      >
                        <h3 className="text-white font-medium mb-4">
                          {question.id}. {question.question}
                        </h3>
                        <div className="space-y-2">
                          {question.options.map((option, optionIndex) => (
                            <label
                              key={optionIndex}
                              className={`flex items-center p-3 rounded-lg cursor-pointer transition-smooth hover-lift ${
                                answers[question.id] === optionIndex
                                  ? "bg-orange-600/20 border border-orange-500"
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
                                  answers[question.id] === optionIndex
                                    ? "border-orange-400 bg-orange-400"
                                    : "border-gray-400"
                                }`}
                              >
                                {answers[question.id] === optionIndex && (
                                  <div className="w-2 h-2 rounded-full bg-white"></div>
                                )}
                              </div>
                              <span className="text-gray-300 flex-1">{option}</span>
                              {isSubmitted && optionIndex === question.correct && (
                                <CheckCircle className="h-5 w-5 text-green-400 ml-auto icon-fade" />
                              )}
                            </label>
                          ))}
                        </div>

                        {/* Show explanation after submission */}
                        {isSubmitted && (
                          <div className="mt-4 p-3 bg-blue-600/10 border border-blue-500/30 rounded-lg animate-fade-in-up">
                            <div className="flex items-start">
                              <Lightbulb className="h-4 w-4 text-blue-400 mr-2 mt-0.5 flex-shrink-0 icon-fade" />
                              <div>
                                <p className="text-blue-400 font-medium text-sm mb-1">Explanation:</p>
                                <p className="text-gray-300 text-sm">{question.explanation}</p>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                </div>

                {/* Submit Button or Results */}
                {!isSubmitted ? (
                  <div className="mt-6 text-center">
                    <button
                      onClick={handleSubmit}
                      disabled={Object.keys(answers).length !== questions.length}
                      className="group bg-gradient-to-r from-orange-600 to-orange-700 hover:from-orange-700 hover:to-orange-800 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-smooth transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center mx-auto btn-animate hover-lift"
                    >
                      <Send className="h-5 w-5 mr-2 group-hover:translate-x-1 transition-smooth icon-fade" />
                      Submit Test
                    </button>
                    <p className="text-gray-400 text-sm mt-2">
                      Answer all questions before submitting ({Object.keys(answers).length}/{questions.length}{" "}
                      completed)
                    </p>
                  </div>
                ) : (
                  <div className="mt-6 space-y-4">
                    {/* Quick Results */}
                    <div className="bg-gray-700/30 rounded-lg p-4 text-center animate-scale-in">
                      <h3 className="text-xl font-bold text-white mb-4">Test Results</h3>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                        <div className="bg-gray-600/30 rounded-lg p-3">
                          <div className="text-2xl font-bold text-orange-400 mb-1 animate-fade-glow">
                            {score?.bandScore}
                          </div>
                          <div className="text-gray-400 text-sm">Band Score</div>
                        </div>
                        <div className="bg-gray-600/30 rounded-lg p-3">
                          <div className="text-2xl font-bold text-green-400 mb-1">
                            {score?.correct}/{score?.total}
                          </div>
                          <div className="text-gray-400 text-sm">Correct</div>
                        </div>
                        <div className="bg-gray-600/30 rounded-lg p-3">
                          <div className="text-2xl font-bold text-blue-400 mb-1">{score?.percentage.toFixed(0)}%</div>
                          <div className="text-gray-400 text-sm">Accuracy</div>
                        </div>
                        <div className="bg-gray-600/30 rounded-lg p-3">
                          <div className="text-2xl font-bold text-purple-400 mb-1">{score?.readingSpeed}</div>
                          <div className="text-gray-400 text-sm">WPM</div>
                        </div>
                      </div>

                      {/* Reset Button */}
                      <button
                        onClick={resetTest}
                        className="group bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-6 py-3 rounded-lg transition-smooth hover-lift flex items-center mx-auto btn-animate"
                      >
                        <RotateCcw className="h-5 w-5 mr-2 group-hover:rotate-180 transition-smooth" />
                        Take Another Test
                      </button>
                    </div>

                    {/* Detailed Analysis */}
                    <div className="bg-gray-700/30 rounded-lg p-4 animate-fade-in-up delay-200">
                      <h4 className="text-white font-medium mb-3 flex items-center">
                        <TrendingUp className="h-4 w-4 mr-2 text-green-400 icon-fade" />
                        Performance Analysis
                      </h4>

                      <div className="space-y-3">
                        <div>
                          <p className="text-green-400 text-sm font-medium mb-1">Strengths:</p>
                          <ul className="space-y-1">
                            {score?.strengths.map((strength, index) => (
                              <li key={index} className="text-gray-300 text-sm flex items-start">
                                <CheckCircle className="h-3 w-3 text-green-400 mr-2 mt-1 flex-shrink-0" />
                                {strength}
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div>
                          <p className="text-yellow-400 text-sm font-medium mb-1">Areas for Improvement:</p>
                          <ul className="space-y-1">
                            {score?.weaknesses.map((weakness, index) => (
                              <li key={index} className="text-gray-300 text-sm flex items-start">
                                <AlertTriangle className="h-3 w-3 text-yellow-400 mr-2 mt-1 flex-shrink-0" />
                                {weakness}
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div>
                          <p className="text-blue-400 text-sm font-medium mb-1">Recommendations:</p>
                          <ul className="space-y-1">
                            {score?.recommendations.map((recommendation, index) => (
                              <li key={index} className="text-gray-300 text-sm flex items-start">
                                <Lightbulb className="h-3 w-3 text-blue-400 mr-2 mt-1 flex-shrink-0" />
                                {recommendation}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>

                    {/* Performance Stats */}
                    <div className="bg-gray-700/30 rounded-lg p-4 animate-fade-in-up delay-300">
                      <h4 className="text-white font-medium mb-3 flex items-center">
                        <Award className="h-4 w-4 mr-2 text-yellow-400 icon-fade" />
                        Test Statistics
                      </h4>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-400">Time Used:</span>
                          <span className="text-white">{formatTimeUsed(score?.timeUsed)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Reading Speed:</span>
                          <span className="text-white">{score?.readingSpeed} WPM</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Passages Read:</span>
                          <span className="text-white">{passages.length}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Questions:</span>
                          <span className="text-white">{questions.length}</span>
                        </div>
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
