export abstract class PowerSource {
    public type: string;
    private capacity: number;
    public measurement_unit: string;

    constructor(type: string,measurement_unit: string) {
        this.type = type;
        this.measurement_unit = measurement_unit;
    }

    public getCapacity(): number {
        return this.capacity;
    }

    public setCapacity(capacity: number): void {
        if (capacity < 0) {
            alert("Capacity cannot be negative");
            throw new Error("Capacity cannot be negative");
        }
        this.capacity = capacity;
    }

}
