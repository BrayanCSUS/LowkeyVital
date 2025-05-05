/**
 * Represents a room in a building with its details.
 * This interface is used to define the structure of room data
 * fetched from the backend or displayed in the UI.
 */
export interface Room {
    id: number;
    building: string;
    roomNumber: string;
    distance: string;
    capacity: number;
    features: string[];
    availableUntil: string;
  }