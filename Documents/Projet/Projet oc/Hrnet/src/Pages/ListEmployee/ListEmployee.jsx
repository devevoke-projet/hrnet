import React from "react";
import "./ListEmployee.css";
import Table from "../../Components/Table/Table";
import {useSelector} from "react-redux";

const ListEmployee = () => {
    const dataEmployee = useSelector((state) => state.employeeStore.employee);
    const headers = [
        {name: "First Name", data: "firstName"},
        {name: "Last Name", data: "lastName"},
        {name: "Start Date", data: "startDate"},
        {name: "Department", data: "department"},
        {name: "Date of Birth", data: "dateOfBirth"},
        {name: "Street", data: "street"},
        {name: "City", data: "city"},
        {name: "State", data: "state"},
        {name: "Zip Code", data: "zipCode"},
    ];
    return (
        <div className="container-list">
            <h1>List Employee</h1>
            <Table data={dataEmployee} headers={headers}/>
        </div>
    );
};

export default ListEmployee;
