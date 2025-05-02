/*
TO DO LIST
finish implement setting data into reservation objects (submit button)
import building name if clicking reserve room from suggested building
change value of information variables when given user input
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

const ReserveRoom: React.FC = () => {
    const [open, setOpen] = useState(false);
    const [selectedRoom, setSelectedRoom] = useState({ building: 'Main Hall', room: 'Room 101', capacity: 10 }); // Example room data

    //Store chosen information in these variables
    let building: string, start: number, end: number, num: number;

    //Assuming maximum number of reservations is 3
    const getAvailableReservation = () => {
        const reservations = [reservation1, reservation2, reservation3];
        for (const reservation of reservations) {
            if (reservation.canUse) {
                return reservation; // Return the first reservation that can be used
            }
        }
        return null; // Return null if no reservations are available
    };

    //The reservation object being used in this reservation
    const current = getAvailableReservation();

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { id, value } = e.target;
        switch (id) {
            case 'building':
                current?.setBuilding(building);
                break;
            case 'start-time':
                current?.setStartTime(start);
                break;
            case 'end-time':
                current?.setEndTime(end);
                break;
            case 'attendees':
                current?.setNumPersons(num);
                break;
            default:
                break;
        }
    };

    //Maybe merge this with the switch
    const handlePurposeChange = (value: string) => {
        current?.setPurpose(value);
    };

    const handleSubmit = () => {
        //unfinished
    };

    return (
        <div>
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                    <Button
                        className="bg-[#C4B581] text-[#00563F] hover:bg-[#C4B581]/90"
                        onClick={() => setSelectedRoom(selectedRoom)} // Assuming you want to keep the selected room
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
                            <Label htmlFor="purpose">Purpose</Label>
                            <Select onValueChange={handlePurposeChange}>
                                <SelectTrigger id="purpose">
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