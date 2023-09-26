import React from "react";
import "./star.css"

const Star = ({star}) => {
    const nbEtoiles = parseInt(star);
    const etoiles = Array(nbEtoiles).fill().map((_, index) => (
        <span key={index}><i className="fa-solid fa-star"></i></span>
    ));

    const nbEtoilesFix = parseInt("5")
    const etoileFix = Array(nbEtoilesFix).fill().map((_, index) => (
        <span key={index}><i className="fa-solid fa-star"></i></span>
    ));

    return (
        <div className="box-star ">
            <span className="etoiles">{etoiles}</span>
            <span className="etoiles-fix">
            {etoileFix}
            </span>
        </div>
    )
}
export default Star;