class AutoRent {
    public company: CompanyParameters[]=[];
    public cars: CarCategory[]=[];
    public users: User[]=[];
    public rent: RentSpecs[]=[];
    //public locationofcar: Location[]=[];  true false
    public interaction: Feedback[]=[];
    public service: Support[]=[];
}

class CompanyParameters {
    public name: String;
    public addresses: Address[]=[];
    public owners: Person[]=[];
    public employees: Person[]=[];
    public money: EarnPer[]=[];
    public phone_num: Number;
}

class Address {
    public country: String;
    public city: String;
    public street: String;
    public num: Number;
  }
  
class Person {
    public name: String;
    public sex: SexType;
    public age: Number;
    public workplace: CompanyParameters;
    public money: EarnPer[]=[];
    public address: Address[] = [];
    public criminal_record: String;
    public drivers_license: Category[] = [];
    public phone_num: Number;
  }

  enum SexType {
    Male,
    Female,
    Another
  }

  class EarnPer {
    public hour: Number;
    public day: Number; 
    public month: Number;
    public year: Number;
  }
  
  enum Category {
    B,
    C,
    D,
    BE,
    CE,
    DE
  }

  

class CarCategory{
    public car_type: Type;
    public name_mark: Mark;
    public name_model: Model;
    public box: GearBox;
    public id: String; // номер авто
    public car_price: Number; // price -> car_price, при обрахунках додавати % від ціни якщо без страховки
    public gps: Location[]=[];
  }

  enum GearBox{
    Automatic,
    Variator,
    Mechanical
  }

  enum Type {
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

  enum Mark {
    Toyota,
    BMW,
    Mercedes_Benz,
    Audi,
    Volkswagen,
    Ford,
    Honda,
    Nissan,
    Hyundai,
    Kia,
    Chevrolet,
    Lexus,
    Mazda,
    Subaru,
    Volvo,
    Jeep,
    Tesla,
    Porsche,
    Land_Rover,
    Jaguar
  }

  enum Model {
    Camry,
    M_Series,
    C_Class,
    A4,
    Golf,
    Focus,
    Civic,
    Altima,
    Sonata,
    Sportage,
    Malibu,
    RX,
    CX_,
    Outback,
    XC90,
    Grand_Cherokee,
    Model_X,
    Panamera,
    Range_Rover,
    F_Pace
  }

class User {
    public login: String;
    public password: String;
    //public phone_num: Number;
    public about_person: Person;
}

class RentSpecs {
    public garage_locations: Location[]=[];
    public rent_date: Date; //дата оренди
    //public end_rent_date: String;
    public rent_time: String;
    public spec_of_auto: CarCategory []=[];
    public price: PricePer[]=[];
    //public insurance: Number;
    public insurance: boolean; //дати іншу назву?
}
 
class PricePer {
    public day: Number; 
    public week: Number;
    public month: Number;
    public three_month: Number;
  }

class Feedback {
    public respond: Rating;
    public user_info: User;

  }

  enum Rating {
    Horrible,
    Bad,
    Normal,
    Nice,
    Excellent 
  }

class Support{
  // треба буде прописати властивість поломана чи ні до машини
    public
}