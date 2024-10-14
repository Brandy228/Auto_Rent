class DriveEase {
    //public company: CompanyParameters[]=[];
    //public application: Application[]=[];
    //public name: String;
    // public addresses: Address[]=[];
    //public location: Location1[]=[];
    public owners: Person[]=[];
    // public employees: Person[]=[];
    //public money: EarnPer[]=[];
    public country_offices: Country_Office[]=[];
    // public money: Number;
    // public phone_num: Number;
}

class Country_Office {
    public addresses: Address[]=[];
    public employees: Person[]=[];
    public money: number;
    public phone_nums: Number[]=[];
    public application: Application[]=[];
    //public garages: Garage[]=[];

    public transaction(customer:User,ammount:number): String {
        if(customer.about_person.money>=ammount) {
            customer.about_person.money-=ammount;
            this.money+=ammount;
            return "Транзакція пройшла успішно"
        }
        else {
            return "Транзакція не пройшла успішно"
        }
    }
}



class Application {
    // public cars: Car[]=[];
    public users: User[]=[];
    public rent: RentSpecs[]=[];
    //public locationofcar: Location1[]=[];
    public interaction: Feedback[]=[];
    public service: Support[]=[];
    
    public garages: Garage[]=[]; //*
    
    
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

class Garage {
    public name: String;
    public address: Address;
    public cars: Car[]=[];


    public addCar(car: Car): void {
        this.cars.push(car);
    }
    public getAllCars(): Car[] {
        return this.cars;
    }
    public getAvailableCars(): Car[] {
        return this.cars.filter(car => car.availability === true && car.broken === false); // стирив з ChatGPT
    }
}



class Location1 {
    private latitude: number;
    private longitude: number;
    
    constructor(latitude: number, longitude: number) {
        this.latitude = latitude;
        this.longitude = longitude;
    }


    public getCoordinates(): { latitude: number, longitude: number } {
        return { latitude: this.latitude, longitude: this.longitude };
    }

    public setCoordinates(latitude: number, longitude: number): void {
        this.latitude = latitude;
        this.longitude = longitude;
    }
}

class CompanyParameters {
    
}

class Address {
    public country: String;
    public city: String;
    public street: String;
    public location: Location1[]=[];
  }
  
class Person {
    public name: String;
    public sex: SexType;
    public age: Number;
    public workplace: CompanyParameters;
    public money: number; //N->n
    public address: Location1[]=[];
    public criminal_record: String;
    public drivers_license: Category;
    public phone_nums: Number[]=[] ;
  }

  enum SexType {
    Male,
    Female,
    Another
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

  

class Car{
    public car_type: CarType;
    public name_mark: String;
    public name_model: String;
    public box: GearBox;
    public id: String; //
    public price: number; //N->n
    public gps: Location1 | Garage; // навіщо тут було? Location1[]=[]

    public availability: boolean; // чи потрібно? *
    public renter: User | null; // ????????????????????? *
    public broken: boolean;//*


    // constructor() {
    //     this.renter = null; // Ініціалізація значення
    // }
}

  enum GearBox{
    Automatic,
    Variator,
    Mechanical
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


  
 

class User {
    public login: String;
    public password: String;
    public about_person: Person;
}




class RentSpecs {
    // думаю цей клас це деталі оренди того нам не треба знати локації всіх гаражів, треба знати в якому гаражі орендували і все, а може і це не треба
    //public garage_locations: Location1[]=[];  
    public garage_location: Garage;
    public rent_date: Date;
    public rent_time: String; //ладно
    public spec_of_Auto: Car;   // Car []=[] -> Car
    public price: number; // якого xуя(це ікс а не х) тут було string *
    public country_office: Country_Office;
    //public currency: String;

    public renter: User; //*


    // constructor(price: number, renter: User) {
    //     this.price = price;
    //     this.renter = renter;
    // }
//*
    public rent_auto(): String {

    if (this.spec_of_Auto.availability === false) {
        return "Автомобіль уже орендований іншим користувачем.";
    }

    if (this.spec_of_Auto.broken === true) {
        return "Автомобіль несправний і не може бути орендований.";
    }

    //this.renter.about_person.money=this.renter.about_person.money-this.price;
    // треба рахувати ціну в залежності від часу оренди авто
    //this.country_office.addMoney(this.price)
    
    let transaction_result=this.country_office.transaction(this.renter, this.price);
    if(transaction_result==="Транзакція пройшла успішно") {
        this.spec_of_Auto.availability=false;
        this.spec_of_Auto.renter=this.renter;
        return "Авто орендовано"
    }
    else {
        return "На жаль, у вас недостатньо грошей для оренди автомобіля.Але не впадайте у відчай! Ви можете заробити необхідні кошти, приєднавшись до нашої команди.Ми завжди шукаємо нових співробітників, які прагнуть працювати в динамічному середовищі та отримувати нові навички.Зверніться до нас, щоб дізнатися про відкриті вакансії і можливості для кар'єрного зростання. Разом ми зможемо досягти великих результатів!"
    }

//треба буде прописати закінчення оренди



    }
//*
    //public insurance: Number;
}
 

class Feedback {
    public respond: String;
    
  }


  

class Support{
    public repair_price: Number;


}