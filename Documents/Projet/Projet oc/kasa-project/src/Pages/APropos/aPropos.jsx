import React from "react";
import BackgroundPicture from "../../Components/Background/backgroundPicture";
import img from '../../Assets/pictures/backgroundPictureAPropos.png'
import Collapse from "../../Components/Collapse/collapse";
import './aPropos.css'

const APropos = () => {
    const textCollapse = "La bienveillance fait partie des valeurs fondatrices de Kasa. Tout comportement discriminatoire ou de perturbation du voisinage entraînera une exclusion de notre plateforme."
    return (
        <div>
            <BackgroundPicture picture={img}/>
            <div className="container-collapse">
                <Collapse title={"Fiabilité"} description={textCollapse}/>
                <Collapse title={"Respect"} description={textCollapse} />
                <Collapse title={"Service"} description={textCollapse}/>
                <Collapse title={"Responsabilité"} description={textCollapse}/>
            </div>
        </div>
    )
}
export default APropos