import { Garage } from "../garage/Garage";
import { Vehicle } from "../garage/vehicle/Vehicle";
import { User } from "../person/User";
import { CountryOffice } from "../CountryOffice";

export class RentSpecs {
    //public garage_location: Garage;
    public rent_start: string;
    public rent_end: string;
    public vehicle_license_plate: string;
    //public country_office: CountryOffice;
    public renter_id: number;

    constructor(
        //garage_location: Garage,
        rent_start: Date,
        rent_end: Date,
        vehicle_license_plate: string,
        //country_office: CountryOffice,
        renter_id: number,
    ) {
        //this.garage_location = garage_location;
        this.rent_start = rent_start.toISOString();
        this.rent_end = rent_end.toISOString();
        this.vehicle_license_plate = vehicle_license_plate;
        //this.country_office = country_office;
        this.renter_id = renter_id;
    }

    // public getRentDuration(): number 
    // {
    //     return Math.ceil((this.rent_end.getTime() - this.rent_start.getTime()) / (1000 * 60 * 60 * 24));
    // }

    // public calculateRentCost(): number 
    // {
    //     const days = this.getRentDuration();
    //     return (this.vehicle.price as number) * days;
    // }
}
