"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Building, Calendar, Clock, Download, MapPin, Trash } from "lucide-react"
import Link from "next/link"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import Sign_In_Button from "../login/sign_in_button"

// Sample data for reservations
const upcomingReservations = [
  {
    id: 1,
    building: "University Library",
    room: "2021",
    date: "Today",
    startTime: "2:00 PM",
    endTime: "4:00 PM",
    purpose: "Group Study",
    attendees: 4,
  },
  {
    id: 2,
    building: "Mendocino Hall",
    room: "1024",
    date: "Tomorrow",
    startTime: "10:00 AM",
    endTime: "12:00 PM",
    purpose: "Project Work",
    attendees: 3,
  },
  {
    id: 3,
    building: "Riverside Hall",
    room: "3018",
    date: "May 15, 2025",
    startTime: "1:00 PM",
    endTime: "3:00 PM",
    purpose: "Club Meeting",
    attendees: 8,
  },
]

const pastReservations = [
  {
    id: 4,
    building: "Sequoia Hall",
    room: "115",
    date: "May 1, 2025",
    startTime: "9:00 AM",
    endTime: "11:00 AM",
    purpose: "Individual Study",
    attendees: 1,
  },
  {
    id: 5,
    building: "University Union",
    room: "3rd Floor",
    date: "April 28, 2025",
    startTime: "3:00 PM",
    endTime: "5:00 PM",
    purpose: "Group Study",
    attendees: 5,
  },
]

