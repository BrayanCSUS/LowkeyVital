"use client"
import { useState } from "react"
import Link from "next/link"
import { Building, Clock, Filter, MapPin, Search } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import RoomMap from "@/components/room-map"
import NearbyRooms from "@/components/nearby-rooms"
import RecentReservations from "@/components/recent-reservations"
import Sign_In_Button from "./login/sign_in_button"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { useEffect } from "react"

// Sample building options for search suggestions
interface Building {
  id: number
  name: string
}
const buildings2: Building[] = [
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
    const [showNearbyRooms, setShowNearbyRooms] = useState(false)

    // State and Fetch for buildings data.
    interface BuildingType {
      id: number;
      name: string;
      code: string; // code like "LIB"
      floors: number;
      rooms: number;
      availableRooms: number;
      hours: string;
      features: string[];
      image: string;
    }

    const [buildings, setBuildings] = useState<BuildingType[]>([]);

    useEffect(() => {
      fetch("/data/buildings_data.json")
        .then((res) => res.json())
        .then((data) => setBuildings(data))
        .catch((err) => console.error("Failed to load buildings:", err));
    }, []);
  
    // Filter building suggestions based on typed text.
    const filteredBuildings = buildings.filter((b) =>
      b.name?.toLowerCase().includes(searchTerm.toLowerCase())
    );    
  
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
                    placeholder="Search by building..."
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

        {/*
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
        */}
         <main className="flex-1 py-8">
        <div className="container px-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <div>
              <h1 className="text-3xl font-bold">Campus Buildings</h1>
              <p className="text-muted-foreground mt-1">Browse all buildings and available rooms on campus</p>
            </div>
            <div className="flex items-center gap-2 w-full md:w-auto">
              <div className="relative flex-1 md:w-64">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input placeholder="Search buildings..." className="pl-10" value= {searchTerm} onChange={(e) => setSearchTerm(e.target.value)}/>
              </div>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <Tabs defaultValue="all" className="mb-8">
            <TabsList>
              <TabsTrigger value="all">All Buildings</TabsTrigger>
              <TabsTrigger value="academic">Academic</TabsTrigger>
              <TabsTrigger value="admin">Administrative</TabsTrigger>
              <TabsTrigger value="student">Student Services</TabsTrigger>
            </TabsList>
          </Tabs>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredBuildings.map((building) => (
              <Card key={building.id} className="overflow-hidden">
                <img
                  src={building.image || "/placeholder.svg"}
                  alt={building.name}
                  className="w-full h-40 object-cover"
                />
                <CardHeader className="p-4 pb-2">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-xl">{building.name}</CardTitle>
                    <Badge>{building.code}</Badge>
                  </div>
                </CardHeader>
                <CardContent className="p-4 pt-0 pb-2">
                  <div className="grid grid-cols-2 gap-2 text-sm mb-3">
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span>{building.floors} Floors</span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span>{building.hours}</span>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {building.features.map((feature, index) => (
                      <Badge key={index} variant="outline" className="bg-gray-100">
                        {feature}
                      </Badge>
                    ))}
                  </div>
                  <div className="text-sm font-medium text-[#00563F]">
                    {building.availableRooms} rooms available now
                  </div>
                </CardContent>
                <CardFooter className="p-4 pt-2 flex justify-between">
                  <Button variant="outline">View Details</Button>
                  <Button
                    className="bg-[#00563F] hover:bg-[#00563F]/90"
                    onClick={() => setShowNearbyRooms(true)}
                  >
                    Find Rooms
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </main>

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
      <Dialog open={showNearbyRooms} onOpenChange={setShowNearbyRooms}>
        <DialogContent className="max-w-2xl w-full">
          <NearbyRooms />
        </DialogContent>
      </Dialog>
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
