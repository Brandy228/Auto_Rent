export abstract class PowerSource {
    public type: string;
    public capacity: number;
    public measurement_unit: string;

    constructor(type: string,capacity:number,measurement_unit: string) {
        this.type = type;
        this.capacity = capacity;
        this.measurement_unit = measurement_unit;
    }

    abstract refill(amount: number): void;
}

export class FuelTank extends PowerSource {
    public fuel_type: string;
    public fuel_level_in_procent: number;

    constructor(capacity:number,fuelType: string,) {
        super("Fuel",capacity, "liters");
        this.fuel_type = fuelType;
        this.fuel_level_in_procent = 100;
    }

    public refill(amount: number): void 
    {
        const newLevel = this.fuel_level_in_procent + amount;
        if (newLevel > 100) {
            this.fuel_level_in_procent = 100;
        } else {
            this.fuel_level_in_procent = newLevel;
        }
    }
}

export class Battery extends PowerSource {
    public charge_level_in_procent: number;
    public charge_time_in_minutes: number; 

    constructor(capacity:number) {
        super("Electric", capacity, "kWh");
        this.charge_level_in_procent = 100;
    }

    public refill(amount: number): void 
    {
        const newCharge = this.charge_level_in_procent + amount;
        if (newCharge > 100) {
            this.charge_level_in_procent = 100;
        } else {
            this.charge_level_in_procent = newCharge;
        }
    }

}
