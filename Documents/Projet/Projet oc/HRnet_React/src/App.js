import React from "react";
import "./App.css";
import NavBar from "./Components/NavBar/NavBar";
import RouterApp from "./Routers/RoutesPath";
import { BrowserRouter as Router } from "react-router-dom";
import store from "./Redux/store";
import { Provider } from "react-redux";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <NavBar />
          <RouterApp />
        </div>
      </Router>
    </Provider>
  );
}

export default App;
