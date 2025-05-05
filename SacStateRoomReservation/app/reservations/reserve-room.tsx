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
        const now = new Date();
        let h = now.getHours();
        let m = now.getMinutes();
        // Find the next 15-min increment
        m = m + (15 - (m % 15));
        if (m === 60) {
            m = 0;
            h++;
        }
        // Generate times from the next increment to 23:45
        for (let hour = h; hour < 24; hour++) {
            for (let min = (hour === h ? m : 0); min < 60; min += 15) {
                const hourStr = hour.toString().padStart(2, '0');
                const minStr = min.toString().padStart(2, '0');
                times.push(`${hourStr}:${minStr}`);
            }
        }
        return times;
    };
    const timeOptions = generateTimeOptions();

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

    const handleSubmit = () => {
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
                        <AlertDialogDescription>{alertMessage}</AlertDialogDescription>
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