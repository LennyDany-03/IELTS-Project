"use client"

import {
  Brain,
  Target,
  Users,
  Award,
  Globe,
  Zap,
  ArrowRight,
  Heart,
  Lightbulb,
  Shield,
  TrendingUp,
  Star,
  Code,
  Sparkles,
  BookOpen,
  Mic,
  FileText,
  Headphones,
  Calendar,
  BarChart3,
} from "lucide-react"
import Navbar from "../../components/Navbar"
import Footer from "../../components/Footer"

const AboutPage = () => {
  const teamMembers = [
    {
      name: "Lenny Dany Derek D",
      role: "Lead Developer & AI Specialist",
      description: "Passionate about leveraging AI to transform education",
      avatar: "LD",
      color: "from-blue-600 to-blue-700",
    },
    {
      name: "Adorn S George",
      role: "Full-Stack Developer",
      description: "Expert in creating seamless user experiences",
      avatar: "AG",
      color: "from-green-600 to-green-700",
    },
    {
      name: "Sidhanth Bibi",
      role: "AI/ML Engineer",
      description: "Specializes in machine learning algorithms",
      avatar: "SB",
      color: "from-purple-600 to-purple-700",
    },
    {
      name: "Arindam Jaiman",
      role: "Backend Developer",
      description: "Builds robust and scalable systems",
      avatar: "AJ",
      color: "from-orange-600 to-orange-700",
    },
    {
      name: "Ashish Ranjan",
      role: "Frontend Developer",
      description: "Creates beautiful and intuitive interfaces",
      avatar: "AR",
      color: "from-red-600 to-red-700",
    },
    {
      name: "Ananya",
      role: "UX/UI Designer",
      description: "Designs user-centered learning experiences",
      avatar: "AN",
      color: "from-pink-600 to-pink-700",
    },
    {
      name: "Arpita",
      role: "Product Manager",
      description: "Ensures product excellence and user satisfaction",
      avatar: "AP",
      color: "from-indigo-600 to-indigo-700",
    },
  ]

  const keyFeatures = [
    {
      icon: Brain,
      title: "Real-time AI Feedback",
      description: "Powered by Azure AI for instant, accurate analysis",
    },
    {
      icon: Target,
      title: "Band Score Prediction",
      description: "Accurate assessment of your current IELTS level",
    },
    {
      icon: Calendar,
      title: "Personalized Study Planner",
      description: "AI-generated plans based on your goals and schedule",
    },
    {
      icon: TrendingUp,
      title: "Gamified Learning",
      description: "Badges, streaks, and XP to keep you motivated",
    },
    {
      icon: BarChart3,
      title: "Progress Tracking",
      description: "Comprehensive dashboard to monitor your improvement",
    },
    {
      icon: Shield,
      title: "Secure & Private",
      description: "Your data is protected with enterprise-grade security",
    },
  ]

  const stats = [
    { number: "50,000+", label: "Students Helped", icon: Users },
    { number: "95%", label: "Success Rate", icon: Award },
    { number: "4.8/5", label: "User Rating", icon: Star },
    { number: "150+", label: "Countries", icon: Globe },
  ]

  const coreSkills = [
    { icon: Mic, title: "Speaking", color: "text-blue-400" },
    { icon: FileText, title: "Writing", color: "text-green-400" },
    { icon: Headphones, title: "Listening", color: "text-purple-400" },
    { icon: BookOpen, title: "Reading", color: "text-orange-400" },
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

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="animate-slide-in-left">
              <div className="inline-flex items-center bg-blue-600/20 text-blue-400 px-4 py-2 rounded-full text-sm font-medium mb-6 border border-blue-500/30">
                <Sparkles className="h-4 w-4 mr-2 animate-fade-glow" />
                About IELTS AI Coach
              </div>
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                Revolutionizing{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 animate-gradient">
                  IELTS Preparation
                </span>
              </h1>
              <p className="text-xl mb-8 text-gray-300 leading-relaxed">
                IELTS AI Coach is a smart preparation platform built using Microsoft Azure AI to help students improve
                their IELTS band scores through AI-powered speaking, writing, listening, and reading practice.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="group bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-smooth shadow-lg hover:shadow-blue-500/25 hover-lift btn-animate flex items-center justify-center">
                  <Zap className="h-5 w-5 mr-2 group-hover:animate-fade-glow" />
                  Start Learning
                  <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-2 transition-smooth" />
                </button>
              </div>
            </div>

            <div className="animate-slide-in-right">
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700 card-hover hover-glow">
                <div className="text-center mb-6">
                  <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full mb-4 animate-fade-glow">
                    <Brain className="h-10 w-10 text-white animate-float" />
                  </div>
                  <h3 className="text-2xl font-semibold text-white mb-2">AI-Powered Learning</h3>
                  <p className="text-gray-400">Experience the future of IELTS preparation</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {coreSkills.map((skill, index) => (
                    <div
                      key={skill.title}
                      className={`bg-gray-700/30 rounded-lg p-4 text-center card-hover animate-fade-in-up`}
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <skill.icon className={`h-8 w-8 ${skill.color} mx-auto mb-2 icon-fade`} />
                      <div className="text-white font-medium">{skill.title}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-gray-800 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900/50 to-gray-800"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-fade-in-up">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Our{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 animate-gradient">
                Mission
              </span>
            </h2>
            <div className="max-w-4xl mx-auto">
              <p className="text-xl text-gray-300 leading-relaxed mb-8">
                Our mission is to make IELTS preparation engaging, personalized, and accessible for every student,
                anywhere in the world. We believe that with the right tools and guidance, anyone can achieve their
                target band score.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="animate-fade-in-up delay-200">
                  <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-4 rounded-full w-16 h-16 mx-auto mb-4 animate-fade-glow">
                    <Heart className="h-8 w-8 text-white mx-auto mt-2" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-3">Accessible</h3>
                  <p className="text-gray-400">
                    Quality IELTS preparation available to students worldwide, regardless of location or background.
                  </p>
                </div>
                <div className="animate-fade-in-up delay-400">
                  <div className="bg-gradient-to-r from-green-600 to-green-700 p-4 rounded-full w-16 h-16 mx-auto mb-4 animate-fade-glow">
                    <Lightbulb className="h-8 w-8 text-white mx-auto mt-2" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-3">Personalized</h3>
                  <p className="text-gray-400">
                    AI-driven insights that adapt to each student's learning style, pace, and goals.
                  </p>
                </div>
                <div className="animate-fade-in-up delay-600">
                  <div className="bg-gradient-to-r from-purple-600 to-purple-700 p-4 rounded-full w-16 h-16 mx-auto mb-4 animate-fade-glow">
                    <TrendingUp className="h-8 w-8 text-white mx-auto mt-2" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-3">Effective</h3>
                  <p className="text-gray-400">
                    Proven methods and cutting-edge technology that deliver real results and improved band scores.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Key Features Section */}
      <section className="py-20 bg-gray-900 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-32 h-32 bg-blue-500/5 rounded-full animate-float"></div>
          <div className="absolute bottom-20 right-20 w-32 h-32 bg-purple-500/5 rounded-full animate-float delay-1000"></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-fade-in-up">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Key{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 animate-gradient">
                Features
              </span>
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Discover what makes IELTS AI Coach the most advanced and effective IELTS preparation platform.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {keyFeatures.map((feature, index) => (
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

      {/* Stats Section */}
      <section className="py-20 bg-gray-800 relative">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-fade-in-up">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Our{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 animate-gradient">
                Impact
              </span>
            </h2>
            <p className="text-xl text-gray-400">Numbers that speak to our commitment to student success</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div
                key={stat.label}
                className={`text-center bg-gray-900/50 backdrop-blur-sm rounded-xl p-8 border border-gray-700 card-hover hover-glow animate-fade-in-up`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <stat.icon className="h-12 w-12 text-blue-400 mx-auto mb-4 icon-fade" />
                <div className="text-4xl font-bold text-white mb-2 animate-fade-glow">{stat.number}</div>
                <div className="text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-gray-900 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-20 right-20 w-64 h-64 bg-blue-500/5 rounded-full animate-float"></div>
          <div className="absolute bottom-20 left-20 w-64 h-64 bg-purple-500/5 rounded-full animate-float delay-1000"></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-fade-in-up">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Meet Our{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 animate-gradient">
                Team
              </span>
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Passionate student developers from SRM University dedicated to helping others level up their English
              skills using cutting-edge technology.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {teamMembers.map((member, index) => (
              <div
                key={index}
                className={`group bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700 hover:border-blue-500/50 transition-smooth text-center card-hover hover-glow animate-fade-in-up`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div
                  className={`w-16 h-16 bg-gradient-to-r ${member.color} rounded-full flex items-center justify-center text-white font-bold text-xl mx-auto mb-4 group-hover:animate-fade-glow transition-smooth`}
                >
                  {member.avatar}
                </div>
                <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-blue-400 transition-smooth">
                  {member.name}
                </h3>
                <p className="text-blue-400 text-sm font-medium mb-2">{member.role}</p>
                <p className="text-gray-400 text-sm leading-relaxed">{member.description}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-12 animate-fade-in-up delay-800">
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-8 border border-gray-700 max-w-4xl mx-auto card-hover hover-glow">
              <div className="flex items-center justify-center mb-4">
                <Code className="h-8 w-8 text-blue-400 mr-3 icon-fade" />
                <h3 className="text-2xl font-semibold text-white">Built at SRM University</h3>
              </div>
              <p className="text-gray-300 leading-relaxed">
                Our team of passionate student developers from SRM University combines academic excellence with
                real-world experience to create innovative solutions. We understand the challenges students face because
                we've been there ourselves, and we're committed to using technology to make learning more effective and
                accessible.
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
              Ready to{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-purple-300 animate-gradient">
                Transform
              </span>{" "}
              Your IELTS Journey?
            </h2>
            <p className="text-xl mb-8 text-blue-100">
              Join our community of successful IELTS candidates and experience the power of AI-driven learning.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up delay-200">
              <button className="group bg-white text-blue-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-smooth shadow-lg hover-lift btn-animate flex items-center justify-center">
                <Zap className="h-5 w-5 mr-2 group-hover:animate-fade-glow" />
                Start Your Journey
                <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-2 transition-smooth" />
              </button>
              <button className="group border-2 border-white text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-white hover:text-blue-600 transition-smooth hover-lift flex items-center justify-center">
                <Users className="h-5 w-5 mr-2 group-hover:scale-125 transition-smooth" />
                Join Community
              </button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default AboutPage
