import { Vehicle } from "./Vehicle.ts";
import { Coordinate } from "../../application/Coordinate";
import { RentSpecs } from "../../application/RentSpecs.ts";
import { PowerSource } from "./PowerSource.ts";

export class Car extends Vehicle {
    public details: CarDetails;
    public is_availible: boolean;
    public rents: RentSpecs[];
    //public pricePerDay: number;

    constructor(power_sources: PowerSource[], gps: Coordinate, details: CarDetails) {
        super(power_sources,gps,"Car");
        this.details = details;
        this.is_availible = true; // Initialize the car state when the car is created
        this.rents = [];
    }
}

export class CarDetails {
    public exterior: Exterior;
    // public last_maintenance: Date;
    public license_plate: string;
    private manufacture_year: number;
    public gear_box: GearBox;

    constructor(
        exterior: Exterior,
        license_plate: string,
        gear_box: GearBox,
    ) {
        this.exterior = exterior;
        // this.last_maintenance = last_maintenance;
        this.license_plate = license_plate;
        this.gear_box = gear_box;
    }

    public get_manufacture_year(): number {
        return this.manufacture_year;
    }

    public set_manufacture_year(year: number) {
        if (year < 1900) {
            alert("Year cannot be less than 1900");
            throw new Error("Year cannot be less than 1900");
        }
        this.manufacture_year = year;
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
    }
}

export enum GearBox {
    Automatic = "Automatic",
    Variator = "Variator",
    Mechanical = "Mechanical"
}

