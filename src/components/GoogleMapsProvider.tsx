'use client';

import { LoadScript } from '@react-google-maps/api';
import LoadingSpinner from './LoadingSpinner';

interface GoogleMapsProviderProps {
  children: React.ReactNode;
}

export default function GoogleMapsProvider({ children }: GoogleMapsProviderProps) {
  return (
    <LoadScript 
      googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY!}
      loadingElement={<LoadingSpinner />}
    >
      {children}
    </LoadScript>
  );
}