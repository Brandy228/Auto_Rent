import { User } from "../person/User";
import { Garage } from "../garage/Garage";
import { RentSpecs } from "./RentSpecs";

export class Application {
    public users: User[] = [];
    public garages: Garage[] = [];
    public rent: RentSpecs[] = [];

    constructor(rent: RentSpecs[]) {
        this.rent = rent;
        //this.loadFromStorage();
    }

    public addUser(user: User): void {
        this.users.push(user);
        //this.saveToStorage();
    }

    public addGarage(garage: Garage): void {
        this.garages.push(garage);
        //this.saveToStorage();
    }

    public getGarageByName(name: string): Garage | null {
        return this.garages.find(garage => garage.name === name) || null;
    }

}
