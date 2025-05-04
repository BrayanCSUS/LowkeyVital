import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Function to fetch room availability data for a selected building
export async function fetchRoomsForBuilding(selectedBuilding: { code: string; name: string }) {
  if (!selectedBuilding) {
    console.error("No building selected.");
    return [];
  }

  try {
    const response = await fetch("/data/room_availability.json");
    const data = await response.json();
    const buildingRooms = data[selectedBuilding.code];

    if (buildingRooms) {
      const roomList = Object.keys(buildingRooms).map((roomNumber) => ({
        id: buildingRooms[roomNumber].id || Math.random(),
        building: selectedBuilding.name,
        roomNumber,
        distance: buildingRooms[roomNumber].distance || "Unknown distance",
        capacity: buildingRooms[roomNumber].capacity || 30,
        features: buildingRooms[roomNumber].features || ["No features available"],
        availableUntil: buildingRooms[roomNumber].availableUntil || "Unknown time",
      }));
      return roomList;
    } else {
      console.log("No rooms found for this building.");
      return [];
    }
  } catch (err) {
    console.error("Failed to load room data:", err);
    return [];
  }
}
