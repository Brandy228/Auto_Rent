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
        if (latitude < -90 || latitude > 90) {
            throw new Error("Latitude must be between -90 and 90 degrees.");
        }
        if (longitude < -180 || longitude > 180) {
            throw new Error("Longitude must be between -180 and 180 degrees.");
        }
        this.latitude = latitude;
        this.longitude = longitude;
    }

    public getDistanceTo(place: Coordinate): number 
    {
        const toRadians = (degrees: number) => (degrees * Math.PI) / 180;
        const R = 6371; // Radius of the Earth in km

        const lat1 = toRadians(this.latitude as number);
        const lat2 = toRadians(place.latitude as number);
        const deltaLat = toRadians((place.latitude as number) - (this.latitude as number));
        const deltaLon = toRadians((place.longitude as number) - (this.longitude as number));

        const a = Math.sin(deltaLat / 2) ** 2 + 
                  Math.cos(lat1) * Math.cos(lat2) * 
                  Math.sin(deltaLon / 2) ** 2;

        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return R * c; // Distance in km
    }
}