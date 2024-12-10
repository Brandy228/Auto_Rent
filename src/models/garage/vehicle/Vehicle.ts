// Vehicle.ts

import { Coordinate } from "../../application/Coordinate";
import { PowerSource } from "./PowerSource";

export abstract class Vehicle {
    public power_sources: PowerSource[] = [];
    private price_per_day: number;
    public gps: Coordinate;
    public type: string;

    constructor(power_sources: PowerSource[], gps: Coordinate, type: string, price_per_day: number) {
        this.power_sources = power_sources;
        this.gps = gps;
        this.type = type;
        this.price_per_day = price_per_day;
    }

    public getPricePerDay(): number {
        return this.price_per_day;
    }

    public setPricePerDay(price: number): void {
        this.price_per_day = price;
        this.validatePrice();
    }

    public validate(): void {
        if (!this.power_sources || this.power_sources.length === 0) {
            throw new Error('At least one power source is required');
        }
        this.power_sources.forEach(ps => ps.validate());
        this.validatePrice();
    }

    private validatePrice(): void {
        if (this.price_per_day === undefined || this.price_per_day <= 0) {
            throw new Error('Price per day must be a positive number');
        }
    }
}