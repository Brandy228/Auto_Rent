import { Vehicle } from "./vehicle/Vehicle";
import { Coordinate } from "../application/Coordinate";
import { Car } from "./vehicle/Car.ts";

export class Garage {
    public name: string;
    public address: Coordinate;
    public vehicles: Car[] = [];
    private max_cars: number;

    constructor(name: string, address: Coordinate) {
        this.name = name;
        this.address = address;
    }

    public addVehicle(vehicle: Car): void 
    {
        if (this.vehicles.length < (this.max_cars as number)) {
            this.vehicles.push(vehicle);
        } else {
            alert("Garage is full.");
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

    public getVehicles(): Car[] {
        return this.vehicles.filter((vehicle): vehicle is Car => vehicle instanceof Car);
    }

    public setMaxCars(max_cars: number): void {
        if (max_cars < 0) {
            alert("Capacity cannot be negative");
            throw new Error("Capacity cannot be negative");
        }
        this.max_cars = max_cars;
    }

    public getMaxCars(): number {
        return this.max_cars;
    }
}