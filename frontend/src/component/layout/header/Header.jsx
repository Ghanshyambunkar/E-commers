import { useState } from "react";
import "./Header.css";
import { GiHamburgerMenu } from "react-icons/gi";
import { CgProfile } from "react-icons/cg";
import { FaSearch } from "react-icons/fa";
import { IoCart } from "react-icons/io5";

import logo from './logo.png';

const Header = () =>{
    const [showMenu, setShowMenu] = useState(false);

    const handleButtonToggle = () =>{
        setShowMenu(!showMenu);
    };
    
    return (
        <header>
            <div className="container">
                <div className="grid navbar-grid">
                    <div className="logo">
                        <img src={logo} alt="Logo" style={{ height: '110px', width: 'auto' }} />
                    </div>
                    
                    <nav className={showMenu ? "menu-mobile" : "menu-web"}>
                        <ul>
                            <li><a href="/"> Home</a></li>
                            <li><a href="/products">Product</a></li>
                            <li><a href="#">Contact</a></li>
                            <li><a href="#">About</a></li>
                            <li><FaSearch /></li>
                            <li><IoCart /></li>
                            <li><CgProfile /></li>
                        </ul>
                    </nav>

                    <div className="ham-menu">
                        <button onClick={handleButtonToggle}>
                        <GiHamburgerMenu />
                        </button>
                    </div>
                </div>
            </div>
        </header>
    );
}

export default Header;