import { Star } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

interface Therapist {
  id: number
  name: string
  specialty: string
  avatar: string
  rating: number
  reviewCount: number
}

interface TherapistCardProps {
  therapist: Therapist
}

export function TherapistCard({ therapist }: TherapistCardProps) {
  return (
    <div className="space-y-4 pt-3">
      <div className="flex items-center gap-4">
        <Avatar className="h-16 w-16 border">
          <AvatarImage src={therapist.avatar || "/placeholder.svg"} alt={therapist.name} />
          <AvatarFallback className="text-lg">
            {therapist.name
              .split(" ")
              .map((n) => n[0])
              .join("")}
          </AvatarFallback>
        </Avatar>

        <div>
          <h3 className="font-medium text-lg">{therapist.name}</h3>
          <div className="flex items-center gap-1 mt-1">
            <Star className="h-4 w-4 fill-yellow-400 stroke-yellow-400" />
            <span className="font-medium">{therapist.rating}</span>
            <span className="text-sm text-slate-500 dark:text-slate-400">({therapist.reviewCount} reviews)</span>
          </div>
        </div>
      </div>

      <div>
        <h4 className="text-sm font-medium mb-2">Specialties</h4>
        <div className="flex flex-wrap gap-2">
          {therapist.specialty.split(", ").map((specialty, index) => (
            <Badge key={index} variant="secondary">
              {specialty}
            </Badge>
          ))}
        </div>
      </div>

      <div className="text-sm text-slate-600 dark:text-slate-400">
        <p>
          A professional with years of experience providing personalized treatments. Book an appointment and experience
          the beneficial effects of professional massage.
        </p>
      </div>
    </div>
  )
}
