class DriveEase {
    public owners: Person[] = [];
    public country_offices: Country_Office[] = [];
    // TODO: додавати нові офіси
    // чи треба прописувати юзеру можливість угнати машину і чи прописувати метод розбитися
    // треба буде якось працювати з драйвер ліценз+якось працювати з ув'язненнями< треба якось це переробити
}


class Person {
    public name: String;
    public sex: SexType;
    public age: Number;
    public money: number; //N->n
    public address: Location1[] = [];
    public criminal_record: String;
    public drivers_license: Category[]=[]; 
    public phone_nums: Number[] = [];
    public workplace: Country_Office | null; // додати щось по типу ще немає або є або нам не треба нічого добавляти

    constructor(name: String, sex: SexType, age: number, money: number, address: Location1[], criminal_record: String, drivers_license: Category[], phone_nums: number[], workplace: Country_Office | null) {
        this.name = name;
        this.sex = sex;
        this.age = age;
        this.money = money;
        this.address = address;
        this.criminal_record = criminal_record;
        this.drivers_license = drivers_license;
        this.phone_nums = phone_nums;
        this.workplace = workplace;
    }
}


enum SexType {
    Male,
    Female,
    Another
}

// todo: rename
class Location1 {
    private latitude: number;
    private longitude: number;

    constructor(latitude: number, longitude: number) {
        this.latitude = latitude;
        this.longitude = longitude;
    }


    public getCoordinates() {
        return { latitude: this.latitude, longitude: this.longitude };
    }

    public setCoordinates(latitude: number, longitude: number): void {
        this.latitude = latitude;
        this.longitude = longitude;
    }
}

enum Category {
    A,
    B,
    C,
    D,
    BE,
    CE,
    DE
}


class Country_Office {
    public addresses: Address[] = [];
    public employees: Person[] = [];
    public money: number;
    public phone_nums: Number[] = [];
    public application: Application[] = [];
    //а країну вказати а області
    //додати звільнити співробітника
// push емплойерс і навено теж саме з адерсами і номерами і це виходить у нас має бути 
    constructor(adresses: Address[], money: number, phone_nums: Number[], application: Application[]) 
    {
        this.addresses = adresses;
        this.money = money;
        this.phone_nums = phone_nums;
        this.application = application;
    }
    public transaction(customer: User, ammount: number): String {
        try {
        if (customer.about_person.money >= ammount) {
            customer.about_person.money -= ammount;
            this.money += ammount;
            return "Транзакція пройшла успішно"
        }
        else {
            return "Транзакція не пройшла успішно"
        }
        }
        catch (error) {
            return `Error: ${error.message}`;
        }
    }
}

class Address {
    public country: String;
    public city: String;
    public street: String;
    public location: Location1[] = [];

    constructor(country:String, city:String, street:String,location:Location1[]) {
        this.country = country;
        this.city = city;
        this.street = street;
        this.location = location;
    }
}


class Application {
    public users: User[] = [];
    public garages: Garage[] = []; 
    public rent: RentSpecs[] = [];
    public interaction: Feedback[] = [];
    public service: Support[] = [];

    constructor(rent:RentSpecs[]) {
        this.rent = rent;
    }

    public addUser(user: User): void {
        this.users.push(user);
    }
    public addFeedback(feedback: Feedback): void {
        this.interaction.push(feedback);
    }

    public addGarage(garage: Garage): void {
        this.garages.push(garage);
    }

    /*
    |
    | ChatGPT
    v чи треба воно? хай буде
*/
    public getGarageByName(name: string): Garage | undefined {
        return this.garages.find(garage => garage.name === name);
    }


}


class User {
    public login: String;
    public password: String;
    //todo: rename
    public about_person: Person;

    //викликати допомогу ( певно треба буде перевіряти чи вчн орендував машину)
}

class Garage {
    public name: String;
    public address: Address;
    public cars: Car[] = [];


    public addCar(car: Car): void {
        this.cars.push(car);
    }
    public getAllCars(): Car[] {
        return this.cars;
    }
    public getAvailableCars(): Car[] {
        return this.cars.filter(car => !car.already_rented && !car.broken); // стирив з ChatGPT
    }
}


class Car {
    public car_type: CarType;
    public name_mark: String;
    public name_model: String;
    public box: GearBox;
    public id: string; 
    public price: number; //N->n
    public gps: Location1 | Garage; 

    public already_rented: boolean;
    public renter: User | null;
    public broken: boolean;

}

enum CarType {
    Sedan,
    Hatchback,
    Wagon,
    Coupe,
    Crossover,
    SUV,
    Minivan,
    Pickup,
    Convertible,
    Van,
    Limousine,
    Roadster,
    Sports_Car,
    Electric_Car,
    Hybrid
}
enum GearBox {
    Automatic,
    Variator,
    Mechanical
}



class RentSpecs { 
    public garage_location: Garage;
    public rent_date: Date;
    public rent_time: String; 
    public spec_of_Auto: Car;
    public price: number; 
    public country_office: Country_Office;

    public renter: User; 

    //ми не перевіряємо права треба перевірити 

    
    public rentAuto(): String {

        if (!this.spec_of_Auto.already_rented) {
            return "Автомобіль уже орендований іншим користувачем.";
        }

        if (this.spec_of_Auto.broken) {
            return "Автомобіль несправний і не може бути орендований.";
        }

        // треба рахувати ціну в залежності від часу оренди авто


        let transaction_result = this.country_office.transaction(this.renter, this.price);
        if (transaction_result === "Транзакція пройшла успішно") {
            this.spec_of_Auto.already_rented = false;
            this.spec_of_Auto.renter = this.renter;
            return "Авто орендовано"
        }
        else {
            return "На жаль, у вас недостатньо грошей для оренди автомобіля.Але не впадайте у відчай! Ви можете заробити необхідні кошти, приєднавшись до нашої команди.Ми завжди шукаємо нових співробітників, які прагнуть працювати в динамічному середовищі та отримувати нові навички.Зверніться до нас, щоб дізнатися про відкриті вакансії і можливості для кар'єрного зростання. Разом ми зможемо досягти великих результатів!"
        }

        //треба буде прописати закінчення оренди (з часом оренди попрацювати) + ціна залежить від часу оренди



    }
}


class Feedback {
    public respond: String;
}




class Support {
    public repair_price: Number;

    public repair_auto(auto_id: String, ): void {
    }
}

const person = new Person("Біллі",SexType.Another,321,21,[new Location1(10,10)], "Тричі сидівший зек",[Category.BE,Category.A],[312980],null );

const Ukraine_Office = new Country_Office(
    [new Address('Ukraine', 'Citu', 'Shevchenko', [new Location1(1021,120)])],
    1921, 
    [3809854436356,380985336345], 
    []
);