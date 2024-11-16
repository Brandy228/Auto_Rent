import { Vehicle } from "./Vehicle";
import { User } from "../../person/User";
import { Coordinate } from "../../application/Coordinate";

class Car extends Vehicle {
    public details: CarDetails; //TODO rename Characteristics or Details or Specification
    public state: CarState; //TODO rename Status or State 
    public renter: User | null;
    
    constructor(price:Number, gps:Coordinate) {
        super(price, gps, 0)
    }

    public rent(user: User): void 
    {
        if (this.state.is_available) {
            this.renter = user;
            this.state.is_available = false;
        } else {
            throw new Error("Car is not available.");
        }
    }

    public returnCar(): void 
    {
        this.renter = null;
        this.state.is_available = true;
    }
}

class CarDetails {
    public exterior: Exterior;
    public last_maintenance: Date;
    public license_plate: String;
    public manufacture_year: Number; 
    public gear_box: GearBox;
    public max_speed: Number;
}

class Exterior {
    public mark: String;
    public model: String;
    public body_type: String;
    public color: String;
}

enum GearBox {
    Automatic,
    Variator,
    Mechanical
}

class CarState {
    public in_maintenance: Boolean;
    public broken: Boolean;
    public is_available: Boolean;
}