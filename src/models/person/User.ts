import { Person } from "./Person.ts";
import { RentSpecs } from "../application/RentSpecs";

export class User extends Person {
    public login: string;
    public password: string;
    public rental_history: RentSpecs[]=[];
    public role: Role;

    constructor(name:string,phone_numbers:string[],money: number,login:string, password:string, rental_history:RentSpecs[], role:Role) {
        super(name,phone_numbers,money)
        this.login = login;
        this.password = password;
        this.rental_history = rental_history
        this.role = role;
    }

    public rentVehicle(rent_specs:RentSpecs): void 
    {
        this.rental_history.push(rent_specs);
    }

}

export enum Role {
    USER = "user",
    ADMIN = "admin",
    OWNER = "owner"
}

