import { Vehicle } from "./vehicle/Vehicle";
import { Coordinate } from "../application/Coordinate";
import { Car } from "./vehicle/Car.ts";

export class Garage {
    public name: string;
    public address: Coordinate;
    public vehicles: Car[] = [];
    private max_cars: number;

    constructor(name: string, address: Coordinate, max_cars: number) {
        this.name = name;
        this.address = address;
        if (this.max_cars < 0) {
            throw new Error('Capacity cannot be negative');
        }
        else 
        {
            this.max_cars = max_cars;
        }
        this.validate();
    }

    public addVehicle(vehicle: Car): void 
    {
        if (this.vehicles.length < (this.max_cars as number)) {
            this.vehicles.push(vehicle);
        } else {
            throw new Error('Garage is full.');
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

    public getNotReturnedCars(): Car[] {
        const today = new Date();
        return this.vehicles.filter(car => 
            car.rents.some(rent => 
                new Date(rent.rent_end) < today
            ) && car.gps.latitude !== this.address.latitude && car.gps.longitude !== this.address.longitude
        );
    }

    public getVehicles(): Car[] {
        return this.vehicles.filter((vehicle): vehicle is Car => vehicle instanceof Car);
    }

    public setMaxCars(max_cars: number): void {
        if (max_cars < 0) {
            throw new Error('Capacity cannot be negative');
        }
        else 
        {
        this.max_cars = max_cars;
        }
    }

    public getMaxCars(): number {
        return this.max_cars;
    }

    public validate(): void {
        if (!this.name) {
            throw new Error('Garage name is required');
        }
        if (!this.address) {
            throw new Error('Garage address is required');
        }
        if (this.max_cars === undefined || this.max_cars <= 0) {
            throw new Error('Max cars must be a positive number');
        }
    }
}