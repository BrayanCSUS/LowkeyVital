"use client";

import { useEffect, useState } from "react";
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
import ReserveRoom from '../app/reservations/reserve-room'
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
import { getAvailableRooms } from "../lib/roomUtils";
import { Room } from "../lib/types";

// Props for the NearbyRooms component, defining the selected building
interface NearbyRoomsProps {
  selectedBuilding: { code: string; name: string } | null; // Building code and name
}

export default function NearbyRooms({ selectedBuilding }: NearbyRoomsProps) {
  // Helper to format time as 'h:mm AM/PM'
  function formatTime12hr(time: string) {
    if (!time) return "";
    // If already in AM/PM format, return as is
    if (time.match(/AM|PM/i)) return time;
    const [h, m] = time.split(":");
    if (h === undefined || m === undefined) return time;
    const date = new Date();
    date.setHours(Number(h));
    date.setMinutes(Number(m));
    return date.toLocaleTimeString(undefined, { hour: 'numeric', minute: '2-digit', hour12: true });
  }

  // State to store the list of available rooms
  const [availableRooms, setAvailableRooms] = useState<Room[]>([]);
  // State to control how many rooms are visible at a time
  const [visibleRoomsCount, setVisibleRoomsCount] = useState(4); // Initially show 4 rooms

  // Fetch rooms for the selected building when it changes
  useEffect(() => {
    if (selectedBuilding) {
      getAvailableRooms(selectedBuilding)
        .then((rooms) => {
          console.log("Fetched Available Rooms:", rooms); // Log the fetched rooms for debugging
          setAvailableRooms(rooms); // Update the state with the fetched rooms
        })
        .catch((err) => console.error("Error fetching available rooms:", err)); // Handle errors
    }
  }, [selectedBuilding]); // Dependency array ensures this runs when `selectedBuilding` changes

  // If no building is selected, show a message
  if (!selectedBuilding) {
    return <p>Please select a building to view available rooms.</p>;
  }

  // Function to load more rooms (increments the visible count by 4)
  const handleLoadMore = () => {
    setVisibleRoomsCount((prevCount) => prevCount + 4);
  };

  return (
    <div className="space-y-4">
      {/* Header section with building name and sorting options */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">Available Rooms in {selectedBuilding.name}</h2>
        
        

      </div>

      {/* Grid to display room cards */}
      <div className="grid gap-4 md:grid-cols-2">
        {availableRooms.slice(0, visibleRoomsCount).map((room) => (
          <Card key={room.id} className="overflow-hidden">
            {/* Card header with room details */}
            <CardHeader className="bg-[#00563F] text-white p-4">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg">
                    {room.building} {room.roomNumber} {/* Display building and room number */}
                  </CardTitle>
                  <div className="flex items-center mt-1 text-sm">
                    <MapPin className="h-3 w-3 mr-1" />
                    <span>{room.distance}</span> {/* Display room distance */}
                  </div>
                </div>
                <Badge className="bg-[#C4B581] text-[#00563F] hover:bg-[#C4B581]/90">Available</Badge>
              </div>
            </CardHeader>
            {/* Card content with room features */}
            <CardContent className="p-4">
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div className="flex items-center">
                  <Users className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span>Capacity: {room.capacity}</span> {/* Display room capacity */}
                </div>
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span>Available Until: {formatTime12hr(room.availableUntil)}</span> {/* Display availability time in 12hr format */}
                </div>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                {room.features.map((feature, index) => (
                  <Badge key={index} variant="outline" className="bg-gray-100">
                    {feature === "WiFi" && <Wifi className="h-3 w-3 mr-1" />} {/* Display WiFi icon if applicable */}
                    {feature} {/* Display room features */}
                  </Badge>
                ))}
              </div>
            </CardContent>
            {/* Card footer with Reserve Room button */}
            <CardFooter className="p-4 pt-0 flex justify-end">
              <ReserveRoom
                selectedRoom={{
                  building: room.building,
                  room: room.roomNumber, // Pass the room number to ReserveRoom
                  capacity: room.capacity, // Pass the room capacity
                }}
              />
            </CardFooter>
          </Card>
        ))}
      </div>

      {/* Load More button to display additional rooms */}
      {visibleRoomsCount < availableRooms.length && (
        <div className="flex items-center justify-center mt-6">
          <Button className="bg-[#00563F] hover:bg-[#00563F]/90" onClick={handleLoadMore}>
            Load More Rooms
          </Button>
        </div>
      )}

      {/* Message if no rooms are available */}
      {availableRooms.length === 0 && (
        <p className="text-center text-gray-500">No available rooms for this building.</p>
      )}
    </div>
  );
}
