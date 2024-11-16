import { Person, PersonalInformation } from "./Person";
import { RentSpecs } from "../application/RentSpecs";
import { DriverLicense } from "./DriverLicense";

export class User extends Person {
    public login: String;
    public password: String;
    public discount_procent: Number;
    public rental_history: RentSpecs[]=[];

    constructor(personal_information: PersonalInformation,money: number, criminal_record: Boolean, driver_license: DriverLicense,login:String, password:String) {
        super(personal_information,money,criminal_record,driver_license)
        this.login = login;
        this.password = password;
    }

    public rentVehicle(rent_specs:RentSpecs): void 
    {
        this.rental_history.push(rent_specs);
    }

}

