import React from "react";
import "./home.css";
import BackgroundPicture from "../../Components/Background/backgroundPicture";
import CardList from "../../Components/Card/card";
import datas from "../../Api/dataLogements.json";
import img from "../../Assets/pictures/backgroundPictureHome.png";

const Home = () => {
    return (
        <div>
            <BackgroundPicture picture={img} title={"Chez vous, partout et ailleurs"}/>
            <div className="container-list">
                {datas.map((data) => (
                    <CardList key={data.id} title={data.title} picture={data.cover} id={data.id}/>
                ))}
            </div>
        </div>
    );
};
export default Home;
