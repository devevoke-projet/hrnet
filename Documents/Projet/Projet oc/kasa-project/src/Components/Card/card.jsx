import React from "react";
import "./card.css"
import {useNavigate} from "react-router-dom";

const CardList = (data) => {
    const navigate = useNavigate()
    const goToDetailLogement = (id) => {
        navigate(`/logement/${id}`)
    }
    return (
        <div>
            <article className="card" onClick={() => goToDetailLogement(data.id)}>
                <div className="card-image">
                    <img src={data.picture} alt=""/>
                </div>
                <div className="card-filter"></div>
                <div className="card-title">
                    <h2>{data.title}</h2>
                </div>
            </article>
        </div>
    )
}
export default CardList