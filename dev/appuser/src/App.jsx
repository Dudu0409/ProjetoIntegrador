import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState, useEffect } from "react";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "./css/visual.css";
import "./css/menubar.css";
import AppRoutes from "./AppRoutes";

function App() {
  const [userId, setUserId] = useState([]);
  useEffect(() => {
    setUserId(localStorage.getItem("userId"));
  }, []);
  return (
    <div className="app">
      <AppRoutes />
    </div>
  );
}

export default App;
