import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: "https://snail-fond-visually.ngrok-free.app/api",
    withCredentials: true
});

axiosInstance.interceptors.request.use(
    (request) => {
        const jwt = localStorage.getItem('jwt');

        if(jwt) {
            request.headers.Authorization = "Bearer " + jwt;
        }

        return request;
    },
    (error) => {
        return Promise.reject(error);
    }
);

axiosInstance.interceptors.response.use(
    (response) => response,
    async(error) => {
        const originalRequest = error.config;

        if(error.response && error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                console.log("Attempting to refresh token");
                const res = await axios.post(
                    "https://snail-fond-visually.ngrok-free.app/api/auth/refresh-token",
                    {}, {
                        withCredentials: true
                    });
                console.log("Refresh token successfully.");

                const newAccessToken = res.data.jwtAccessToken;
                localStorage.setItem('jwt', newAccessToken);

                originalRequest.headers.Authorization = "Bearer " + newAccessToken;
                return axiosInstance(originalRequest);
            } catch (refreshError) {
                console.error(refreshError);
                localStorage.removeItem('jwt');
                //window.location.href = "/login";
            }
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;

