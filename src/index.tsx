import React, { useState, useContext, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate, Navigate } from 'react-router-dom';
import 'tailwindcss/tailwind.css';
import AddCarPage from './pages/AddCarPage.tsx';
import { Car, GearBox, Exterior,CarDetails } from './models/garage/vehicle/Car.ts';
import MapPage from './pages/MapPage.tsx';
import { Application } from './models/application/Application.ts';
import { Garage } from './models/garage/Garage.ts';
import { Coordinate } from './models/application/Coordinate.ts';
import { CountryOffice } from './models/CountryOffice.ts';
import { User } from './models/person/User.ts';
import { Person,PersonalInformation, SexType } from './models/person/Person.ts';
import { DriverLicense,DriverLicenseCategory,DriverLicenseCategoryType } from './models/person/DriverLicense.ts';
import CarsList from './components/CarsList.tsx';
import AddGaragePage from './pages/AddGaragePage.tsx';
import RentPage from './pages/RentPage.tsx';
import LoginPage from './pages/LoginPage.tsx';
import RegisterPage from './pages/RegisterPage.tsx';
import { AuthContext } from './AuthContext.tsx';
import { AuthProvider } from './AuthContext.tsx';
import { deserializeGarages } from './utils/Deserialize.ts';


//import './styles/globals.css';

let cord = new Coordinate(12, 23);
let cord1 = new Coordinate(45, 27);
let cord2 = new Coordinate(22, 27);

const driver_license = new DriverLicense()

const date1 = new Date(1990, 2 ,12)
const personal_inform = new PersonalInformation("Abdul",SexType.Male, date1,cord1,["+3809394234"])

const user = new User(personal_inform,20000,false,driver_license,"Abdul229","qwerty1")

const country_office = new CountryOffice(cord,2000000)

// Ініціалізація додатку та гаражів
const garage = new Garage('Central Garage',cord1, 10);
export const app = new Application([]);
app.addUser(user);
//app.addGarage(garage)

// Ініціалізація авто
let exterior = new Exterior("Audi", "A4", "Sedan");
let exterior1 = new Exterior("Toyota","Camry","Sedan")
let date = new Date(2000, 2, 12);
let details = new CarDetails(exterior, date, "AB2111BA", 1999, GearBox.Mechanical);
let details1 = new CarDetails(exterior1, date, "AB1111AO", 2015, GearBox.Mechanical);
let details2 = new CarDetails(exterior, date, "AB0000OO", 2023, GearBox.Variator);


const premium_car = new Car(200,cord,details2)

// Додати авто до гаража
app.addGarage(garage);

//localStorage.setItem('app', JSON.stringify(app))

//localStorage.setItem('garages',JSON.stringify([garage]))
//localStorage.setItem('users',JSON.stringify(user))


garage.vehicles.push(premium_car)

//localStorage.setItem('app', JSON.stringify(app))
const getAllCars = (): any[] => {
  // Отримуємо інформацію про гаражі з localStorage
  const savedGarages = localStorage.getItem('garages');
  if (!savedGarages) {
    return []; // Якщо даних немає, повертаємо порожній список
  }

  try {
    const garages = JSON.parse(savedGarages);

    // Збираємо всі машини зі всіх гаражів
    return garages.flatMap((garage) => garage.vehicles || []);
  } catch (error) {
    console.error('Помилка при парсингу даних з localStorage:', error);
    return []; // У разі помилки повертаємо порожній список
  }
};

const getAllGarages = (): Garage[] => {
  const savedGarages = localStorage.getItem('garages');
  if (!savedGarages) {
    return [];
  }

  try {
    const garagesData = JSON.parse(savedGarages);
    return deserializeGarages(garagesData);
  } catch (error) {
    console.error('Помилка при парсингу даних з localStorage:', error);
    return [];
  }
};



function App() {
  const [cars, setCars] = useState<Car[]>(getAllCars);
  //const [garages, setGarages] = useState<Garage[]>(getAllGarages);
  const navigate = useNavigate();
  const { user, logout } = useContext(AuthContext);
  const [garages, setGarages] = useState<Garage[]>([]); // Початковий стан — порожній масив

  useEffect(() => {
    const rawGarages = getAllGarages();
    setGarages(rawGarages);
  }, []);


  const addCar = (newCar: Car, newGarages:Garage[]) => {
    setCars((prevCars) => {
      const updatedCars = [...prevCars, newCar];
      //localStorage.setItem('cars', JSON.stringify(updatedCars)); // Зберегти оновлений список у LocalStorage
      setGarages(newGarages);
      return updatedCars;
    });
    navigate('/');
  };

  const addGarage = (newGarage: Garage, newGarages: Garage[]) => {
    setGarages((prevGarages) => {
      const updatedGarages = [...prevGarages, newGarage];
      //localStorage.setItem('garages', JSON.stringify(updatedGarages)); // Зберегти оновлений список у LocalStorage
      return updatedGarages;
    });
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900">DriveEase</h1>
            <div className="flex space-x-4">
              {user ? (
                <>
                  {user.role === 'admin' && (
                    <>
                      <Link to="/add-garage" className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700">
                        Add Garage
                      </Link>
                      <Link to="/add-car" className="px-4 py-2 bg-yellow-600 text-white rounded-md hover:bg-yellow-700">
                        Add Car
                      </Link>
                  <Link to="/map" className="px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700">
                    View Map
                  </Link>
                    </>
                  )}
                  <button onClick={logout} className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700">
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link to="/login" className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                    Login
                  </Link>
                  <Link to="/register" className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700">
                    Register
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <Routes>
          <Route path="/" element={<CarsList cars={cars} onRent={(car) => {
            navigate('/rent', { state: { car }})
          }} />} />
          <Route
            path="/add-garage"
            element={
              user && user.role === 'admin' ? <AddGaragePage onAddGarage={addGarage} /> : <Navigate to="/login" />
            }
          />
          <Route
            path="/add-car"
            element={
              user && user.role === 'admin' ? <AddCarPage onAddCar={addCar} /> : <Navigate to="/login" />
            }
          />
          <Route
            path="/map"
            element={
              user ? <MapPage garages={garages} /> : <Navigate to="/login" />
            }
          />
          <Route path="/rent" element={<RentPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Routes>
      </main>
    </div>

  );
}

const rootElement = document.getElementById('root') as HTMLElement;
const root = ReactDOM.createRoot(rootElement);

root.render(
  <Router>
  <AuthProvider>
    <App />
  </AuthProvider>
</Router>
);
