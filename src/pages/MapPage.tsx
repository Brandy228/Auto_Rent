import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Garage } from '../models/garage/Garage.ts';
import AdminCarsList from '../components/AdminCarLIst.tsx';
import { Car } from '../models/garage/vehicle/Car.ts';
import { garageIcon, carIcon } from '../icons/garageAndCarIcon.tsx';
import BackToHome from '../components/BackToHome.tsx';

interface MapPageProps {
  garages: Garage[];
}


function getAllRentedCars(garages: Garage[]): Car[] {
  return garages.flatMap(garage => garage.getRentedCars());
}
// Ваші координати для центрального гаража

const MapPage: React.FC<MapPageProps> = ({ garages }) => {
  const navigate = useNavigate(); // Для навігації
  const [rented_cars, set_rented_cars] = useState()


  return (
    <div className="map-page">
      <div className="flex justify-between items-center p-4">
        <BackToHome/>
      </div>

      <MapContainer center={[49.2328, 28.4815]} zoom={6} style={{ height: '500px', width: '100%' }}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        
        {/* Мітка з кастомним SVG */}
        {garages.map((garage) => {
  // Фільтруємо машини, які не збігаються за координатами з гаражем
  const vehiclesOutsideGarage = garage.vehicles.filter(
    (vehicle) =>
      vehicle.gps.latitude !== garage.address.latitude ||
      vehicle.gps.longitude !== garage.address.longitude
  );

  return (
    <React.Fragment>
      {/* Відображаємо маркер гаража */}
      <Marker position={[garage.address.latitude, garage.address.longitude]} icon={garageIcon}>
        <Popup>
          <h4>{garage.name}</h4>
          <p>Vehicles in garage: {garage.vehicles.length - vehiclesOutsideGarage.length}</p>
        </Popup>
      </Marker>

      {/* Відображаємо маркери для машин поза гаражем */}
      {vehiclesOutsideGarage.map((vehicle, index) => (
        <Marker
          key={`${garage.name}-vehicle-${index}`} // Унікальний ключ для кожного маркера
          position={[vehicle.gps.latitude, vehicle.gps.longitude]}
          icon={carIcon}
        >
          <Popup>
            <h4>{vehicle.type}</h4>
          </Popup>
        </Marker>
      ))}
    </React.Fragment>
  );
})}
      </MapContainer>
      <div className="mt-8">
        <AdminCarsList garages={garages} />
      </div>
    </div>
  );
}

export default MapPage;