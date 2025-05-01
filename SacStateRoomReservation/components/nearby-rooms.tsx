"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, MapPin, Users, Wifi } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

// Sample data for nearby rooms
const nearbyRooms = [
  {
    id: 1,
    building: "University Library",
    room: "2021",
    distance: "2 min walk",
    capacity: 30,
    features: ["Projector", "Whiteboard", "WiFi"],
    availableUntil: "5:00 PM",
  },
  {
    id: 2,
    building: "Mendocino Hall",
    room: "1024",
    distance: "3 min walk",
    capacity: 24,
    features: ["Projector", "Whiteboard", "WiFi", "Computers"],
    availableUntil: "6:30 PM",
  },
  {
    id: 3,
    building: "Riverside Hall",
    room: "3018",
    distance: "5 min walk",
    capacity: 40,
    features: ["Projector", "Whiteboard", "WiFi"],
    availableUntil: "8:00 PM",
  },
  {
    id: 4,
    building: "Sequoia Hall",
    room: "115",
    distance: "7 min walk",
    capacity: 20,
    features: ["Whiteboard", "WiFi"],
    availableUntil: "9:00 PM",
  },
]

export default function NearbyRooms() {
  const [selectedRoom, setSelectedRoom] = useState(null)

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">Nearby Available Rooms</h2>
        <div className="flex items-center gap-2">
          <Select defaultValue="distance">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="distance">Distance</SelectItem>
              <SelectItem value="availability">Availability</SelectItem>
              <SelectItem value="capacity">Capacity</SelectItem>
            </SelectContent>
          </Select>
          <Button className="bg-[#00563F] hover:bg-[#00563F]/90">Refresh</Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {nearbyRooms.map((room) => (
          <Card key={room.id} className="overflow-hidden">
            <CardHeader className="bg-[#00563F] text-white p-4">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg">
                    {room.building} {room.room}
                  </CardTitle>
                  <div className="flex items-center mt-1 text-sm">
                    <MapPin className="h-3 w-3 mr-1" />
                    <span>{room.distance}</span>
                  </div>
                </div>
                <Badge className="bg-[#C4B581] text-[#00563F] hover:bg-[#C4B581]/90">Available</Badge>
              </div>
            </CardHeader>
            <CardContent className="p-4">
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div className="flex items-center">
                  <Users className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span>Capacity: {room.capacity}</span>
                </div>
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span>Until: {room.availableUntil}</span>
                </div>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                {room.features.map((feature, index) => (
                  <Badge key={index} variant="outline" className="bg-gray-100">
                    {feature === "WiFi" && <Wifi className="h-3 w-3 mr-1" />}
                    {feature}
                  </Badge>
                ))}
              </div>
            </CardContent>
            <CardFooter className="p-4 pt-0 flex justify-end">
              <Dialog>
                <DialogTrigger asChild>
                  <Button
                    className="bg-[#C4B581] text-[#00563F] hover:bg-[#C4B581]/90"
                    onClick={() => setSelectedRoom(room)}
                  >
                    Reserve Room
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Reserve Room</DialogTitle>
                    <DialogDescription>
                      Reserve {selectedRoom?.building} {selectedRoom?.room} for your study session or meeting.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="start-time">Start Time</Label>
                        <Input id="start-time" type="time" defaultValue="14:00" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="end-time">End Time</Label>
                        <Input id="end-time" type="time" defaultValue="16:00" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="purpose">Purpose</Label>
                      <Select defaultValue="study">
                        <SelectTrigger id="purpose">
                          <SelectValue placeholder="Select purpose" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="study">Individual Study</SelectItem>
                          <SelectItem value="group">Group Study</SelectItem>
                          <SelectItem value="meeting">Club Meeting</SelectItem>
                          <SelectItem value="project">Project Work</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="attendees">Number of Attendees</Label>
                      <Input id="attendees" type="number" defaultValue="1" min="1" max={selectedRoom?.capacity} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="notes">Additional Notes</Label>
                      <Input id="notes" placeholder="Any special requirements?" />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button variant="outline">Cancel</Button>
                    <Button className="bg-[#00563F] hover:bg-[#00563F]/90">Confirm Reservation</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </CardFooter>
          </Card>
        ))}
      </div>

      <div className="flex items-center justify-center mt-6">
        <Button className="bg-[#00563F] hover:bg-[#00563F]/90">Load More Rooms</Button>
      </div>
    </div>
  )
}
