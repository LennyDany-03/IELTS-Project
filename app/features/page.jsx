"use client"

import React from "react"

import { useState } from "react"
import {
  Mic,
  FileText,
  Headphones,
  BookOpen,
  Target,
  Calendar,
  BarChart3,
  Zap,
  CheckCircle,
  ArrowRight,
  Play,
  Brain,
  TrendingUp,
  Clock,
  Users,
  Globe,
  Sparkles,
  Star,
  Trophy,
  Lightbulb,
  Shield,
  Smartphone,
} from "lucide-react"
import Navbar from "../../components/Navbar"
import Footer from "../../components/Footer"

const FeaturesPage = () => {
  const [activeFeature, setActiveFeature] = useState(0)

  const mainFeatures = [
    {
      icon: Mic,
      title: "AI Speaking Practice",
      subtitle: "Real-time pronunciation & fluency analysis",
      description:
        "Practice speaking with our advanced AI that records and scores your answers just like the real IELTS speaking test. Get instant feedback on fluency, pronunciation, coherence, and vocabulary usage.",
      benefits: [
        "Real-time pronunciation analysis",
        "Fluency and coherence scoring",
        "Vocabulary assessment",
        "Speaking confidence building",
        "Accent-neutral evaluation",
      ],
      color: "from-blue-600 to-blue-700",
      bgColor: "bg-blue-500/10",
      borderColor: "border-blue-500/30",
    },
    {
      icon: FileText,
      title: "Smart Writing Feedback",
      subtitle: "GPT-powered essay analysis & band prediction",
      description:
        "Submit your essays and receive detailed band prediction and improvement tips powered by GPT and Azure Text Analytics. Get comprehensive feedback on grammar, coherence, task achievement, and lexical resource.",
      benefits: [
        "Detailed band score prediction",
        "Grammar and vocabulary analysis",
        "Task achievement evaluation",
        "Coherence and cohesion feedback",
        "Personalized improvement tips",
      ],
      color: "from-green-600 to-green-700",
      bgColor: "bg-green-500/10",
      borderColor: "border-green-500/30",
    },
    {
      icon: Headphones,
      title: "Interactive Listening Practice",
      subtitle: "Audio clips with instant scoring",
      description:
        "Listen to authentic audio clips, answer questions, and get instant feedback with detailed scoring. Practice with various accents and question types to improve your listening comprehension.",
      benefits: [
        "Multiple accent training",
        "Instant feedback and scoring",
        "Various question formats",
        "Note-taking practice",
        "Listening strategy development",
      ],
      color: "from-purple-600 to-purple-700",
      bgColor: "bg-purple-500/10",
      borderColor: "border-purple-500/30",
    },
    {
      icon: BookOpen,
      title: "Reading Comprehension",
      subtitle: "Timed passages with detailed explanations",
      description:
        "Master reading comprehension with timed passages, quizzes, and detailed explanations. Sharpen your skimming and scanning skills with academic texts similar to the real IELTS exam.",
      benefits: [
        "Timed reading practice",
        "Academic text exposure",
        "Skimming and scanning techniques",
        "Question strategy training",
        "Vocabulary building",
      ],
      color: "from-orange-600 to-orange-700",
      bgColor: "bg-orange-500/10",
      borderColor: "border-orange-500/30",
    },
    {
      icon: Target,
      title: "Band Score Estimator",
      subtitle: "Accurate IELTS level assessment",
      description:
        "Take comprehensive assessments and get an accurate estimate of your current IELTS level. Our AI analyzes your performance across all skills to predict your band score.",
      benefits: [
        "Accurate band prediction",
        "Skill-specific analysis",
        "Progress tracking",
        "Weakness identification",
        "Goal setting assistance",
      ],
      color: "from-red-600 to-red-700",
      bgColor: "bg-red-500/10",
      borderColor: "border-red-500/30",
    },
    {
      icon: Calendar,
      title: "AI Study Planner",
      subtitle: "Personalized learning schedule",
      description:
        "Generate a personalized weekly or daily study plan based on your target band score and available time. Our AI creates an optimized learning path tailored to your needs.",
      benefits: [
        "Personalized study schedules",
        "Goal-oriented planning",
        "Time optimization",
        "Progress milestones",
        "Adaptive recommendations",
      ],
      color: "from-indigo-600 to-indigo-700",
      bgColor: "bg-indigo-500/10",
      borderColor: "border-indigo-500/30",
    },
  ]

  const additionalFeatures = [
    {
      icon: BarChart3,
      title: "Gamified Dashboard",
      description: "Track scores, progress, streaks, and XP in a fun and motivating way",
    },
    {
      icon: Brain,
      title: "AI-Powered Analytics",
      description: "Advanced insights into your learning patterns and performance trends",
    },
    {
      icon: Globe,
      title: "Multi-Platform Access",
      description: "Study anywhere, anytime on web, mobile, and tablet devices",
    },
    {
      icon: Shield,
      title: "Secure & Private",
      description: "Your data is protected with enterprise-grade security measures",
    },
    {
      icon: Users,
      title: "Community Support",
      description: "Connect with fellow IELTS candidates and share learning experiences",
    },
    {
      icon: Smartphone,
      title: "Mobile Optimized",
      description: "Seamless experience across all devices with responsive design",
    },
  ]

  const stats = [
    { number: "50,000+", label: "Students Helped", icon: Users },
    { number: "95%", label: "Success Rate", icon: Trophy },
    { number: "4.8/5", label: "User Rating", icon: Star },
    { number: "24/7", label: "AI Availability", icon: Clock },
  ]

  return (
    <div className="min-h-screen bg-gray-900">
      <Navbar />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-gray-900 via-blue-900/50 to-gray-900 text-white py-20 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/10 rounded-full animate-float"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500/10 rounded-full animate-float delay-1000"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="animate-fade-in-up">
            <div className="inline-flex items-center bg-blue-600/20 text-blue-400 px-6 py-3 rounded-full text-sm font-medium mb-8 border border-blue-500/30">
              <Sparkles className="h-4 w-4 mr-2 animate-fade-glow" />
              Powered by Advanced AI Technology
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Features That{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 animate-gradient">
                Transform
              </span>{" "}
              Your IELTS Prep
            </h1>
            <p className="text-xl mb-8 text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Discover the powerful AI-driven features that make IELTS AI Coach the most effective way to achieve your
              target band score faster than traditional methods.
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12 animate-fade-in-up delay-400">
            {stats.map((stat, index) => (
              <div
                key={stat.label}
                className={`bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700 card-hover hover-glow animate-slide-in-up`}
                style={{ animationDelay: `${400 + index * 100}ms` }}
              >
                <stat.icon className="h-8 w-8 text-blue-400 mx-auto mb-3 icon-fade" />
                <div className="text-2xl font-bold text-white mb-1 animate-fade-glow">{stat.number}</div>
                <div className="text-gray-400 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Features Section */}
      <section className="py-20 bg-gray-800 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900/50 to-gray-800"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-fade-in-up">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Core{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 animate-gradient">
                AI Features
              </span>
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Each feature is designed to target specific IELTS skills with AI-powered precision and personalized
              feedback.
            </p>
          </div>

          {/* Feature Tabs */}
          <div className="flex flex-wrap justify-center gap-2 mb-12 animate-fade-in-up delay-200">
            {mainFeatures.map((feature, index) => (
              <button
                key={index}
                onClick={() => setActiveFeature(index)}
                className={`flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-smooth hover-lift ${
                  activeFeature === index
                    ? "bg-blue-600 text-white"
                    : "bg-gray-700/50 text-gray-300 hover:bg-gray-600/50"
                }`}
              >
                <feature.icon className="h-4 w-4 mr-2" />
                {feature.title}
              </button>
            ))}
          </div>

          {/* Active Feature Display */}
          <div className="animate-scale-in">
            <div
              className={`${mainFeatures[activeFeature].bgColor} ${mainFeatures[activeFeature].borderColor} border rounded-2xl p-8 md:p-12`}
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div className="animate-slide-in-left">
                  <div className="flex items-center mb-6">
                    <div
                      className={`bg-gradient-to-r ${mainFeatures[activeFeature].color} p-4 rounded-xl mr-4 animate-fade-glow`}
                    >
                      {React.createElement(mainFeatures[activeFeature].icon, {
                        className: "h-8 w-8 text-white",
                      })}
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-white">{mainFeatures[activeFeature].title}</h3>
                      <p className="text-gray-400">{mainFeatures[activeFeature].subtitle}</p>
                    </div>
                  </div>
                  <p className="text-gray-300 text-lg mb-6 leading-relaxed">
                    {mainFeatures[activeFeature].description}
                  </p>
                  <div className="space-y-3">
                    {mainFeatures[activeFeature].benefits.map((benefit, index) => (
                      <div
                        key={index}
                        className={`flex items-center animate-slide-in-left`}
                        style={{ animationDelay: `${index * 100}ms` }}
                      >
                        <CheckCircle className="h-5 w-5 text-green-400 mr-3 flex-shrink-0 icon-fade" />
                        <span className="text-gray-300">{benefit}</span>
                      </div>
                    ))}
                  </div>
                  <button className="mt-8 group bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-6 py-3 rounded-lg transition-smooth hover-lift flex items-center btn-animate">
                    <Play className="h-5 w-5 mr-2 group-hover:scale-125 transition-smooth" />
                    Try This Feature
                    <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-2 transition-smooth" />
                  </button>
                </div>

                <div className="animate-slide-in-right">
                  <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-8 border border-gray-700 card-hover hover-glow">
                    <div className="text-center mb-6">
                      <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full mb-4 animate-fade-glow">
                        <Brain className="h-8 w-8 text-white animate-float" />
                      </div>
                      <h4 className="text-xl font-semibold text-white mb-2">AI-Powered Analysis</h4>
                      <p className="text-gray-400 text-sm">
                        Experience the power of artificial intelligence in IELTS preparation
                      </p>
                    </div>
                    <div className="space-y-4">
                      <div className="bg-gray-800/50 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-gray-300 text-sm">Accuracy</span>
                          <span className="text-green-400 font-semibold">98%</span>
                        </div>
                        <div className="w-full bg-gray-700 rounded-full h-2">
                          <div className="bg-gradient-to-r from-green-600 to-green-400 h-2 rounded-full w-[98%] progress-fade"></div>
                        </div>
                      </div>
                      <div className="bg-gray-800/50 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-gray-300 text-sm">Response Time</span>
                          <span className="text-blue-400 font-semibold">{"<"}2s</span>
                        </div>
                        <div className="w-full bg-gray-700 rounded-full h-2">
                          <div className="bg-gradient-to-r from-blue-600 to-blue-400 h-2 rounded-full w-[95%] progress-fade"></div>
                        </div>
                      </div>
                      <div className="bg-gray-800/50 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-gray-300 text-sm">User Satisfaction</span>
                          <span className="text-purple-400 font-semibold">4.8/5</span>
                        </div>
                        <div className="w-full bg-gray-700 rounded-full h-2">
                          <div className="bg-gradient-to-r from-purple-600 to-purple-400 h-2 rounded-full w-[96%] progress-fade"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Additional Features Grid */}
      <section className="py-20 bg-gray-900 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-32 h-32 bg-blue-500/5 rounded-full animate-float"></div>
          <div className="absolute bottom-20 right-20 w-32 h-32 bg-purple-500/5 rounded-full animate-float delay-1000"></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-fade-in-up">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Additional{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 animate-gradient">
                Platform Benefits
              </span>
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Beyond core IELTS skills, our platform offers comprehensive tools for a complete learning experience.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {additionalFeatures.map((feature, index) => (
              <div
                key={index}
                className={`group bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700 hover:border-blue-500/50 transition-smooth card-hover hover-glow animate-fade-in-up`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-3 rounded-lg w-fit mb-4 group-hover:animate-fade-glow transition-smooth">
                  <feature.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-blue-400 transition-smooth">
                  {feature.title}
                </h3>
                <p className="text-gray-400 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technology Section */}
      <section className="py-20 bg-gray-800 relative">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-fade-in-up">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Powered by{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 animate-gradient">
                Cutting-Edge AI
              </span>
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Our platform leverages the latest in artificial intelligence and machine learning technologies.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center animate-fade-in-up delay-200">
              <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-6 rounded-full w-20 h-20 mx-auto mb-6 animate-fade-glow">
                <Brain className="h-8 w-8 text-white mx-auto mt-2" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">GPT Integration</h3>
              <p className="text-gray-400">
                Advanced language models provide human-like feedback and natural conversation practice.
              </p>
            </div>

            <div className="text-center animate-fade-in-up delay-400">
              <div className="bg-gradient-to-r from-green-600 to-green-700 p-6 rounded-full w-20 h-20 mx-auto mb-6 animate-fade-glow">
                <TrendingUp className="h-8 w-8 text-white mx-auto mt-2" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Azure AI Services</h3>
              <p className="text-gray-400">
                Microsoft Azure's powerful AI services ensure accurate analysis and reliable performance.
              </p>
            </div>

            <div className="text-center animate-fade-in-up delay-600">
              <div className="bg-gradient-to-r from-purple-600 to-purple-700 p-6 rounded-full w-20 h-20 mx-auto mb-6 animate-fade-glow">
                <Lightbulb className="h-8 w-8 text-white mx-auto mt-2" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Machine Learning</h3>
              <p className="text-gray-400">
                Adaptive algorithms that learn from your progress and personalize your learning experience.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 text-white py-20 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-blue-600/20 to-purple-600/20 animate-gradient"></div>
        </div>
        <div className="relative max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <div className="animate-fade-in-up">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Experience{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-purple-300 animate-gradient">
                AI-Powered Learning?
              </span>
            </h2>
            <p className="text-xl mb-8 text-blue-100">
              Join thousands of students who have transformed their IELTS preparation with our advanced AI features.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up delay-200">
              <button className="group bg-white text-blue-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-smooth shadow-lg hover-lift btn-animate flex items-center justify-center">
                <Zap className="h-5 w-5 mr-2 group-hover:animate-fade-glow" />
                Start Free Trial
                <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-2 transition-smooth" />
              </button>
              <button className="group border-2 border-white text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-white hover:text-blue-600 transition-smooth hover-lift flex items-center justify-center">
                <Play className="h-5 w-5 mr-2 group-hover:scale-125 transition-smooth" />
                Watch Demo
              </button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default FeaturesPage
