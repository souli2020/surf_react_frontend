import React, { useContext, useState } from 'react';

import { Link, Outlet, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/LogContext'

function RouterLayout() {
    const navigate = useNavigate();
    const { isLogged, setLogged } = useContext(AuthContext);


    return (
        <div className="container">
            <header>
                <nav className="navbar">
                    <ul className="navbar-list">
                        <li className="navbar-item">
                            <Link to="/" className="navbar-link">Home</Link>
                        </li>

                        {!isLogged && <>
                            <li className="navbar-item">
                                <Link to="/register" className="navbar-link">Register</Link>
                            </li>
                            <li className="navbar-item">
                                <Link to="/login" className="navbar-link">Login</Link>
                            </li>
                        </>}

                        {isLogged && <>
                            <li className="navbar-item">
                                <Link to="/profile" className="navbar-link">Profile</Link>
                            </li>
                            <li className="navbar-item">
                                <Link to="/posts" className="navbar-link">Posts</Link>
                            </li>
                            <li className="navbar-item">
                                <Link to="/logout" className="navbar-link">Logout</Link>
                            </li>
                        </>}
                    </ul>
                </nav>
            </header>
            <div className="content">
                <Outlet />
            </div>
        </div>
    );
}
export default RouterLayout