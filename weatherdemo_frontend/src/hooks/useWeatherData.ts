import {useGeolocation} from "./useGeolocation";
import {useEffect, useState} from "react";
import axiosInstance from "../api/axiosInstance";
import {useNavigate} from "react-router-dom";
import {Coordinates} from "../api/geoLocation";

export interface Weather {
    temperature_2m: number;
    relativehumidity_2m: number;
    precipitation_probability: number;
}

export const useWeatherData = (location: Coordinates | null) => {
    const [weather, setWeather] = useState<Weather | null>(null);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchWeatherData = async () => {
            if (!location) {
                return;
            }
            try {
                console.log(location.lat + " " + location.lon);
                const response = await axiosInstance.post("/weather", {
                    latitude: location.lat,
                    longitude: location.lon,
                });
                setWeather(response.data);
            } catch (error: any) {
                console.error(error);
                setError("Weather could not be found.");
            }
        };
        fetchWeatherData();
    }, [location])
    return {weather, error};
}