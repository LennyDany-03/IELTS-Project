"use client"

import { useState, useEffect } from "react"
import { Sparkles } from "lucide-react"
import { createBrowserClient } from "@supabase/ssr"
import { useRouter } from "next/navigation"
import Navbar from "../../components/Navbar"
import Footer from "../../components/Footer"

const AuthPage = () => {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const supabase = createBrowserClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)

  useEffect(() => {
    // Check if user is already logged in
    const checkUser = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession()
      if (session) {
        // Check if user has completed student info
        const { data: studentInfo } = await supabase
          .from("studentinfo")
          .select("id")
          .eq("user_id", session.user.id)
          .single()

        if (studentInfo) {
          router.push("/dashboard")
        } else {
          router.push("/studentinfo")
        }
      }
    }
    checkUser()
  }, [supabase, router])

  const handleGoogleAuth = async () => {
    setIsLoading(true)

    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
          queryParams: {
            access_type: "offline",
            prompt: "consent",
          },
        },
      })

      if (error) {
        console.error("Auth error:", error)
        alert("Authentication failed. Please try again.")
        setIsLoading(false)
      }
      // If successful, user will be redirected automatically
    } catch (error) {
      console.error("Unexpected error:", error)
      alert("An unexpected error occurred. Please try again.")
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-900">
      <Navbar />

      <div className="relative min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/10 rounded-full animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500/10 rounded-full animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-400/5 rounded-full animate-spin-slow"></div>
        </div>

        <div className="relative max-w-md w-full space-y-8">
          <div className="text-center animate-fade-in-up">
            <div className="flex justify-center mb-6">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-3 rounded-full animate-pulse">
                <Sparkles className="h-8 w-8 text-white" />
              </div>
            </div>
            <h2 className="text-3xl font-bold text-white mb-2">Join IELTS AI Coach</h2>
            <p className="text-gray-400">
              Sign in or create your account with Google to start your AI-powered IELTS preparation journey
            </p>
          </div>

          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl shadow-2xl p-8 border border-gray-700 animate-fade-in-up delay-200">
            <div className="space-y-6">
              <div className="text-center">
                <h3 className="text-xl font-semibold text-white mb-2">Get Started in Seconds</h3>
                <p className="text-gray-400 text-sm mb-6">
                  New user? We'll create your account automatically. Returning user? Welcome back!
                </p>
              </div>

              <button
                type="button"
                onClick={handleGoogleAuth}
                disabled={isLoading}
                className="w-full inline-flex justify-center items-center py-4 px-6 border-2 border-blue-500 rounded-lg shadow-lg bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-medium text-lg transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {isLoading ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white mr-3"></div>
                    Connecting your account...
                  </div>
                ) : (
                  <>
                    <svg className="w-6 h-6 mr-3" viewBox="0 0 24 24">
                      <path
                        fill="currentColor"
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      />
                      <path
                        fill="currentColor"
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      />
                      <path
                        fill="currentColor"
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      />
                    </svg>
                    Continue with Google
                  </>
                )}
              </button>

              <div className="text-center text-sm text-gray-400 mt-4">
                <p>
                  By continuing, you agree to our{" "}
                  <a href="#" className="text-blue-400 hover:text-blue-300 transition-colors duration-300">
                    Terms of Service
                  </a>{" "}
                  and{" "}
                  <a href="#" className="text-blue-400 hover:text-blue-300 transition-colors duration-300">
                    Privacy Policy
                  </a>
                </p>
              </div>
            </div>
          </div>

          <div className="bg-gray-800/30 backdrop-blur-sm rounded-lg p-4 border border-gray-700/50 animate-fade-in-up delay-700">
            <div className="text-center">
              <div className="text-sm text-gray-300">
                <p className="font-medium text-white mb-1">🚀 Ready to boost your IELTS score?</p>
                <p>
                  Join thousands of students who have improved their IELTS scores with personalized AI feedback and
                  progress tracking.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default AuthPage
