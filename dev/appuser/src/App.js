import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { Suspense, lazy, useEffect, useState } from "react";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import { Menubar } from "primereact/menubar";
import LoginForm from "./pages/login/LoginForm";
import "./css/visual.css";
import "./css/menubar.css";
import Error404 from "./pages/error/404";

const Home = lazy(() => import("./pages/home/Home"));
const Midia = lazy(() => import("./pages/midia/MidiaCon"));
const MidiaUsuario = lazy(() => import("./pages/midiaUsuario/MidiaUsuarioCon"));

function App() {
  const [token, setToken] = useState([]);
  const [userId, setUserId] = useState([]);

  useEffect(() => {
    setToken(sessionStorage.getItem("token"));
    setUserId(sessionStorage.getItem("userId"));
  }, []);
  if (!token || token <= "") {
    return <LoginForm />;
  }

  return (
    <BrowserRouter>
      <Menu />
      <Suspense fallback={<div className="textWhite">Carregando...</div>}>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/midias" element={<Midia />} />
          <Route path="/midiasUsuarioFavoritos" element={<MidiaUsuario />} />
          <Route path="*" element={<Error404 />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

function Menu() {
  let navigate = useNavigate();
  const items = [
    {
      label: "Home",
      icon: "pi pi-fw pi-home",
      command: () => {
        navigate("/");
      },
    },
    {
      label: "Mídias",
      icon: "pi pi-fw pi-book",
      items: [
        {
          label: "Todas",
          command: () => {
            navigate("/midias");
          },
        },
        {
          label: "Minhas",
          command: () => {
            navigate("/midiasUsuarioFavoritos");
          },
        },
      ],
    },
    {
      label: "Sair",
      icon: "pi pi-fw pi-power-off",
      command: () => {
        sessionStorage.setItem("token", "");
      },
      url: "/",
    },
  ];

  return <Menubar model={items} className="ui-menubar" />;
}

export default App;
