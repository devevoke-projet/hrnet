import React from "react";
import './backgroundPicture.css'

const BackgroundPicture = (background) => {
    return (
        <div className="background-container">
            <div className="background-img">
                <img src={background.picture} alt=""/>
                <div className="background-filter">
                </div>
                <p className="background-title">{background.title}</p>
            </div>
        </div>
    )
}
export default BackgroundPicture




