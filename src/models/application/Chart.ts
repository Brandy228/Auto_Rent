import { CountryOffice } from "../CountryOffice";
import { Garage } from "../garage/Garage";
import { Vehicle } from "../garage/vehicle/Vehicle";
import { Coordinate } from "./Coordinate";

class Chart {
    public garages: Garage[] = [];
    public vehicles: Vehicle[] = [];
    public offices: CountryOffice[]=[]

    public addGarage(garage: Garage): void 
    {
        this.garages.push(garage);
    }

    public addVehicle(vehicle: Vehicle): void 
    {
        this.vehicles.push(vehicle);
    }

    public findNearestGarage(coordinate: Coordinate): Garage | null 
    {
        let nearestGarage: Garage | null = null;
        let minDistance = Number.MAX_VALUE;

        for (const garage of this.garages) {
            const distance = garage.address.getDistanceTo(coordinate);
            if (distance < minDistance) {
                minDistance = distance;
                nearestGarage = garage;
            }
        }
        return nearestGarage;
    }
}

