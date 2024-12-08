import { Coordinate } from "../../application/Coordinate";
import { Feedback } from "../../application/Feedback";
import { PowerSource } from "./PowerSource";

export abstract class Vehicle {
    public power_sources: PowerSource[]=[];
    private price_per_day: number;
    public gps: Coordinate;
    public type: String;

    constructor(power_sources: PowerSource[], gps: Coordinate, type: String) {
        this.power_sources = power_sources;
        this.gps = gps;
        this.type = type;
    }

    public getPricePerDay(): number {
        return this.price_per_day;
    }

    public setPricePerDay(price: number): void {
        if (price < 0) {
            alert("Price cannot be negative");
            throw new Error("Price cannot be negative");
        }
        this.price_per_day = price;
    }

}