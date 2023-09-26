import React, { useState} from "react";
import './collapse.css'

const Collapse = (collapse) => {
    const [rotate, setRotate] = useState()
    const [style, setStyle] = useState()
    const [count, setCount] = useState(0)

    const onHideCollapse = () => {
        if (count === 0) {
            setStyle("hidden")
            setRotate("chevron-rotate")
            setCount(count + 1)
        } else {
            setCount(count - 1)
            setStyle("")
            setRotate("")
        }
    }
    return (
        <div className="bloc-description">
            <div className="title" onClick={onHideCollapse}>
                <h3>{collapse.title}</h3><span className={rotate}><i
                className={"fa-solid fa-chevron-down"}></i></span>
            </div>
            {!collapse.equipement ? (
                <div className={`texte ${style}`}>
                    <p>{collapse.description}</p>
                </div>
            ) : (
                <div className={`texte  ${style}`}>
                    <ul>
                        {collapse.equipement.map((equip, i) => (
                            <li key={i}>{equip}</li>
                        ))
                        }
                    </ul>
                </div>
            )}
        </div>
    )
}
export default Collapse