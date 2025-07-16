import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default markers in Leaflet with Webpack
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

export default function Map({ 
    latitude = 14.5995, 
    longitude = 120.9842, 
    zoom = 15, 
    address = 'Metro Manila, Philippines',
    className = ''
}) {
    const mapRef = useRef(null);
    const mapInstanceRef = useRef(null);

    useEffect(() => {
        if (!mapRef.current || mapInstanceRef.current) return;

        // Initialize the map
        const map = L.map(mapRef.current).setView([latitude, longitude], zoom);
        mapInstanceRef.current = map;

        // Add tile layer (OpenStreetMap)
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);

        // Create custom marker icon
        const customIcon = L.divIcon({
            html: `
                <div class="relative">
                    <div class="w-8 h-8 bg-primary-600 rounded-full border-4 border-white shadow-lg flex items-center justify-center">
                        <svg class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd" />
                        </svg>
                    </div>
                    <div class="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-primary-600"></div>
                </div>
            `,
            className: 'custom-marker',
            iconSize: [32, 40],
            iconAnchor: [16, 40],
            popupAnchor: [0, -40]
        });

        // Add marker with popup
        const marker = L.marker([latitude, longitude], { icon: customIcon }).addTo(map);
        
        marker.bindPopup(`
            <div class="p-2">
                <h3 class="font-semibold text-secondary-900 mb-1">BelgicaLaw Office</h3>
                <p class="text-sm text-secondary-600">${address}</p>
                <div class="mt-2 pt-2 border-t border-secondary-200">
                    <a 
                        href="https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        class="text-primary-600 hover:text-primary-700 text-sm font-medium"
                    >
                        Open in Google Maps →
                    </a>
                </div>
            </div>
        `);

        // Cleanup function
        return () => {
            if (mapInstanceRef.current) {
                mapInstanceRef.current.remove();
                mapInstanceRef.current = null;
            }
        };
    }, [latitude, longitude, zoom, address]);

    return (
        <div className={`relative ${className}`}>
            <div 
                ref={mapRef} 
                className="w-full h-full rounded-lg shadow-lg"
                style={{ minHeight: '400px' }}
            />
            
            {/* Map overlay with office info */}
            <div className="absolute top-4 left-4 bg-white rounded-lg shadow-lg p-4 max-w-xs z-[1000]">
                <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0">
                        <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
                            <svg className="w-5 h-5 text-primary-600" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                            </svg>
                        </div>
                    </div>
                    <div>
                        <h3 className="text-sm font-semibold text-secondary-900">BelgicaLaw Office</h3>
                        <p className="text-xs text-secondary-600 mt-1">{address}</p>
                        <p className="text-xs text-secondary-500 mt-1">Click marker for directions</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
