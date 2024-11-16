import { Owner } from "./office/person/Owner";
import { User } from "./office/person/User";
import { PersonalInformation, SexType } from "./office/person/Person";
import { DriverLicense, DriverLicenseCategory, DriverLicenseCategoryType } from "./office/person/DriverLicense";
import { CountryOffice } from "./office/CountryOffice";
import { Coordinate } from "./office/application/Coordinate";
import { RentSpecs } from "./office/application/RentSpecs";
import { Garage } from "./office/garage/Garage";
import { Vehicle } from "./office/garage/vehicle/Vehicle";
import { FuelTank } from "./office/garage/vehicle/PowerSource";

// Функція для тестування програми
function testProgram(): void {
    console.log("=== Тестування програми ===");

    // Створення персональних даних
    const personalInfoOwner = new PersonalInformation(
        "John Doe",
        SexType.Male,
        new Date("1980-01-01"),
        new Coordinate(50.45, 30.52),
        ["+380123456789"]
    );

    const personalInfoUser = new PersonalInformation(
        "Jane Smith",
        SexType.Female,
        new Date("1990-05-15"),
        new Coordinate(48.85, 2.35),
        ["+330987654321"]
    );

    // Створення водійських прав
    const driverLicense = new DriverLicense();
    driverLicense.addCategory(
        new DriverLicenseCategory(DriverLicenseCategoryType.B, new Date("2030-12-31"))
    );

    // Створення користувачів
    const owner = new Owner(personalInfoOwner, 10000, false, driverLicense, "ownerLogin", "ownerPassword");
    const user = new User(personalInfoUser, 500, false, driverLicense, "userLogin", "userPassword");

    console.log("Власник створений:", owner);
    console.log("Користувач створений:", user);

    // Створення CountryOffice
    const office = new CountryOffice(new Coordinate(51.5, -0.1), 100000);
    console.log("Офіс створений:", office);

    // Додавання адміністратора в офіс
    office.addAdmin(owner);
    console.log("Адміністратор доданий до офісу:", office.admins);

    // Тест транзакції
    try {
        office.transaction(user, 200);
        console.log("Транзакція успішна. Залишок грошей користувача:", user.money);
    } catch (error) {
        console.error("Помилка транзакції:");
    }

    // Створення гаража
    const garage = new Garage("Main Garage", new Coordinate(40.71, -74.01), 50);
    console.log("Гараж створений:", garage);

    // Створення транспортного засобу
    const fuelTank = new FuelTank(50, "Gasoline");
    class Car extends Vehicle {
        constructor(price: Number, gps: Coordinate) {
            super(price, gps, 0);
            this.power_sources.push(fuelTank);
        }
    }
    const car = new Car(100, new Coordinate(40.71, -74.01));
    garage.addVehicle(car);
    console.log("Машина додана до гаража:", garage.vehicles);

    // Створення специфікації оренди
    const rentSpecs = new RentSpecs(garage, new Date("2024-01-01"), new Date("2024-01-07"), car, office, user);
    console.log("Оренда створена:", rentSpecs);

    // Тестування розрахунку вартості оренди
    console.log("Тривалість оренди (днів):", rentSpecs.getRentDuration());
    console.log("Вартість оренди:", rentSpecs.calculateRentCost());

    console.log("=== Тестування завершено ===");
}

// Виклик функції для тестування
testProgram();
