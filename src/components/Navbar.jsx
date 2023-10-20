import React, { useState, useRef } from "react";
import MenuIcon from '@mui/icons-material/Menu';
import ClearIcon from '@mui/icons-material/Clear';

function Navbar() {

const [isNavOpen, setIsNavOpen] = useState(false);
const navRef = useRef();

const toggleNavbar = () => {
    setIsNavOpen(!isNavOpen);
    navRef.current.classList.toggle("responsive-nav");
}

return (
    <header className="navbar">
        <img className="logo" src="./pillarlogo.png" alt="logo" />
        <nav className="nav-items" ref={navRef}>
            <a href="/#">Home</a>
            <a href="/#">Service</a>
            <a href="/#">About Us</a>
            <a href="/#">Account</a>
            {isNavOpen && 
                <button className="nav-btn nav-close-btn" onClick={toggleNavbar}>
                    <ClearIcon />
                </button>
            }
        </nav>
        {!isNavOpen &&
            <button className="nav-btn" onClick={toggleNavbar}>
                <MenuIcon/>
            </button>
        }
    </header>
);
}

export default Navbar;