import React from 'react'
import {Navigate, Outlet} from "react-router-dom";

const ProtectedRoute = () => {
    const jwt = localStorage.getItem("jwt");

    // If no jwt token, then navigate back to Login page
    if (!jwt) {
        return <Navigate to="/login" replace />;
    }

    // If all looks good, continue the route
    return <Outlet />;
}
export default ProtectedRoute;
