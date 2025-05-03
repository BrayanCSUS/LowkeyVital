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
}

const ReserveRoom: React.FC<ReserveRoomProps> = ({ selectedRoom }) => {
    const [open, setOpen] = useState(false);

    // State variables for user input
    const [building, setBuilding] = useState(selectedRoom.building);
    const [start, setStart] = useState('');
    const [end, setEnd] = useState('');
    const [num, setNum] = useState(0);
    const [purpose, setPurpose] = useState(''); // Add state for purpose
    const [date, setDate] = useState('');

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
            alert("No available reservation slots.");
            return;
        }

        // Validate input
        if (!date || !start || !end || !num || !purpose) {
            alert("Please fill out all fields.");
            return;
        }
        if (start >= end) {
            alert("Start time must be before end time.");
            return;
        }
        if (num > selectedRoom.capacity) {
            alert(`Number of attendees cannot exceed ${selectedRoom.capacity}.`);
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

        // Close the dialog
        setOpen(false);

        // Show a success message with the latest reservation details
        alert(
            `Reservation confirmed!\n\n` +
            `Building: ${current.building}\n` +
            `Room: ${current.room}\n` +
            `Date: ${current.date}\n` +
            `Start Time: ${start}\n` +
            `End Time: ${end}\n` +
            `Purpose: ${current.purpose}`
        );
    };

    return (
        <div>
            <Dialog open={open} onOpenChange={setOpen}>
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
                                <Input id="start-time" type="time" onChange={handleInputChange} />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="end-time">End Time</Label>
                                <Input id="end-time" type="time" onChange={handleInputChange} />
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
        </div>
    );
};

export default ReserveRoom;