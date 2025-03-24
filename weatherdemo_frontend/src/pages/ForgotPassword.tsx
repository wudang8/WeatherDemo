import React from 'react';
import {useNavigate} from 'react-router-dom';
import styles from "../components/LoginSignup.module.css";

const ForgotPassword = () => {
    return (
        <div className={styles.page}>
            <div className={styles.container}>
                <h2 className={styles.title}>Forgot Password</h2>
            </div>
        </div>
    )
}
export default ForgotPassword
