"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, MapPin } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

// Sample data for recent reservations
const recentReservations = [
  {
    id: 1,
    building: "University Library",
    room: "2021",
    date: "Today",
    startTime: "2:00 PM",
    endTime: "4:00 PM",
    status: "upcoming",
  },
  {
    id: 2,
    building: "Mendocino Hall",
    room: "1024",
    date: "Yesterday",
    startTime: "10:00 AM",
    endTime: "12:00 PM",
    status: "completed",
  },
]

export default function RecentReservations() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">Your Recent Reservations</h2>
        <Button className="bg-[#00563F] hover:bg-[#00563F]/90">View All</Button>
      </div>

      {recentReservations.length > 0 ? (
        <div className="space-y-4">
          {recentReservations.map((reservation) => (
            <Card key={reservation.id}>
              <CardHeader className="p-4 pb-2">
                <div className="flex justify-between items-start">
                  <CardTitle className="text-lg">
                    {reservation.building} {reservation.room}
                  </CardTitle>
                  <Badge
                    className={
                      reservation.status === "upcoming" ? "bg-[#C4B581] text-[#00563F]" : "bg-gray-200 text-gray-700"
                    }
                  >
                    {reservation.status === "upcoming" ? "Upcoming" : "Completed"}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="p-4 pt-0 pb-2">
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span>{reservation.date}</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span>
                      {reservation.startTime} - {reservation.endTime}
                    </span>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="p-4 pt-2 flex justify-end gap-2">
                <Button variant="outline" size="sm">
                  <MapPin className="h-4 w-4 mr-2" />
                  Directions
                </Button>
                {reservation.status === "upcoming" && (
                  <Button variant="destructive" size="sm">
                    Cancel
                  </Button>
                )}
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <Alert>
          <AlertTitle>No recent reservations</AlertTitle>
          <AlertDescription>
            You haven't made any room reservations recently. Find an available room to get started.
          </AlertDescription>
        </Alert>
      )}

      <div className="border-t pt-4 mt-6">
        <h3 className="font-medium mb-2">Quick Actions</h3>
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" size="sm">
            Find Study Room
          </Button>
          <Button variant="outline" size="sm">
            Reserve Computer Lab
          </Button>
          <Button variant="outline" size="sm">
            Group Meeting Space
          </Button>
        </div>
      </div>
    </div>
  )
}
