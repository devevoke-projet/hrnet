import React, {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import datas from "../../Api/dataLogements.json"
import Carousel from "../../Components/Carousel/carousel";
import "./detailLogement.css"
import Collapse from "../../Components/Collapse/collapse";
import Star from "../../Components/Star/star";
import PageNotFound from "../PageNotFound/pageNotFound";

const DetailLogement = () => {
    const params = useParams()
    const [logement, setLogement] = useState(null);
    useEffect(() => {
        datas.forEach(data => {
            if (params.id === data.id) {
                setLogement(data);
            }
        })
    }, [params.id]);

    return (
        <div className="container-detail">
            {logement ? (
                <div>
                    <Carousel pictures={logement.pictures}/>
                    <div className="container-detail">
                        <div className="container-title">
                            <div className="content-head">
                                <div className="detail-title">
                                    <h2>{logement.title}</h2>
                                    <p>{logement.location}</p>
                                </div>
                                <div className="detail-tag">
                                    {logement.tags.map((tag, i) => (
                                        <div key={i}><span>{tag}</span></div>
                                    ))}
                                </div>
                            </div>
                            <div className="content-profil">
                                <div className="img-profil">
                                    <div className="box-profil">
                                        <p className="profil-name">
                                            {logement.host.name}
                                        </p>
                                        <img src={logement.host.picture} alt=""/>
                                    </div>
                                    <Star star={logement.rating}/>
                                </div>
                            </div>
                        </div>
                        <div className="container-description">
                            <div className="collapse">
                                <Collapse description={logement.description} title={"Description"}/>
                            </div>
                            <div className="collapse">
                                <Collapse equipement={logement.equipments} title={"Équipement"}/>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <PageNotFound/>
            )}
        </div>
    )
}
export default DetailLogement


