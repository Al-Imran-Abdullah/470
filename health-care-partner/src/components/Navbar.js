import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import logo from '../images/logo.png'
import useAuth from '../hooks/useAuth';

const Navbar = () => {

    const { user } = useAuth()

    const activeStyles = {
        backgroundColor: '#0067ff',
        color: '#fff',
        fontSize: '14px',
        borderRadius: '6px'
    }

    const defaultStyles = {
        fontSize: '14px',
    }

    return (
        <nav className="navbar navbar-expand-lg custom-navbar">
            <div className="container">
                <Link className="navbar-brand" to="/"><img width={40} src={logo} alt="logo" /></Link>

                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <div className="navbar-nav ms-auto text-center">
                        <NavLink className="nav-link mx-2 my-1" onClick={() => { window.scrollTo(0, 0); }} style={({ isActive }) => (isActive ? activeStyles : defaultStyles)} to="/profile">Profile</NavLink>
                        <NavLink className="nav-link mx-2 my-1" onClick={() => { window.scrollTo(0, 0); }} style={({ isActive }) => (isActive ? activeStyles : defaultStyles)} to="/self-care">Self Care</NavLink>
                        <NavLink className="nav-link mx-2 my-1" onClick={() => { window.scrollTo(0, 0); }} style={({ isActive }) => (isActive ? activeStyles : defaultStyles)} to="/mental-health">Mental Health</NavLink>
                        <NavLink className="nav-link mx-2 my-1" onClick={() => { window.scrollTo(0, 0); }} style={({ isActive }) => (isActive ? activeStyles : defaultStyles)} to="/contact">Contact</NavLink>
                        {
                            !user.email &&
                            <NavLink className="nav-link mx-2 my-1" onClick={() => { window.scrollTo(0, 0); }} style={({ isActive }) => (isActive ? activeStyles : defaultStyles)} to="/login">Login</NavLink>
                        }

                        <NavLink className="nav-link mx-2 my-1" onClick={() => { window.scrollTo(0, 0); }} style={({ isActive }) => (isActive ? activeStyles : defaultStyles)} to="/settings">Settings</NavLink>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;