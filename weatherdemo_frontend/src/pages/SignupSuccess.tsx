import React, {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import styles from "../components/LoginSignup.module.css";

const SignupSuccess = () => {
    const navigate = useNavigate();
    const [count, setCount] = useState(10);

    useEffect(() => {
        const interval = setInterval(() => {
            setCount((prev) => prev - 1);
        }, 1000);

        const timer = setTimeout(() => {
            navigate('/login');
        }, 10000);

        //Cleanup
        return () => {
            clearInterval(interval);
            clearTimeout(timer);
        };
    }, [navigate]);

    const handleManualRedirect = () => {
        navigate('/login');
    };

    return (
        <div className={styles.page}>
            <div className={styles.container}>
                <h3 className={styles.success}>Registration Successful!</h3>
                <p className={styles.success}>You will be redirected to the login page in {count} seconds.</p>
                <label className={styles.notice}>Click
                    <span onClick={handleManualRedirect}> here </span> if you are not redirect.
                </label>
            </div>
        </div>
    )
}

export default SignupSuccess
