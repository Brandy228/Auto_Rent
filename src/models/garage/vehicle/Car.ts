import { Vehicle } from "./Vehicle.ts";
import { Coordinate } from "../../application/Coordinate";
import { RentSpecs } from "../../application/RentSpecs.ts";

export class Car extends Vehicle {
    public details: CarDetails;
    public state: CarState;
    public rents: RentSpecs[];

    constructor(price: number, gps: Coordinate, details: CarDetails) {
        super(price, gps, 0, "Car");
        this.details = details;
        this.state = new CarState(); // Initialize the car state when the car is created
        this.rents = [];
    }

    // public rent(rent_specs: RentSpecs): void {
    //         this.rents.push(rent_specs)
    //         //TODO add check if car rented (in data range i cant choose blocked date but...)
    // }

    // public move(deltaLatitude: number, deltaLongitude: number) {
    //     this.gps.latitude += deltaLatitude;
    //     this.gps.longitude += deltaLongitude;
    //   }
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

export class CarState {
    public in_maintenance: boolean;
    public broken: boolean;

    constructor() {
        this.in_maintenance = false;
        this.broken = false;
    }
}
