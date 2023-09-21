import { configureStore } from "@reduxjs/toolkit";
import { employeeSlice } from "./employeeSlice";

const store = configureStore({
  reducer: {
    employeeStore: employeeSlice.reducer,
  },
});

export default store;
