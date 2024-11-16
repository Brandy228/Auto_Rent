import { Coordinate } from "../application/Coordinate";
import { DriverLicense } from "./DriverLicense";

export abstract class Person {
    public personal_information: PersonalInformation;
    public money: number;
    public has_criminal_record: Boolean;
    public driver_license: DriverLicense | null;

    constructor(personal_information: PersonalInformation,money: number, has_criminal_record: Boolean, drivers_license: DriverLicense) {
        this.personal_information = personal_information;
        this.money = money;
        this.has_criminal_record = has_criminal_record;
        this.driver_license = drivers_license;
    }

    public hasValidDriverLicense(): boolean 
    {
        if (!this.driver_license) {
            return false;
        }

        const now = new Date();
        return this.driver_license.categories.some(
            (category) => category.expiration_date > now
        );
    }

    // Метод для проведення фінансової транзакції
    public makeTransaction(amount: number): boolean 
    {
        if (this.money >= amount) {
            this.money -= amount;
            return true;
        }
        return false;
    }
}


export class PersonalInformation {
    public name: String;
    public sex: SexType;
    public date_of_birth: Date;
    public residence: Coordinate;
    public phone_nums: String[] = [];

    constructor(//TODO: rework 
        name: string,
        sex: SexType,
        date_of_birth: Date,
        residence: Coordinate,
        phone_nums: string[] = []
    ) {
        this.name = name;
        this.sex = sex;
        this.date_of_birth = date_of_birth;
        this.residence = residence;
        this.phone_nums = phone_nums;
    }

    public getAge(): number //TODO: delete this
    {
        const now = new Date();
        const age = now.getFullYear() - this.date_of_birth.getFullYear();
        const isBeforeBirthday =
            now.getMonth() < this.date_of_birth.getMonth() ||
            (now.getMonth() === this.date_of_birth.getMonth() &&
                now.getDate() < this.date_of_birth.getDate());
        return isBeforeBirthday ? age - 1 : age;
    }
}

export enum SexType {
    Male = "Male",
    Female = "Female",
    Another = "Another"
}
