import { Garage } from "../garage/Garage";
import { Vehicle } from "../garage/vehicle/Vehicle";
import { User } from "../person/User";
import { CountryOffice } from "../CountryOffice";

export class RentSpecs {
    public garage_location: Garage;
    public rent_start: Date;
    public rent_end: Date;
    public vehicle: Vehicle;
    public country_office: CountryOffice;
    public renter: User;

    constructor(
        garage_location: Garage,
        rent_start: Date,
        rent_end: Date,
        vehicle: Vehicle,
        country_office: CountryOffice,
        renter: User
    ) {
        this.garage_location = garage_location;
        this.rent_start = rent_start;
        this.rent_end = rent_end;
        this.vehicle = vehicle;
        this.country_office = country_office;
        this.renter = renter;
    }

    public getRentDuration(): number 
    {
        return Math.ceil((this.rent_end.getTime() - this.rent_start.getTime()) / (1000 * 60 * 60 * 24));
    }

    public calculateRentCost(): number 
    {
        const days = this.getRentDuration();
        return (this.vehicle.price as number) * days;
    }
}
