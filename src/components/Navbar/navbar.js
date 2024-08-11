import React from 'react';
import { Link as ScrollLink } from 'react-scroll';
import './navbar.css'; 

const Navbar = () => {
    return (
        <nav className="navbar">
            <div className="logo">lynette</div>
            <div className="desktopMenu">
                <ScrollLink className="desktopMenuListItem" to="text" smooth={true} duration={500}>home</ScrollLink>
                <ScrollLink className="desktopMenuListItem" to="intro" smooth={true} duration={500}>about</ScrollLink>
                <ScrollLink className="desktopMenuListItem" to="projects" smooth={true} duration={500}>projects</ScrollLink>
            </div>
        </nav>
    );
}

export default Navbar;
