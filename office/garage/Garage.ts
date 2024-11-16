import { Vehicle } from "./vehicle/Vehicle";
import { Coordinate } from "../application/Coordinate";

export class Garage {
    public name: String;
    public address: Coordinate;
    public vehicles: Vehicle[] = [];
    public max_cars: Number;
    //public mechanics: Mechanic[]=[];

    constructor(name: String, address: Coordinate, max_cars: Number) {
        this.name = name;
        this.address = address;
        this.max_cars = max_cars;
    }

    public addVehicle(vehicle: Vehicle): void 
    {
        if (this.vehicles.length < (this.max_cars as number)) {
            this.vehicles.push(vehicle);
        } else {
            throw new Error("Garage is full.");
        }
    }

    public getAvailableCars(): Vehicle[] 
    {
        return this.vehicles.filter(vehicle => vehicle.power_sources.length > 0);
    }
}