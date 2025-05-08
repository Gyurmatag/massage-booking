import { AuthenticationPage } from "@/components/authentication-page"

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
      <div className="container mx-auto py-8 px-4">
        <AuthenticationPage />
      </div>
    </main>
  )
}
