import L from 'leaflet';

// Створюємо іконку з SVG
const garageIcon = L.divIcon({
    html: `
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style="width: 30px; height: 30px;">
            <path d="M22 22L2 22" stroke="#1C274C" stroke-width="1.5" stroke-linecap="round"></path>
            <path d="M3 22.0001V11.3472C3 10.4903 3.36644 9.67432 4.00691 9.10502L10.0069 3.77169C11.1436 2.76133 12.8564 2.76133 13.9931 3.77169L19.9931 9.10502C20.6336 9.67432 21 10.4903 21 11.3472V22.0001" stroke="#1C274C" stroke-width="1.5" stroke-linecap="round"></path>
            <path d="M10 9H14" stroke="#1C274C" stroke-width="1.5" stroke-linecap="round"></path>
            <path d="M9 15.5H15" stroke="#1C274C" stroke-width="1.5" stroke-linecap="round"></path>
            <path d="M9 18.5H15" stroke="#1C274C" stroke-width="1.5" stroke-linecap="round"></path>
            <path d="M18 22V16C18 14.1144 18 13.1716 17.4142 12.5858C16.8284 12 15.8856 12 14 12H10C8.11438 12 7.17157 12 6.58579 12.5858C6 13.1716 6 14.1144 6 16V22" stroke="#1C274C" stroke-width="1.5"></path>
        </svg>
    `,
    className: '', // Прибираємо стандартні стилі іконки Leaflet
    iconSize: [20, 20],
    iconAnchor: [15, 30],
});

const carIcon = L.divIcon({
    html: `
     <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" style="width: 30px; height: 30px;">
            <path fill="#0078D4" stroke="#1C274C" stroke-width="1" d="M16 6l3 4h2c1.1 0 2 .9 2 2v3h-2c0 1.7-1.3 3-3 3s-3-1.3-3-3H9c0 1.7-1.3 3-3 3s-3-1.3-3-3H1v-3c0-1.1.9-2 2-2l3-4h10"/>
            <path fill="#E5E5E5" d="M10.5 7.5H6.8L4.9 10h5.6V7.5M12 7.5V10h5.1l-1.9-2.5H12"/>
            <circle cx="6" cy="15" r="1.5" fill="#1C274C"/>
            <circle cx="18" cy="15" r="1.5" fill="#1C274C"/>
        </svg>
    `,
    className: '', // Прибираємо стандартні стилі іконки Leaflet
    iconSize: [24, 24], // Розмір іконки
    iconAnchor: [12, 12], // Точка прив'язки іконки
});

export { garageIcon, carIcon };