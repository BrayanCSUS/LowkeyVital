// app/page.tsx
//home page
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
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { useEffect } from "react"
import { useAuth } from "@/context/AuthContext"
import { getAvailableRooms } from "../lib/roomUtils";
import { Room } from "../lib/types";
console.log(getAvailableRooms); // Should log the function definition
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

// Building interface to define the structure of building data.
interface Building {
  id: number;
  name: string;
  code: string; // code like "LIB"
  type: "academic" | "student";
  floors: number;
  rooms: number;
  availableRooms: number;
  hours: string;
  features: string[];
  image: string;
}

export default function HomePage() {
    // New state for search, selected building, and whether to show rooms list.
    const [searchTerm, setSearchTerm] = useState("")
    const [selectedBuilding, setSelectedBuilding] =  useState<Building | null>(null)
    const [showRooms, setShowRooms] = useState(false)
    const [showNearbyRooms, setShowNearbyRooms] = useState(false)
    const [buildings, setBuildings] = useState<Building[]>([]);
    // New state for selected tab
    const [selectedTab, setSelectedTab] = useState<string>("all");

    // New state for rooms and selected room details
    const [rooms, setRooms] = useState<Room[]>([])
    const [selectedRoomDetails, setSelectedRoomDetails] = useState<Room | null>(null);

    // Helper to format time as 'h:mm AM/PM'
    function formatTime12hr(time: string) {
      if (!time) return "";
      if (time.match(/AM|PM/i)) return time;
      const [h, m] = time.split(":");
      if (h === undefined || m === undefined) return time;
      const date = new Date();
      date.setHours(Number(h));
      date.setMinutes(Number(m));
      return date.toLocaleTimeString(undefined, { hour: 'numeric', minute: '2-digit', hour12: true });
    }

    // Fetch buildings data from JSON file on component mount.
    useEffect(() => {
      fetch("/data/buildings_data.json")
        .then((res) => res.json())
        .then((data) => setBuildings(data))
        .catch((err) => console.error("Failed to load buildings:", err));
    }, []);
  
    // Fetch room data based on the selected building's code.
    useEffect(() => {
      if (!selectedBuilding) return;
      console.log("Selected Building:", selectedBuilding.code);
      getAvailableRooms(selectedBuilding)
        .then((roomList) => {
          console.log("Room List:", roomList);
          setRooms(roomList);
        })
        .catch((err) => console.error("Error fetching rooms:", err));
    }, [selectedBuilding]);

    // Filter building suggestions based on typed text and selected tab.
    const filteredBuildings = buildings.filter((b) => {
      const matchesSearch = b.name?.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesTab =
        selectedTab === "all" ||
        (selectedTab === "academic" && b.type === "academic") ||
        (selectedTab === "student" && b.type === "student");
      return matchesSearch && matchesTab;
    });    
  
    // Handle selecting a building suggestion.
    const handleSelectBuilding = (building: Building) => {
      console.log("Selected Building:", building);
      setSelectedBuilding(building)
      setSearchTerm(building.name)
    }
  
      // Update handleFindRooms: only allow if user is logged in.
    const { user } = useAuth()

    const handleFindRooms = () => {
    if (!user) {
      alert("Please sign in to reserve a room.")
      return
    }
    if (selectedBuilding) {
      setShowRooms(true)
    } else {
      alert("Please select a building from the suggestions.")
    }
  }


    // Handle click of the "View Details" button for a room.
    const handleViewDetails = (room: Room) => {
      setSelectedRoomDetails(room);
    };
  
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
            <Link href="/Help" className="text-sm font-medium hover:underline">
              Help
            </Link>
          </nav>
          <div className="flex items-center gap-4">
          { !user && <Sign_In_Button /> }
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
                  Find Rooms
                </Button>
              </div>
              {/* Scrollable rooms list based on selected building */}
              {showRooms && selectedBuilding && (
                <div className="mt-4 max-h-60 overflow-y-auto rounded border bg-white p-4 text-black shadow">
                  <h2 className="mb-2 text-lg font-bold">
                    Rooms in {selectedBuilding.name}
                  </h2>
                  {rooms.length > 0 ? (
                    rooms.map((room) => (
                      <div
                        key={room.id}
                        className="flex items-center justify-between border-b py-2 last:border-0"
                      >
                        <div>
                          <p className="text-xs text-gray-600">Room {room.roomNumber}</p>
                        </div>
                      {user ? (
                          <Button variant="outline" size="sm" onClick={() => handleViewDetails(room)}>
                            View Details
                          </Button>
                      ) : (
                        <Button variant="outline" size="sm" disabled>
                          Sign in to view details
                        </Button>
                      )}
                      </div>
                    ))
                  ) : (
                    <p className="text-sm text-gray-600">No rooms available for this building.</p>
                  )}
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

            {/*}
            <div className="flex items-center gap-2 w-full md:w-auto">
              <div className="relative flex-1 md:w-64">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input placeholder="Search buildings..." className="pl-10" value= {searchTerm} onChange={(e) => setSearchTerm(e.target.value)}/>
              </div>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
            </div> *
          </div>*/}
          
        
          <Tabs defaultValue="all" className="mb-8" value={selectedTab} onValueChange={setSelectedTab}>
            <TabsList>
              <TabsTrigger value="all">All Buildings</TabsTrigger>
              <TabsTrigger value="academic">Academic</TabsTrigger>
              <TabsTrigger value="student">Student Services</TabsTrigger>
            </TabsList>
          </Tabs>
        
        </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredBuildings.map((building) => (
              <Card key={building.id} className="overflow-hidden flex flex-col h-full">
                <img
                  src={building.image || "/placeholder.svg"}
                  alt={building.name}
                  className="w-full h-40 object-cover"
                />
                <CardHeader className="p-4 pb-2">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-xl">{building.name}</CardTitle>
                    <Badge variant="default">{building.code}</Badge>
                  </div>
                </CardHeader>
                <CardContent className="p-4 pt-0 pb-2 flex-grow flex flex-col">
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
                  <div className="text-sm font-medium text-[#00563F] mt-auto">
                    {building.availableRooms} rooms available now
                  </div>
                </CardContent>
                <CardFooter className="p-4 pt-2 flex justify-between">
                  <Button variant="outline">View Details</Button>
                 <Button
                   className="bg-[#00563F] hover:bg-[#00563F]/90"
                   onClick={() => {
                    if (!user) {
                    alert("Please sign in to reserve a room.")
                     } else {
                    {
                      console.log("Selected Building:", building); // Log the selected building
                      setSelectedBuilding(building); // Set the selected building
                      setShowNearbyRooms(true)
                  }
          }; // Open the NearbyRooms dialog
                    }}
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
          <DialogTitle>Nearby Rooms</DialogTitle>
          <div className="max-h-[75vh] overflow-y-auto p-2">
            <NearbyRooms selectedBuilding={selectedBuilding} />
          </div>
        </DialogContent>
      </Dialog>
      {selectedRoomDetails && (
        <Dialog open={!!selectedRoomDetails} onOpenChange={() => setSelectedRoomDetails(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Room Details</DialogTitle>
              <DialogDescription>
                <p><strong>Room Number:</strong> {selectedRoomDetails.roomNumber}</p>
                <p><strong>Building:</strong> {selectedRoomDetails.building}</p>
                <p><strong>Distance:</strong> {selectedRoomDetails.distance}</p>
                <p><strong>Capacity:</strong> {selectedRoomDetails.capacity}</p>
                <p><strong>Features:</strong> {selectedRoomDetails.features.join(", ")}</p>
                <p><strong>Available Until:</strong> {formatTime12hr(selectedRoomDetails.availableUntil)}</p>
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      )}
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
