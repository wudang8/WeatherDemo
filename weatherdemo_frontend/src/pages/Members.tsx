import React, {useState} from 'react';
import Navbar from "../components/Navbar";
import {useDashboardData} from "../hooks/useDashboardData";
import {useGeolocation} from "../hooks/useGeolocation";
import {useWeatherData} from "../hooks/useWeatherData";
import styles from "../components/LoginSignup.module.css";
import {getCoordinatesFromCity} from "../api/cityCoordinates";
import {Coordinates} from "../api/geoLocation";

const Members = () => {
    const [overrideLocation, setOverrideLocation] = useState<Coordinates | null>(null);
    const {message} = useDashboardData();
    const {location, error: geoError} = useGeolocation(overrideLocation);
    const {weather, error: weatherError} = useWeatherData(location);
    const [searchCity, setSearchCity] = useState('');
    const [searchError, setSearchError] = useState('');

    const handleCitySearch = async() => {
        try {
            const cityCoords = await getCoordinatesFromCity(searchCity);
            console.log("Search city coordinates: " + cityCoords.lat + " " + cityCoords.lon);
            setOverrideLocation(cityCoords);
            setSearchError('');
        } catch (error: any) {
            console.error(error);
            setSearchError("Failed to fetch city coordinates.");
        }
    }

    return (
        <>
            <Navbar>
                <h2>Dashboard</h2>
            </Navbar>
            <div className="container mt-5">
                <h1>{message}</h1>
                {geoError && <p>{geoError}</p>}
                {
                    location && (
                        <div className="geo-container">
                            <h4>Geolocation</h4>
                            <p><strong>Latitude: </strong>{location.lat}</p>
                            <p><strong>Longitude: </strong>{location.lon}</p>
                        </div>
                    )
                }
                {weatherError && <p>{weatherError}</p>}
                {weather && (
                    <div className="weather-container">
                        <h4>Current Local Weather</h4>
                        <p><strong>Temperature: </strong>{weather.temperature_2m}°C</p>
                        <p><strong>Humidity: </strong>{weather.relativehumidity_2m}%</p>
                        <p><strong>Precipitation: </strong>{weather.precipitation_probability}%</p>

                    </div>
                )}
                <h4>Search Weather by City</h4>
                <div className="city-search">
                    <input
                        type="test"
                        className="form-control"
                        placeholder="Enter city name"
                        value={searchCity}
                        onChange={(e) => setSearchCity(e.target.value)}
                    />
                    <button className="btn btn-primary mt-2" type="button" onClick={handleCitySearch}>
                        Search
                    </button>
                    {
                        searchError && (
                            <div className="alert alert-danger">
                                {searchError}
                            </div>
                        )
                    }
                </div>
            </div>
        </>
    )
}
export default Members
