import { User } from "../person/User";
import { Garage } from "../garage/Garage";
import { RentSpecs } from "./RentSpecs";
import { Feedback } from "./Feedback";

export class Application {
    //TODO rework
    public users: User[] = [];
    public garages: Garage[] = [];
    public rent: RentSpecs[] = [];
    public feedbacks: Feedback[] = [];

    constructor(rent: RentSpecs[]) {
        this.rent = rent;
    }

    public addUser(user: User): void 
    {
        this.users.push(user);
    }

    public addFeedback(feedback: Feedback): void 
    {
        this.feedbacks.push(feedback);
    }

    public addGarage(garage: Garage): void 
    {
        this.garages.push(garage);
    }

    public getGarageByName(name: String): Garage | null 
    {
        return this.garages.find(garage => garage.name === name) || null;
    }  
}
