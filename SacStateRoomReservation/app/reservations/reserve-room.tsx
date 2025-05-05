/*
TO DO LIST
finish implement setting data into reservation objects (submit button) -- done
import building name if clicking reserve room from suggested building  -- done
change value of information variables when given user input  -- done
some bug with Dialog
Create delete system if user cancels reservation
*/

import React, { useState } from 'react';
import { Reservation, reservation1, reservation2, reservation3 } from './reserve-data-template';
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
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
} from "@/components/ui/alert-dialog";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Reservation {
    building: string;
    room: string; // The specific room number or name
    startTime: number;
    endTime: number;
    purpose: string;
    numPersons: number;
    canUse: boolean; // This variable is used to see if the reservation object is already being used
    date: string; // The date of the reservation in YYYY-MM-DD format
}

//Import this to another file to access
export const userReservations: Reservation[] = [ {}, {}, {} ];

interface ReserveRoomProps {
    // Props for the ReserveRoom component, defining the details of the selected room
    // This interface is designed to take data from nearbyRooms and pass it to the ReserveRoom component
    selectedRoom: {
        building: string;
        room: string;
        capacity: number;
    };
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
    onSuccess?: () => void;
}

const ReserveRoom: React.FC<ReserveRoomProps> = ({ selectedRoom, open: controlledOpen, onOpenChange, onSuccess }) => {
    const isControlled = controlledOpen !== undefined && onOpenChange !== undefined;
    const [uncontrolledOpen, setUncontrolledOpen] = useState(false);
    const open = isControlled ? controlledOpen : uncontrolledOpen;
    const setOpen = isControlled ? onOpenChange : setUncontrolledOpen;

    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");
    const [showSuccess, setShowSuccess] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");

    // State variables for user input
    const [building, setBuilding] = useState(selectedRoom.building);
    const [start, setStart] = useState('');
    const [end, setEnd] = useState('');
    const [num, setNum] = useState(0);
    const [purpose, setPurpose] = useState(''); // Add state for purpose
    const [date, setDate] = useState('');

    // Helper to format date as 'Month Day, Year'
    function formatReservationDate(dateStr: string) {
        if (!dateStr) return "";
        const d = new Date(dateStr);
        if (isNaN(d.getTime())) return dateStr;
        return d.toLocaleDateString(undefined, { month: 'long', day: 'numeric', year: 'numeric' });
    }
    // Helper to format time as 12-hour
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

    // Helper to generate 15-min increment times starting from the next increment
    const generateTimeOptions = () => {
        const times: string[] = [];
    
        const startHour = 6; // 6 AM
        const endHour = 21; // 9 PM
    
        // Generate 15 minute increments from startHour until endHour
        for (let hour = startHour; hour <= endHour; hour++) {
            for (let min = 0; min < 60; min += 15) {
                // Stop adding times if we reach 9:00 PM
                if (hour === endHour && min > 0)
                    break;
                
                //Convert to integer value to string, if PM subtract 12
                const hourStr = hour > 12 ? (hour - 12).toString().padStart(2, '0') : hour.toString().padStart(2, '0');
                const minStr = min.toString().padStart(2, '0');
                const period = hour >= 12 ? 'PM' : 'AM'; // Determine AM/PM
                times.push(`${hourStr}:${minStr} ${period}`);
            }
        }
        return times;
    };
    
    const timeOptions = generateTimeOptions();

    // Helper to map building name to code
    async function getBuildingCodeFromName(name: string): Promise<string | null> {
        try {
            const resp = await fetch("/data/buildings_data.json");
            const data = await resp.json();
            const found = data.find((b: { name: string }) => b.name === name);
            return found ? found.code : null;
        } catch {
            return null;
        }
    }

    const getAvailableReservation = () => {
        for (const reservation of userReservations) { // Loop through userReservations
            if (reservation.canUse == null || reservation.canUse) { // Check the canUse property of the current reservation
                return reservation; // Return the first reservation that can be used
            }
        }
        return null; // Return null if no reservations are available
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        switch (id) {
            case 'start-time':
                setStart(value);
                break;
            case 'end-time':
                setEnd(value);
                break;
            case 'attendees':
                setNum(parseInt(value, 10));
                break;
            case 'date':
                setDate(value);
                break;
            default:
                break;
        }
    };

    const handlePurposeChange = (value: string) => {
        setPurpose(value); // Update the purpose state
    };

    const handleSubmit = async () => {
        // Find the first available reservation object
        const current = getAvailableReservation();

        if (!current) {
            setAlertMessage("No available reservation slots.");
            setShowAlert(true);
            return;
        }

        // Validate input
        if (!date || !start || !end || !num || !purpose) {
            setAlertMessage("Please fill out all fields.");
            setShowAlert(true);
            return;
        }
        // 15-minute increment validation
        const isValid15Min = (time: string) => {
            const parts = time.split(":");
            if (parts.length !== 2) return false;
            const minutes = parseInt(parts[1], 10);
            return [0, 15, 30, 45].includes(minutes);
        };
        if (!isValid15Min(start) || !isValid15Min(end)) {
            setAlertMessage("Start and end times must be in 15-minute increments (e.g., 09:00, 09:15, 09:30, 09:45).");
            setShowAlert(true);
            return;
        }
        if (start >= end) {
            setAlertMessage("Start time must be before end time.");
            setShowAlert(true);
            return;
        }
        if (num > selectedRoom.capacity) {
            setAlertMessage(`Number of attendees cannot exceed ${selectedRoom.capacity}.`);
            setShowAlert(true);
            return;
        }

        // --- New logic: Prevent reservation past available until time ---
        try {
            // Map building name to code if needed
            let buildingCode = selectedRoom.building;
            // If it's not a known code, try to map from name
            if (buildingCode.length > 3) {
                const mapped = await getBuildingCodeFromName(buildingCode);
                if (!mapped) throw new Error("Could not map building name to code");
                buildingCode = mapped;
            }
            const resp = await fetch("/data/room_availability.json");
            const data = await resp.json();
            const buildingRooms = data[buildingCode];
            console.log("DEBUG: buildingCode:", buildingCode);
            if (!buildingRooms) throw new Error("Building not found in data");
            const roomData = buildingRooms[selectedRoom.room];
            console.log("DEBUG: selectedRoom.room:", selectedRoom.room);
            if (!roomData) throw new Error("Room not found in building");
            // Get day of week from selected date
            console.log("DEBUG: selected date:", date);
            const dayOfWeek = date ? new Date(date + 'T00:00:00').toLocaleString("en-US", { weekday: "long" }) : "";
            console.log("DEBUG: dayOfWeek:", dayOfWeek);
            const slots = roomData[dayOfWeek];
            console.log("DEBUG: slots:", slots);
            if (!slots || !Array.isArray(slots)) throw new Error("No availability for this day");
            // Find the slot that contains the start time
            const slot = slots.find((s: { start: string, end: string }) => start >= s.start && start < s.end);
            console.log("DEBUG: slot found:", slot);
            if (!slot) {
                setAlertMessage("Selected start time is not available for this room on that day.");
                setShowAlert(true);
                return;
            }
            if (end > slot.end) {
                setAlertMessage(`Your end time needs to be before: ${formatTime12hr(slot.end)}. \nA class is scheduled for that time.`);
                setShowAlert(true);
                return;
            }
        } catch (e) {
            setAlertMessage("Could not verify room availability. Please try again.");
            setShowAlert(true);
            return;
        }
        // --- End new logic ---

        // Update the current reservation object with user inputs
        current.building = building;
        current.room = selectedRoom.room; // Set the room property
        current.startTime = parseInt(start.replace(':', ''), 10); // Convert time to a number
        current.endTime = parseInt(end.replace(':', ''), 10); // Convert time to a number
        current.purpose = purpose;
        current.numPersons = num;
        current.date = date; // Set the date
        current.canUse = false;

        // Save to localStorage
        const saved = JSON.parse(localStorage.getItem("reservations") || "[]");
        saved.push({
            building: current.building,
            room: current.room,
            date: current.date,
            startTime: start,
            endTime: end,
            purpose: current.purpose,
            attendees: num,
        });
        localStorage.setItem("reservations", JSON.stringify(saved));

        // Show a success dialog using shadcn UI
        setSuccessMessage(
            `Reservation confirmed!\n\n` +
            `Building: ${current.building}\n` +
            `Room: ${current.room}\n` +
            `Date: ${formatReservationDate(current.date)}\n` +
            `Start Time: ${formatTime12hr(start)}\n` +
            `End Time: ${formatTime12hr(end)}\n` +
            `Purpose: ${current.purpose}`
        );
        setShowSuccess(true);
        setOpen(false);
        if (onSuccess) onSuccess();
    };

    return (
        <div>
            <Dialog open={open} onOpenChange={setOpen}>
                {!isControlled && (
                  <DialogTrigger asChild>
                    <Button
                        className="bg-[#C4B581] text-[#00563F] hover:bg-[#C4B581]/90"
                        onClick={() => {
                            setBuilding(selectedRoom.building); // Set the building state dynamically
                        }}
                    >
                        Reserve Room
                    </Button>
                  </DialogTrigger>
                )}
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
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <Button variant="outline" className="w-full justify-start">
                                            {start ? formatTime12hr(start) : "--:-- --"}
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="p-0">
                                        <ScrollArea className="h-60">
                                            <div className="flex flex-col">
                                                {timeOptions.map((t) => (
                                                    <Button
                                                        key={t}
                                                        variant="ghost"
                                                        className="justify-start"
                                                        onClick={() => setStart(t)}
                                                    >
                                                        {formatTime12hr(t)}
                                                    </Button>
                                                ))}
                                            </div>
                                        </ScrollArea>
                                    </PopoverContent>
                                </Popover>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="end-time">End Time</Label>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <Button variant="outline" className="w-full justify-start">
                                            {end ? formatTime12hr(end) : "--:-- --"}
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="p-0">
                                        <ScrollArea className="h-60">
                                            <div className="flex flex-col">
                                                {timeOptions.map((t) => (
                                                    <Button
                                                        key={t}
                                                        variant="ghost"
                                                        className="justify-start"
                                                        onClick={() => setEnd(t)}
                                                    >
                                                        {formatTime12hr(t)}
                                                    </Button>
                                                ))}
                                            </div>
                                        </ScrollArea>
                                    </PopoverContent>
                                </Popover>
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="date">Date</Label>
                            <Input id="date" type="date" onChange={handleInputChange} />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="purpose">Purpose</Label>
                            <Select onValueChange={handlePurposeChange} value={purpose}>
                                <SelectTrigger id="purpose">
                                    <SelectValue placeholder="Select a purpose" />
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
                            <Input id="attendees" type="number" min="1" max={selectedRoom?.capacity} onChange={handleInputChange} />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
                        <Button className="bg-[#00563F] hover:bg-[#00563F]/90" onClick={handleSubmit}>Confirm Reservation</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
            <AlertDialog open={showAlert} onOpenChange={setShowAlert}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Notice</AlertDialogTitle>
                        <AlertDialogDescription>
                            {alertMessage.split('\n').map((line, idx) => (
                                <div key={idx}>{line}</div>
                            ))}
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogAction onClick={() => setShowAlert(false)}>OK</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
            <AlertDialog open={showSuccess} onOpenChange={setShowSuccess}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Reservation Confirmed</AlertDialogTitle>
                        <AlertDialogDescription>
                            {successMessage.split('\n').map((line, idx) => (
                                <div key={idx}>{line}</div>
                            ))}
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogAction onClick={() => setShowSuccess(false)}>OK</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
};

export default ReserveRoom;