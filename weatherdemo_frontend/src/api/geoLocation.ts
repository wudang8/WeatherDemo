export interface Coordinates {
    lat: number;
    lon: number;
}

export const getCurrentLocation = (): Promise<Coordinates> => {
    return new Promise((resolve, reject) => {
        if (!navigator.geolocation) {
            reject(new Error("Geolocation is not supported by your browser."));
            return;
        }
        
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const lat = position.coords.latitude;
                const lon = position.coords.longitude;
                resolve({lat, lon});
            },
            (error) => {
                reject(new Error("Unable to get current location."));
            }
        );
    });
};