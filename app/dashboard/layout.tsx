"use client"

import { UserNav } from "@/components/user-nav"

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 flex h-16 items-center border-b bg-background px-4">
        <div className="flex w-full justify-between">
          <div className="flex items-center">
            <h1 className="text-xl font-bold">Massage Booking System</h1>
          </div>
          <div className="ml-auto flex items-center gap-2">
            <UserNav />
          </div>
        </div>
      </header>
      <main className="flex-1">{children}</main>
    </div>
  )
}
