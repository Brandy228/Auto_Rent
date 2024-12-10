import { Coordinate } from "../application/Coordinate";

export abstract class Person {
    public name: string;
    public phone_nums: string[] = [];
    public money: number;

    constructor(name:string,phone_nums:string[],money: number) {
        this.name = name;
        this.phone_nums = phone_nums;
        this.money = money;
    }
}

