"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { format, addDays, isSameDay } from "date-fns"
import { CalendarIcon, Clock, MapPin, Info, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { TimeSlotCard } from "@/components/time-slot-card"
import { TherapistCard } from "@/components/therapist-card"
import { BookingConfirmation } from "@/components/booking-confirmation"
import { UserInfo } from "@/components/user-info"
import { signOut } from "next-auth/react"

// Sample data
const locations = [
  { id: 1, name: "6th Floor Relaxation Room", available: true },
  { id: 2, name: "4th Floor Wellness Area", available: false },
]

const therapists = [
  {
    id: 1,
    name: "Martin Gillich",
    specialty: "Swedish Massage, Sports Massage",
    avatar: "/placeholder.svg?height=80&width=80",
    rating: 4.9,
    reviewCount: 124,
  },
  {
    id: 2,
    name: "Anna Kovacs",
    specialty: "Aromatherapy Massage, Relaxation Massage",
    avatar: "/placeholder.svg?height=80&width=80",
    rating: 4.8,
    reviewCount: 98,
  },
]

const timeSlots = [
  { id: 1, start: "08:50", end: "09:10", booked: true, bookedBy: "George Varga" },
  { id: 2, start: "09:15", end: "09:35", booked: true, bookedBy: "George Varga" },
  { id: 3, start: "09:40", end: "10:00", booked: false, bookedBy: null },
  { id: 4, start: "10:05", end: "10:25", booked: true, bookedBy: "Gabriel Paizs" },
  { id: 5, start: "10:30", end: "10:50", booked: false, bookedBy: null, isBreak: true },
  { id: 6, start: "10:55", end: "11:15", booked: true, bookedBy: "Thomas Gerbner" },
  { id: 7, start: "11:20", end: "11:40", booked: true, bookedBy: "PG" },
  { id: 8, start: "11:45", end: "12:05", booked: true, bookedBy: "Klau" },
  { id: 9, start: "12:10", end: "12:30", booked: true, bookedBy: "George Varga" },
  { id: 10, start: "12:45", end: "13:05", booked: false, bookedBy: null },
  { id: 11, start: "13:10", end: "13:30", booked: false, bookedBy: null },
  { id: 12, start: "13:35", end: "13:55", booked: false, bookedBy: null },
]

export function MassageBookingSystem() {
  const router = useRouter()
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())
  const [selectedLocation, setSelectedLocation] = useState(locations[0])
  const [selectedTherapist, setSelectedTherapist] = useState(therapists[0])
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<number | null>(null)
  const [showConfirmation, setShowConfirmation] = useState(false)

  // Generate next 14 available days
  const availableDates = Array.from({ length: 14 }, (_, i) => addDays(new Date(), i))

  const formattedDate = selectedDate ? format(selectedDate, "yyyy-MM-dd") : ""
  const displayDate = selectedDate ? format(selectedDate, "EEEE, MMMM d, yyyy") : ""

  const handleBooking = () => {
    setShowConfirmation(true)
  }

  const handleConfirmationClose = () => {
    setShowConfirmation(false)
    setSelectedTimeSlot(null)
  }

  const handleLogout = async () => {
    await signOut({ callbackUrl: "/" })
  }

  return (
    <div className="space-y-8">
      {/* User Info Section */}
      <UserInfo />

      <div className="flex justify-between items-center">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-50 sm:text-4xl">
            Massage Booking
          </h1>
          <p className="text-slate-500 dark:text-slate-400">
            Book your company massage appointment quickly and easily
          </p>
        </div>
        <Button variant="outline" size="sm" onClick={handleLogout} className="gap-2">
          Sign Out
        </Button>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_350px]">
        <Card className="border-slate-200 dark:border-slate-800">
          <CardHeader>
            <CardTitle>Choose an Appointment</CardTitle>
            <CardDescription>Select the appropriate day, location, and time</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <CalendarIcon className="h-4 w-4 text-slate-500" />
                <h3 className="font-medium">Select Date</h3>
              </div>

              <div className="flex flex-wrap gap-2">
                {availableDates.slice(0, 7).map((date) => (
                  <Button
                    key={date.toString()}
                    variant={isSameDay(date, selectedDate || new Date()) ? "default" : "outline"}
                    className="h-auto py-2"
                    onClick={() => setSelectedDate(date)}
                  >
                    <div className="flex flex-col">
                      <span className="text-xs font-normal">{format(date, "EEE")}</span>
                      <span className="text-base">{format(date, "MM.dd")}</span>
                    </div>
                  </Button>
                ))}

                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="h-auto py-2">
                      <div className="flex flex-col">
                        <span className="text-xs font-normal">More</span>
                        <span className="text-base">...</span>
                      </div>
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar mode="single" selected={selectedDate} onSelect={setSelectedDate} initialFocus />
                  </PopoverContent>
                </Popover>
              </div>
            </div>

            <Separator />

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-slate-500" />
                <h3 className="font-medium">Select Location</h3>
              </div>

              <div className="flex flex-wrap gap-2">
                {locations.map((location) => (
                  <Button
                    key={location.id}
                    variant={selectedLocation.id === location.id ? "default" : "outline"}
                    className="h-auto py-2"
                    disabled={!location.available}
                    onClick={() => setSelectedLocation(location)}
                  >
                    {location.name}
                    {!location.available && <span className="ml-2 text-xs">(not available)</span>}
                  </Button>
                ))}
              </div>
            </div>

            <Separator />

            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-slate-500" />
                <h3 className="font-medium">Select Time</h3>
              </div>

              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {timeSlots.map((slot) => (
                  <TimeSlotCard
                    key={slot.id}
                    timeSlot={slot}
                    isSelected={selectedTimeSlot === slot.id}
                    onSelect={() => !slot.booked && !slot.isBreak && setSelectedTimeSlot(slot.id)}
                  />
                ))}
              </div>
            </div>

            <Alert className="bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-900">
              <AlertDescription className="flex items-start gap-2 text-blue-800 dark:text-blue-300">
                <Info className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <span>Treatments are performed while clothed. Please arrive on time. Wishing you good health.</span>
              </AlertDescription>
            </Alert>
          </CardContent>
          <CardFooter className="flex justify-between border-t p-6">
            <Button variant="outline" className="gap-2">
              <RefreshCw className="h-4 w-4" />
              Refresh
            </Button>
            <Button disabled={selectedTimeSlot === null} onClick={handleBooking}>
              Book Appointment
            </Button>
          </CardFooter>
        </Card>

        <div className="space-y-6">
          <Card className="border-slate-200 dark:border-slate-800">
            <CardHeader>
              <CardTitle>Booking Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-1">
                <div className="text-sm text-slate-500 dark:text-slate-400">Company</div>
                <div className="font-medium">Shiwaforce.com Zrt.</div>
              </div>

              <div className="space-y-1">
                <div className="text-sm text-slate-500 dark:text-slate-400">Location</div>
                <div className="font-medium">{selectedLocation.name}</div>
              </div>

              <div className="space-y-1">
                <div className="text-sm text-slate-500 dark:text-slate-400">Date</div>
                <div className="font-medium capitalize">{displayDate}</div>
              </div>

              {selectedTimeSlot && (
                <div className="space-y-1">
                  <div className="text-sm text-slate-500 dark:text-slate-400">Time</div>
                  <div className="font-medium">
                    {timeSlots.find((slot) => slot.id === selectedTimeSlot)?.start} -
                    {timeSlots.find((slot) => slot.id === selectedTimeSlot)?.end}
                  </div>
                </div>
              )}

              <Separator />

              <div className="space-y-1">
                <div className="text-sm text-slate-500 dark:text-slate-400">Therapist</div>
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src={selectedTherapist.avatar || "/placeholder.svg"} alt={selectedTherapist.name} />
                    <AvatarFallback>
                      {selectedTherapist.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium">{selectedTherapist.name}</div>
                    <div className="text-xs text-slate-500 dark:text-slate-400">{selectedTherapist.specialty}</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-slate-200 dark:border-slate-800">
            <CardHeader>
              <CardTitle>Therapists</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue={therapists[0].id.toString()}>
                <TabsList className="w-full">
                  {therapists.map((therapist) => (
                    <TabsTrigger
                      key={therapist.id}
                      value={therapist.id.toString()}
                      onClick={() => setSelectedTherapist(therapist)}
                      className="flex-1"
                    >
                      {therapist.name.split(" ")[0]}
                    </TabsTrigger>
                  ))}
                </TabsList>

                {therapists.map((therapist) => (
                  <TabsContent key={therapist.id} value={therapist.id.toString()}>
                    <TherapistCard therapist={therapist} />
                  </TabsContent>
                ))}
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>

      {showConfirmation && (
        <BookingConfirmation
          date={displayDate}
          location={selectedLocation.name}
          therapist={selectedTherapist.name}
          timeSlot={timeSlots.find((slot) => slot.id === selectedTimeSlot)}
          onClose={handleConfirmationClose}
        />
      )}
    </div>
  )
}