import React, {FormEvent, useState} from 'react';
import axiosInstance from "../api/axiosInstance";
import styles from '../components/LoginSignup.module.css';
import {useNavigate} from "react-router-dom";

const Signup = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const handleSignup = async (e: FormEvent) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setErrorMessage('Passwords do not match');
        } else {
            try {
                const response = await axiosInstance.post("/auth/signup",
                    {
                        email, password
                    });
                const token = response.data;
                console.log("Signup response:", token);
                navigate("/success");
            } catch (error: any) {
                console.error(error);
                if (error.response.status === 409) {
                    setErrorMessage("User already exists.");
                } else {
                    setErrorMessage("An unexpected error occurred.");
                }
            }
        }
    }
    const handleBack = () => {
        navigate('/login');
    }

    return (
        <div className={styles.page}>
            <div className={styles.container}>
                <h2 className={styles.title}>Sign Up</h2>
                {
                    errorMessage.length > 0 && (
                        <div className="alert alert-danger">
                            {errorMessage}
                        </div>
                    )
                }
                <form onSubmit={handleSignup}>
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
                        <div className="mb-3">
                            <label className="form-label" htmlFor="confirmPassword">Confirm Password</label>
                            <input
                                type="password"
                                className="form-control"
                                id="confirmPassword"
                                placeholder="Confirm Password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                            />
                        </div>
                    </div>
                    <div className={styles.button}>
                        <button className="btn btn-primary" type="submit">Submit</button>
                    </div>
                </form>
                <label className={styles.notice}><span onClick={handleBack}>Back</span></label>
            </div>
        </div>
    )
}
export default Signup
