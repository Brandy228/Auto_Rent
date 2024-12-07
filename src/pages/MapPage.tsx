// MapPage.tsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import MarkerClusterGroup from 'react-leaflet-markercluster';
//import 'react-leaflet-markercluster/dist/styles.css'; // Стилі для кластеру
import { Garage } from '../models/garage/Garage';
import AdminCarsList from '../components/AdminCarList.tsx';
import { Car } from '../models/garage/vehicle/Car';
import { carIcon } from '../icons/CarIcon.tsx';
import { garageIcon } from '../icons/GarageIcon.tsx';
import { calendarIcon } from '../icons/CalendarIcon.tsx';
import BackToHome from '../components/BackToHome.tsx';

interface MapPageProps {
  garages: Garage[];
}

const MapPage: React.FC<MapPageProps> = ({ garages }) => {
  const navigate = useNavigate();


  return (
    <div className="map-page">
      <div className="flex justify-between items-center p-4">
        <BackToHome />
      </div>

      <MapContainer center={[49.2328, 28.4815]} zoom={6} style={{ height: '500px', width: '100%' }}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        <MarkerClusterGroup>
          {/* Маркери Гаражів */}
          {garages.map((garage) => {

const vehiclesOutsideGarage = garage.vehicles.filter(
  (vehicle) =>
    vehicle.gps.latitude !== garage.address.latitude ||
    vehicle.gps.longitude !== garage.address.longitude
);

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
              //key={`car-${car.id}-${index}`} // Унікальний ключ
              position={[car.gps.latitude, car.gps.longitude]}
              icon={carIcon}
            >
              <Popup>
                <h4>{car.type}</h4>
                <p>License Plate: {car.details.license_plate}</p>
              </Popup>
            </Marker>
          ))}
        
        </React.Fragment>
      )}
        )}</MarkerClusterGroup>
      </MapContainer>

      <div className="mt-8">
        <AdminCarsList garages={garages} />
      </div>
    </div>
  );
}

export default MapPage;