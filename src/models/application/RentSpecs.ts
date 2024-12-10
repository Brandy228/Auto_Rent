import { Garage } from "../garage/Garage";
import { Vehicle } from "../garage/vehicle/Vehicle";
import { User } from "../person/User";
import { CountryOffice } from "../CountryOffice";

export class RentSpecs {
    public rent_start: string;
    public rent_end: string;
    public vehicle_license_plate: string;
    public renter_login: string;

    constructor(
        rent_start: Date,
        rent_end: Date,
        vehicle_license_plate: string,
        renter_login: string,
    ) {
        this.rent_start = rent_start.toISOString();
        this.rent_end = rent_end.toISOString();
        this.vehicle_license_plate = vehicle_license_plate;
        this.renter_login = renter_login;
    }

}
