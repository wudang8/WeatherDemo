import axiosInstance from "./axiosInstance";

// Logout function
export const logout = async() => {
    try {
        await axiosInstance.post("/auth/logout", {}, {
            withCredentials: true
        });

        // Clear local storage jwt token
        localStorage.removeItem("jwt");

        window.location.href = "/login";
    } catch (error) {
        console.error("Logout failed: " + error);
        //Still clear everything if fails
        localStorage.removeItem("jwt");
        window.location.href = "/login";
    }
};
