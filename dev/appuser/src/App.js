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
const MidiaAll = lazy(() => import("./pages/midiaAll/MidiaAllCon"));
const MidiaUsuarioAll = lazy(() => import("./pages/midiaUsuarioAll/MidiaUsuarioAllCon"));
const MidiaUsuarioFav = lazy(() => import("./pages/midiaUsuarioFav/MidiaUsuarioFavCon"));

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
          <Route path="/midias/all" element={<MidiaAll />} />
          <Route path="/midiasUsuario/all" element={<MidiaUsuarioAll />} />
          <Route path="/midiasUsuario/favoritos" element={<MidiaUsuarioFav />} />
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
            navigate("/midias/all");
          },
        },
        {
          label: "Todas Minhas",
          command: () => {
            navigate("/midiasUsuario/all");
          },
        },
        {
          label: "Minhas Favoritas",
          command: () => {
            navigate("/midiasUsuario/favoritos");
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
