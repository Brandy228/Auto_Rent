export class Coordinate {
    public latitude: number;
    public longitude: number;
    public altitude?: number;
    //TODO make it private and add method setCoordinate and add to it limit for value

    constructor(latitude: number, longitude: number) {
        if (latitude < -90 || latitude > 90) {
            throw new Error("Latitude must be between -90 and 90 degrees.");
        }
        if (longitude < -180 || longitude > 180) {
            throw new Error("Longitude must be between -180 and 180 degrees.");
        }

        this.latitude = latitude;
        this.longitude = longitude;
    }

    public setCoordinate(latitude: number, longitude: number): void 
    {
        if (latitude < -90 || latitude > 90) 
        {
            alert("Latitude must be between -90 and 90 degrees.");
        }
        else if (longitude < -180 || longitude > 180) 
        {
            alert("Longitude must be between -180 and 180 degrees.");
        }
        else 
        {
        this.latitude = latitude;
        this.longitude = longitude;
        }
    }

}