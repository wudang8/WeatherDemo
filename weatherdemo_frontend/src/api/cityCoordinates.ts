import axiosInstance from "./axiosInstance";
import {Coordinates} from "./geoLocation";

export const getCoordinatesFromCity = async (city: string): Promise<Coordinates> => {
    try {
        console.log("CITY " + city);
        const response = await axiosInstance.post("/city",
        {
            city
        });
        if (response.data && response.data.name && response.data.name.length > 0) {
            const lat = response.data.latitude;
            const lon = response.data.longitude;
            return {lat, lon};
        } else {
            throw new Error("No results found for city");
        }
    } catch (error: any) {
        console.error("Error fetching coordinates", error);
        throw new Error("Failed looking up coordinates for city.");
    }
};