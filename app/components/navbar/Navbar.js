// src/components/Navbar.js
import React, { useState } from 'react';
import styles from "./navbar.module.css" // Import the CSS module

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div>
            <nav className={styles['navbar']}>
                <div className={styles['navbarTitle']}>
                    JJ&nbsp;<a style={{ backgroundColor: 'red', color: 'white', padding: '3px 14px 3px 10px' }}>Express</a>
                </div>

                <button className={styles['navbarToggle']} onClick={toggleSidebar}>
                    {isOpen ? (
                        <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 50 50">
                            <path d="M 7.71875 6.28125 L 6.28125 7.71875 L 23.5625 25 L 6.28125 42.28125 L 7.71875 43.71875 L 25 26.4375 L 42.28125 43.71875 L 43.71875 42.28125 L 26.4375 25 L 43.71875 7.71875 L 42.28125 6.28125 L 25 23.5625 Z"></path>
                        </svg>
                    ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 50 50">
                            <path d="M 0 9 L 0 11 L 50 11 L 50 9 Z M 0 24 L 0 26 L 50 26 L 50 24 Z M 0 39 L 0 41 L 50 41 L 50 39 Z"></path>
                        </svg>
                    )}
                </button>
                <ul className={`${styles['navbarLinks']} ${isOpen ? styles['open'] : ''}`}>
                    <li>Politics</li>
                    <li>Business</li>
                    <li>Sports</li>
                    <li>Jobs</li>
                    <li>Karnataka</li>
                    <li>India</li>
                </ul>
            </nav>
            {isOpen && (
                <div className={`${styles['sidebar']} ${isOpen ? styles['open'] : ''}`}>
                    <ul className={styles['sidebarLinks']}>
                        <li>Politics</li>
                        <li>Business</li>
                        <li>Sports</li>
                        <li>Jobs</li>
                        <li>Karnataka</li>
                        <li>India</li>
                    </ul>
                </div>
            )}
        </div>
    );
};

export default Navbar;