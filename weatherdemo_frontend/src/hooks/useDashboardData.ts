import axiosInstance from "../api/axiosInstance";
import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";

export const useDashboardData = () => {
    const navigate = useNavigate();
    const [message, setMessage] = useState('');

    useEffect(()=> {
        const jwt = localStorage.getItem('jwt');
        if (!jwt) {
            console.log("No access token in members");
            // Missing token, return back to Login
            navigate('/login');
            return;
        }

        const role = localStorage.getItem('role');
        // Set endpoint according to role
        const endpoint = role === "ROLE_ADMIN" ? "/admin/dashboard" : "/user/dashboard";
        // Get dashboard if jwt passes
        axiosInstance.get(endpoint, {
            headers: {
                "ngrok-skip-browser-warning": "true"
            }
        })
            .then((response) => {
                setMessage(response.data);
            })
            .catch((error) => {
                console.error("Dashboard fetch failed:" + error);
            });
    }, [])

    return {message};
};