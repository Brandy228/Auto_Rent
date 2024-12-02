import { User } from "../person/User";

export class Feedback {
    public car_quality: Rating;
    public rental_experience: String;
    public feedback_date: Date;
    public author: User; //TODO: not user, user login or name
}

enum Rating {
    VeryBad,
    Bad,
    Average,
    Good,
    Excellent
}