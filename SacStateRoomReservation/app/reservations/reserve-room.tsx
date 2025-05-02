import React, { useState } from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import { Reservation } from './reserve-data-template'; // Adjust the import path as necessary

// Assuming these components are defined in your project
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    Label,
    Input,
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
    Button,
    DialogFooter
} from './YourComponentLibrary'; // Adjust the import path as necessary

const ReserveRoom: React.FC = () => {
    const [reservation, setReservation] = useState<Reservation>(new Reservation());
    const [open, setOpen] = useState(false);
    const [selectedRoom, setSelectedRoom] = useState({ building: 'Main Hall', room: 'Room 101', capacity: 10 }); // Example room data

    const handleSubmit = () => {
        // Handle the reservation submission logic here
        console.log(reservation);
        setOpen(false); // Close the popup after submission
    };

    return (
        <div>
            <button onClick={() => setOpen(true)}>Open Reservation Popup</button>
            <Popup open={open} onClose={() => setOpen(false)} modal>
                <Dialog>
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
                                    <Input
                                        id="start-time"
                                        type="time"
                                        defaultValue="14:00"
                                        onChange={(e) => reservation.setStartTime(new Date(`1970-01-01T${e.target.value}:00`).getTime())}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="end-time">End Time</Label>
                                    <Input
                                        id="end-time"
                                        type="time"
                                        defaultValue="16:00"
                                        onChange={(e) => reservation.setEndTime(new Date(`1970-01-01T${e.target.value}:00`).getTime())}
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="purpose">Purpose</Label>
                                <Select
                                    defaultValue="study"
                                    onChange={(value) => reservation.setPurpose(value)}
                                >
                                    <SelectTrigger id="purpose">
                                        <SelectValue placeholder="Select purpose" />
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
                                <Input
                                    id="attendees"
                                    type="number"
                                    defaultValue="1"
                                    min="1"
                                    max={selectedRoom?.capacity}
                                    onChange={(e) => reservation.setNumPersons(Number(e.target.value))}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="notes">Additional Notes</Label>
                                <Input
                                    id="notes"
                                    placeholder="Any special requirements?"
                                    onChange={(e) => reservation.setNotes(e.target.value)} // Assuming you have a setNotes method
                                />
                            </div>
                        </div>
                        <DialogFooter>
                            <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
                            <Button className="bg-[#00563F] hover:bg-[#00563F]/90" onClick={handleSubmit}>
                                Confirm Reservation
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </Popup>
        </div>
    );
};

export default ReserveRoom;

