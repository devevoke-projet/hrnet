import {createSlice} from "@reduxjs/toolkit";

const employeeSlice = createSlice({
    name: "employee",
    initialState: {
        employee: JSON.parse(localStorage.getItem("employee")) || [],
    },
    reducers: {
        /*data employee*/
        addEmployee: (state, action) => {
            //stocker dans le state les données de l'employé
            state.employee = [...state.employee, action.payload];
            localStorage.setItem("employee", JSON.stringify(state.employee));
        },
    },
});
export {employeeSlice};
