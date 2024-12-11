// MapPage.tsx
import React, { useEffect, useState, useRef} from 'react';
import { useNavigate } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L, { map } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import MarkerClusterGroup from 'react-leaflet-markercluster';
//import 'react-leaflet-markercluster/dist/styles.css'; // Стилі для кластеру
import AdminCarsList from '../components/AdminCarList.tsx';
import { Car } from '../models/garage/vehicle/Car';
import { carIcon } from '../icons/CarIcon.tsx';
import { garageIcon } from '../icons/GarageIcon.tsx';
import BackToHome from '../components/BackToHome.tsx';
import { deserializeGarages } from '../utils/Deserialize.ts';
import { Garage } from '../models/garage/Garage.ts';
import { CarIconRed } from '../icons/CarIconRed.tsx';

interface MapPageProps {
  garages_get: Garage[];
}

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

const getRandomDirection = () => {
  const directions = [-44, 44];
  return directions[Math.floor(Math.random() * directions.length)];
};

const moveCarsRandomly = (garages: Garage[]): Garage[] => {
  const newGarages =  deserializeGarages(garages.map((garage) => {
    const updatedVehicles = garage.vehicles.map((car) => {
      if (!garage.getAvailableCars().includes(car)) {
        const newLatitude = car.gps.latitude + getRandomDirection() * 0.001;
        const newLongitude = car.gps.longitude + getRandomDirection() * 0.001;
        return {
          ...car,
          gps: {
            ...car.gps,
            latitude: newLatitude,
            longitude: newLongitude,
          },
        };
      }
      return car;
    });
    const gaarge = new Garage(garage.name, garage.address, garage.getMaxCars());
    updatedVehicles.forEach(vehicle => {
      gaarge.addVehicle(vehicle)
    });
    return gaarge;

  }))
  localStorage.setItem('garages', JSON.stringify(newGarages));
  return newGarages;
};


const MapPage: React.FC<MapPageProps> = ({ garages_get }) => {
  const ref = useRef(null)
  
  const [selectedCar, setSelectedCar] = useState<Car | null>(null);
  const [scrollToCard, setScrollToCard] = useState(false);
  const navigate = useNavigate();
  const [garages, setGarages] = useState(getAllGarages)
  const mapRef = useRef<L.Map>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null); // Додаємо реф для контейнера карти

  useEffect(() => {
    const interval = setInterval(() => {
      const updatedGarages = moveCarsRandomly(getAllGarages())
      setGarages(updatedGarages);
    }, 6000);

    return () => clearInterval(interval);
  }, []);

  const scrollToMap = () => {
    // Спочатку знаходимо елемент
    console.log(mapContainerRef.current, "bbnb")
    const mapElement = mapContainerRef.current;
    if (!mapElement) return;

    // Отримуємо позицію елемента відносно верху сторінки
    const elementPosition = mapElement.getBoundingClientRect().top;
    // Отримуємо поточну позицію прокрутки
    const offsetPosition = elementPosition + window.pageYOffset - 20; // 20px відступ зверху

    // Прокручуємо до елемента
    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });
  };
  
  // Функція для прокрутки до вибраної машини в списку
  const scrollToSelectedCar = () => {
    const element = document.getElementById(`car-${selectedCar?.details.license_plate}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  // const handleViewOnMap = (car: Car) => {
  //   setSelectedCar(car);
  //  console.log(mapRef.current, "AAAA")
  //   if (mapRef.current) {
  //     scrollToMap(); // Спочатку прокручуємо до карти
  //     setTimeout(() => { // Даємо час на прокрутку
  //       mapRef.current?.flyTo(
  //         [car.gps.latitude, car.gps.longitude],
  //         14,
  //         { duration: 1.5 }
  //       );
  //     }, 500);
  //   }
  // };


  useEffect(() => {
    if (selectedCar && mapRef.current) {
      if (scrollToCard) {
        scrollToSelectedCar()
        setScrollToCard(false)
      } else {
      scrollToMap(); // Спочатку прокручуємо до карти
      setTimeout(() => { // Даємо час на прокрутку
        mapRef.current?.flyTo(
          [selectedCar.gps.latitude, selectedCar.gps.longitude],
          14,
          { duration: 1.5 }
        );
      }, 500);
    }}
  }, [selectedCar]);


  const handleViewOnMap = (car: Car) => {
    setSelectedCar(car);
    if (mapRef.current) {
      mapRef.current.flyTo([car.gps.latitude, car.gps.longitude], 14, { duration: 1.5 });
    }
  };

  return (
    <div className="map-page">
      <div className="flex justify-between items-center p-4">
        <BackToHome />
      </div>

      <div ref={mapContainerRef}>
      <MapContainer ref={mapRef} center={[49.2328, 28.4815]} zoom={6} style={{ height: '500px', width: '100%' }}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        <MarkerClusterGroup>
          {/* Маркери Гаражів */}
          {garages.map((garage) => {
            return (
              <React.Fragment>
            <Marker
              //key={`garage-${garage.id}`} // Унікальний ключ
              position={[garage.address.latitude, garage.address.longitude]}
              icon={garageIcon}
            >
              <Popup>
                <h4>{garage.name}</h4>
                <p>Cars in garage: {garage.getAvailableCars().length}</p>
                <p>All cars: {garage.vehicles.length}</p>
              </Popup>
            </Marker>
          

          {/* Маркери Автомобілів поза гаражем */}
          {garage.getRentedCars().map((car, index) => (
            <Marker
              key={`${car.details.license_plate}`}
              position={[car.gps.latitude, car.gps.longitude]}
              icon={carIcon}
            >
              <Popup>
                <h4>{car.details.exterior.mark} {car.details.exterior.model}</h4>
                <p>License Plate: {car.details.license_plate}</p>
                <button 
              className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              onClick={() => {
                setSelectedCar(car);
                setScrollToCard(true)
                scrollToSelectedCar();
              }}
            >
              View Details
            </button>
              </Popup>
            </Marker>
          ))}

          {garage.getNotReturnedCars().map((car, index) => (
            <Marker
              key={`${car.details.license_plate}`}
              position={[car.gps.latitude, car.gps.longitude]}
              icon={CarIconRed} 
            >
              <Popup>
                <h4>{car.details.exterior.mark} {car.details.exterior.model}</h4>
                <p>License Plate: {car.details.license_plate}</p>
                <button 
              className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              onClick={() => {
                setSelectedCar(car);
                setScrollToCard(true); 
                scrollToSelectedCar();
              }}
            >
              View Details
            </button>
              </Popup>
            </Marker>
          ))}
        
        </React.Fragment>
      )}
        )}</MarkerClusterGroup>
      </MapContainer>
      </div>

      <div className="mt-8">
        <AdminCarsList garages={garages} 
        selectedCar={selectedCar} 
        onSelectCar={setSelectedCar}
        onViewOnMap={handleViewOnMap}/>
      </div>
    </div>
  );
}

export default MapPage;