import { Vehicle } from "./Vehicle.ts";
import { User } from "../../person/User";
import { Coordinate } from "../../application/Coordinate";

export class Car extends Vehicle {
    public details: CarDetails;
    public state: CarState;
    public renter: User | null;

    constructor(price: number, gps: Coordinate, details: CarDetails) {
        super(price, gps, 0, "Car");
        this.details = details;
        this.state = new CarState(); // Initialize the car state when the car is created
        this.renter = null;
    }

    public rent(user: User): void {
        if (this.state.is_available) {
            this.renter = user;
            this.state.is_available = false;
        } else {
            throw new Error("Car is not available.");
        }
    }

    public returnCar(): void {
        this.renter = null;
        this.state.is_available = true;
    }

    public move(deltaLatitude: number, deltaLongitude: number) {
        this.gps.latitude += deltaLatitude;
        this.gps.longitude += deltaLongitude;
      }
}

export class CarDetails {
    public exterior: Exterior;
    public last_maintenance: Date;
    public license_plate: string;
    public manufacture_year: number;
    public gear_box: GearBox;

    constructor(
        exterior: Exterior,
        last_maintenance: Date,
        license_plate: string,
        manufacture_year: number,
        gear_box: GearBox,
    ) {
        this.exterior = exterior;
        this.last_maintenance = last_maintenance;
        this.license_plate = license_plate;
        this.manufacture_year = manufacture_year;
        this.gear_box = gear_box;
    }
}

export class Exterior {
    public mark: String;
    public model: String;
    public body_type: String;

    constructor(mark: String, model: String, body_type: String) {
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

export class CarState {
    public in_maintenance: Boolean;
    public broken: Boolean;
    public is_available: Boolean;

    constructor() {
        this.in_maintenance = false;
        this.broken = false;
        this.is_available = true; // Assume the car is available when created
    }
}
