import { Coordinate } from "../../application/Coordinate";
import { Feedback } from "../../application/Feedback";
import { PowerSource } from "./PowerSource";

export abstract class Vehicle {
    public power_sources: PowerSource[]=[];
    public price: Number;
    public gps: Coordinate;
    public feedbacks: Feedback[]=[];
    public discount_procent: Number;

    constructor(price: Number, gps: Coordinate, discount_procent: Number) {
        this.price = price;
        this.gps = gps;
        this.discount_procent = 0;
    }

    public addFeedback(feedback: Feedback): void 
    {
        this.feedbacks.push(feedback);
    }

    public getAverageFeedbackRating(): number 
    {
        if (this.feedbacks.length === 0) return 0;

        const totalRating = this.feedbacks.reduce((sum, feedback) => {
            return sum + feedback.car_quality;
        }, 0);

        return totalRating / this.feedbacks.length;
    }
}