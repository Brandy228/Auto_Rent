import L from 'leaflet';

// Створюємо іконку з SVG
const  CarIconRed = L.divIcon({
    html: `
     <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" style="width: 30px; height: 30px;">
            <path fill="#FF0000" stroke="#1C274C" stroke-width="1" d="M16 6l3 4h2c1.1 0 2 .9 2 2v3h-2c0 1.7-1.3 3-3 3s-3-1.3-3-3H9c0 1.7-1.3 3-3 3s-3-1.3-3-3H1v-3c0-1.1.9-2 2-2l3-4h10"/>
            <path fill="#E5E5E5" d="M10.5 7.5H6.8L4.9 10h5.6V7.5M12 7.5V10h5.1l-1.9-2.5H12"/>
            <circle cx="6" cy="15" r="1.5" fill="#1C274C"/>
            <circle cx="18" cy="15" r="1.5" fill="#1C274C"/>
        </svg>
    `,
    className: '', // Прибираємо стандартні стилі іконки Leaflet
    iconSize: [24, 24], // Розмір іконки
    iconAnchor: [12, 12], // Точка прив'язки іконки
});

export { CarIconRed };