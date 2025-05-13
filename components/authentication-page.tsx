"use client"

import type React from "react"
import { useState } from "react"
import { Github, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { signIn } from "next-auth/react"

export function AuthenticationPage() {
  const [isGithubLoading, setIsGithubLoading] = useState(false)
  const [isEmailLoading, setIsEmailLoading] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [emailError, setEmailError] = useState("")
  const [passwordError, setPasswordError] = useState("")

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

  const validateEmail = (email: string) => {
    if (!email) {
      setEmailError("Email is required")
      return false
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      setEmailError("Please enter a valid email address")
      return false
    }
    setEmailError("")
    return true
  }

  const validatePassword = (password: string) => {
    if (!password) {
      setPasswordError("Password is required")
      return false
    }
    if (password.length < 6) {
      setPasswordError("Password must be at least 6 characters")
      return false
    }
    setPasswordError("")
    return true
  }

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    
    const isEmailValid = validateEmail(email)
    const isPasswordValid = validatePassword(password)
    
    if (!isEmailValid || !isPasswordValid) {
      return
    }
    
    setIsEmailLoading(true)
    
    try {
      await signIn("credentials", {
        email,
        password,
        callbackUrl: "/dashboard",
      })
    } catch (error) {
      console.error("Email login error:", error)
    } finally {
      setIsEmailLoading(false)
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
          <Tabs defaultValue="email" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-4">
              <TabsTrigger value="email">Email</TabsTrigger>
              <TabsTrigger value="github">GitHub</TabsTrigger>
            </TabsList>
            <TabsContent value="email">
              <form onSubmit={handleEmailLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input 
                    id="email" 
                    type="email" 
                    placeholder="m.johnson@company.com" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  {emailError && <p className="text-sm text-red-500">{emailError}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input 
                    id="password" 
                    type="password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  {passwordError && <p className="text-sm text-red-500">{passwordError}</p>}
                </div>
                <Button 
                  type="submit" 
                  className="w-full"
                  disabled={isEmailLoading}
                >
                  {isEmailLoading ? (
                    <div className="flex items-center gap-2">
                      <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                      <span>Signing in...</span>
                    </div>
                  ) : (
                    <>
                      <Mail className="mr-2 h-4 w-4" />
                      <span>Sign in with Email</span>
                    </>
                  )}
                </Button>
              </form>
            </TabsContent>
            <TabsContent value="github">
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
            </TabsContent>
          </Tabs>
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
