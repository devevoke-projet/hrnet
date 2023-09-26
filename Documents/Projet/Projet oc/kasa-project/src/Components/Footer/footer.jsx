import React from 'react';
import logoFooter from "../../Assets/pictures/logoFooter.png"
import "./footer.css"

const Footer = () => {
    return (
        <footer>
            <div className="footer-container">
                <div className="footer-logo">
                    <img src={logoFooter} alt="Logo_kasa_blanc"/>
                </div>
                <div className="coopering">
                    <p>© 2020 Kasa. All rights reserved</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;