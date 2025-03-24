import React, {FormEvent, useState} from 'react';
import axiosInstance from "../api/axiosInstance";
import {useNavigate} from 'react-router-dom';
import styles from "../components/LoginSignup.module.css";

const Login = () => {
    const[email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState('');

    const handleLogin = async (e: FormEvent) => {
        e.preventDefault();
        try {
            const response = await axiosInstance.post("/auth/login", {
                    email, password
                }, {
                    withCredentials: true
                });

            const accessToken = response.data.jwtAccessToken;
            const role = response.data.role;
            console.log("Login response:", accessToken);
            console.log("ROLE:", role);
            localStorage.setItem('jwt', accessToken);
            localStorage.setItem('role', role);
            navigate('/members');
        } catch (error: any) {
            console.error(error);
            setErrorMessage('Email or password is invalid.');
        }
    };

    const handleForgotPassword = () => {
        navigate('/forgot-password');
    }

    const handleRegister = () => {
        navigate('/signup');
    }

    return (
        <div className={styles.page}>
            <div className={styles.container}>
                <h2 className={styles.title}>Login</h2>
                {
                    errorMessage.length > 0 && (
                        <div className="alert alert-danger">
                            {errorMessage}
                        </div>
                    )
                }
                <form onSubmit={handleLogin}>
                    <div className={styles.inputs}>
                        <div className="mb-3">
                            <label className="form-label" htmlFor="email">Email address</label>
                            <input
                                type="email"
                                className="form-control"
                                id="email"
                                placeholder="Email address"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label" htmlFor="password">Password</label>
                            <input
                                type="password"
                                className="form-control"
                                id="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                    </div>
                    <div className={styles.button}>
                        <button className="btn btn-primary" type="submit">Login</button>
                    </div>
                </form>
                <label className={styles.notice}>Forgot password?
                    <span onClick={handleForgotPassword}> Click Here.</span>
                </label>
                <label className={styles.notice}>Don't have an account? Create one
                    <span onClick={handleRegister}> here.</span>
                </label>
            </div>
        </div>
    )
}
export default Login
