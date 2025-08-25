"use client"

import { useEffect } from "react"
import { createBrowserClient } from "@supabase/ssr"
import { useRouter } from "next/navigation"
import { Loader2 } from "lucide-react"

const AuthCallbackPage = () => {
  const router = useRouter()

  const supabase = createBrowserClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)

  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        const {
          data: { session },
          error,
        } = await supabase.auth.getSession()

        if (error) {
          console.error("Auth callback error:", error)
          router.push("/auth?error=auth_failed")
          return
        }

        if (session) {
          // Check if user has completed student info
          const { data: studentInfo, error: studentInfoError } = await supabase
            .from("studentinfo")
            .select("id")
            .eq("user_id", session.user.id)
            .single()

          if (studentInfoError && studentInfoError.code !== "PGRST116") {
            console.error("Error checking student info:", studentInfoError)
          }

          if (studentInfo) {
            // Existing user with complete profile
            router.push("/dashboard")
          } else {
            // New user or incomplete profile
            router.push("/studentinfo")
          }
        } else {
          router.push("/auth")
        }
      } catch (error) {
        console.error("Unexpected error in auth callback:", error)
        router.push("/auth?error=unexpected_error")
      }
    }

    handleAuthCallback()
  }, [router, supabase])

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900/50 to-gray-900 flex items-center justify-center">
      <div className="text-center">
        <Loader2 className="h-12 w-12 animate-spin text-blue-400 mx-auto mb-4" />
        <h2 className="text-xl font-semibold text-white mb-2">Completing sign in...</h2>
        <p className="text-gray-400">Please wait while we set up your account</p>
      </div>
    </div>
  )
}

export default AuthCallbackPage