export default function ReservationsPage() {
  const [selectedReservation, setSelectedReservation] = useState(null)

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-10 border-b bg-[#00563F] text-white">
        <div className="container flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-2 font-bold">
            <Building className="h-5 w-5" />
            <span>Sac State Room Finder</span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/" className="text-sm font-medium hover:underline">
              Home
            </Link>
            <Link href="/reservations" className="text-sm font-medium hover:underline">
              My Reservations
            </Link>
            <Link href="/help" className="text-sm font-medium hover:underline">
              Help
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <Sign_In_Button />
          </div>
        </div>
      </header>

      <main className="flex-1 py-8">
        <div className="container px-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <div>
              <h1 className="text-3xl font-bold">My Reservations</h1>
              <p className="text-muted-foreground mt-1">Manage your room reservations</p>
            </div>
            <Button className="bg-[#00563F] hover:bg-[#00563F]/90">
              <Calendar className="mr-2 h-4 w-4" />
              New Reservation
            </Button>
          </div>

          <Tabs defaultValue="upcoming" className="mb-8">
            <TabsList>
              <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
              <TabsTrigger value="past">Past</TabsTrigger>
              <TabsTrigger value="canceled">Canceled</TabsTrigger>
            </TabsList>

            <TabsContent value="upcoming" className="mt-6">
              {upcomingReservations.length > 0 ? (
                <div className="grid gap-4">
                  {upcomingReservations.map((reservation) => (
                    <Card key={reservation.id}>
                      <CardHeader className="p-4 pb-2">
                        <div className="flex flex-col md:flex-row justify-between md:items-center gap-2">
                          <CardTitle className="text-lg">
                            {reservation.building} {reservation.room}
                          </CardTitle>
                          <Badge className="bg-[#C4B581] text-[#00563F] w-fit">Upcoming</Badge>
                        </div>
                      </CardHeader>
                      <CardContent className="p-4 pt-0 pb-2">
                        <div className="grid md:grid-cols-3 gap-4 text-sm">
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
                          <div className="flex items-center">
                            <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                            <span>Purpose: {reservation.purpose}</span>
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter className="p-4 pt-2 flex flex-wrap justify-end gap-2">
                        <Button variant="outline" size="sm">
                          <MapPin className="h-4 w-4 mr-2" />
                          Directions
                        </Button>
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="outline" size="sm" onClick={() => setSelectedReservation(reservation)}>
                              View Details
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Reservation Details</DialogTitle>
                              <DialogDescription>Information about your room reservation</DialogDescription>
                            </DialogHeader>
                            <div className="space-y-4 py-4">
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <h4 className="font-medium text-sm">Building & Room</h4>
                                  <p>
                                    {selectedReservation?.building} {selectedReservation?.room}
                                  </p>
                                </div>
                                <div>
                                  <h4 className="font-medium text-sm">Date</h4>
                                  <p>{selectedReservation?.date}</p>
                                </div>
                              </div>
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <h4 className="font-medium text-sm">Time</h4>
                                  <p>
                                    {selectedReservation?.startTime} - {selectedReservation?.endTime}
                                  </p>
                                </div>
                                <div>
                                  <h4 className="font-medium text-sm">Purpose</h4>
                                  <p>{selectedReservation?.purpose}</p>
                                </div>
                              </div>
                              <div>
                                <h4 className="font-medium text-sm">Attendees</h4>
                                <p>{selectedReservation?.attendees} people</p>
                              </div>
                              <div className="border-t pt-4 mt-4">
                                <h4 className="font-medium text-sm mb-2">Reservation Code</h4>
                                <div className="bg-gray-100 p-3 rounded-md text-center font-mono">
                                  SACST-{selectedReservation?.id.toString().padStart(4, "0")}
                                </div>
                              </div>
                            </div>
                            <DialogFooter className="flex justify-between">
                              <Button variant="outline" size="sm">
                                <Download className="h-4 w-4 mr-2" />
                                Download
                              </Button>
                              <Button className="bg-[#00563F] hover:bg-[#00563F]/90">Close</Button>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
                        <Button variant="destructive" size="sm">
                          <Trash className="h-4 w-4 mr-2" />
                          Cancel
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              ) : (
                <Alert>
                  <AlertTitle>No upcoming reservations</AlertTitle>
                  <AlertDescription>
                    You don't have any upcoming room reservations. Make a new reservation to get started.
                  </AlertDescription>
                </Alert>
              )}
            </TabsContent>

            <TabsContent value="past" className="mt-6">
              {pastReservations.length > 0 ? (
                <div className="grid gap-4">
                  {pastReservations.map((reservation) => (
                    <Card key={reservation.id}>
                      <CardHeader className="p-4 pb-2">
                        <div className="flex flex-col md:flex-row justify-between md:items-center gap-2">
                          <CardTitle className="text-lg">
                            {reservation.building} {reservation.room}
                          </CardTitle>
                          <Badge variant="outline" className="w-fit">
                            Completed
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent className="p-4 pt-0 pb-2">
                        <div className="grid md:grid-cols-3 gap-4 text-sm">
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
                          <div className="flex items-center">
                            <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                            <span>Purpose: {reservation.purpose}</span>
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter className="p-4 pt-2 flex flex-wrap justify-end gap-2">
                        <Button variant="outline" size="sm">
                          View Details
                        </Button>
                        <Button className="bg-[#00563F] hover:bg-[#00563F]/90" size="sm">
                          Reserve Again
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              ) : (
                <Alert>
                  <AlertTitle>No past reservations</AlertTitle>
                  <AlertDescription>You don't have any past room reservations.</AlertDescription>
                </Alert>
              )}
            </TabsContent>

            <TabsContent value="canceled" className="mt-6">
              <Alert>
                <AlertTitle>No canceled reservations</AlertTitle>
                <AlertDescription>You don't have any canceled room reservations.</AlertDescription>
              </Alert>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <footer className="border-t bg-[#00563F] text-white py-6">
        <div className="container px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm">© 2025 Sacramento State University. All rights reserved.</p>
            <nav className="flex items-center gap-4">
              <Link href="/privacy" className="text-xs hover:underline">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-xs hover:underline">
                Terms of Service
              </Link>
              <Link href="/contact" className="text-xs hover:underline">
                Contact
              </Link>
            </nav>
          </div>
        </div>
      </footer>
    </div>
  )
}
