import { Vehicle } from "./vehicle/Vehicle";
import { Coordinate } from "../application/Coordinate";
import { Car } from "./vehicle/Car.ts";

export class Garage {
    public name: string;
    public address: Coordinate;
    public vehicles: Car[] = [];
    public max_cars: number;
    //public mechanics: Mechanic[]=[];

    constructor(name: string, address: Coordinate, max_cars: number) {
        this.name = name;
        this.address = address;
        this.max_cars = max_cars;
    }

    public addVehicle(vehicle: Car): void 
    {
        if (this.vehicles.length < (this.max_cars as number)) {
            this.vehicles.push(vehicle);
        } else {
            throw new Error("Garage is full.");
        }
    }


    public getRentedCars(): Car[] {
        const today = new Date();
        return this.vehicles.filter(car => 
            car.rents.some(rent => 
                new Date(rent.rent_start) <= today && new Date(rent.rent_end) >= today
            )
        );
    }

    public getAvailableCars(): Car[] {
        const today = new Date();
        return this.vehicles.filter(car => 
            !car.rents.some(rent => 
                new Date(rent.rent_start) <= today && new Date(rent.rent_end) >= today
            )
        );
    }

    // public getVehicles(): Vehicle[]
    // {
    //     return this.vehicles.filter(vehicle => vehicle.type === "Car");
    // }

    public getVehicles(): Car[] {
        return this.vehicles.filter((vehicle): vehicle is Car => vehicle instanceof Car);
    }
}