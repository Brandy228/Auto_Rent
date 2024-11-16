import { Owner } from "./office/person/Owner";
import { CountryOffice } from "./office/CountryOffice";

class DriveEase {
    public owners: Owner[] = [];
    public country_offices: CountryOffice[] = [];

    public addOwner(owner: Owner): void 
    {
        this.owners.push(owner);
    }

    public addCountryOffice(office: CountryOffice): void 
    {
        this.country_offices.push(office);
    }
}