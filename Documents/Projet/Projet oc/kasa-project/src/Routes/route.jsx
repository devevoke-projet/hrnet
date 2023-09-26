import React from 'react';
import {Routes, Route} from "react-router-dom";
import DetailLogement from "../Pages/DetailLogement/detailLogement";
import PageNotFound from "../Pages/PageNotFound/pageNotFound";
import APropos from "../Pages/APropos/aPropos";
import Home from '../Pages/Home/home';

const RouteApp = () => {
    return (
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/a_propos" element={<APropos/>}/>
            <Route path="/logement/:id" element={<DetailLogement id={""}/>}/>
            <Route path="/*" element={<PageNotFound/>}/>
        </Routes>
    )
}
export default RouteApp

