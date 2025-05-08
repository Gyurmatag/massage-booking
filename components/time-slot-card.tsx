"use client"

import { Clock } from "lucide-react"
import { cn } from "@/lib/utils"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface TimeSlot {
  id: number
  start: string
  end: string
  booked: boolean
  bookedBy: string | null
  isBreak?: boolean
}

interface TimeSlotCardProps {
  timeSlot: TimeSlot
  isSelected: boolean
  onSelect: () => void
}

export function TimeSlotCard({ timeSlot, isSelected, onSelect }: TimeSlotCardProps) {
  return (
    <Card
      className={cn(
        "border transition-all duration-200 cursor-pointer hover:border-slate-400 dark:hover:border-slate-600",
        timeSlot.booked && "opacity-60 cursor-not-allowed",
        timeSlot.isBreak && "bg-amber-50 dark:bg-amber-950 border-amber-200 dark:border-amber-900",
        isSelected && !timeSlot.booked && !timeSlot.isBreak && "border-primary ring-1 ring-primary",
      )}
      onClick={onSelect}
    >
      <CardContent className="p-3">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-slate-500" />
            <span className="font-medium">
              {timeSlot.start} - {timeSlot.end}
            </span>
          </div>

          {timeSlot.isBreak ? (
            <Badge
              variant="outline"
              className="bg-amber-100 dark:bg-amber-900 border-amber-200 dark:border-amber-800 text-amber-800 dark:text-amber-300"
            >
              Break
            </Badge>
          ) : timeSlot.booked ? (
            <Badge
              variant="outline"
              className="bg-red-50 dark:bg-red-950 border-red-200 dark:border-red-900 text-red-700 dark:text-red-400"
            >
              Booked
            </Badge>
          ) : (
            <Badge
              variant="outline"
              className="bg-green-50 dark:bg-green-950 border-green-200 dark:border-green-900 text-green-700 dark:text-green-400"
            >
              Available
            </Badge>
          )}
        </div>

        {timeSlot.bookedBy && (
          <div className="mt-2 text-sm text-slate-500 dark:text-slate-400 truncate">{timeSlot.bookedBy}</div>
        )}
      </CardContent>
    </Card>
  )
}
