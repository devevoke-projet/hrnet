import React from "react";
import { Routes, Route } from "react-router-dom";
import ListEmployee from "../Pages/ListEmployee/ListEmployee";
import CreateEmployee from "../Pages/CreateEmployee/CreateEmployee";

const RouteApp = () => {
  return (
    <Routes>
      <Route path="/" element={<CreateEmployee />} />
      <Route path="/list" element={<ListEmployee />} />
    </Routes>
  );
};
export default RouteApp;
