import React from 'react'
import{useJsApiLoader, GoogleMap, Marker } from '@react-google-maps/api'
import car from '../../public/carimage.png'

export default function Mapcontainer() {
    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: import.meta.env.VITE_GOOGLE_API_KEY,
        libraries: ['places'],
    });

    const center = { lat: 42.0267, lng: -93.6465 };

    return isLoaded ? (
        <GoogleMap
            mapContainerStyle={{ width: '100%', height: '400px' }}
            center={center}
            zoom={15}
        >
            <Marker position={center} icon={{url: car, scaledSize: new window.google.maps.Size(80, 80)}}/>
        </GoogleMap>
    ) : <></>;
}
