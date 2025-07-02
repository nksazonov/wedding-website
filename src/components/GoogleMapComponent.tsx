'use client';

import { useState } from 'react';
import { GoogleMap, Marker, InfoWindow } from '@react-google-maps/api';

interface GoogleMapComponentProps {
  className?: string;
}

export default function GoogleMapComponent({ className }: GoogleMapComponentProps) {
  const [showInfoWindow, setShowInfoWindow] = useState(true); // Open by default

  const position = { lat: 50.37837846548359, lng: 30.47600069307373 };

  return (
    <div className={className}>
      <GoogleMap
        mapContainerStyle={{ width: '100%', height: '300px' }}
        center={position}
        zoom={15}
        options={{
          streetViewControl: false,
          zoomControl: true,
          gestureHandling: 'cooperative',
        }}
      >
        <Marker
          position={position}
          title="РАГС №1 на ВДНГ"
          onClick={() => setShowInfoWindow(true)}
        />
        {showInfoWindow && (
          <InfoWindow
            position={position}
            onCloseClick={() => setShowInfoWindow(false)}
          >
            <div className="p-2 pt-0">
              <h3 className="font-bold text-lg mb-2 font-[Cormorant_Infant]">РАГС №1 на ВДНГ</h3>
              <p className="text-sm mb-2 font-[Inter]">Павільйон №8, права сторона головної алеї</p>
              <a
                href="https://maps.app.goo.gl/ScUTV2wHKLngpfT78"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 underline text-sm font-[Inter]"
              >
                Відкрити в Google Maps
              </a>
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
    </div>
  );
}