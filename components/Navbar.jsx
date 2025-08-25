"use client"

import { Brain, Menu, X, User, LogIn, LogOut, ChevronDown } from "lucide-react"
import { useState, useEffect } from "react"
import { createBrowserClient } from "@supabase/ssr"
import { useRouter } from "next/navigation"

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  const supabase = createBrowserClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      setUser(user)
      setLoading(false)
    }

    getUser()

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user || null)
      setLoading(false)
    })

    return () => subscription.unsubscribe()
  }, [])

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen)
  }

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    setIsDropdownOpen(false)
    router.push("/")
  }

  const handleRegisterClick = () => {
    router.push("/register")
  }

  const handleSignInClick = () => {
    router.push("/auth")
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

          <div className="hidden md:block animate-slide-in-right">
            <div className="ml-4 flex items-center space-x-4">
              {loading ? (
                <div className="w-8 h-8 bg-gray-700 rounded-full animate-pulse"></div>
              ) : user ? (
                <div className="relative">
                  <button
                    onClick={toggleDropdown}
                    className="flex items-center space-x-3 text-white hover:text-blue-400 transition-smooth group"
                  >
                    <img
                      src={
                        user.user_metadata?.avatar_url ||
                        user.user_metadata?.picture ||
                        "/placeholder.svg?height=32&width=32&query=user+avatar"
                      }
                      alt="Profile"
                      className="w-8 h-8 rounded-full border-2 border-gray-600 group-hover:border-blue-400 transition-smooth"
                    />
                    <span className="text-sm font-medium">
                      {user.user_metadata?.full_name || user.user_metadata?.name || "User"}
                    </span>
                    <ChevronDown className={`h-4 w-4 transition-transform ${isDropdownOpen ? "rotate-180" : ""}`} />
                  </button>

                  {isDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-gray-800 rounded-lg shadow-xl border border-gray-700 py-2 z-50">
                      <a
                        href="/dashboard"
                        className="block px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-gray-700 transition-smooth"
                        onClick={() => setIsDropdownOpen(false)}
                      >
                        Dashboard
                      </a>
                      <a
                        href="/profile"
                        className="block px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-gray-700 transition-smooth"
                        onClick={() => setIsDropdownOpen(false)}
                      >
                        Profile
                      </a>
                      <hr className="my-2 border-gray-700" />
                      <button
                        onClick={handleSignOut}
                        className="w-full text-left px-4 py-2 text-sm text-red-400 hover:text-red-300 hover:bg-gray-700 transition-smooth flex items-center"
                      >
                        <LogOut className="h-4 w-4 mr-2" />
                        Sign Out
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <>
                  <button
                    onClick={handleSignInClick}
                    className="text-gray-300 hover:text-blue-400 px-4 py-2 text-sm font-medium transition-smooth border border-gray-700 rounded-lg hover:border-blue-400 hover:shadow-lg hover:shadow-blue-400/20 flex items-center group btn-animate"
                  >
                    <LogIn className="h-4 w-4 mr-2 group-hover:animate-bounce-gentle" />
                    Login
                  </button>
                </>
              )}
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

              {loading ? (
                <div className="px-3 py-2">
                  <div className="w-full h-10 bg-gray-700 rounded animate-pulse"></div>
                </div>
              ) : user ? (
                <div className="px-3 py-2 space-y-2 border-t border-gray-700 mt-2 pt-2">
                  <div className="flex items-center space-x-3 text-white">
                    <img
                      src={
                        user.user_metadata?.avatar_url ||
                        user.user_metadata?.picture ||
                        "/placeholder.svg?height=32&width=32&query=user+avatar"
                      }
                      alt="Profile"
                      className="w-8 h-8 rounded-full border-2 border-gray-600"
                    />
                    <span className="text-sm font-medium">
                      {user.user_metadata?.full_name || user.user_metadata?.name || "User"}
                    </span>
                  </div>
                  <a
                    href="/dashboard"
                    className="block px-3 py-2 text-gray-300 hover:text-blue-400 transition-smooth rounded-md hover:bg-gray-700/50"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Dashboard
                  </a>
                  <a
                    href="/profile"
                    className="block px-3 py-2 text-gray-300 hover:text-blue-400 transition-smooth rounded-md hover:bg-gray-700/50"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Profile
                  </a>
                  <button
                    onClick={() => {
                      handleSignOut()
                      setIsMenuOpen(false)
                    }}
                    className="w-full text-left px-3 py-2 text-red-400 hover:text-red-300 transition-smooth rounded-md hover:bg-gray-700/50 flex items-center"
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Sign Out
                  </button>
                </div>
              ) : (
                <div className="px-3 py-2 space-y-2 border-t border-gray-700 mt-2 pt-2">
                  <button
                    onClick={() => {
                      handleSignInClick()
                      setIsMenuOpen(false)
                    }}
                    className="w-full text-left text-gray-300 hover:text-blue-400 transition-smooth flex items-center px-3 py-2 rounded-md hover:bg-gray-700/50"
                  >
                    <LogIn className="h-4 w-4 mr-2" />
                    Login
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar
