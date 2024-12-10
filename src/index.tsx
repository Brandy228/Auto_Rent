// src/index.tsx або src/App.tsx
import React, { useState, useContext, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useNavigate,
  Navigate,
} from 'react-router-dom';
import 'tailwindcss/tailwind.css';
import AddCarPage from './pages/AddCarPage.tsx';
import { Car, GearBox, Exterior, CarDetails } from './models/garage/vehicle/Car.ts';
import MapPage from './pages/MapPage.tsx';
import { Application } from './models/application/Application.ts';
import { Garage } from './models/garage/Garage.ts';
import { Coordinate } from './models/application/Coordinate.ts';
import { CountryOffice } from './models/CountryOffice.ts';
import { User } from './models/person/User.ts';
import { Person } from './models/person/Person.ts';
import CarsList from './components/CarsList.tsx';
import AddGaragePage from './pages/AddGaragePage.tsx';
import RentPage from './pages/RentPage.tsx';
import LoginPage from './pages/LoginPage.tsx';
import RegisterPage from './pages/RegisterPage.tsx';
import { AuthContext, AuthProvider } from './AuthContext.tsx';
import { deserializeGarages } from './utils/Deserialize.ts';

const getAllCars = (): Car[] => {
  const garages = getAllGarages(); // Використовуємо десеріалізовані гаражі
  return garages.flatMap((garage) => garage.vehicles || []);
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


const getAllCarsAndGarages = () => {
  const allGarages = getAllGarages();
  const carsWithGarages = allGarages.flatMap((garage) =>
    garage.vehicles.map((car) => ({ car, garageName: garage.name }))
  );
  return carsWithGarages
}

function App() {
  const navigate = useNavigate();
  const { currentUser, setCurrentUser } = useContext(AuthContext);
  const [garages, setGarages] = useState<Garage[]>([]); // Початковий стан — порожній масив
  const [carsWithGarages, setCarsWithGarages] = useState(getAllCarsAndGarages)

  // console.log(currentUser);
  // console.log(currentUser?.role);

  useEffect(() => {
    const rawGarages = getAllGarages();
    setGarages(rawGarages);
  }, []);

  const addCar = (newCars: Car[], newGarages: Garage[]) => {
    setGarages(newGarages);
    localStorage.setItem('garages', JSON.stringify(newGarages));
    console.log(newGarages)
    setCarsWithGarages(getAllCarsAndGarages)

    
    navigate('/');
  };

  const addGarage = (newGarage: Garage, newGarages: Garage[]) => {
    setGarages((prevGarages) => {
      const updatedGarages = [...prevGarages, newGarage];
      //localStorage.setItem('garages', JSON.stringify(updatedGarages)); // Зберегти оновлений список у LocalStorage
      return updatedGarages;
    });
    localStorage.setItem('garages', JSON.stringify(newGarages));
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900" onClick={() =>{navigate('/')}}>DriveEase</h1>
            <div className="flex space-x-4">
              {currentUser ? (
                <>
                  {currentUser.role === 'admin' && (
                    <>
                      <Link
                        to="/add-garage"
                        className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                      >
                        Add Garage
                      </Link>
                      <Link
                        to="/add-car"
                        className="px-4 py-2 bg-yellow-600 text-white rounded-md hover:bg-yellow-700"
                      >
                        Add Car
                      </Link>
                      <Link
                        to="/map"
                        className="px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700"
                      >
                        View Map
                      </Link>
                    </>
                  )}
                  <button
                    onClick={() => setCurrentUser(null)}
                    className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
                  >
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
          <Route
            path="/"
            element={
              <CarsList
                cars_with_garages={carsWithGarages}
                onRent={(car) => {
                  navigate('/rent', { state: { car } })
                }}
              />
            }
          />
          <Route
            path="/add-garage"
            element={
              currentUser && currentUser.role === 'admin' ? (
                <AddGaragePage onAddGarage={addGarage} />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          {/* <Route path="/car-manage" element={<CarManagePage />} /> */}
          <Route
            path="/add-car"
            element={
              currentUser && currentUser.role === 'admin' ? (
                <AddCarPage onAddCar={addCar} />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/map"
            element={
              currentUser && currentUser.role === 'admin' ? 
              <MapPage garages={garages} /> : <Navigate to="/login" />
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