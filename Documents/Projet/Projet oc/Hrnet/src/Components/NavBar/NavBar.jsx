import React from "react";
import logo from "../../Assets/logo-wh.webp";
import "./NavBar.css";
import {Link} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCirclePlus, faTableList} from "@fortawesome/free-solid-svg-icons";

const NavBar = () => {
    return (
        <div className="container-navBar">
            <div className="logo">
                <img src={logo} alt="logo-weart"/>
            </div>
            <div className="nav-bar">
                <ul>
                    <li>
                        <Link to="/">
                            {" "}
                            <FontAwesomeIcon className="icon-bar" icon={faCirclePlus}/>
                            Create employees
                        </Link>
                    </li>
                    <li>
                        <Link to="/list">
                            {" "}
                            <FontAwesomeIcon className="icon-bar" icon={faTableList}/>
                            List Employees
                        </Link>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default NavBar;
