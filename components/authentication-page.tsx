"use client"

import type React from "react"
import { useState } from "react"
import { Github } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { signIn } from "next-auth/react"

export function AuthenticationPage() {
  const [isGithubLoading, setIsGithubLoading] = useState(false)

  const handleGithubLogin = async () => {
    setIsGithubLoading(true)
    
    try {
      await signIn("github", { callbackUrl: "/dashboard" })
    } catch (error) {
      console.error("GitHub login error:", error)
    } finally {
      setIsGithubLoading(false)
    }
  }

  return (
    <div className="flex justify-center items-center min-h-[80vh]">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl text-center">Company Wellness Portal</CardTitle>
          <CardDescription className="text-center">Sign in to access the massage booking system</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Button 
              variant="outline" 
              type="button" 
              className="w-full flex items-center gap-2"
              onClick={handleGithubLogin}
              disabled={isGithubLoading}
            >
              {isGithubLoading ? (
                <div className="flex items-center gap-2">
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                  <span>Connecting to GitHub...</span>
                </div>
              ) : (
                <>
                  <Github className="h-4 w-4" />
                  <span>Sign in with GitHub</span>
                </>
              )}
            </Button>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col">
          <p className="mt-2 text-xs text-center text-muted-foreground">
            By signing in, you agree to our{" "}
            <a href="#" className="underline">
              Terms of Service
            </a>{" "}
            and{" "}
            <a href="#" className="underline">
              Privacy Policy
            </a>
            .
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}
