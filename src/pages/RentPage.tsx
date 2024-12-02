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
import DataRangePicker from '../components/DataRangePicker.tsx';


const RentPage = () => {
  const navigate = useNavigate(); // Для навігації

  return (
    <div className="rent-page">
      <div className="flex justify-between items-center p-4">
        <BackToHome/>
        <DataRangePicker/>
      </div>
      </div>
  );
}

export default RentPage;