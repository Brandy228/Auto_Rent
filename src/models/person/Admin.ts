//TODO rename(maybe)
import { User } from "./User";
import { Vehicle } from "../garage/vehicle/Vehicle";

export class Admin extends User {
    public scheduleVehicleMaintenance(vehicle: Vehicle, date: Date): void 
    {
        console.log(`Scheduled maintenance for vehicle on ${date}`);
    }
}
