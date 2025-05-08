"use client"

import { CheckCircle2 } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

interface TimeSlot {
  id: number
  start: string
  end: string
  booked: boolean
  bookedBy: string | null
  isBreak?: boolean
}

interface BookingConfirmationProps {
  date: string
  location: string
  therapist: string
  timeSlot: TimeSlot | undefined
  onClose: () => void
}

export function BookingConfirmation({ date, location, therapist, timeSlot, onClose }: BookingConfirmationProps) {
  if (!timeSlot) return null

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100 dark:bg-green-900">
            <CheckCircle2 className="h-6 w-6 text-green-600 dark:text-green-300" />
          </div>
          <DialogTitle className="text-center text-xl">Booking Successful</DialogTitle>
          <DialogDescription className="text-center">
            Your appointment has been successfully booked. We've recorded your booking with the following details.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div className="text-slate-500 dark:text-slate-400">Company:</div>
            <div className="font-medium">Shiwaforce.com Zrt.</div>

            <div className="text-slate-500 dark:text-slate-400">Date:</div>
            <div className="font-medium capitalize">{date}</div>

            <div className="text-slate-500 dark:text-slate-400">Time:</div>
            <div className="font-medium">
              {timeSlot.start} - {timeSlot.end}
            </div>

            <div className="text-slate-500 dark:text-slate-400">Location:</div>
            <div className="font-medium">{location}</div>

            <div className="text-slate-500 dark:text-slate-400">Therapist:</div>
            <div className="font-medium">{therapist}</div>
          </div>

          <Separator />

          <div className="text-sm text-slate-600 dark:text-slate-400">
            <p>
              Please arrive on time for your scheduled appointment. Treatments are performed while clothed. If you need
              to cancel, please notify us at least 24 hours in advance.
            </p>
          </div>
        </div>

        <DialogFooter>
          <Button onClick={onClose} className="w-full">
            OK
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
