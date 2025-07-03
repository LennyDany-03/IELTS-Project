"use client"

import { Brain, Menu, X, User, LogIn } from "lucide-react"
import { useState } from "react"

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <nav className="bg-gray-900/95 backdrop-blur-md shadow-xl sticky top-0 z-50 border-b border-gray-800 animate-slide-in-down">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0 animate-slide-in-left">
            <a href="/">
                <div className="flex items-center group cursor-pointer">
                <Brain className="h-8 w-8 text-blue-400 mr-3 group-hover:animate-bounce-gentle transition-smooth" />
                <span className="text-2xl font-bold text-white group-hover:text-blue-400 transition-smooth">
                  IELTS AI Coach
                </span>
            </div>
            </a>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:block animate-fade-in-up">
            <div className="ml-10 flex items-baseline space-x-8">
              <a
                href="/"
                className="text-white hover:text-blue-400 px-3 py-2 text-sm font-medium transition-smooth relative group"
              >
                Home
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-400 group-hover:w-full transition-smooth"></span>
              </a>
              <a
                href="/features"
                className="text-gray-300 hover:text-blue-400 px-3 py-2 text-sm font-medium transition-smooth relative group"
              >
                Features
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-400 group-hover:w-full transition-smooth"></span>
              </a>
              <a
                href="/dashboard"
                className="text-gray-300 hover:text-blue-400 px-3 py-2 text-sm font-medium transition-smooth relative group"
              >
                Modules
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-400 group-hover:w-full transition-smooth"></span>
              </a>
              <a
                href="/about"
                className="text-gray-300 hover:text-blue-400 px-3 py-2 text-sm font-medium transition-smooth relative group"
              >
                About
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-400 group-hover:w-full transition-smooth"></span>
              </a>
              <a
                href="/contact"
                className="text-gray-300 hover:text-blue-400 px-3 py-2 text-sm font-medium transition-smooth relative group"
              >
                Contact
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-400 group-hover:w-full transition-smooth"></span>
              </a>
            </div>
          </div>

          {/* User Options */}
          <div className="hidden md:block animate-slide-in-right">
            <div className="ml-4 flex items-center space-x-4">
              <a href="/auth">
                <button className="text-gray-300 hover:text-blue-400 px-4 py-2 text-sm font-medium transition-smooth border border-gray-700 rounded-lg hover:border-blue-400 hover:shadow-lg hover:shadow-blue-400/20 flex items-center group btn-animate">
                  <LogIn className="h-4 w-4 mr-2 group-hover:animate-bounce-gentle" />
                  Sign In
                </button>
              </a>
              <button className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-6 py-2 rounded-lg text-sm font-medium transition-smooth shadow-lg hover:shadow-blue-500/25 hover-lift btn-animate flex items-center group">
                <User className="h-4 w-4 mr-2 group-hover:animate-bounce-gentle" />
                Register
              </button>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-gray-300 hover:text-blue-400 focus:outline-none focus:text-blue-400 transition-smooth"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6 animate-scale-in" />
              ) : (
                <Menu className="h-6 w-6 hover:animate-bounce-gentle transition-smooth" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden animate-slide-in-down">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-gray-800/50 backdrop-blur-md rounded-lg mt-2 border border-gray-700">
              <a
                href="/"
                className="block px-3 py-2 text-gray-300 hover:text-blue-400 transition-smooth rounded-md hover:bg-gray-700/50"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </a>
              <a
                href="/features"
                className="block px-3 py-2 text-gray-300 hover:text-blue-400 transition-smooth rounded-md hover:bg-gray-700/50"
                onClick={() => setIsMenuOpen(false)}
              >
                Features
              </a>
              <a
                href="/dashboard"
                className="block px-3 py-2 text-gray-300 hover:text-blue-400 transition-smooth rounded-md hover:bg-gray-700/50"
                onClick={() => setIsMenuOpen(false)}
              >
                Modules
              </a>
              <a
                href="/about"
                className="block px-3 py-2 text-gray-300 hover:text-blue-400 transition-smooth rounded-md hover:bg-gray-700/50"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </a>
              <a
                href="/contact"
                className="block px-3 py-2 text-gray-300 hover:text-blue-400 transition-smooth rounded-md hover:bg-gray-700/50"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </a>
              <div className="px-3 py-2 space-y-2">
                <button className="w-full text-left text-gray-300 hover:text-blue-400 transition-smooth flex items-center">
                  <LogIn className="h-4 w-4 mr-2" />
                  Sign In
                </button>
                <button className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-smooth btn-animate flex items-center justify-center">
                  <User className="h-4 w-4 mr-2" />
                  Register
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar
