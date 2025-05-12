import { auth } from "@/auth"

// Middleware is used to protect routes
export default auth

// See https://next-auth.js.org/configuration/nextjs#advanced-usage
export const config = {
  // Matcher is configured inside auth.ts
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}
