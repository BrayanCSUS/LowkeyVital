import roomCapacities from "../public/data/room_capacities.json";

// Fetch the list of rooms for the selected building
async function getRoomsForBuilding(selectedBuilding: { code: string; name: string }) {
    if (!selectedBuilding) {
      console.error("No building selected.");
      return [];
    }
  
    try {
      const response = await fetch("/data/room_availability.json");
      const data = await response.json();
      const buildingRooms = data[selectedBuilding.code];
  
      if (!buildingRooms) {
        console.log("No rooms found for this building.");
        return [];
      }
  
      return buildingRooms;
    } catch (err) {
      console.error("Failed to load room data:", err);
      return [];
    }
  }
  
  // Get room details
  function getRoomDetails(roomData: any, roomNumber: string, buildingName: string, buildingCode: string) {
    // Check if the room capacity exists in room_capacities.json
    const capacity = roomCapacities[buildingCode]?.[roomNumber] || "Unknown";

    return {
      id: roomData.id || Math.random(),
      building: buildingName,
      roomNumber,
      distance: roomData.distance || "Unknown distance",
      capacity, // Use the capacity from room_capacities.json if available, otherwise "Unknown"
      features: roomData.features || ["No features available"],
    };
  }
  
  // Filter room availability based on the input day and time
  function filterRoomAvailability(
    buildingRooms: any,
    currentDay: string,
    currentTime: string,
    selectedBuilding: { name: string; code: string }
  ) {
    const roomList = Object.keys(buildingRooms)
      .map((roomNumber) => {
        const roomData = buildingRooms[roomNumber];
        const availability = roomData || {};
  
        console.log("Room number:", roomNumber);
        console.log("Availability:", availability);
  
        // Check if the room has availability for the current day
        const dayAvailability = availability[currentDay];
        if (!dayAvailability || dayAvailability.length === 0) {
          console.log(`No availability for room ${roomNumber} on ${currentDay}`);
          return null;
        }
  
        // Find the time range that matches the current time
        let availableUntil = "Unknown time";
        const isAvailable = dayAvailability.some((timeRange: { start?: string; end: string }) => {
          console.log("Checking time range:", timeRange);
          const matches =
            (!timeRange.start || currentTime >= timeRange.start) &&
            currentTime < timeRange.end;
  
          if (matches) {
            availableUntil = timeRange.end; // Update availableUntil with the end time
          }
  
          return matches;
        });
  
        console.log("Is room available:", isAvailable);
        console.log("Available until:", availableUntil);
  
        if (!isAvailable) return null;
  
        // Combine room details with availability
        const roomDetails = getRoomDetails(roomData, roomNumber, selectedBuilding.name, selectedBuilding.code);
        return {
          ...roomDetails,
          availableUntil, // Add availability-specific property
        };
      })
      .filter((room) => room !== null);
  
    console.log("Filtered room list:", roomList);
  
    return roomList;
  }
  
  // Main function to fetch and filter rooms
  export async function getAvailableRooms(selectedBuilding: { code: string; name: string }) {
    const currentDay = "Monday"; // Hardcoded for testing purposes
    const currentTime = "16:30"; // Hardcoded time for testing purposes

    //const currentDay = new Date().toLocaleString("en-US", { weekday: "long" }); // e.g., "Monday"
    //const currentTime = new Date().toTimeString().slice(0, 5); // Format: "HH:MM"
  
    console.log("Current day:", currentDay);
    console.log("Current time:", currentTime);
  
    const buildingRooms = await getRoomsForBuilding(selectedBuilding);
    if (!buildingRooms) return [];
  
    return filterRoomAvailability(buildingRooms, currentDay, currentTime, selectedBuilding);
  }
