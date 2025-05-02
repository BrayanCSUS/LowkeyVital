export class Reservation {
    private building: string;
    private startTime: number;
    private endTime: number;
    private purpose: string;
    private numPersons: number;
    //this variable is used to see if the reservation object is already being used
    private canUse: boolean = true;
    
    //Constructor is not needed
    
    // Getter methods to access the properties
    getBuilding(): string {
        return this.building;
    }

    getStartTime(): number {
        return this.startTime;
    }

    getEndTime(): number {
        return this.endTime;
    }

    getPurpose(): string {
        return this.purpose;
    }

    getNumPersons(): number {
        return this.numPersons;
    }

    // Setter methods to modify the properties
    setBuilding(building: string): void {
        this.building = building;
    }

    setStartTime(startTime: number): void {
        this.startTime = startTime;
    }

    setEndTime(endTime: number): void {
        this.endTime = endTime;
    }

    setPurpose(purpose: string): void {
        this.purpose = purpose;
    }

    setNumPersons(numPersons: number): void {
        this.numPersons = numPersons;
    }

    setCanUse(canUse: boolean): void {
        this.canUse = canUse;
    }
}

export const reservation1 = new Reservation();
export const reservation2 = new Reservation();
export const reservation3 = new Reservation();