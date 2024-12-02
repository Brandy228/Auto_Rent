import { Coordinate } from "./application/Coordinate";
import { User } from "./person/User";
import { Application } from "./application/Application";
import { Admin } from "./person/Admin";

export class CountryOffice {
    public address: Coordinate;
    public admins: Admin[]=[];
    public money: Number;
    public phone_numbers: Number[] = [];
    public applications: Application;

    constructor(address: Coordinate,money: Number) {
        this.address = address;
        this.money = money;
    }

    public transaction(customer: User, amount: number): void 
    {
        if (customer.money >= amount) {
            customer.money = (customer.money as number) - (amount as number);
            this.money = (this.money as number) + (amount as number);
        } else {
            throw new Error("Insufficient funds for transaction.");
        }
    }

    //TODO: rewok all this methods
    public addAdmin(admin: Admin): void 
    {
        if (!this.admins.includes(admin)) {
            this.admins.push(admin);
        }
    }

    public removeAdmin(admin: Admin): void 
    {
        this.admins = this.admins.filter((a) => a !== admin);
    }
}
