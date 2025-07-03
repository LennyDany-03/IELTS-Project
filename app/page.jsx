import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import {
  Brain,
  Mic,
  FileText,
  BarChart3,
  BookOpen,
  Headphones,
  TrendingUp,
  Star,
  CheckCircle,
  ArrowRight,
  Play,
  Zap,
  Target,
  Clock,
  Award,
  Sparkles,
} from "lucide-react"

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gray-900 overflow-x-hidden">
      <Navbar />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-gray-900 via-blue-900/50 to-gray-900 text-white py-20 overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/10 rounded-full animate-float"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500/10 rounded-full animate-float delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-400/5 rounded-full animate-rotate-slow"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="animate-slide-in-left">
              <div className="inline-flex items-center bg-blue-600/20 text-blue-400 px-4 py-2 rounded-full text-sm font-medium mb-6 border border-blue-500/30 animate-bounce-gentle">
                <Sparkles className="h-4 w-4 mr-2 animate-glow-pulse" />
                AI-Powered IELTS Preparation
              </div>
              <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-in-up">
                Master IELTS with{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 animate-gradient">
                  AI
                </span>
              </h1>
              <p className="text-xl mb-8 text-gray-300 leading-relaxed animate-fade-in-up delay-200">
                Get personalized feedback, practice with AI, and achieve your target band score faster than ever before
                with our advanced AI technology.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-up delay-400">
                <button className="group bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-smooth shadow-lg hover:shadow-blue-500/25 hover-lift btn-animate flex items-center justify-center">
                  <Zap className="h-5 w-5 mr-2 group-hover:animate-bounce-gentle" />
                  Get Started
                  <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-2 transition-smooth" />
                </button>
                <button className="group border-2 border-blue-500 text-blue-400 hover:bg-blue-600 hover:text-white px-8 py-4 rounded-lg text-lg font-semibold transition-smooth hover-lift flex items-center justify-center">
                  <Play className="h-5 w-5 mr-2 group-hover:scale-125 transition-smooth" />
                  Watch Demo
                </button>
              </div>
              <div className="flex items-center mt-8 space-x-6 text-gray-400 animate-fade-in-up delay-600">
                <div className="flex items-center group">
                  <CheckCircle className="h-5 w-5 text-green-400 mr-2 group-hover:animate-bounce-gentle" />
                  <span>Free Trial Available</span>
                </div>
                <div className="flex items-center group">
                  <CheckCircle className="h-5 w-5 text-green-400 mr-2 group-hover:animate-bounce-gentle" />
                  <span>No Credit Card Required</span>
                </div>
              </div>
            </div>
            <div className="flex justify-center animate-slide-in-right">
              <div className="relative bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 text-center border border-gray-700 shadow-2xl hover:shadow-blue-500/10 transition-smooth group card-hover">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-smooth"></div>
                <div className="relative">
                  <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full mb-4 animate-pulse-glow">
                    <Brain className="h-10 w-10 text-white animate-float" />
                  </div>
                  <h3 className="text-2xl font-semibold mb-2 text-blue-400">AI Assistant</h3>
                  <p className="text-gray-300 mb-6">Your personal IELTS coach available 24/7</p>
                  <div className="bg-gray-700/50 rounded-lg p-4 text-left animate-scale-in delay-800">
                    <p className="text-gray-300 text-sm">
                      "Ready to practice speaking? I'll analyze your pronunciation, fluency, and provide instant
                      feedback!"
                    </p>
                  </div>
                  <button className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-smooth hover-lift flex items-center mx-auto group btn-animate">
                    <Mic className="h-4 w-4 mr-2 group-hover:animate-bounce-gentle" />
                    Start Practice
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Preview */}
      <section id="features" className="py-20 bg-gray-800 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900/50 to-gray-800"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-fade-in-up">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Powerful Features to{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 animate-gradient">
                Boost Your Score
              </span>
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Our AI-powered platform provides comprehensive IELTS preparation with personalized feedback and practice.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Speaking Practice Card */}
            <div className="group bg-gray-900/50 backdrop-blur-sm rounded-xl shadow-2xl p-8 border border-gray-700 hover:border-blue-500/50 transition-smooth card-hover animate-fade-in-up hover-glow">
              <div className="flex items-center mb-4">
                <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-3 rounded-lg mr-4 group-hover:animate-pulse-glow transition-smooth">
                  <Mic className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-2xl font-semibold text-white">Speaking Practice</h3>
              </div>
              <p className="text-gray-400 mb-6">
                Practice speaking with AI and get instant feedback on pronunciation, fluency, and vocabulary.
              </p>
              <div className="space-y-2 mb-6">
                {["Real-time pronunciation analysis", "Fluency scoring", "Topic-specific practice"].map(
                  (feature, index) => (
                    <div
                      key={feature}
                      className="flex items-center text-sm text-gray-500 animate-slide-in-left"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <CheckCircle className="h-4 w-4 text-blue-400 mr-2" />
                      {feature}
                    </div>
                  ),
                )}
              </div>
              <button className="text-blue-400 font-semibold hover:text-blue-300 transition-smooth group-hover:translate-x-2 transform flex items-center">
                Try Now
                <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-2 transition-smooth" />
              </button>
            </div>

            {/* Essay Feedback Card */}
            <div className="group bg-gray-900/50 backdrop-blur-sm rounded-xl shadow-2xl p-8 border border-gray-700 hover:border-green-500/50 transition-smooth card-hover animate-fade-in-up delay-200 hover-glow">
              <div className="flex items-center mb-4">
                <div className="bg-gradient-to-r from-green-600 to-green-700 p-3 rounded-lg mr-4 group-hover:animate-pulse-glow transition-smooth">
                  <FileText className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-2xl font-semibold text-white">Essay Feedback</h3>
              </div>
              <p className="text-gray-400 mb-6">
                Submit your essays and receive detailed feedback on grammar, coherence, and task achievement.
              </p>
              <div className="space-y-2 mb-6">
                {["Grammar & vocabulary analysis", "Structure review", "Band score prediction"].map(
                  (feature, index) => (
                    <div
                      key={feature}
                      className="flex items-center text-sm text-gray-500 animate-slide-in-left"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <CheckCircle className="h-4 w-4 text-green-400 mr-2" />
                      {feature}
                    </div>
                  ),
                )}
              </div>
              <button className="text-green-400 font-semibold hover:text-green-300 transition-smooth group-hover:translate-x-2 transform flex items-center">
                Start Writing
                <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-2 transition-smooth" />
              </button>
            </div>

            {/* Band Predictor Card */}
            <div className="group bg-gray-900/50 backdrop-blur-sm rounded-xl shadow-2xl p-8 border border-gray-700 hover:border-purple-500/50 transition-smooth card-hover animate-fade-in-up delay-400 hover-glow">
              <div className="flex items-center mb-4">
                <div className="bg-gradient-to-r from-purple-600 to-purple-700 p-3 rounded-lg mr-4 group-hover:animate-pulse-glow transition-smooth">
                  <BarChart3 className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-2xl font-semibold text-white">Band Predictor</h3>
              </div>
              <p className="text-gray-400 mb-6">
                Take practice tests and get accurate predictions of your IELTS band score.
              </p>
              <div className="space-y-2 mb-6">
                {["AI-powered analysis", "Progress tracking", "Personalized recommendations"].map((feature, index) => (
                  <div
                    key={feature}
                    className="flex items-center text-sm text-gray-500 animate-slide-in-left"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <CheckCircle className="h-4 w-4 text-purple-400 mr-2" />
                    {feature}
                  </div>
                ))}
              </div>
              <button className="text-purple-400 font-semibold hover:text-purple-300 transition-smooth group-hover:translate-x-2 transform flex items-center">
                Take Test
                <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-2 transition-smooth" />
              </button>
            </div>

            {/* Reading Practice Card */}
            <div className="group bg-gray-900/50 backdrop-blur-sm rounded-xl shadow-2xl p-8 border border-gray-700 hover:border-orange-500/50 transition-smooth card-hover animate-fade-in-up delay-600 hover-glow">
              <div className="flex items-center mb-4">
                <div className="bg-gradient-to-r from-orange-600 to-orange-700 p-3 rounded-lg mr-4 group-hover:animate-pulse-glow transition-smooth">
                  <BookOpen className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-2xl font-semibold text-white">Reading Practice</h3>
              </div>
              <p className="text-gray-400 mb-6">
                Improve your reading skills with adaptive passages and detailed explanations.
              </p>
              <div className="space-y-2 mb-6">
                {["Adaptive difficulty levels", "Time management training", "Strategy explanations"].map(
                  (feature, index) => (
                    <div
                      key={feature}
                      className="flex items-center text-sm text-gray-500 animate-slide-in-left"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <CheckCircle className="h-4 w-4 text-orange-400 mr-2" />
                      {feature}
                    </div>
                  ),
                )}
              </div>
              <button className="text-orange-400 font-semibold hover:text-orange-300 transition-smooth group-hover:translate-x-2 transform flex items-center">
                Practice Now
                <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-2 transition-smooth" />
              </button>
            </div>

            {/* Listening Training Card */}
            <div className="group bg-gray-900/50 backdrop-blur-sm rounded-xl shadow-2xl p-8 border border-gray-700 hover:border-red-500/50 transition-smooth card-hover animate-fade-in-up delay-800 hover-glow">
              <div className="flex items-center mb-4">
                <div className="bg-gradient-to-r from-red-600 to-red-700 p-3 rounded-lg mr-4 group-hover:animate-pulse-glow transition-smooth">
                  <Headphones className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-2xl font-semibold text-white">Listening Training</h3>
              </div>
              <p className="text-gray-400 mb-6">
                Enhance your listening skills with various accents and question types.
              </p>
              <div className="space-y-2 mb-6">
                {["Multiple accent training", "Note-taking practice", "Instant feedback"].map((feature, index) => (
                  <div
                    key={feature}
                    className="flex items-center text-sm text-gray-500 animate-slide-in-left"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <CheckCircle className="h-4 w-4 text-red-400 mr-2" />
                    {feature}
                  </div>
                ))}
              </div>
              <button className="text-red-400 font-semibold hover:text-red-300 transition-smooth group-hover:translate-x-2 transform flex items-center">
                Listen Now
                <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-2 transition-smooth" />
              </button>
            </div>

            {/* Progress Tracking Card */}
            <div className="group bg-gray-900/50 backdrop-blur-sm rounded-xl shadow-2xl p-8 border border-gray-700 hover:border-indigo-500/50 transition-smooth card-hover animate-fade-in-up delay-1000 hover-glow">
              <div className="flex items-center mb-4">
                <div className="bg-gradient-to-r from-indigo-600 to-indigo-700 p-3 rounded-lg mr-4 group-hover:animate-pulse-glow transition-smooth">
                  <TrendingUp className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-2xl font-semibold text-white">Progress Tracking</h3>
              </div>
              <p className="text-gray-400 mb-6">
                Monitor your improvement with detailed analytics and personalized study plans.
              </p>
              <div className="space-y-2 mb-6">
                {["Performance analytics", "Weakness identification", "Study plan optimization"].map(
                  (feature, index) => (
                    <div
                      key={feature}
                      className="flex items-center text-sm text-gray-500 animate-slide-in-left"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <CheckCircle className="h-4 w-4 text-indigo-400 mr-2" />
                      {feature}
                    </div>
                  ),
                )}
              </div>
              <button className="text-indigo-400 font-semibold hover:text-indigo-300 transition-smooth group-hover:translate-x-2 transform flex items-center">
                View Progress
                <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-2 transition-smooth" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="bg-gray-900 py-20 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-32 h-32 bg-blue-500/5 rounded-full animate-float"></div>
          <div className="absolute bottom-20 right-20 w-32 h-32 bg-purple-500/5 rounded-full animate-float delay-1000"></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-fade-in-up">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              What Our{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 animate-gradient">
                Students Say
              </span>
            </h2>
            <p className="text-xl text-gray-400">Join thousands of successful IELTS candidates</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Sarah Chen",
                score: "Band 8.0 Overall",
                text: "The AI feedback helped me improve my writing from band 6 to band 8 in just 2 months!",
                color: "blue",
                delay: "0",
              },
              {
                name: "Mohammed Ali",
                score: "Band 7.5 Overall",
                text: "The speaking practice with AI was incredibly helpful. I felt confident on test day!",
                color: "green",
                delay: "200",
              },
              {
                name: "Priya Sharma",
                score: "Band 8.5 Overall",
                text: "Best IELTS prep platform! The personalized study plan made all the difference.",
                color: "purple",
                delay: "400",
              },
            ].map((testimonial, index) => (
              <div
                key={testimonial.name}
                className={`group bg-gray-800/50 backdrop-blur-sm rounded-xl shadow-2xl p-8 border border-gray-700 hover:border-blue-500/50 transition-smooth animate-fade-in-up card-hover hover-glow`}
                style={{ animationDelay: `${testimonial.delay}ms` }}
              >
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-5 w-5 text-yellow-400 fill-current animate-bounce-gentle"
                      style={{ animationDelay: `${i * 0.1}s` }}
                    />
                  ))}
                </div>
                <p className="text-gray-300 mb-6 leading-relaxed">{testimonial.text}</p>
                <div className="flex items-center">
                  <div
                    className={`w-12 h-12 bg-gradient-to-r from-${testimonial.color}-600 to-${testimonial.color}-700 rounded-full flex items-center justify-center text-white font-semibold group-hover:animate-pulse-glow transition-smooth`}
                  >
                    {testimonial.name.charAt(0)}
                  </div>
                  <div className="ml-4">
                    <p className="font-semibold text-white">{testimonial.name}</p>
                    <p className="text-blue-400 flex items-center">
                      <Award className="h-4 w-4 mr-1" />
                      {testimonial.score}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="relative bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 text-white py-20 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-blue-600/20 to-purple-600/20 animate-gradient"></div>
        </div>
        <div className="relative max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <div className="animate-fade-in-up">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Achieve Your{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-purple-300 animate-gradient">
                Target Band Score?
              </span>
            </h2>
            <p className="text-xl mb-8 text-blue-100">
              Join thousands of students who have improved their IELTS scores with our AI-powered platform.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up delay-200">
              <button className="group bg-white text-blue-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-smooth shadow-lg hover-lift btn-animate flex items-center justify-center">
                <Target className="h-5 w-5 mr-2 group-hover:animate-bounce-gentle" />
                Start Free Trial
                <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-2 transition-smooth" />
              </button>
              <button className="group border-2 border-white text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-white hover:text-blue-600 transition-smooth hover-lift flex items-center justify-center">
                <BarChart3 className="h-5 w-5 mr-2 group-hover:animate-bounce-gentle" />
                View Pricing
              </button>
            </div>
            <div className="flex items-center justify-center mt-8 space-x-6 text-blue-200 animate-fade-in-up delay-400">
              <div className="flex items-center group">
                <Clock className="h-5 w-5 mr-2 group-hover:animate-bounce-gentle" />
                <span>7-day free trial</span>
              </div>
              <div className="flex items-center group">
                <CheckCircle className="h-5 w-5 mr-2 group-hover:animate-bounce-gentle" />
                <span>No setup required</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default HomePage
