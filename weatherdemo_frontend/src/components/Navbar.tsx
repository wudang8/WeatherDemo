import React, {ReactNode, useEffect, useRef, useState} from 'react'
import { logout } from '../api/authAPI'
import {useNavigate} from "react-router-dom";
import './Navbar.css';
import {BsList} from 'react-icons/bs';


interface Props {
    children: ReactNode;
}

const Navbar = ({children}: Props) => {
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();
    const dropdownRef = useRef<HTMLDivElement>(null);

    const toggleMenu = () => {
        setIsOpen(prev => !prev);
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        }

        // Event listener for mouse click
        document.addEventListener('mousedown', handleClickOutside);

        // Clean up
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleLogout = () => {
        logout();
    };

    return (
        <nav className="navbar-container">
            <a className="navbar-brand">{children}</a>

            <button className="navbar-toggle" type="button" onClick={toggleMenu}>
                <BsList size={35} />
            </button>

            <div ref={dropdownRef} className={`dropdown-menu ${isOpen ? 'show' : ''}`}>
                <a href="/src/pages/Members" className="dropdown-item">Dashboard</a>
                <button onClick={handleLogout} className="dropdown-item logout-btn">Logout</button>
            </div>
        </nav>
    )
}
export default Navbar
