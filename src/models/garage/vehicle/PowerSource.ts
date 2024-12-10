// PowerSource.ts

export class PowerSource {
    public type: string;
    private capacity: number;
    public measurement_unit: string;

    constructor(type: string,capacity: number, measurement_unit: string) {
        this.type = type;
        this.capacity = capacity;
        this.measurement_unit = measurement_unit;
        this.validate();
    }

    public getCapacity(): number {
        return this.capacity;
    }

    public setCapacity(capacity: number): void {
        this.capacity = capacity;
        this.validate();
    }

    public validate(): void {
        if (!this.type) {
            throw new Error('Power source type is required');
        }
        
        if (this.capacity === undefined || this.capacity <= 0) {
            throw new Error('Capacity must be a positive number');
        }

        if (!this.measurement_unit) {
            throw new Error('Measurement unit is required');
        }

    }
}