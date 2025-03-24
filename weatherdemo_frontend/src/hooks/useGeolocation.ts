import { useState, useEffect } from 'react';
import {getCurrentLocation, Coordinates} from "../api/geoLocation";

export const useGeolocation = (overrideLocation: Coordinates | null) => {
    const [location, setLocation] = useState<Coordinates | null>(null);
    const [error, setError] = useState('');

    useEffect(() => {
        if (overrideLocation) {
            console.log("Geolocation location changed successfully.");
            setLocation(overrideLocation);
            setError('');
            return;
        }
        const fetchLocation = async() => {
            try {
                const coords = await getCurrentLocation();
                console.log('Coords: ', coords);
                setLocation(coords);
                setError('');
            } catch (error: any) {
                console.error(error);
                setError(error.message);
            }
        };
        fetchLocation();
    }, [overrideLocation]);

    return {location, error};
};
