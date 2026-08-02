import React, { useState } from 'react';
import { Link as ScrollLink } from 'react-scroll';
import './navbar.css'; 

const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => setMenuOpen(!menuOpen);

    return (
        <nav className="navbar">
            <div className="logo">lynette</div>

            <div className="hamburger-menu" onClick={toggleMenu}>
                &#9776;
            </div>

            <div className={`desktopMenu ${menuOpen ? "show" : ""}`}>
                <ScrollLink className="desktopMenuListItem" to="text" smooth={true} duration={500} offset={-64} onClick={() => setMenuOpen(false)}>home</ScrollLink>
                <ScrollLink className="desktopMenuListItem" to="intro" smooth={true} duration={500} offset={-64} onClick={() => setMenuOpen(false)}>about</ScrollLink>
                <ScrollLink className="desktopMenuListItem" to="projects" smooth={true} duration={500} offset={-64} onClick={() => setMenuOpen(false)}>projects</ScrollLink>
            </div>
        </nav>
    );
}

export default Navbar;
