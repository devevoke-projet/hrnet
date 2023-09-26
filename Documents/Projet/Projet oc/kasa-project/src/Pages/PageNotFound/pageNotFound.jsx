import React from "react";
import './pageNotFound.css'
import {Link} from "react-router-dom";

const PageNotFound = () => {
    return (
        <div className="containeur-404">
            404
            <p className="erreur-text">Oups! La page que vous demandez n'existe pas.</p>
            <Link to="/" className="link-erreur">
                Retourner sur la page d’accueil
            </Link>
        </div>)
}
export default PageNotFound