import React from 'react'
import './navbar.css'
import { Link } from 'react-scroll';


const Navbar = () => {
    return (
        <nav className="navbar">
    <div class="logo">lynette</div>
    <div className="desktopMenu">
                <Link className="desktopMenuListItem">home</Link>
                <Link className="desktopMenuListItem">about</Link>
                <Link className="desktopMenuListItem">skills</Link>
                <Link className="desktopMenuListItem">projects</Link>
            </div>
        </nav>
    )
}
export default Navbar