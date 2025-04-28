"use client"
import { useState } from "react"
import Link from "next/link"
import { Building, Clock, MapPin, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import RoomMap from "@/components/room-map"
import NearbyRooms from "@/components/nearby-rooms"
import RecentReservations from "@/components/recent-reservations"
// Sample building options for search suggestions
interface Building {
  id: number
  name: string
}
const buildings: Building[] = [
  { id: 1, name: "University Library" },
  { id: 2, name: "Mendocino Hall" },
  { id: 3, name: "Riverside Hall" },
  { id: 4, name: "University Union" },
  { id: 5, name: "Sequoia Hall" },
  { id: 6, name: "Placer Hall" },
]

// Sample rooms for demonstration purposes.
// In your real app each building might have its own room list.
const sampleRooms = [
  { id: 1, roomNumber: "101", name: "Room 101" },
  { id: 2, roomNumber: "102", name: "Room 102" },
  { id: 3, roomNumber: "103", name: "Room 103" },
]

export default function HomePage() {
    // New state for search, selected building, and whether to show rooms list.
    const [searchTerm, setSearchTerm] = useState("")
    const [selectedBuilding, setSelectedBuilding] =  useState<Building | null>(null)
    const [showRooms, setShowRooms] = useState(false)
  
    // Filter building suggestions based on typed text.
    const filteredBuildings = buildings.filter((b) =>
      b.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
  
    // Handle selecting a building suggestion.
    const handleSelectBuilding = (building: Building) => {
      setSelectedBuilding(building)
      setSearchTerm(building.name)
    }
  
    // Handle click of the "Find Nearby Rooms" button.
    const handleFindRooms = () => {
      if (selectedBuilding) {
        setShowRooms(true)
      } else {
        // Optionally, you could show an error message if no building is selected.
        alert("Please select a building from the suggestions.")
      }
    }
    const sampleRooms = [
      { id: 1, roomNumber: "101", name: "Room 101" },
      { id: 2, roomNumber: "102", name: "Room 102" },
      { id: 3, roomNumber: "103", name: "Room 103" },
    ]
  
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
            <Link href="/buildings" className="text-sm font-medium hover:underline">
              Buildings
            </Link>
            <Link href="/reservations" className="text-sm font-medium hover:underline">
              My Reservations
            </Link>
            <Link href="/help" className="text-sm font-medium hover:underline">
              Help
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <Button variant="outline" className=" text-[#00563F] hover:bg-white hover:text-[#00563F]">
              Sign In
            </Button>
            <Button className="bg-[#C4B581] text-[#00563F] hover:bg-[#d8c99a]">Sign Up</Button>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <section className="bg-[#00563F] py-12 text-white">
          <div className="container px-4">
            <div className="mx-auto max-w-3xl text-center">
              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
                Find Available Classrooms at Sacramento State
              </h1>
              <p className="mt-4 text-lg">
                Quickly locate and reserve empty classrooms based on your current location on campus.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4 relative">
                <div className="relative w-full max-w-md">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search by building or room number..."
                    className="pl-10 bg-white text-black"
                    value={searchTerm}
                    onChange={(e) => {
                      setSearchTerm(e.target.value)
                      setSelectedBuilding(null) // Reset selected building when typing
                      setShowRooms(false) // Hide rooms list on new search
                    }}
                  />
                  {/* Dropdown list of building suggestions */}
                  {searchTerm.length > 0 && !selectedBuilding && (
                    <ul className="absolute z-10 mt-1 max-h-60 w-full overflow-y-auto rounded border bg-white text-black shadow">
                      {filteredBuildings.length > 0 ? (
                        filteredBuildings.map((b) => (
                          <li
                            key={b.id}
                            className="cursor-pointer px-4 py-2 hover:bg-gray-200"
                            onClick={() => handleSelectBuilding(b)}
                          >
                            {b.name}
                          </li>
                        ))
                      ) : (
                        <li className="px-4 py-2">No matches found.</li>
                      )}
                    </ul>
                  )}
                </div>
                <Button
                  className="bg-[#C4B581] text-[#00563F] hover:bg-[#d8c99a] w-full sm:w-auto"
                  onClick={handleFindRooms}
                >
                  Find Nearby Rooms
                </Button>
              </div>
              {/* Scrollable rooms list based on selected building */}
              {showRooms && selectedBuilding && (
                <div className="mt-4 max-h-60 overflow-y-auto rounded border bg-white p-4 text-black shadow">
                  <h2 className="mb-2 text-lg font-bold">
                    Rooms in {selectedBuilding.name}
                  </h2>
                  {sampleRooms.map((room) => (
                    <div
                      key={room.id}
                      className="flex items-center justify-between border-b py-2 last:border-0"
                    >
                      <div>
                        <p className="font-medium">{room.name}</p>
                        <p className="text-xs text-gray-600">Room {room.roomNumber}</p>
                      </div>
                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>
        <section className="py-12">
          <div className="container px-4">
            <Tabs defaultValue="map" className="mx-auto max-w-4xl">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="map">Campus Map</TabsTrigger>
                <TabsTrigger value="nearby">Nearby Rooms</TabsTrigger>
                <TabsTrigger value="recent">Recent Reservations</TabsTrigger>
              </TabsList>
              <TabsContent value="map" className="mt-6">
                <Card>
                  <CardContent className="p-6">
                    <RoomMap />
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="nearby" className="mt-6">
                <Card>
                  <CardContent className="p-6">
                    <NearbyRooms />
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="recent" className="mt-6">
                <Card>
                  <CardContent className="p-6">
                    <RecentReservations />
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </section>
        <section className="border-t py-12">
          <div className="container px-4">
            <div className="mx-auto max-w-4xl">
              <h2 className="text-2xl font-bold">How It Works</h2>
              <div className="mt-8 grid gap-8 md:grid-cols-3">
                <Card>
                  <CardContent className="p-6 text-center">
                    <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#00563F] text-white">
                      <MapPin className="h-6 w-6" />
                    </div>
                    <h3 className="text-lg font-medium">Find Your Location</h3>
                    <p className="mt-2 text-sm text-muted-foreground">
                      Enable location services to find classrooms near you on campus.
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6 text-center">
                    <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#00563F] text-white">
                      <Search className="h-6 w-6" />
                    </div>
                    <h3 className="text-lg font-medium">Browse Available Rooms</h3>
                    <p className="mt-2 text-sm text-muted-foreground">
                      View real-time availability of classrooms across campus buildings.
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6 text-center">
                    <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#00563F] text-white">
                      <Clock className="h-6 w-6" />
                    </div>
                    <h3 className="text-lg font-medium">Reserve Your Space</h3>
                    <p className="mt-2 text-sm text-muted-foreground">
                      Book a room for your study session or group meeting in seconds.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="border-t bg-[#00563F] text-white py-6">
        <div className="container px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm">© 2025 Team Lowkey Vital. All rights reserved.</p>
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
