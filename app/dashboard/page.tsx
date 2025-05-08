import { MassageBookingSystem } from "@/components/massage-booking-system"

export default function DashboardPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
      <div className="container mx-auto py-8 px-4">
        <MassageBookingSystem />
      </div>
    </main>
  )
}
