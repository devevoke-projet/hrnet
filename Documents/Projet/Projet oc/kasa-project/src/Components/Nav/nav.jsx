import React from 'react';
import "./nav.css"
import {NavLink} from "react-router-dom"

const Nav = () => {
    let activeStyle = {
        textDecoration: "underline",
    };

    return (
        <nav className="nav-bar">
            <ul>
                <li><NavLink to="/" style={({isActive}) =>
                    isActive ? activeStyle : undefined
                }>Accueil</NavLink></li>
                <li><NavLink to="/a_propos" style={({isActive}) =>
                    isActive ? activeStyle : undefined
                }>A propos </NavLink></li>
            </ul>
        </nav>
    );
};
export default Nav;