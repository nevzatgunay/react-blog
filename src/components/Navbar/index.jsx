import React from 'react';
import { Link } from 'react-router-dom'; 

const Navbar = () => {
    return (
        <ul>
                <li>
                    <Link to="/">Root Page</Link>
                </li>
                <li>
                    <Link to="/about">About Page</Link>
                </li>
                <li>
                    <Link to="/home">Home Page</Link>
                </li>
            </ul>
    );
};

export default Navbar;