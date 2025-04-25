"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Building, Clock, Filter, MapPin, Search } from "lucide-react"
import {useState} from "react"
import Link from "next/link"
import Sign_In_Button from "../login/sign_in_button"

// Sample data for buildings
const buildings = [
  {
    id: 1,
    name: "University Library",
    code: "LIB",
    type: "academic",
    floors: 4,
    rooms: 42,
    availableRooms: 12,
    hours: "7:00 AM - 10:00 PM",
    features: ["Study Rooms", "Computer Labs", "Quiet Zones"],
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 2,
    name: "Mendocino Hall",
    code: "MND",
    type: "academic",
    floors: 3,
    rooms: 36,
    availableRooms: 8,
    hours: "7:00 AM - 9:00 PM",
    features: ["Lecture Halls", "Computer Labs", "Faculty Offices"],
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 3,
    name: "Riverside Hall",
    code: "RVR",
    type: "academic",
    floors: 5,
    rooms: 50,
    availableRooms: 15,
    hours: "7:00 AM - 10:00 PM",
    features: ["Engineering Labs", "Lecture Halls", "Study Areas"],
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 4,
    name: "University Union",
    code: "UU",
    type: "student",
    floors: 3,
    rooms: 30,
    availableRooms: 5,
    hours: "7:00 AM - 11:00 PM",
    features: ["Meeting Rooms", "Event Spaces", "Dining"],
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 5,
    name: "Sequoia Hall",
    code: "SEQ",
    type: "academic",
    floors: 4,
    rooms: 40,
    availableRooms: 10,
    hours: "7:00 AM - 9:00 PM",
    features: ["Classrooms", "Labs", "Study Areas"],
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 6,
    name: "Placer Hall",
    code: "PLC",
    type: "academic",
    floors: 3,
    rooms: 30,
    availableRooms: 7,
    hours: "7:00 AM - 8:00 PM",
    features: ["Lecture Halls", "Research Labs", "Faculty Offices"],
    image: "/placeholder.svg?height=200&width=300",
  },
]

export default function BuildingsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const filteredBuildings = buildings.filter((building) =>
    building.name.toLowerCase().includes(searchTerm.toLowerCase()))  return (
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
            <Sign_In_Button />
          </div>
        </div>
      </header>

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
                  <Button className="bg-[#00563F] hover:bg-[#00563F]/90">Find Rooms</Button>
                </CardFooter>
              </Card>
            ))}
          </div>
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
