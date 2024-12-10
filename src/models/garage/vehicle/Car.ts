// Car.ts

import { Vehicle } from "./Vehicle.ts";
import { Coordinate } from "../../application/Coordinate";
import { RentSpecs } from "../../application/RentSpecs.ts";
import { PowerSource } from "./PowerSource.ts";

export class Car extends Vehicle {
    public details: CarDetails;
    public is_availible: boolean;
    public rents: RentSpecs[];

    constructor(power_sources: PowerSource[], gps: Coordinate, details: CarDetails,price_per_day: number, rents:RentSpecs[]) {
        super(power_sources, gps, "Car",price_per_day);
        this.details = details;
        this.is_availible = true;
        this.rents = rents;
        this.validate();
    }

    public validate(): void {
        super.validate();
        this.details.validate();
    }
}

export class CarDetails {
    public exterior: Exterior;
    public license_plate: string;
    public gear_box: GearBox;
    private manufacture_year: number;

    constructor(
        exterior: Exterior,
        license_plate: string,
        gear_box: GearBox,
        manufacture_year: number
    ) {
        this.exterior = exterior;
        this.license_plate = license_plate;
        this.gear_box = gear_box;
        this.manufacture_year = manufacture_year;
        this.validate();
    }

    public validate(): void {
        if (!this.exterior) {
            throw new Error('Exterior details are required');
        }
        this.exterior.validate();

        if (!this.license_plate) {
            throw new Error('License plate is required');
        }
        else if (this.license_plate.length !== 8) {
            throw new Error('License plate must be 8 characters long');
        }

        const currentYear = new Date().getFullYear();
        if (!this.manufacture_year || this.manufacture_year < 1900 || this.manufacture_year > currentYear) {
            throw new Error(`Manufacture year must be between 1900 and ${currentYear}`);
        }
    }

    public getManufactureYear(): number {
        return this.manufacture_year;
    }
}

export class Exterior {
    public mark: string;
    public model: string;
    public body_type: string;

    constructor(mark: string, model: string, body_type: string) {
        this.mark = mark;
        this.model = model;
        this.body_type = body_type;
        this.validate();
    }

    public validate(): void {
        if (!this.mark) {
            throw new Error('Mark is required');
        }

        if (!this.model) {
            throw new Error('Model is required');
        }

        if (!this.body_type) {
            throw new Error('Body type is required');
        }
    }
}

export enum GearBox {
    Automatic = "Automatic",
    Variator = "Variator",
    Mechanical = "Mechanical"
}