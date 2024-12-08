// MapPage.tsx
import React, { useEffect, useState, useRef} from 'react';
import { useNavigate } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L, { map } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import MarkerClusterGroup from 'react-leaflet-markercluster';
//import 'react-leaflet-markercluster/dist/styles.css'; // Стилі для кластеру
import { Garage } from '../models/garage/Garage';
import AdminCarsList from '../components/AdminCarList.tsx';
import { Car } from '../models/garage/vehicle/Car';
import { carIcon } from '../icons/CarIcon.tsx';
import { garageIcon } from '../icons/GarageIcon.tsx';
import BackToHome from '../components/BackToHome.tsx';

interface MapPageProps {
  garages: Garage[];
}

const MapPage: React.FC<MapPageProps> = ({ garages }) => {
  const ref = useRef(null)
  
  const [selectedCar, setSelectedCar] = useState<Car | null>(null);
  const navigate = useNavigate();
  const mapRef = useRef<L.Map>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null); // Додаємо реф для контейнера карти

  const scrollToMap = () => {
    // Спочатку знаходимо елемент
    console.log(mapContainerRef.current)
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

  const handleViewOnMap = (car: Car) => {
    setSelectedCar(car);
   console.log(mapRef.current)
    if (mapRef.current) {
      scrollToMap(); // Спочатку прокручуємо до карти
      setTimeout(() => { // Даємо час на прокрутку
        mapRef.current?.flyTo(
          [car.gps.latitude, car.gps.longitude],
          14,
          { duration: 1.5 }
        );
      }, 500);
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
                <p>Vehicles in garage: {garage.vehicles.length}</p>
              </Popup>
            </Marker>
          

          {/* Маркери Автомобілів поза гаражем */}
          {garage.getRentedCars().map((car, index) => (
            <Marker
              key={`car-${car.details.license_plate}-${index}`}
              position={[car.gps.latitude, car.gps.longitude]}
              icon={carIcon}
            >
              <Popup>
                <h4>{car.type}</h4>
                <p>License Plate: {car.details.license_plate}</p>
                <button 
              className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              onClick={() => {
                setSelectedCar(car);
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