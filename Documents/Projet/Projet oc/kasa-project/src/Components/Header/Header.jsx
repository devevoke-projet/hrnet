import React from 'react';
import Logo from "../../Assets/pictures/logoKasa.png";
import Nav from "../Nav/nav";
import "./Header.css"

const Header = () => {
    return (
        <header className="header">
            <div className="logo">
                <img src={Logo} alt="logo_Kasa"/>
            </div>
            <Nav/>
        </header>
    );
};

export default Header;